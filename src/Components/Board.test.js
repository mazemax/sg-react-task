import React from 'react';
import { shallow } from 'enzyme';
import Board from './Board';

describe('<Board />', () => {

	let wrapper;
	beforeEach(() => {
		wrapper = shallow(<Board values={[[0, 0], [0, 0]]} onAction={() => {}} />);
	});

	test('Should contain N rows (N = the length of values array)', () => {
		wrapper.setProps({ values: [[0, 0], [0, 0]]});
		expect(wrapper.find('Row')).toHaveLength(2);

		wrapper.setProps({ values: [[0, 0], [0, 0], [0, 0]] });
		expect(wrapper.find('Row')).toHaveLength(3);

		wrapper.setProps({ values: [[0, 0]] });
		expect(wrapper.find('Row')).toHaveLength(1);
	});

	test('Click on a row should trigger onAction with correct params', () => {
		const onAction = jest.fn();
		wrapper.setProps({ onAction });
		wrapper.find('Row').first().simulate('click', 1);
		expect(onAction).toHaveBeenCalledWith(0, 1);
	});

	test('Each row should get corresponding values', () => {
		const values = [
			[1, 3, 5],
			[2, 3, 5],
			[3, 3, 5],
		];
		wrapper.setProps({ values });
		expect(wrapper.find('Row').at(0).prop('values')).toEqual(values[0]);
		expect(wrapper.find('Row').at(1).prop('values')).toEqual(values[1]);
		expect(wrapper.find('Row').at(2).prop('values')).toEqual(values[2]);
	});

});