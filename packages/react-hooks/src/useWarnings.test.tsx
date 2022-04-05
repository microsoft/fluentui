import * as React from 'react';
import { mount } from 'enzyme';
import { setWarningCallback } from '@fluentui/utilities';
import { useWarnings } from './useWarnings';
import type { IWarningOptions } from './useWarnings';

// These tests don't cover the core warning utilities (which have their own tests), just the
// integration with the hook and usage within function components.
describe('useWarnings', () => {
  const warn = jest.fn();
  const getLastWarning = (): string => warn.mock.calls.slice(-1)[0][0];

  let warningOptions: Omit<IWarningOptions<ITestComponentProps>, 'name' | 'props'> | undefined;

  interface ITestComponentProps {
    value?: string;
    defaultValue?: string;
    onChange?: () => void;
    readOnly?: boolean;
    deprecated?: number;
  }

  let renderCount = 0;
  const TestComponent: React.FunctionComponent<ITestComponentProps> = props => {
    useWarnings({ ...warningOptions!, name: 'TestComponent', props });
    renderCount++;
    return <div />;
  };

  function validateWarnOnFirstRender(props: ITestComponentProps, warningMessage: string) {
    const wrapper = mount(<TestComponent {...props} />);
    expect(warn).toHaveBeenCalledTimes(1);
    expect(warn).toHaveBeenLastCalledWith(warningMessage);

    // ensure all the props change in case there was a dep on any of them where there shouldn't be
    wrapper.setProps({
      value: 'new',
      defaultValue: 'updated',
      deprecated: (props.deprecated || 0) + 1,
      onChange: () => undefined,
      readOnly: !props.readOnly,
    });
    expect(renderCount).toBe(2);
    expect(warn).toHaveBeenCalledTimes(1);
  }

  beforeEach(() => {
    setWarningCallback(warn);
  });

  afterEach(() => {
    warn.mockReset();
    renderCount = 0;
    setWarningCallback(undefined);
    warningOptions = undefined;
  });

  it('only does generic warnings on first render', () => {
    warningOptions = { other: ['oh no'] };
    validateWarnOnFirstRender({}, 'oh no');
  });

  it('only warns for conditionally required props on first render', () => {
    warningOptions = {
      conditionallyRequired: [{ requiredProps: ['onChange'], conditionalPropName: 'value', condition: true }],
    };
    validateWarnOnFirstRender({ value: 'hi' }, "TestComponent property 'onChange' is required when 'value' is used.'");
  });

  it('only warns for deprecations on first render', () => {
    warningOptions = { deprecations: { deprecated: 'n/a' } };
    validateWarnOnFirstRender(
      { deprecated: 1 },
      "TestComponent property 'deprecated' was used but has been deprecated. Use 'n/a' instead.",
    );
  });

  it('only warns for mutually exclusive on first render', () => {
    warningOptions = { mutuallyExclusive: { value: 'defaultValue' } };
    validateWarnOnFirstRender(
      { value: 'foo', defaultValue: 'bar' },
      "TestComponent property 'value' is mutually exclusive with 'defaultValue'. Use one or the other.",
    );
  });

  it('warns for controlled usage whenever props update', () => {
    warningOptions = {
      controlledUsage: {
        valueProp: 'value',
        defaultValueProp: 'defaultValue',
        onChangeProp: 'onChange',
        readOnlyProp: 'readOnly',
      },
    };

    const wrapper = mount(<TestComponent value="foo" />);
    expect(warn).toHaveBeenCalledTimes(1);
    expect(getLastWarning()).toMatch(
      "Warning: You provided a 'value' prop to a TestComponent without an 'onChange' handler.",
    );

    // doesn't call again if prop values don't change
    wrapper.setProps({});
    expect(warn).toHaveBeenCalledTimes(1);

    // doesn't call again if the message would be the same
    wrapper.setProps({ value: 'bar' });
    expect(warn).toHaveBeenCalledTimes(1);

    // calls again for a new message
    wrapper.setProps({ value: undefined, defaultValue: 'foo' });
    expect(warn).toHaveBeenCalledTimes(2);
    expect(getLastWarning()).toMatch('Warning: A component is changing a controlled TestComponent');
  });
});
