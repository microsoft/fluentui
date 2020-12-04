import * as React from 'react';
import * as ReactTestUtils from 'react-dom/test-utils';
import { mount } from 'enzyme';
import { useControllableValue } from './useControllableValue';
import { validateHookValueNotChanged } from './testUtilities';

describe('useControllableValue', () => {
  it('respects controlled value', () => {
    let resultValue: boolean | undefined;
    const TestComponent: React.FunctionComponent<{ value?: boolean; defaultValue?: boolean }> = ({
      value,
      defaultValue,
    }) => {
      [resultValue] = useControllableValue(value, defaultValue);
      return <div />;
    };

    const wrapper1 = mount(<TestComponent value={true} />);
    expect(resultValue!).toBe(true);

    wrapper1.setProps({ value: false });
    expect(resultValue!).toBe(false);

    const wrapper2 = mount(<TestComponent value={false} defaultValue={true} />);
    expect(resultValue!).toBe(false);

    wrapper2.setProps({ value: true });
    expect(resultValue!).toBe(true);
  });

  it('uses the default value if no controlled value is provided', () => {
    let resultValue: boolean | undefined;
    const TestComponent: React.FunctionComponent<{ value?: boolean; defaultValue?: boolean }> = ({
      value,
      defaultValue,
    }) => {
      [resultValue] = useControllableValue(value, defaultValue);
      return <div />;
    };

    mount(<TestComponent defaultValue={true} />);
    expect(resultValue!).toBe(true);
  });

  it('does not change value when the default value changes', () => {
    let resultValue: boolean | undefined;
    const TestComponent: React.FunctionComponent<{ value?: boolean; defaultValue?: boolean }> = ({
      value,
      defaultValue,
    }) => {
      [resultValue] = useControllableValue(value, defaultValue);
      return <div />;
    };

    const wrapper = mount(<TestComponent defaultValue={true} />);
    expect(resultValue!).toBe(true);

    wrapper.setProps({ defaultValue: false });
    expect(resultValue!).toBe(true);
  });

  it('does not call onChange if value passed to setValue is same as previous', () => {
    const onChangeMock = jest.fn();
    let setValue: ((value: boolean) => void) | undefined;
    const TestComponent: React.FunctionComponent<{
      defaultValue: boolean;
      onChange: Parameters<typeof useControllableValue>[2];
    }> = ({ defaultValue, onChange }) => {
      [, setValue] = useControllableValue(undefined, defaultValue, onChange);
      return <div />;
    };

    mount(<TestComponent defaultValue={true} onChange={onChangeMock} />);

    ReactTestUtils.act(() => setValue!(false));
    expect(onChangeMock).toHaveBeenCalledTimes(1);
    // set to same value => onChange not called
    ReactTestUtils.act(() => setValue!(false));
    expect(onChangeMock).toHaveBeenCalledTimes(1);
  });

  validateHookValueNotChanged('returns the same setter callback', () => {
    const [, setValue] = useControllableValue('hello', 'world');
    return [setValue];
  });

  validateHookValueNotChanged(
    'returns same setter callback even if param values change',
    () => {
      const [, setValue] = useControllableValue('a', 'b', () => undefined);
      return [setValue];
    },
    () => {
      const [, setValue] = useControllableValue('c', 'd', () => undefined);
      return [setValue];
    },
  );
});
