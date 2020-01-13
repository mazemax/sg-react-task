import React from 'react';
import PropTypes from 'prop-types';
import './StatusIndicator.css';

const StatusIndicator = ({
	winner,
	player,
	onReset,
}) => (
	<div className="GameStatus">
		{winner &&
			<div className="Win">
				<b>The winner is <span className={`Player${winner}`}>Player {winner}</span>!</b>
				<button className="Reset" onClick={onReset}>New game</button>
			</div>
		}
		{(!winner && player) &&
			<div className="Next">Player on turn: <b>Player {player}</b></div>
		}
		{(!winner && !player) &&
			<div className="StaleMate">
				Looks like nobody wins this time.
				<button className="Reset" onClick={onReset}>Try again</button>
			</div>
		}
	</div>
);

StatusIndicator.propTypes = {
	winner: PropTypes.number,
	player: PropTypes.number,
	onReset: PropTypes.func.isRequired,
};

export default StatusIndicator;