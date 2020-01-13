import React from 'react';
import PropTypes from 'prop-types';
import Row from './Row';
import './Board.css';

const Board = ({
	values,
	onAction,
	readonly,
}) => (
		<div className="Board">
			{values.map((row, xCoordinate) =>
				<Row key={xCoordinate} values={row} onClick={readonly ? () => {} : yCoordinate => onAction(xCoordinate, yCoordinate)} />
			)}
		</div>
);

Board.propTypes = {
	values: PropTypes.arrayOf(PropTypes.array).isRequired,
	onAction: PropTypes.func.isRequired,
	readonly: PropTypes.bool,
};

export default Board;