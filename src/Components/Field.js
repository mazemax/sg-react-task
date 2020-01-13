import React from 'react';
import PropTypes from 'prop-types';
import './Field.css';

const Field = ({
	value,
	onClick,
}) => (
	<div className="Field" onClick={onClick}>
		{value === 0 && ''}
		{value === 1 && <span className="Player1">x</span>}
		{value === 2 && <span className="Player2">o</span>}
	</div>
);

Field.propTypes = {
	value: PropTypes.number.isRequired,
	onClick: PropTypes.func.isRequired,
};

export default Field;