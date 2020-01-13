import React from 'react';
import { shallow } from 'enzyme';
import StatusIndicator from './StatusIndicator';

describe('<StatusIndicator />', () => {

	let wrapper;
	beforeEach(() => {
		wrapper = shallow(<StatusIndicator onReset={() => {}} />);
	});

	test('Render winning notification when appropriate', () => {
		wrapper.setProps({ winner: 1 });
		expect(wrapper.find('.Win')).toHaveLength(1);

		wrapper.setProps({ winner: null });
		expect(wrapper.find('.Win')).toHaveLength(0);
	});

	test('Render stalemate notification when appropriate', () => {
		wrapper.setProps({ winner: null, player: null });
		expect(wrapper.find('.StaleMate')).toHaveLength(1);

		wrapper.setProps({ winner: 1 });
		expect(wrapper.find('.StaleMate')).toHaveLength(0);
		wrapper.setProps({ winner: null, player: 1 });
		expect(wrapper.find('.StaleMate')).toHaveLength(0);
	});

	test('Render next player info when appropriate', () => {
		wrapper.setProps({ winner: null, player: 1 });
		expect(wrapper.find('.Next')).toHaveLength(1);
		expect(wrapper.find('.Next').text()).toContain('Player 1');

		wrapper.setProps({ winner: null, player: 2 });
		expect(wrapper.find('.Next')).toHaveLength(1);
		expect(wrapper.find('.Next').text()).toContain('Player 2');

		wrapper.setProps({ winner: null, player: null });
		expect(wrapper.find('.Next')).toHaveLength(0);
	});

});