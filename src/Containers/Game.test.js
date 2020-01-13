import React from 'react';
import { shallow, mount } from 'enzyme';
import Game, { firstPlayer } from './Game';
import { sum2DArray, arrayEqual } from '../lib/util';

let prevMetrics = [];
jest.spyOn(React, 'useEffect').mockImplementation((f, metrics) => {
  if (!arrayEqual(prevMetrics, metrics)) { f(); }
  prevMetrics = metrics;
});

let wrapper;
beforeEach(() => {
  wrapper = shallow(<Game />);
});

test('Contains Board and Status Indicator', () => {
  expect(wrapper.find('Board')).toHaveLength(1);
  expect(wrapper.find('StatusIndicator')).toHaveLength(1);
});

test('The board is empty at start', () => {
  const matrix = wrapper.find('Board').prop('values');
  expect(sum2DArray(matrix)).toEqual(0);
});

test('Scenario: First marker is placed', () => {
  const testData = {
    xCoordinate: 1,
    yCoordinate: 0,
  }
  const playerOnTurn = wrapper.find('StatusIndicator').prop('player');
  wrapper.find('Board').simulate('action', testData.xCoordinate, testData.yCoordinate);
  const newBoard = wrapper.find('Board').prop('values');
  expect(newBoard[testData.xCoordinate][testData.yCoordinate]).toEqual(playerOnTurn);
});

test('Scenario: Player 1 wins the game', () => {
  wrapper.find('Board').simulate('action', 0, 0);
  wrapper.find('Board').simulate('action', 1, 0);
  wrapper.find('Board').simulate('action', 1, 1);
  wrapper.find('Board').simulate('action', 2, 0);
  wrapper.find('Board').simulate('action', 2, 2);

  expect(wrapper.find('Board').prop('values')).toEqual([ [ 1, 0, 0 ], [ 2, 1, 0 ], [ 2, 0, 1 ] ])
  expect(wrapper.find('StatusIndicator').prop('winner')).toEqual(1);
});

test('Scenario: Player 2 wins the game', () => {
  wrapper.find('Board').simulate('action', 0, 0);
  wrapper.find('Board').simulate('action', 2, 0);
  wrapper.find('Board').simulate('action', 1, 1);
  wrapper.find('Board').simulate('action', 2, 1);
  wrapper.find('Board').simulate('action', 0, 1);
  wrapper.find('Board').simulate('action', 2, 2);

  expect(wrapper.find('Board').prop('values')).toEqual([ [ 1, 1, 0 ], [ 0, 1, 0 ], [ 2, 2, 2 ] ])
  expect(wrapper.find('StatusIndicator').prop('winner')).toEqual(2);
});

test('Scenario: Stalemate', () => {
  wrapper.find('Board').simulate('action', 0, 0);
  wrapper.find('Board').simulate('action', 1, 0);
  wrapper.find('Board').simulate('action', 0, 1);
  wrapper.find('Board').simulate('action', 1, 1);
  wrapper.find('Board').simulate('action', 2, 2);
  wrapper.find('Board').simulate('action', 0, 2);
  wrapper.find('Board').simulate('action', 1, 2);
  wrapper.find('Board').simulate('action', 2, 1);
  wrapper.find('Board').simulate('action', 2, 0);

  expect(wrapper.find('Board').prop('values')).toEqual( [ [ 1, 1, 2 ], [ 2, 2, 1 ], [ 1, 2, 1 ] ]);
  expect(wrapper.find('StatusIndicator').prop('winner')).toBeFalsy();
  expect(wrapper.find('StatusIndicator').prop('player')).toBeFalsy();
});

test('Scenario: Clicking on already marked field doesn\'t count', () => {
  wrapper.find('Board').simulate('action', 0, 0);
  wrapper.find('Board').simulate('action', 0, 0);
  wrapper.find('Board').simulate('action', 0, 1);

  expect(wrapper.find('Board').prop('values')).toEqual( [ [ 1, 2, 0 ], [ 0, 0, 0 ], [ 0, 0, 0 ] ]);
});

test('Scenario: New Game', () => {
  wrapper.find('StatusIndicator').simulate('reset');

  expect(wrapper.find('Board').prop('values')).toEqual([ [ 0, 0, 0 ], [ 0, 0, 0 ], [ 0, 0, 0 ] ]);
  expect(wrapper.find('StatusIndicator').prop('winner')).toBeFalsy();
  expect(wrapper.find('StatusIndicator').prop('player')).toEqual(firstPlayer);
});