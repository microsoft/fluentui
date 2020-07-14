import * as React from 'react';
import { act } from 'react-dom/test-utils';
import { mount } from 'enzyme';
import { useBoolean, IUseBooleanCallbacks } from './useBoolean';

describe('useBoolean', () => {
  it('respects initial value', () => {
    let value: boolean;
    const TestComponent: React.FunctionComponent<{ initialValue: boolean }> = ({ initialValue }) => {
      [value] = useBoolean(initialValue);
      return <div />;
    };

    mount(<TestComponent initialValue={true} />);
    expect(value!).toBe(true);

    mount(<TestComponent initialValue={false} />);
    expect(value!).toBe(false);
  });

  it('returns the same callbacks', () => {
    let callbacks: IUseBooleanCallbacks;

    const TestComponent: React.FunctionComponent = () => {
      [, callbacks] = useBoolean(true);
      return <div />;
    };

    const wrapper = mount(<TestComponent />);
    const result1 = callbacks!;

    // Re-render the component
    wrapper.update();
    // Callbacks should be the same
    expect(callbacks!.setTrue).toBe(result1.setTrue);
    expect(callbacks!.setFalse).toBe(result1.setFalse);
    expect(callbacks!.toggle).toBe(result1.toggle);
  });

  it('updates the value', () => {
    let value: boolean;
    let callbacks: IUseBooleanCallbacks;

    const TestComponent: React.FunctionComponent = () => {
      [value, callbacks] = useBoolean(true);
      return <div>{value}</div>;
    };

    mount(<TestComponent />);
    expect(value!).toBe(true);

    act(() => callbacks.setFalse());
    expect(value!).toBe(false);

    act(() => callbacks.setFalse());
    expect(value!).toBe(false);

    act(() => callbacks.setTrue());
    expect(value!).toBe(true);
  });

  it('handles toggling', () => {
    let value: boolean;
    let callbacks: IUseBooleanCallbacks;

    const TestComponent: React.FunctionComponent = () => {
      [value, callbacks] = useBoolean(true);
      return <div />;
    };

    mount(<TestComponent />);

    // Toggle the value
    act(() => callbacks.toggle());
    // correct new value
    expect(value!).toBe(false);

    // Toggle again
    act(() => callbacks.toggle());
    expect(value!).toBe(true);
  });
});
