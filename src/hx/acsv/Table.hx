package acsv;

/**
 * 1. Copyright (c) 2022 amin2312
 * 2. Version 1.0.0
 * 3. MIT License
 *
 * ACsv is a easy, fast and powerful csv parse library.
 */
@:expose
class Table
{
    /**
	 * Supported json field types.
	 */
    private static var JSON_TYPES:Array<String> = ["json", "strings"];
    /**
	 * The raw content.
	 */
    public var content:String = null;
    /**
	 * Parsed csv table Head.
	 */
    public var head = new Array<Field>();
    /**
	 * Parsed csv table Body.
	 */
    public var body = new Array<Array<Dynamic>>();
    /**
	 * Index Set(optimize for read).
	 */
    private var _indexSet:Dynamic = {};
    /**
	 * Selected data(for Method Chaining).
	 **/
    private var _selected:Array<Array<Dynamic>> = null;
    /**
	 * Constructor.
	 */
    @:dox(hide)
    public function new()
    {}
    /**
	 * Merge a table.
	 * <br/><b>Notice:</b> two tables' structure must be same.
	 * @param b source table
	 */
    public function merge(b:Table):Void
    {
        this.body = this.body.concat(b.body);
        var index = b.content.indexOf('\r\n');
        if (index == -1)
        {
            index = b.content.indexOf('\n');
        }
        var c = b.content.substring(index);
        this.content += c;
    }
    /**
	 * Create index for the specified column.
	 * <br>This function is only valid for "selectWhenE" and "limit" param is 1.
	 * <br>It will improve performance.
	 * @param colIndex column index
	 */
    public function createIndexAt(colIndex:Int):Void
    {
        var map:Dynamic = {};
        for (i in 0...this.body.length)
        {
            var row:Array<Dynamic> = this.body[i];
            var key:Dynamic = row[colIndex];
            #if (js || lua)
            map[key] = row;
            #else
            Reflect.setProperty(map, key + '', row);
            #end
        }
        #if (js || lua)
        _indexSet[colIndex] = map;
        #else
        Reflect.setProperty(_indexSet, colIndex + '', map);
        #end
    }
    /**
	 * Get column index by specified field name.
	 * @param name As name mean
	 */
    public function getColIndexBy(name:String):Int
    {
        for (i in 0...this.head.length)
        {
            var field = this.head[i];
            if (field.name == name)
            {
                return i;
            }
        }
        return -1;
    }
    /**
	 * Sort by selected rows.
     * @param colIndex specified column's index
     * @param sortType 0: asc, 1: desc
     * @return Current THIS instance(Method Chaining), can call "to???" or "select???" function in next step.
	 */
    public function sortBy(colIndex:Int, sortType:Int):Table
    {
        var len = _selected.length;
        for (i in 0...len)
        {
            for (j in 0...len - 1)
            {
                var ok = false;
                var a = _selected[j][colIndex];
                var b = _selected[j + 1][colIndex];
                if (sortType == 0 && a > b)
                {
                    ok = true;
                }
                else if (sortType == 1 && a < b)
                {
                    ok = true;
                }
                if (ok)
                {
                    var temp = _selected[j];
                    _selected[j] = _selected[j + 1];
                    _selected[j + 1] = temp;
                }
            }
        }
        return this;
    }
    /**
	 * Get current selected data.
	 <br>It be assigned after call "select???" function
	 */
    public function getCurrentSelectdData():Array<Dynamic>
    {
        return _selected;
    }
    /**
	 * Format data to row.
	 */
    private function fmtRow(row:Array<Dynamic>):Array<Dynamic>
    {
        var obj:Array<Dynamic> = [];
        for (i in 0...this.head.length)
        {
            var type = this.head[i].type;
            var val0 = row[i];
            var val1:Dynamic = null;
            if (type != null && type != '' && Table.JSON_TYPES.indexOf(type) != -1)
            {
                if (val0 != null)
                {
                    val1 = haxe.Json.parse(val0);
                }
            }
            else
            {
                val1 = val0;
            }
            obj.push(val1);
        }
        return obj;
    }
    /**
	 * Format data to obj.
	 */
    private function fmtObj(row:Array<Dynamic>):Dynamic
    {
        var obj:Dynamic = {};
        for (i in 0...this.head.length)
        {
            var name = this.head[i].name;
            var type = this.head[i].type;
            var val0 = row[i];
            var val1:Dynamic = null;
            if (type != null && type != '' && Table.JSON_TYPES.indexOf(type) != -1)
            {
                if (val0 != null)
                {
                    val1 = haxe.Json.parse(val0);
                }
            }
            else
            {
                val1 = val0;
            }
            #if (js || lua)
            untyped obj[name] = val1;
            #else
            Reflect.setProperty(obj, name, val1);
            #end
        }
        return obj;
    }
    /**
	 * Fetch first selected result to a row and return it.
	 */
    public function toFirstRow():Array<Dynamic>
    {
        var rzl = null;
        if (_selected != null && _selected.length > 0)
        {
            rzl = this.fmtRow(_selected[0]);
        }
        _selected = null;
        return rzl;
    }
    /**
	 * Fetch last selected result to a row and return it.
	 */
    public function toLastRow():Array<Dynamic>
    {
        var rzl = null;
        if (_selected != null && _selected.length > 0)
        {
            rzl = this.fmtRow(_selected[_selected.length - 1]);
        }
        _selected = null;
        return rzl;
    }
    /**
	 * Fetch all selected results to the rows and return it.
	 */
    public function toRows():Array<Array<Dynamic>>
    {
        if (_selected == null)
        {
            return null;
        }
        var dst = new Array<Array<Dynamic>>();
        for (i in 0..._selected.length)
        {
            var row:Array<Dynamic> = _selected[i];
            dst.push(this.fmtRow(row));
        }
        _selected = null;
        return dst;
    }
    /**
	 * Fetch first selected result to a object and return it.
	 */
    public function toFirstObj():Dynamic
    {
        var rzl = null;
        if (_selected != null && _selected.length > 0)
        {
            rzl = this.fmtObj(_selected[0]);
        }
        _selected = null;
        return rzl;
    }
    /**
	 * Fetch last selected result to a object and return it.
	 */
    public function toLastObj():Dynamic
    {
        var rzl = null;
        if (_selected != null && _selected.length > 0)
        {
            rzl = this.fmtObj(_selected[_selected.length - 1]);
        }
        _selected = null;
        return rzl;
    }
    /**
	 * Fetch all selected results to the objects and return it.
	 */
    public function toObjs():Array<Dynamic>
    {
        if (_selected == null)
        {
            return null;
        }
        var dst = new Array<Dynamic>();
        for (i in 0..._selected.length)
        {
            var row:Array<Dynamic> = _selected[i];
            dst.push(this.fmtObj(row));
        }
        _selected = null;
        return dst;
    }
    /**
	 * Fetch all selected results to a new table.
	 */
    public function toTable():Table
    {
        if (_selected == null)
        {
            return null;
        }
        var t = new Table();
        t.head = this.head.concat([]);
        t.body = this._selected;
        _selected = null;
        return t;
    }
    /**
	 * Select all rows.
     * @return Current THIS instance(Method Chaining), can call "to???" or "select???" function in next step.
	 */
    public function selectAll():Table
    {
        _selected = body;
        return this;
    }
    /**
	 * Select the first row.
     * @return Current THIS instance(Method Chaining), can call "to???" or "select???" function in next step.
	 */
    public function selectFirstRow():Table
    {
        _selected = [body[0]];
        return this;
    }
    /**
	 * Select the last row.
     * @return Current THIS instance(Method Chaining), can call "to???" or "select???" function in next step.
	 */
    public function selectLastRow():Table
    {
        _selected = [body[body.length - 1]];
        return this;
    }
    /**
     * Selects the specified row by index.
     * @param rowIndex specified column's index
     * @return Current THIS instance(Method Chaining), can call "to???" or "select???" function in next step.
	 */
    public function selectAt(rowIndex:Int):Table
    {
        var dst = new Array<Array<Dynamic>>();
        if (rowIndex >= 0 && rowIndex < this.body.length)
        {
            dst.push(this.body[rowIndex]);
        }
        _selected = dst;
        return this;
    }
    /**
     * Select the rows when the column's value is equal to specified values of array.
     * @param limit maximum length of every selected results (0 is infinite, if you only need 1 result, 1 is recommended, it will improve performance)
     * @param values the specified values of array
     * @param colIndex specified column's index
     * @return Current THIS instance(Method Chaining), can call "to???" or "select???" function in next step.
	 */
    public function selectWhenIn(limit:Int, values:Array<Dynamic>, colIndex:Int = 0):Table
    {
        var rows = new Array<Array<Dynamic>>();
        for (i in 0...values.length)
        {
            var value = values[i];
            selectWhenE(limit, value, colIndex, rows);
            _selected = null;
        }
        _selected = rows;
        return this;
    }
    /**
     * Select the rows when the column's value is equal to specified value.
     * @param limit maximum length of selected results (0 is infinite, if you only need 1 result, 1 is recommended, it will improve performance)
     * @param value the specified value
     * @param colIndex specified column's index
     * @param extraSelector extra selector, use it to save selected result
     * @return Current THIS instance(Method Chaining), can call "to???" or "select???" function in next step.
	 */
    public function selectWhenE(limit:Int, value:Dynamic, colIndex:Int = 0, extraSelector:Array<Array<Dynamic>> = null):Table
    {
        var dst:Array<Array<Dynamic>> = extraSelector;
        if (dst == null)
        {
            dst = new Array<Array<Dynamic>>();
        }
        // 1.check indexed set
        if (limit == 1)
        {
            #if (js || lua)
            var map:Dynamic = _indexSet[colIndex];
            #else
            var map:Dynamic = Reflect.getProperty(_indexSet, colIndex + '');
            #end
            if (map != null)
            {
                #if (js || lua)
                var val = map[value];
                #else
                var val = Reflect.getProperty(map, value + '');
                #end
                if (val != null)
                {
                    dst.push(val);
                }
                _selected = dst;
                return this;
            }
        }
        // 2.line-by-line scan
        var src = _selected;
        if (src == null)
        {
            src = body;
        }
        for (i in 0...src.length)
        {
            var row:Array<Dynamic> = src[i];
            if (row[colIndex] == value)
            {
                dst.push(row);
                limit--;
                if (limit == 0)
                {
                    break;
                }
            }
        }
        _selected = dst;
        return this;
    }
    /**
	 * Select the rows when the column's values are equal to specified values.
     * @param limit maximum length of selected results (0 is infinite, if you only need 1 result, 1 is recommended, it will improve performance)
     * @param value1 first specified value
     * @param value2 second specified value
     * @param colIndex2 second specified column's index
     * @param colIndex1 first specified column's index
     * @return Current THIS instance(Method Chaining), can call "to???" or "select???" function in next step.
	 */
    public function selectWhenE2(limit:Int, value1:Dynamic, value2:Dynamic, colIndex2:Int = 1, colIndex1:Int = 0):Table
    {
        var src = _selected;
        if (src == null)
        {
            src = body;
        }
        var dst = new Array<Array<Dynamic>>();
        for (i in 0...src.length)
        {
            var row:Array<Dynamic> = src[i];
            if (row[colIndex1] == value1 && row[colIndex2] == value2)
            {
                dst.push(row);
                limit--;
                if (limit == 0)
                {
                    break;
                }
            }
        }
        _selected = dst;
        return this;
    }
    /**
	 * Select the rows when the column's values are equal to specified values.
     * @param limit maximum length of selected results (0 is infinite, if you only need 1 result, 1 is recommended, it will improve performance)
     * @param value1 first specified value
     * @param value2 second specified value
     * @param value3 third specified value
     * @param colIndex3 third specified column's index
     * @param colIndex2 second specified column's index
     * @param colIndex1 first specified column's index
     * @return Current THIS instance(Method Chaining), can call "to???" or "select???" function in next step.
	 */
    public function selectWhenE3(limit:Int, value1:Dynamic, value2:Dynamic, value3:Dynamic, colIndex3:Int = 2, colIndex2:Int = 1, colIndex1:Int = 0):Table
    {
        var src = _selected;
        if (src == null)
        {
            src = body;
        }
        var dst = new Array<Array<Dynamic>>();
        for (i in 0...src.length)
        {
            var row:Array<Dynamic> = src[i];
            if (row[colIndex1] == value1 && row[colIndex2] == value2 && row[colIndex3] == value3)
            {
                dst.push(row);
                limit--;
                if (limit == 0)
                {
                    break;
                }
            }
        }
        _selected = dst;
        return this;
    }
    /**
	 * Select the rows when the column's value is greater than specified value.
     * @param limit maximum length of selected results (0 is infinite, if you only need 1 result, 1 is recommended, it will improve performance)
     * @param withEqu whether include equation
     * @param value the specified value
     * @param colIndex specified column's index
     * @return Current THIS instance(Method Chaining), can call "to???" or "select???" function in next step.
	 */
    public function selectWhenG(limit:Int, withEqu:Bool, value:Float, colIndex:Int = 0):Table
    {
        var src = _selected;
        if (src == null)
        {
            src = body;
        }
        var dst = new Array<Array<Dynamic>>();
        for (i in 0...src.length)
        {
            var row:Array<Dynamic> = src[i];
            var rowVal = row[colIndex];
            if (rowVal > value || (withEqu && rowVal == value))
            {
                dst.push(row);
                limit--;
                if (limit == 0)
                {
                    break;
                }
            }
        }
        _selected = dst;
        return this;
    }
    /**
	 * Select the rows when the column's value is less than specified values.
     * @param limit maximum length of selected results (0 is infinite, if you only need 1 result, 1 is recommended, it will improve performance)
     * @param withEqu whether include equation
     * @param value the specified value
     * @param colIndex specified column's index
     * @return Current THIS instance(Method Chaining), can call "to???" or "select???" function in next step.
	 */
    public function selectWhenL(limit:Int, withEqu:Bool, value:Float, colIndex:Int = 0):Table
    {
        var src = _selected;
        if (src == null)
        {
            src = body;
        }
        var dst = new Array<Array<Dynamic>>();
        for (i in 0...src.length)
        {
            var row:Array<Dynamic> = src[i];
            var rowVal = row[colIndex];
            if (rowVal < value || (withEqu && rowVal == value))
            {
                dst.push(row);
                limit--;
                if (limit == 0)
                {
                    break;
                }
            }
        }
        _selected = dst;
        return this;
    }
    /**
	 * Select the rows when the column's value is greater than specified value <b>and</b> less than specified value.
     * @param limit maximum length of selected results (0 is infinite, if you only need 1 result, 1 is recommended, it will improve performance)
     * @param GWithEqu whether greater and equal
     * @param LWithEqu whether less and equal
     * @param GValue the specified greater value
     * @param LValue the specified less value
     * @param colIndex specified column's index
     * @return Current THIS instance(Method Chaining), can call "to???" or "select???" function in next step.
	 */
    public function selectWhenGreaterAndLess(limit:Int, GWithEqu:Bool, LWithEqu:Bool, GValue:Float, LValue:Float, colIndex:Int = 0):Table
    {
        var src = _selected;
        if (src == null)
        {
            src = body;
        }
        var dst = new Array<Array<Dynamic>>();
        for (i in 0...src.length)
        {
            var row:Array<Dynamic> = src[i];
            var rowVal = row[colIndex];
            var v1 = (rowVal > GValue || (GWithEqu && rowVal == GValue));
            var v2 = (rowVal < LValue || (LWithEqu && rowVal == LValue));
            if (v1 && v2)
            {
                dst.push(row);
                limit--;
                if (limit == 0)
                {
                    break;
                }
            }
        }
        _selected = dst;
        return this;
    }
    /**
	 * Select the rows when the column's value is less than specified value <b>or</b> greater than specified value.
     * @param limit maximum length of selected results (0 is infinite, if you only need 1 result, 1 is recommended, it will improve performance)
     * @param LWithEqu whether less and equal
     * @param GWithEqu whether greater and equal
     * @param LValue the specified less value
     * @param GValue the specified greater value
     * @param colIndex specified column's index
     * @return Current THIS instance(Method Chaining), can call "to???" or "select???" function in next step.
	 */
    public function selectWhenLessOrGreater(limit:Int, LWithEqu:Bool, GWithEqu:Bool, LValue:Float, GValue:Int, colIndex:Int = 0):Table
    {
        var src = _selected;
        if (src == null)
        {
            src = body;
        }
        var dst = new Array<Array<Dynamic>>();
        for (i in 0...src.length)
        {
            var row:Array<Dynamic> = src[i];
            var rowVal = row[colIndex];
            var v1 = (rowVal < LValue || (LWithEqu && rowVal == LValue));
            var v2 = (rowVal > GValue || (GWithEqu && rowVal == GValue));
            if (v1 || v2)
            {
                dst.push(row);
                limit--;
                if (limit == 0)
                {
                    break;
                }
            }
        }
        _selected = dst;
        return this;
    }
    /**
	 * Parse csv conent.
     * @param content As name mean
     * @param filedSeparator filed separator
     * @param filedMultiLineDelimiter filed multi-line delimiter
	 */
    public static function Parse(content:String, filedSeparator:String = ",", filedMultiLineDelimiter:String = "\""):Table
    {
        var table:Table = arrayToRows(textToArray(content, filedSeparator, filedMultiLineDelimiter));
        table.content = content;
        return table;
    }
    /**
	 * Convert text to array.
	 */
    static private function textToArray(text:String, FS:String = ",", FML:String = "\""):Array<Array<Dynamic>>
    {
        var FMLs = FML + FML;
        var array:Array<Array<Dynamic>> = [];
        var maxLen:Int = text.length;
        var ptr:String = text;
        var ptrPos:Int = 0;
        while (true)
        {
            var curLen = maxLen - ptrPos;
            var cellIndexA:Int = 0;
            var cellIndexB:Int = 0;
            var cells:Array<Dynamic> = [];
            var cell:String;
            var chr:String;
            while (cellIndexB < curLen)
            {
                cellIndexA = cellIndexB;
                chr = ptr.charAt(ptrPos + cellIndexB);
                if (chr == "\n" || chr == "\r\n") // line is over
                {
                    cellIndexB += 1;
                    break;
                }
                if (chr == "\r" && ptr.charAt(ptrPos + cellIndexB + 1) == "\n") // line is over
                {
                    cellIndexB += 2;
                    break;
                }
                if (chr == FS) // is separator
                {
                    cell = "";
                    var nextPos = ptrPos + cellIndexB + 1;
                    if (nextPos >= maxLen)
                    {
                        chr = '\n'; // fix the bug when the last cell is empty
                    }
                    else
                    {
                        chr = ptr.charAt(nextPos);
                    }
                    if (cellIndexA == 0 || chr == FS || chr == "\n" || chr == "\r\n") // is empty cell
                    {
                        cellIndexB += 1;
                        cells.push("");
                    }
                    else if (chr == "\r" && ptr.charAt(ptrPos + cellIndexB + 2) == "\n") // is empty cell
                    {
                        cellIndexB += 2;
                        cells.push("");
                    }
                    else
                    {
                        cellIndexB += 1;
                    }
                }
                else if (chr == FML) // is double quote
                {
                    // pass DQ
                    cellIndexB++;
                    // 1.find the nearest double quote
                    while (true)
                    {
                        cellIndexB = ptr.indexOf(FML, ptrPos + cellIndexB);
                        if (cellIndexB == -1)
                        {
                            trace("[ACsv] Invalid Double Quote");
                            return null;
                        }
                        cellIndexB -= ptrPos;
                        if (ptr.charAt(ptrPos + cellIndexB + 1) == FML) // """" is normal double quote
                        {
                            cellIndexB += 2; // pass """"
                            continue;
                        }
                        break;
                    }
                    // 2.truncate the content of double quote
                    cell = ptr.substring(ptrPos + cellIndexA + 1, ptrPos + cellIndexB);
                    cell = StringTools.replace(cell, FMLs, FML); // convert """" to ""
                    cells.push(cell);
                    // pass DQ
                    cellIndexB++;
                }
                else // is normal
                {
                    // 1.find the nearest comma and LF
                    var indexA:Int = ptr.indexOf(FS, ptrPos + cellIndexB);
                    if (indexA == -1)
                    {
                        indexA = curLen; // is last cell
                    }
                    else
                    {
                        indexA -= ptrPos;
                    }
                    var indexB:Int = ptr.indexOf("\r\n", ptrPos + cellIndexB);
                    if (indexB == -1)
                    {
                        indexB = ptr.indexOf("\n", ptrPos + cellIndexB);
                        if (indexB == -1)
                        {
                            indexB = curLen;
                        }
                        else
                        {
                            indexB -= ptrPos;
                        }
                    }
                    else
                    {
                        indexB -= ptrPos;
                    }
                    cellIndexB = indexA;
                    if (indexB < indexA) // row is end
                    {
                        cellIndexB = indexB;
                    }
                    // 2.Truncate the cell contennt
                    cell = ptr.substring(ptrPos + cellIndexA, ptrPos + cellIndexB);
                    cells.push(cell);
                }
            }
            array.push(cells);
            // move to next position
            ptrPos += cellIndexB;
            if (ptrPos >= maxLen)
            {
                break;
            }
        }
        return array;
    }
    /**
	 * Convert array to rows.
	 */
    static private function arrayToRows(array:Array<Array<Dynamic>>):Table
    {
        var head:Array<Dynamic> = array.shift();
        var body:Array<Array<Dynamic>> = array;
        // parse head
        var fileds:Array<Field> = new Array<Field>();
        for (i in 0...head.length)
        {
            var fullName:String = head[i];
            var parts:Array<String> = fullName.split(":");
            var filed = new Field();
            filed.fullName = fullName;
            filed.name = parts[0];
            filed.type = parts[1];
            fileds.push(filed);
        }
        // parse body
        for (i in 0...body.length)
        {
            var row:Array<Dynamic> = body[i];
            for (j in 0...row.length)
            {
                var type:String = fileds[j].type;
                var cell:String = row[j];
                var newVal:Dynamic = cell;
                var isEmptyCell = (cell == null || cell == '');
                if (type == "bool")
                {
                    if (isEmptyCell || cell == "false" || cell == '0')
                    {
                        newVal = false;
                    }
                    else
                    {
                        newVal = true;
                    }
                }
                else if (type == "int")
                {
                    if (isEmptyCell)
                    {
                        newVal = 0;
                    }
                    else
                    {
                        #if js
                        newVal = untyped parseInt(newVal);
                        #else
                        newVal = Std.parseInt(newVal);
                        #end
                    }
                }
                else if (type == "number")
                {
                    if (isEmptyCell)
                    {
                        newVal = 0.0;
                    }
                    else
                    {
                        newVal = Std.parseFloat(newVal);
                    }
                }
                else if (type == "json")
                {
                    if (isEmptyCell)
                    {
                        newVal = null;
                    }
                    else
                    {
                        var chr0 = cell.charAt(0);
                        if (!(chr0 == '[' || chr0 == '{' ))
                        {
                            trace("[ACsv] Invalid json format:" + fileds[j].name + ',' + cell);
                            return null;
                        }
                        newVal = cell;
                    }
                }
                else if (type == "strings")
                {
                    if (isEmptyCell)
                    {
                        newVal = "[]";
                    }
                    else
                    {
                        newVal = '["' + cell.split(',').join('\",\"') + '"]';
                    }
                }
                row[j] = newVal;
            }
            body[i] = row; // update row
        }
        // create table
        var table:Table = new Table();
        table.head = fileds;
        table.body = body;
        return table;
    }
}
