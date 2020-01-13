import { 
	isInteger,
	withinRange,
	copy2DArray,
	sum2DArray,
	tripleEqual,
	arrayEqual,
} from './util';

describe('Util Functions', () => {

	test('isInteger', () => {
		expect(isInteger(123)).toEqual(true);
		expect(isInteger(0)).toEqual(true);
		expect(isInteger(-5)).toEqual(true);

		expect(isInteger('a')).toEqual(false);
		expect(isInteger('123')).toEqual(false);
		expect(isInteger(NaN)).toEqual(false);
	});

	test('withinRange', () => {
		expect(withinRange(10, 5, 15)).toEqual(true);
		expect(withinRange(10, 5, 10)).toEqual(true);
		expect(withinRange(10, 10, 10)).toEqual(true);

		expect(withinRange(5, 10, 15)).toEqual(false);
		expect(withinRange(-5, 0, 6)).toEqual(false);

		expect(() => withinRange(5, 5, 0)).toThrowError(); // wrong range
		expect(() => withinRange(1, 1)).toThrowError(); // wrong number of parameters
	});

	test('copy2DArray', () => {
		const array = [[1, 2], [3, 4]];
		const copy = copy2DArray(array);

		expect(copy).toEqual(array);
		expect(copy === array).toEqual(false);
	});

	test('sum2DArray', () => {
		expect(sum2DArray([[1, 2], [3, 4]])).toEqual(10);
		expect(sum2DArray([[0], [0]])).toEqual(0);
	});

	test('tripleEqual', () => {
		expect(tripleEqual(1, 1, 1)).toEqual(true);

		expect(tripleEqual(1, 1, 0)).toEqual(false);
		expect(tripleEqual(1, 0, 1)).toEqual(false);
		expect(tripleEqual(0, 1, 1)).toEqual(false);

		expect(() => withinRange(1, 1)).toThrowError(); // wrong number of parameters
	});

	test('arrayEqual', () => {
		expect(arrayEqual([[1,2],[2,3]],[[1,2],[2,3]])).toEqual(true);
		expect(arrayEqual([[],[2,3]],[[],[2,3]])).toEqual(true);

		expect(arrayEqual([[1,2],[2,3]],[[1,2],[2]])).toEqual(false);
		expect(arrayEqual([[2],[2,3]],[[1,2],[2,3]])).toEqual(false);
	});

});