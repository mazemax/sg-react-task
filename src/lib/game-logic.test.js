import { 
	fieldIsEmpty,
	findWinner,
	hasEmptyFields,
	getEmptyBoard,
} from './game-logic';

describe('Util Functions', () => {

	test('fieldIsEmpty', () => {
		const board = [[0, 0], [0, 1]];

		expect(fieldIsEmpty(board, 0, 0)).toEqual(true);
		expect(fieldIsEmpty(board, 0, 1)).toEqual(true);
		expect(fieldIsEmpty(board, 1, 0)).toEqual(true);
		expect(fieldIsEmpty(board, 1, 1)).toEqual(false);
	});

	test('findWinner - different winners', () => {
		const winnerIs1 = [[1, 1, 1], [0, 2, 2], [0, 2, 0]];
		expect(findWinner(winnerIs1)).toEqual(1);

		const winnerIs2 = [[2, 1, 1], [2, 1, 1], [2, 2, 0]];
		expect(findWinner(winnerIs2)).toEqual(2);

		const noWinner = [[1, 2, 1], [2, 1, 2], [2, 1, 2]];
		expect(findWinner(noWinner)).toBeFalsy();
	});

	test('findWinner - all directions', () => {
		const row = [[0, 0, 0], [0, 0, 0], [1, 1, 1]];
		expect(findWinner(row)).toEqual(1);

		const column = [[0, 0, 1], [0, 0, 1], [0, 0, 1]];
		expect(findWinner(column)).toEqual(1);

		const diagonal = [[0, 0, 1], [0, 1, 0], [1, 0, 0]];
		expect(findWinner(diagonal)).toEqual(1);
	});

	test('hasEmptyFields', () => {
		expect(hasEmptyFields([[0, 0], [0, 0]])).toEqual(true);
		expect(hasEmptyFields([[1, 1], [1, 0]])).toEqual(true);
		expect(hasEmptyFields([[0, 1], [1, 1]])).toEqual(true);

		expect(hasEmptyFields([[1, 1], [1, 1]])).toEqual(false);
		expect(hasEmptyFields([[1, 2], [1, 2]])).toEqual(false);
	});

	test('getEmptyBoard', () => {
		expect(getEmptyBoard()).toEqual([[0, 0, 0], [0, 0, 0], [0, 0, 0]]);
	});
});