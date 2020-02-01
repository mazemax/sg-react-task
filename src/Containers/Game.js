import React, { useState } from 'react';
import Modal from 'react-modal';
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
	const [size, setSize] = useState(3);
	const [player, setPlayer] = useState(firstPlayer);
	const [winner, setWinner] = useState();
	const [gameStarted, setGameStarted] = useState(false);
	const [board, setBoard] = useState(getEmptyBoard());
	const [modalIsOpen, setModalIsOpen] = useState(true);
	const customStyles = {
		content : {
			top                   : '50%',
			left                  : '50%',
			right                 : 'auto',
			bottom                : 'auto',
			marginRight           : '-50%',
			transform             : 'translate(-50%, -50%)'
		}
	};

	function newGame() {
		setBoard(getEmptyBoard());
		setPlayer(firstPlayer);
		setWinner();
		setGameStarted(true);
	}

	function nextTurn() {
		if (!player) { return; }
		const nextPlayer = player === 1 ? 2 : 1;
		setPlayer(nextPlayer);
	}

	/**
	 * Mark a field on board with player number
	 * @param participant
	 * @param xCoordinate
	 * @param yCoordinate
	 */
	function markField(participant, xCoordinate, yCoordinate) {
		const newBoard = copy2DArray(board);
		newBoard[xCoordinate][yCoordinate] = participant;
		setBoard(newBoard);
	}

	React.useEffect(() => {
		const foundWinner = gameStarted && findWinner(board);
		if (foundWinner) {
			setWinner(foundWinner);
			setPlayer();
			return;
		}
		if (gameStarted && !hasEmptyFields(board)) {
			console.log('no empty fields');
			setPlayer();
		}
	}, [board, gameStarted]);

	/**
	 * When a player selects a field on board
	 * @param xCoordinate
	 * @param yCoordinate
	 */
	function handleAction(xCoordinate, yCoordinate) {
		if (!isInteger(xCoordinate) || !withinRange(xCoordinate, 0, 2)) { throw new Error(`${xCoordinate} - Not a valid coordinate!`); }
		if (!isInteger(yCoordinate) || !withinRange(yCoordinate, 0, 2)) { throw new Error(`${yCoordinate} - Not a valid coordinate!`); }

		if (!fieldIsEmpty(board, xCoordinate, yCoordinate)) { return; }

		nextTurn();
		markField(player, xCoordinate, yCoordinate);
	}

	const onSubmit = () => {
		setModalIsOpen(false);
		newGame();
	};

	return (
		<div className="Game">
			<Modal
				isOpen={modalIsOpen}
				style={customStyles}
				contentLabel='Board Size Modal'
				ariaHideApp={false}
				shouldCloseOnOverlayClick={false}
			>
				<div>Size: </div>
				<form>
					<input type={'number'} min={3} max={50} onChange={event => setSize(parseInt(event.target.value))} />
					<button type={'button'} onClick={onSubmit}>Start Game</button>
				</form>
			</Modal>

			{
				!modalIsOpen &&
				<Board
					values={board}
					readonly={!!winner || !player}
					onAction={handleAction}
				/>
			}
			<StatusIndicator winner={winner} player={player} onReset={newGame} />
		</div>
	);
};

Game.propTypes = {};

export default Game;
