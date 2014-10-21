function negop(val){
	return -val;
}

function genRandFloatNumber(limits) {
	return randFloat(limits[0], limits[1]);
}

function genRandIntNumber(limits) {
	return randInt(limits[0], limits[1]);
}

var sin = Math.sin;
var cos = Math.cos;
var sqrt = Math.sqrt;
var exp = Math.exp;
var abs = Math.abs;
var log = Math.log;
var tan = Math.tan;
var pow = Math.pow;
var neg = negop;

var rules = {
		//duplicate values to increase the probability
		"$i" : ["$i", "$i$o$i", "$i$o$i", "$i$o$i", "$i$o$i", "$f1$i$e", "$f2$i,$i$e"],
		"$f1" : ["$f1", "$i$o$f1"],
		"$f2" : ["$f2", "$i$o$f2"],
		"$e" : ["$e", "$e$o$i"],
	};

var replaceT = {
		"$i" : ["$n", "$r", "$x"],
		"$n" : [genRandIntNumber, 0, 100],
		"$r" : [genRandFloatNumber, 0, 10],
		"$x" : ["t"],
		"$o" : ["+", "-", "*", "/"],
		"$f1" : ["neg(", "(", "sin(", "cos(", "sqrt(", "exp(", "abs(", "log(", "tan("],
		"$f2" : ["pow("],
		"$e" : [")"]
	};

var replace = {
		"$i" : ["$n", "$r", "$x"],
		"$n" : [genRandIntNumber, 0, 100],
		"$r" : [genRandFloatNumber, 0, 10],
		"$x" : ["x", "y"],
		"$o" : ["+", "-", "*", "/"],
		"$f1" : ["neg(", "(", "sin(", "cos(", "sqrt(", "exp(", "abs(", "log(", "tan("],
		"$f2" : ["pow("],
		"$e" : [")"]
	};

function genRandEq(length) {
	return newGen(length, rules, replace);
}

function genRandEqT(length) {
	return newGen(length, rules, replaceT);
}

function newGen(length, rules, replace) {
	var expr = "$i";
	
	var keys = [];
	for (var key in rules) {
	  if (rules.hasOwnProperty(key)) {
	    keys.push(key);
	  }
	}
	
	//generate $ expression
	while (expr.length < length) {
		var nextRule = keys[randInt(0, keys.length - 1)];
		var replRule = rules[nextRule][randInt(0, rules[nextRule].length - 1)];
		expr = expr.replace(nextRule, replRule);
	}
	
	keys = [];
	for (var key in replace) {
	  if (replace.hasOwnProperty(key)) {
	    keys.push(key);
	  }
	}
	
	//replace all $ with the respective values
	while (expr.indexOf("$", 0) > -1) {
		
		for (var i = 0; i < keys.length; i++) {
			var nextReplace = replace[keys[i]];
			var replaceWith = "";

			if (isFunction(nextReplace[0])) {
				replaceWith += "" + (nextReplace[0](nextReplace.slice(1)));
			} else {
				replaceWith = nextReplace[randInt(0, nextReplace.length - 1)];
			}
			
			expr = expr.replace(keys[i], replaceWith);
		}
	}
	return expr;
}
