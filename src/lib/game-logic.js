import { tripleEqual } from './util';

export function fieldIsEmpty(board, xCoordinate, yCoordinate) {
	return !board[xCoordinate][yCoordinate];
}

export function findWinner(board) {
	for (let i=0; i<3; i++) {
		// columns
		if (board[0][i] && tripleEqual(board[0][i], board[1][i], board[2][i])) { return board[0][i]; }
		// rows
		if (board[i][0] && tripleEqual(board[i][0], board[i][1], board[i][2])) { return board[i][0]; }
	}
	// diagonals
	if (board[0][0] && tripleEqual(board[0][0], board[1][1], board[2][2])) { return board[0][0]; }
	if (board[0][2] && tripleEqual(board[0][2], board[1][1], board[2][0])) { return board[0][2]; }

	return false;
}

export function hasEmptyFields(board) {
	for (let row of board) {
		for (let item of row) {
			if (!item) { return true; }
		}
	}
	return false;
}	

export function getEmptyBoard() {
	return [
		[0, 0, 0],
		[0, 0, 0],
		[0, 0, 0],
	];
}
