import React from 'react';
import { shallow } from 'enzyme';
import Field from './Field';

describe('<Field />', () => {

	let wrapper;
	beforeEach(() => {
		wrapper = shallow(<Field value={0} onClick={() => {}} />);
	});

	test('No mark', () => {
		wrapper.setProps({ value: 0 });
		expect(wrapper.text()).toEqual('');
	});

	test('Field is marked: Player 1', () => {
		wrapper.setProps({ value: 1 });
		expect(wrapper.text()).toEqual('x');
	});

	test('Field is marked: Player 2', () => {
		wrapper.setProps({ value: 2 });
		expect(wrapper.text()).toEqual('o');
	});

	test('Field has class: Player1 (only when appropriate)', () => {
		wrapper.setProps({ value: 1 });
		expect(wrapper.find('.Player1')).toHaveLength(1);

		wrapper.setProps({ value: 0 });
		expect(wrapper.find('.Player1')).toHaveLength(0);
		wrapper.setProps({ value: 2 });
		expect(wrapper.find('.Player1')).toHaveLength(0);
	});

	test('Field has class: Player2 (only when appropriate)', () => {
		wrapper.setProps({ value: 2 });
		expect(wrapper.find('.Player2')).toHaveLength(1);

		wrapper.setProps({ value: 0 });
		expect(wrapper.find('.Player2')).toHaveLength(0);
		wrapper.setProps({ value: 1 });
		expect(wrapper.find('.Player2')).toHaveLength(0);
	});

});