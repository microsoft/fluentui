import * as React from 'react';
import { mount } from 'enzyme';
import { MicrofeedbackState } from './Microfeedback.state';

const testView = () => {
  return <div />;
};

// States do not generate rendered output so unit tests test that state initializes and reacts
// to inputs and events as expected.
describe('MicrofeedbackState', () => {
  it('initializes default state correctly', () => {
    const testMicrofeedbackState = mount(<MicrofeedbackState renderView={testView} />);

    expect(testMicrofeedbackState.state('text')).toBe('Default Text');
    expect(testMicrofeedbackState.state('status')).toBe('State Text');
  });

  it('uses props to initialize state correctly', () => {
    const defaultText = 'Prop Default Text';
    const testMicrofeedbackState = mount(<MicrofeedbackState defaultText={defaultText} renderView={testView} />);

    expect(testMicrofeedbackState.state('text')).toBe(defaultText);
  });
});
