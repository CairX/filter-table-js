"use strict";

function appendClassName(element, className) {
	element.className = element.className.trim() + " " + className.trim();
}

function uniqueClassName(element, className) {
	if (!hasClassName(element, className)) {
		appendClassName(element, className);
	}
}

function removeClassName(element, className) {
	var classes = element.className.trim().split(" ");
	classes.splice(classes.indexOf(className), 1);
	element.className = classes.join(" ");
}

function hasClassName(element, className) {
	var classes = element.className.trim().split(" ");
	return contains(classes, className);
}

function filterUnique(element, index, array) {
	return array.indexOf(element) == index;
}

function getValues(select) {
	var options = select.options;
	var selected = [];
	for(var i = 0; i < options.length; i++) {
		if (options[i].selected) {
			selected.push(options[i].value);
		}
	}
	return selected;
}

function isEmpty(array) {
	return (array.length == 0);
}

function isNone(array) {
	return (array.length == 1 && array[0].trim().toLowerCase() == "none");
}

function contains(array, value) {
	return (array.indexOf(value) != -1);
}

function disableOthers(select, index) {
	var cells = board.querySelectorAll("tbody td:nth-child(#)".replace("#", (index + 1)));
	console.log(cells);
	var values = getValues(select);
	console.log(values);
	cells.forEach(function(element) {
		console.log("Compare: " + element.innerText + " and " + values.indexOf(element.innerText));
		if (contains(values, element.innerText)) {
			removeClassName(element.parentNode, "hide");
		} else {
			uniqueClassName(element.parentNode, "hide");
		}
	});
}

function updateBoard() {
	var rows = board.querySelectorAll("tbody tr");

	var selectValues = [];
	selects.forEach(function(select, index) {
		var values = getValues(select);
		selectValues[index] = values;
	});

	rows.forEach(function(row) {
		var show = selectValues.every(function(values, index) {
			if (isEmpty(values)) {
				return true;
			}

			var element = row.children[index];
			if (contains(values, element.innerText)) {
				return true;
			}

			return false;
		});

		if (show) {
			removeClassName(row, "hide");
		} else {
			uniqueClassName(row, "hide");
		}
	});
	
}

var board = document.querySelector(".board");
var filters = document.querySelector(".filters");
var selects = [];

var headers = board.querySelectorAll("thead th");
headers.forEach(function(element, index) {
	var header = document.createElement("div");
	header.innerHTML = element.innerText;

	var select = document.createElement("select");
	select.setAttribute("onchange", "updateBoard();");
	select.setAttribute("multiple", "multiple");

	var cells = board.querySelectorAll("tbody td:nth-child(#)".replace("#", (index + 1)));
	var values = [];
	cells.forEach(function(element) {
		values.push(element.innerText);
	});
	values.sort();
	values = values.filter(filterUnique);
	values.forEach(function(element) {
		var option = document.createElement("option");
		option.innerHTML = element;
		select.appendChild(option);
	});

	filters.appendChild(header);
	filters.appendChild(select);

	selects.push(select);
});
