import * as React from 'react';
import { mount } from 'enzyme';
import { ToggleState } from './Toggle.state';

const testView = () => {
  return <div />;
};

// States do not generate rendered output so unit tests test that state initializes and reacts
//  to inputs and events as expected.
describe('ToggleState', () => {
  it('initializes default state correctly', () => {
    const testToggleState = mount(<ToggleState renderView={testView} />);

    expect(testToggleState.state('label')).toBe('Default Text');
    expect(testToggleState.state('onText')).toBe('On');
    expect(testToggleState.state('offText')).toBe('Off');
    expect(testToggleState.state('checked')).toBe(true);
  });
});
