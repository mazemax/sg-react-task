import React from 'react';
import { shallow } from 'enzyme';
import App from './App';

let wrapper;
beforeEach(() => {
  wrapper = shallow(<App />);
});

test('Contains the game', () => {
  expect(wrapper.find('Game')).toHaveLength(1);
});
