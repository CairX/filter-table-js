/* exported ClassName */

var ClassName = (function() {
	var has = function(element, className) {
		var classes = element.className.trim().split(" ");
		return classes.indexOf(className) != -1;
	};

	var append = function(element, className) {
		element.className = element.className.trim() + " " + className.trim();
	};

	var unique = function(element, className) {
		if (!has(element, className)) {
			append(element, className);
		}
	};

	var remove = function(element, className) {
		var classes = element.className.trim().split(" ");
		classes.splice(classes.indexOf(className), 1);
		element.className = classes.join(" ");
	};

	return {
		"has": has,
		"append": append,
		"unique": unique,
		"remove": remove
	};
})();
