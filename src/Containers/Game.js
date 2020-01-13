import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { 
	isInteger,
	withinRange,
	copy2DArray,
} from '../lib/util';
import {
	fieldIsEmpty,
	findWinner,
	hasEmptyFields,
	getEmptyBoard,
} from '../lib/game-logic';
import Board from '../Components/Board';
import StatusIndicator from '../Components/StatusIndicator';
import './Game.css';

export const firstPlayer = 1;

const Game = () => {
	const [player, setPlayer] = useState(firstPlayer);
	const [winner, setWinner] = useState();
	const [board, setBoard] = useState(getEmptyBoard());

	function newGame() {
		setBoard(getEmptyBoard());
		setPlayer(firstPlayer);
		setWinner();
	}

	function nextTurn() {
		if (!player) { return; }
		const nextPlayer = player === 1 ? 2 : 1;
		setPlayer(nextPlayer);
	}

	function markField(player, xCoordinate, yCoordinate) {
		const newBoard = copy2DArray(board);
		newBoard[xCoordinate][yCoordinate] = player;
		setBoard(newBoard);
	}
	React.useEffect(() => {
		const winner = findWinner(board);
		if (winner) { 
			setWinner(winner);
			setPlayer();
			return;
		}
		if (!hasEmptyFields(board)) {
			console.log('no empty fields');
			setPlayer();
			return;
		}
	}, [board]);


	function handleAction(xCoordinate, yCoordinate) {
		if (!isInteger(xCoordinate) || !withinRange(xCoordinate, 0, 2)) { throw new Error(`${xCoordinate} - Not a valid coordinate!`); }
		if (!isInteger(yCoordinate) || !withinRange(yCoordinate, 0, 2)) { throw new Error(`${yCoordinate} - Not a valid coordinate!`); }

		if (!fieldIsEmpty(board, xCoordinate, yCoordinate)) { return; }

		nextTurn();
		markField(player, xCoordinate, yCoordinate);
	}

	return (
		<div className="Game">
			<Board values={board} readonly={!!winner || !player} onAction={handleAction} />
			<StatusIndicator winner={winner} player={player} onReset={newGame} />
		</div>
	);
};

Game.propTypes = {};

export default Game;