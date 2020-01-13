import React from 'react';
import PropTypes from 'prop-types';
import Field from './Field';
import './Row.css';

const Row = ({
	values,
	onClick,
}) => (
	<div className="Row">
		{values.map((value, yCoordinate) => 
			<Field 
				key={yCoordinate}
				value={value} 
				onClick={() => onClick(yCoordinate)}/>
		)}
	</div>
);

Row.propTypes = {
	values: PropTypes.arrayOf(PropTypes.number).isRequired,
	onClick: PropTypes.func.isRequired,
};

export default Row;