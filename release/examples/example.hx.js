// Generated by Haxe 3.4.7
(function ($hx_exports) { "use strict";
$hx_exports["acsv"] = $hx_exports["acsv"] || {};
function $extend(from, fields) {
	function Inherit() {} Inherit.prototype = from; var proto = new Inherit();
	for (var name in fields) proto[name] = fields[name];
	if( fields.toString !== Object.prototype.toString ) proto.toString = fields.toString;
	return proto;
}
var Example = function() { };
Example.main = function() {
	Example._tab1 = acsv_Table.Parse(Example.standard_format_text);
	Example._tab2 = acsv_Table.Parse(Example.enhanced_format_text);
	Example.showTable("standard csv format",Example._tab1);
	Example.test_standard_csv_format();
	Example.showTable("enhanced csv format",Example._tab2);
	Example.test_enhanced_csv_format();
};
Example.showTables = function() {
};
Example.showTable = function(fileName,csvTable) {
	var t = window.document.getElementById("output");
	var tab = window.document.createElement("table");
	var thead = window.document.createElement("thead");
	var tr = window.document.createElement("tr");
	thead.appendChild(tr);
	var _g1 = 0;
	var _g = csvTable.head.length;
	while(_g1 < _g) {
		var i = _g1++;
		var td = window.document.createElement("td");
		var row = csvTable.head[i];
		td.innerText = row.fullName;
		tr.appendChild(td);
	}
	tab.appendChild(thead);
	var tbody = window.document.createElement("tbody");
	var _g11 = 0;
	var _g2 = csvTable.body.length;
	while(_g11 < _g2) {
		var i1 = _g11++;
		var tr1 = window.document.createElement("tr");
		var rows = csvTable.body[i1];
		var _g3 = 0;
		var _g21 = rows.length;
		while(_g3 < _g21) {
			var j = _g3++;
			var td1 = window.document.createElement("td");
			var row1 = rows[j];
			td1.innerText = row1;
			tr1.appendChild(td1);
		}
		tbody.appendChild(tr1);
	}
	tab.appendChild(tbody);
	var tfoot = window.document.createElement("tfoot");
	var tr2 = window.document.createElement("tr");
	var td2 = window.document.createElement("td");
	td2.colSpan = csvTable.head.length;
	td2.innerText = fileName;
	tr2.appendChild(td2);
	tfoot.appendChild(tr2);
	tab.appendChild(tfoot);
	t.appendChild(tab);
};
Example.print = function(cmd,o) {
	var t = window.document.getElementById("output");
	var div = window.document.createElement("div");
	var span = window.document.createElement("span");
	span.innerHTML = StringTools.replace(cmd,"[enhanced]","<span class=\"E\">[enhanced]</span>");
	div.appendChild(span);
	div.title = JSON.stringify(o,null,"\t");
	div.innerHTML += JSON.stringify(o);
	t.appendChild(div);
	console.log(cmd);
	console.log(o);
};
Example.test_standard_csv_format = function() {
	Example.print("select all to rows",Example._tab1.selectAll().toRows());
	Example.print("select all to objs",Example._tab1.selectAll().toObjs());
	Example.print("select first row",Example._tab1.selectFirstRow().toFirstRow());
	Example.print("select first obj",Example._tab1.selectFirstRow().toFirstObj());
	Example.print("select last row",Example._tab1.selectLastRow().toFirstRow());
	Example.print("select last obj",Example._tab1.selectLastRow().toFirstObj());
	Example.print("select [id] = \"2\"",Example._tab1.selectWhenE(1,"2").toFirstObj());
	Example.print("select [id] = \"-1\"",Example._tab1.selectWhenE(1,"-1").toFirstObj());
	Example.print("select [id] = \"3\" and [id2] = \"21\"",Example._tab1.selectWhenE2(1,"3","21").toFirstObj());
	Example.print("select [id] = \"3\" and [id2] = \"-1\"",Example._tab1.selectWhenE2(1,"3","-1").toFirstObj());
	Example.print("select [id] = \"4\" and [id2] = \"21\" and [id3] = \"200\"",Example._tab1.selectWhenE3(1,"4","21","200").toFirstObj());
	Example.print("select [id] = \"4\" and [id2] = \"21\" and [id3] = \"-1\"",Example._tab1.selectWhenE3(1,"4","21","-1").toFirstObj());
	Example.print("select all [id2] = \"20\"",Example._tab1.selectWhenE(0,"20",1).toObjs());
	Example.print("select all [id2] = \"-1\"",Example._tab1.selectWhenE(0,"-1",1).toObjs());
};
Example.test_enhanced_csv_format = function() {
	Example.print("[enhanced] select all to rows",Example._tab2.selectAll().toRows());
	Example.print("[enhanced] select all to objs",Example._tab2.selectAll().toObjs());
	Example.print("[enhanced] select first row",Example._tab2.selectFirstRow().toFirstRow());
	Example.print("[enhanced] select first obj",Example._tab2.selectFirstRow().toFirstObj());
	Example.print("[enhanced] select last row",Example._tab2.selectLastRow().toFirstRow());
	Example.print("[enhanced] select last obj",Example._tab2.selectLastRow().toFirstObj());
	Example.print("[enhanced] select [id] = 2",Example._tab2.selectWhenE(1,2).toFirstObj());
	Example.print("[enhanced] select [id] = -1",Example._tab2.selectWhenE(1,-1).toFirstObj());
	Example.print("[enhanced] select [id] = 3 and [id2] = 22",Example._tab2.selectWhenE2(1,3,22).toFirstObj());
	Example.print("[enhanced] select [id] = 3 and [id2] = -1",Example._tab2.selectWhenE2(1,3,-1).toFirstObj());
	Example.print("[enhanced] select [id] = 4 and [id2] = 22 and [id3] = 200",Example._tab2.selectWhenE3(1,4,22,200).toFirstObj());
	Example.print("[enhanced] select [id] = 4 and [id2] = 22 and [id3] = -1",Example._tab2.selectWhenE3(1,4,22,-1).toFirstObj());
	Example.print("[enhanced] select all [id2] = 21",Example._tab2.selectWhenE(0,21,1).toObjs());
	Example.print("[enhanced] select all [id2] = -1",Example._tab2.selectWhenE(0,-1,1).toObjs());
	Example.print("[enhanced] select all [id2] > 25",Example._tab2.selectWhenG(0,false,25,1).toObjs());
	Example.print("[enhanced] select all [id2] >= 25",Example._tab2.selectWhenG(0,true,25,1).toObjs());
	Example.print("[enhanced] select all [id2] < 22",Example._tab2.selectWhenL(0,false,22,1).toObjs());
	Example.print("[enhanced] select all [id2] <= 22",Example._tab2.selectWhenL(0,true,22,1).toObjs());
	Example.print("[enhanced] select all [id2] > 21 and [id2] < 24",Example._tab2.selectWhenGreaterAndLess(0,false,false,21,24,1).toObjs());
	Example.print("[enhanced] select all [id2] >= 21 and [id2] <= 24",Example._tab2.selectWhenGreaterAndLess(0,true,true,21,24,1).toObjs());
	Example.print("[enhanced] select all [id2] < 22 or [id2] > 25",Example._tab2.selectWhenLessOrGreater(0,false,false,22,25,1).toObjs());
	Example.print("[enhanced] select all [id2] <= 22 or [id2] >= 25",Example._tab2.selectWhenLessOrGreater(0,true,true,22,25,1).toObjs());
};
var HxOverrides = function() { };
HxOverrides.cca = function(s,index) {
	var x = s.charCodeAt(index);
	if(x != x) {
		return undefined;
	}
	return x;
};
var Std = function() { };
Std.parseInt = function(x) {
	var v = parseInt(x,10);
	if(v == 0 && (HxOverrides.cca(x,1) == 120 || HxOverrides.cca(x,1) == 88)) {
		v = parseInt(x);
	}
	if(isNaN(v)) {
		return null;
	}
	return v;
};
var StringTools = function() { };
StringTools.replace = function(s,sub,by) {
	return s.split(sub).join(by);
};
var acsv_Field = $hx_exports["acsv"]["Field"] = function() {
};
var acsv_Table = $hx_exports["acsv"]["Table"] = function() {
	this._indexSet = { };
	this.body = [];
	this.head = [];
};
acsv_Table.Parse = function(content) {
	var table = acsv_Table.arrayToRows(acsv_Table.textToArray(content));
	table.content = content;
	return table;
};
acsv_Table.textToArray = function(text) {
	var array = [];
	var maxLen = text.length;
	var ptr = text;
	var ptrPos = 0;
	while(true) {
		var curLen = maxLen - ptrPos;
		var cellIndexA = 0;
		var cellIndexB = 0;
		var cells = [];
		var cell;
		var chr;
		while(cellIndexB < curLen) {
			cellIndexA = cellIndexB;
			chr = ptr.charAt(ptrPos + cellIndexB);
			if(chr == "\n" || chr == "\r\n") {
				++cellIndexB;
				break;
			}
			if(chr == "\r" && ptr.charAt(ptrPos + cellIndexB + 1) == "\n") {
				cellIndexB += 2;
				break;
			}
			if(chr == ",") {
				cell = "";
				var nextPos = ptrPos + cellIndexB + 1;
				if(nextPos >= maxLen) {
					chr = "\n";
				} else {
					chr = ptr.charAt(nextPos);
				}
				if(cellIndexA == 0 || chr == "," || chr == "\n" || chr == "\r\n") {
					++cellIndexB;
					cells.push("");
				} else if(chr == "\r" && ptr.charAt(ptrPos + cellIndexB + 2) == "\n") {
					cellIndexB += 2;
					cells.push("");
				} else {
					++cellIndexB;
				}
			} else if(chr == "\"") {
				++cellIndexB;
				while(true) {
					cellIndexB = ptr.indexOf("\"",ptrPos + cellIndexB);
					if(cellIndexB == -1) {
						throw new js__$Boot_HaxeError("Invalid Double Quote");
					}
					cellIndexB -= ptrPos;
					if(ptr.charAt(ptrPos + cellIndexB + 1) == "\"") {
						cellIndexB += 2;
						continue;
					}
					break;
				}
				cell = ptr.substring(ptrPos + cellIndexA + 1,ptrPos + cellIndexB);
				cell = StringTools.replace(cell,"\"\"","\"");
				cells.push(cell);
				++cellIndexB;
			} else {
				var indexA = ptr.indexOf(",",ptrPos + cellIndexB);
				if(indexA == -1) {
					indexA = curLen;
				} else {
					indexA -= ptrPos;
				}
				var indexB = ptr.indexOf("\r\n",ptrPos + cellIndexB);
				if(indexB == -1) {
					indexB = ptr.indexOf("\n",ptrPos + cellIndexB);
					if(indexB == -1) {
						indexB = curLen;
					} else {
						indexB -= ptrPos;
					}
				} else {
					indexB -= ptrPos;
				}
				cellIndexB = indexA;
				if(indexB < indexA) {
					cellIndexB = indexB;
				}
				cell = ptr.substring(ptrPos + cellIndexA,ptrPos + cellIndexB);
				cells.push(cell);
			}
		}
		array.push(cells);
		ptrPos += cellIndexB;
		if(ptrPos >= maxLen) {
			break;
		}
	}
	return array;
};
acsv_Table.arrayToRows = function(array) {
	var head = array.shift();
	var body = array;
	var fileds = [];
	var _g1 = 0;
	var _g = head.length;
	while(_g1 < _g) {
		var i = _g1++;
		var fullName = head[i];
		var parts = fullName.split(":");
		var filed = new acsv_Field();
		filed.fullName = fullName;
		filed.name = parts[0];
		filed.type = parts[1];
		fileds.push(filed);
	}
	var _g11 = 0;
	var _g2 = body.length;
	while(_g11 < _g2) {
		var i1 = _g11++;
		var row = body[i1];
		var _g3 = 0;
		var _g21 = row.length;
		while(_g3 < _g21) {
			var j = _g3++;
			var type = fileds[j].type;
			var cell = row[j];
			var newVal = cell;
			var isEmptyCell = cell == null || cell == "";
			switch(type) {
			case "bool":
				if(isEmptyCell || cell == "false" || cell == "0") {
					newVal = false;
				} else {
					newVal = true;
				}
				break;
			case "int":
				if(isEmptyCell) {
					newVal = 0;
				} else {
					newVal = Std.parseInt(newVal);
				}
				break;
			case "json":
				if(isEmptyCell) {
					newVal = null;
				} else {
					if(!(cell.charAt(0) == "[" || cell.charAt(0) == "{")) {
						throw new js__$Boot_HaxeError(fileds[j].name + "," + cell);
					}
					newVal = cell;
				}
				break;
			case "number":
				if(isEmptyCell) {
					newVal = 0.0;
				} else {
					newVal = parseFloat(newVal);
				}
				break;
			case "strings":
				if(isEmptyCell) {
					newVal = "[]";
				} else {
					newVal = "[\"" + cell.split(",").join("\",\"") + "\"]";
				}
				break;
			}
			row[j] = newVal;
		}
		body[i1] = row;
	}
	var table = new acsv_Table();
	table.head = fileds;
	table.body = body;
	return table;
};
acsv_Table.prototype = {
	merge: function(b) {
		this.body = this.body.concat(b.body);
		var index = b.content.indexOf("\r\n");
		if(index == -1) {
			index = b.content.indexOf("\n");
		}
		var c = b.content.substring(index);
		this.content += c;
	}
	,createIndexAt: function(colIndex) {
		var map = { };
		var _g1 = 0;
		var _g = this.body.length;
		while(_g1 < _g) {
			var i = _g1++;
			var row = this.body[i];
			var key = row[colIndex];
			map[key] = row;
		}
		this._indexSet[colIndex] = map;
	}
	,getColumnIndexBy: function(name) {
		var _g1 = 0;
		var _g = this.head.length;
		while(_g1 < _g) {
			var i = _g1++;
			var field = this.head[i];
			if(field.name == name) {
				return i;
			}
		}
		return -1;
	}
	,fmtRow: function(row) {
		var obj = [];
		var _g1 = 0;
		var _g = this.head.length;
		while(_g1 < _g) {
			var i = _g1++;
			var type = this.head[i].type;
			var val0 = row[i];
			var val1;
			if(type != null && type != "" && acsv_Table.JSON_TYPES.indexOf(type) != -1) {
				val1 = JSON.parse(val0);
			} else {
				val1 = val0;
			}
			obj.push(val1);
		}
		return obj;
	}
	,fmtObj: function(row) {
		var obj = { };
		var _g1 = 0;
		var _g = this.head.length;
		while(_g1 < _g) {
			var i = _g1++;
			var name = this.head[i].name;
			var type = this.head[i].type;
			var val0 = row[i];
			var val1;
			if(type != null && type != "" && acsv_Table.JSON_TYPES.indexOf(type) != -1) {
				val1 = JSON.parse(val0);
			} else {
				val1 = val0;
			}
			obj[name] = val1;
		}
		return obj;
	}
	,toFirstRow: function() {
		if(this._selectd == null || this._selectd.length == 0) {
			return null;
		}
		return this.fmtRow(this._selectd[0]);
	}
	,toLastRow: function() {
		if(this._selectd == null || this._selectd.length == 0) {
			return null;
		}
		return this.fmtRow(this._selectd[this._selectd.length - 1]);
	}
	,toRows: function() {
		if(this._selectd == null || this._selectd.length == 0) {
			return null;
		}
		var objs = [];
		var _g1 = 0;
		var _g = this._selectd.length;
		while(_g1 < _g) {
			var i = _g1++;
			var row = this._selectd[i];
			objs.push(this.fmtRow(row));
		}
		return objs;
	}
	,toFirstObj: function() {
		if(this._selectd == null || this._selectd.length == 0) {
			return null;
		}
		return this.fmtObj(this._selectd[0]);
	}
	,toLastObj: function() {
		if(this._selectd == null || this._selectd.length == 0) {
			return null;
		}
		return this.fmtObj(this._selectd[this._selectd.length - 1]);
	}
	,toObjs: function() {
		if(this._selectd == null || this._selectd.length == 0) {
			return null;
		}
		var objs = [];
		var _g1 = 0;
		var _g = this._selectd.length;
		while(_g1 < _g) {
			var i = _g1++;
			var row = this._selectd[i];
			objs.push(this.fmtObj(row));
		}
		return objs;
	}
	,selectAll: function() {
		this._selectd = this.body;
		return this;
	}
	,selectFirstRow: function() {
		this._selectd = [this.body[0]];
		return this;
	}
	,selectLastRow: function() {
		this._selectd = [this.body[this.body.length - 1]];
		return this;
	}
	,selectWhenE: function(limit,value,colIndex) {
		if(colIndex == null) {
			colIndex = 0;
		}
		if(limit == 1) {
			var map = this._indexSet[colIndex];
			if(map != null) {
				var val = map[value];
				if(val != null) {
					this._selectd = [val];
				} else {
					this._selectd = null;
				}
				return this;
			}
		}
		var rows = [];
		var _g1 = 0;
		var _g = this.body.length;
		while(_g1 < _g) {
			var i = _g1++;
			var row = this.body[i];
			if(row[colIndex] == value) {
				rows.push(row);
				--limit;
				if(limit == 0) {
					break;
				}
			}
		}
		this._selectd = rows;
		return this;
	}
	,selectWhenE2: function(limit,value1,value2,colIndex2,colIndex1) {
		if(colIndex1 == null) {
			colIndex1 = 0;
		}
		if(colIndex2 == null) {
			colIndex2 = 1;
		}
		var rows = [];
		var _g1 = 0;
		var _g = this.body.length;
		while(_g1 < _g) {
			var i = _g1++;
			var row = this.body[i];
			if(row[colIndex1] == value1 && row[colIndex2] == value2) {
				rows.push(row);
				--limit;
				if(limit == 0) {
					break;
				}
			}
		}
		this._selectd = rows;
		return this;
	}
	,selectWhenE3: function(limit,value1,value2,value3,colIndex3,colIndex2,colIndex1) {
		if(colIndex1 == null) {
			colIndex1 = 0;
		}
		if(colIndex2 == null) {
			colIndex2 = 1;
		}
		if(colIndex3 == null) {
			colIndex3 = 2;
		}
		var rows = [];
		var _g1 = 0;
		var _g = this.body.length;
		while(_g1 < _g) {
			var i = _g1++;
			var row = this.body[i];
			if(row[colIndex1] == value1 && row[colIndex2] == value2 && row[colIndex3] == value3) {
				rows.push(row);
				--limit;
				if(limit == 0) {
					break;
				}
			}
		}
		this._selectd = rows;
		return this;
	}
	,selectWhenG: function(limit,withEqu,value,colIndex) {
		if(colIndex == null) {
			colIndex = 0;
		}
		var rows = [];
		var _g1 = 0;
		var _g = this.body.length;
		while(_g1 < _g) {
			var i = _g1++;
			var row = this.body[i];
			var rowVal = row[colIndex];
			if(rowVal > value || withEqu && rowVal == value) {
				rows.push(row);
				--limit;
				if(limit == 0) {
					break;
				}
			}
		}
		this._selectd = rows;
		return this;
	}
	,selectWhenL: function(limit,withEqu,value,colIndex) {
		if(colIndex == null) {
			colIndex = 0;
		}
		var rows = [];
		var _g1 = 0;
		var _g = this.body.length;
		while(_g1 < _g) {
			var i = _g1++;
			var row = this.body[i];
			var rowVal = row[colIndex];
			if(rowVal < value || withEqu && rowVal == value) {
				rows.push(row);
				--limit;
				if(limit == 0) {
					break;
				}
			}
		}
		this._selectd = rows;
		return this;
	}
	,selectWhenGreaterAndLess: function(limit,GWithEqu,LWithEqu,GValue,LValue,colIndex) {
		if(colIndex == null) {
			colIndex = 0;
		}
		var rows = [];
		var _g1 = 0;
		var _g = this.body.length;
		while(_g1 < _g) {
			var i = _g1++;
			var row = this.body[i];
			var rowVal = row[colIndex];
			var v1 = rowVal > GValue || GWithEqu && rowVal == GValue;
			var v2 = rowVal < LValue || LWithEqu && rowVal == LValue;
			if(v1 && v2) {
				rows.push(row);
				--limit;
				if(limit == 0) {
					break;
				}
			}
		}
		this._selectd = rows;
		return this;
	}
	,selectWhenLessOrGreater: function(limit,LWithEqu,GWithEqu,LValue,GValue,colIndex) {
		if(colIndex == null) {
			colIndex = 0;
		}
		var rows = [];
		var _g1 = 0;
		var _g = this.body.length;
		while(_g1 < _g) {
			var i = _g1++;
			var row = this.body[i];
			var rowVal = row[colIndex];
			var v1 = rowVal < LValue || LWithEqu && rowVal == LValue;
			var v2 = rowVal > GValue || GWithEqu && rowVal == GValue;
			if(v1 || v2) {
				rows.push(row);
				--limit;
				if(limit == 0) {
					break;
				}
			}
		}
		this._selectd = rows;
		return this;
	}
};
var js__$Boot_HaxeError = function(val) {
	Error.call(this);
	this.val = val;
	this.message = String(val);
	if(Error.captureStackTrace) {
		Error.captureStackTrace(this,js__$Boot_HaxeError);
	}
};
js__$Boot_HaxeError.wrap = function(val) {
	if((val instanceof Error)) {
		return val;
	} else {
		return new js__$Boot_HaxeError(val);
	}
};
js__$Boot_HaxeError.__super__ = Error;
js__$Boot_HaxeError.prototype = $extend(Error.prototype,{
});
Example.standard_format_text = "id,id2,id3,name,brief\r\n1,20,100,John,He is a googd man\r\n2,20,100,张三,\"他是一个好人\r\n我们都喜欢他\"\r\n3,21,100,море,\"Он хороший человек\r\nмы все любим его\r\nЕго девиз:\r\n\"\"доверяй себе\"\"\"\r\n4,21,200,الشمس,صباح الخير\r\n5,22,200,चंद्रमा,सुसंध्या\r\n6,22,200,ดาว,";
Example.enhanced_format_text = "id:int,id2:int,id3:int,name:string,weight:number,marry:bool,education:json,tags:strings,brief\r\n1,21,100,John,120.1,true,\"[\"\"AB\"\"]\",\"good,cool\",\"Today is good day\r\nTomorrow is good day too\"\r\n2,21,100,张三,121.2,false,\"[\"\"CD\"\",\"\"EF\"\"]\",good,今天是个好日子\r\n3,22,100,море,123.4,true,\"[\"\"GH\"\",\"\"AB\"\",\"\"CD\"\"]\",good,\"Сегодня хороший день\r\nЗавтра тоже хороший день\"\r\n4,22,200,الشمس,124.5,false,\"{\"\"AA\"\":12}\",strong,صباح الخير\r\n5,23,200,चंद्रमा,126.7,1,\"{\"\"BB\"\":12}\",strong,सुसंध्या\r\n6,23,200,Emilia,,0,\"{\"\"CC\"\":34,\"\"DD\"\":56}\",\"strong,cool\",Hoje é um bom dia\r\n7,24,300,Ayşe,128.9,0,\"{\"\"EE\"\":34,\"\"FF\"\":56}\",\"strong,cool\",Bugün güzel bir gün\r\n8,24,300,陽菜乃,129.01,,\"{\"\"AC\"\":78,\"\"BD\"\":[90,12]}\",\"height,strong\",今日はいい日です\r\n9,25,300,Dwi,130.12,1,\"{\"\"EF\"\":78,\"\"CF\"\":[90,12]}\",,\"Hari ini adalah hari yang baik\r\nBesok juga hari yang baik\"\r\n10,25,400,Bảo,131.23,1,\"[\"\"BC\"\",{\"\"AT\"\":34}]\",\"thin,good\",\r\n11,26,400,민준,132.34,0,\"[\"\"FG\"\",{\"\"AG\"\":34}]\",\"hot,thin,good\",오늘은 좋은 날이다\r\n12,26,400,ดาว,133.456,0,,,";
acsv_Table.JSON_TYPES = ["json","strings"];
Example.main();
})(typeof exports != "undefined" ? exports : typeof window != "undefined" ? window : typeof self != "undefined" ? self : this);
