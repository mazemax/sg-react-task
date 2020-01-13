import React from 'react';
import { shallow } from 'enzyme';
import Row from './Row';

describe('<Row />', () => {

	let wrapper;
	beforeEach(() => {
		wrapper = shallow(<Row values={[0, 0, 0]} onClick={() => {}} />);
	});

	test('Should contain N field (N = the length of values array)', () => {
		wrapper.setProps({ values: [0, 0] });
		expect(wrapper.find('Field')).toHaveLength(2);

		wrapper.setProps({ values: [0, 0, 2] });
		expect(wrapper.find('Field')).toHaveLength(3);

		wrapper.setProps({ values: [5] });
		expect(wrapper.find('Field')).toHaveLength(1);
	});

	test('Click on a field should trigger onClick with correct params', () => {
		const onClick = jest.fn();
		wrapper.setProps({ onClick });
		wrapper.find('Field').first().simulate('click');
		expect(onClick).toHaveBeenCalledWith(0);
	});

	test('Each field should get corresponding values', () => {
		const values = [2, 0, 2];
		wrapper.setProps({ values });
		expect(wrapper.find('Field').at(0).prop('value')).toEqual(values[0]);
		expect(wrapper.find('Field').at(1).prop('value')).toEqual(values[1]);
		expect(wrapper.find('Field').at(2).prop('value')).toEqual(values[2]);
	});

});