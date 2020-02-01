import { tripleEqual, withinRange } from './util';

/**
 * Check if specific board field is empty
 * @param board
 * @param xCoordinate
 * @param yCoordinate
 * @returns {boolean}
 */
export function fieldIsEmpty(board, xCoordinate, yCoordinate) {
	return !board[xCoordinate][yCoordinate];
}

/**
 * Find if any player has won the game
 * @param board
 * @param size
 * @returns {boolean|*}
 */
export function findWinner(board, size) {
	for (let col=0; col < size; col++) {
		for (let row=0; row < size - 2; row++) {
			// columns
			if (((withinRange(row+2, 0, size) && tripleEqual(board[row][col], board[row+1][col], board[row+2][col])) ||
				(withinRange(row-2, 0, size) && tripleEqual(board[row][col], board[row-1][col], board[row-2][col]))) &&
				board[row][col]) {
				return board[row][col];
			}

			// rows
			if (((withinRange(row+2, 0, size) && tripleEqual(board[col][row], board[col][row+1], board[col][row+2])) ||
				(withinRange(row-2, 0, size) && tripleEqual(board[col][row], board[col][row-1], board[col][row-2]))) &&
				board[col][row]) {
				return board[col][row];
			}

			// diagonals
			if ((withinRange(col+2, 0, size) && withinRange(row+2, 0, size) && board[row][col] &&
				tripleEqual(board[row][col], board[row+1][col+1], board[row+2][col+2])) ||
				(withinRange(col-2, 0, size) && withinRange(row-2, 0, size) && board[col][row] &&
					tripleEqual(board[row][col], board[row-1][col-1], board[row-2][col-2]))) {
				return board[row][col];
			}

			if (withinRange(row+2, 0, size) && withinRange(col+2, 0, size) && board[row][col+2] &&
				tripleEqual(board[row][col+2], board[row+1][col+1], board[row+2][col])) {
				return board[row][col+2];
			}
			if (withinRange(row-2, 0, size) && withinRange(col-2, 0, size) && board[row][col-2] &&
				tripleEqual(board[row][col-2], board[row-1][col-1], board[row-2][col])) {
				return board[row][col-2];
			}
		}
	}

	return false;
}

/**
 * Checks if the board has any empty fields
 * @param board
 * @returns {boolean}
 */
export function hasEmptyFields(board) {
	for (let row of board) {
		for (let item of row) {
			if (!item) { return true; }
		}
	}
	return false;
}

/**
 * Defines empty board with 2d array
 * @returns {number[][]}
 */
export function getEmptyBoard(size) {
	let board = [];
	for(let i=0; i < size; i++) {
		board.push(
			Array(size).fill(0)
		);
	}

	return board;
}
