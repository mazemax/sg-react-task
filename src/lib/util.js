export function isInteger(value) {
	return Number.isInteger(value);
}

export function withinRange(value, start, end) {
	if (arguments.length < 3) { throw new Error('Function expects 3 parameters - value, start, end'); }
	if (start > end) { throw new Error(`Invalid range ${start}:${end}`)}
	return value >= start && value <= end;
}

export function copy2DArray(array = []) {
	return Array.from(array, x => Array.from(x));
}

export function sum2DArray(array = []) {
	return array.reduce((a, b) => a + b.reduce((x, y) => x + y), 0)
}

export function arrayEqual(array1, array2) {
	if (arguments.length < 2) { throw new Error('Function expects 2 parameters - array1, array2'); }
	return JSON.stringify(array1) === JSON.stringify(array2);
}

export function tripleEqual(a, b, c) {
	if (arguments.length < 3) { throw new Error('Function expects 3 parameters'); }
	return a === b && b === c;
}