window.onload = function() {
	var tables = getAllTables();
	makeAllTablesFilterable(tables);
}

function getAllTables() {
	return document.getElementsByTagName("table");
}

function makeAllTablesFilterable(tables) {
	for (var l = 0; l < tables.length; l++) {
		var input = document.createElement("input");
		input.placeholder= "Enter a Filter Key:"
		tables[l].parentNode.insertBefore(input, tables[l]);
		input.addEventListener("input", Filter);
	}
}

function Filter() {
	var s = this.value;
	var table = this.nextSibling;
	var swap = table;
	this.placeholder = "";
	remoteHightlight(table);
	if (s.length != 0) {
		for (var l = 1; l < table.rows.length; l++) {
			if (table.rows[l].innerHTML.match(s)) {
				table.rows[l].style.display = '';
				for(var c = 0; c <table.rows[l].cells.length; c++) {
					var reg = new RegExp(s, 'g');
					table.rows[l].cells[c].innerHTML = table.rows[l].cells[c].innerHTML.replace(reg, '<span style=\"background-color: red;\">'+s+'</span>');
				}
			} else {
				table.rows[l].style.display = "none";
			}
		};
	} else {
		for (var l = 1; l < table.rows.length; l++)
			table.rows[l].style.display= '';
	}
}
function remoteHightlight(table) {
	for (var l = 1; l < table.rows.length; l++) {
		table.rows[l].style.display= '';
		for (var c = 0; c < table.rows[l].cells.length; c++) {
			var temp = table.rows[l].cells[c].innerHTML.replace(/<\/?span[^>]*>/gi, "");
			table.rows[l].cells[c].innerHTML = temp;
		}
	};
}
