import { setWarningCallback } from './warn';
import { warnControlledUsage, resetControlledWarnings } from './warnControlledUsage';
import type { IWarnControlledUsageParams } from './warnControlledUsage';

const warningCallback = jest.fn();

const noOp = () => undefined;

interface IProps {
  value?: string;
  defaultValue?: string;
  onChange?: Function;
  readOnly?: boolean;
}

const params: Omit<IWarnControlledUsageParams<IProps>, 'props'> = {
  componentId: 'TestComponent1',
  componentName: 'TestComponent',
  valueProp: 'value',
  defaultValueProp: 'defaultValue',
  onChangeProp: 'onChange',
  readOnlyProp: 'readOnly',
};

describe('warnControlledUsage', () => {
  beforeEach(() => {
    setWarningCallback(warningCallback);
  });

  afterEach(() => {
    warningCallback.mockReset();
    setWarningCallback(undefined);
    resetControlledWarnings();
  });

  it('does not warn or throw if old props are undefined', () => {
    warnControlledUsage<IProps>({ ...params, props: {} });
    expect(warningCallback).toHaveBeenCalledTimes(0);

    // If oldProps was defined, this would be an error for switching from uncontrolled to controlled
    warnControlledUsage<IProps>({ ...params, props: { value: 'test', onChange: noOp } });
    expect(warningCallback).toHaveBeenCalledTimes(0);
  });

  it('does not warn if uncontrolled regardless of if onChange/readOnly is provided', () => {
    warnControlledUsage<IProps>({ ...params, props: { defaultValue: 'test' } });
    expect(warningCallback).toHaveBeenCalledTimes(0);

    warnControlledUsage<IProps>({ ...params, props: {} });
    expect(warningCallback).toHaveBeenCalledTimes(0);

    warnControlledUsage<IProps>({ ...params, props: { defaultValue: 'test', onChange: noOp } });
    expect(warningCallback).toHaveBeenCalledTimes(0);

    warnControlledUsage<IProps>({ ...params, props: { onChange: noOp } });
    expect(warningCallback).toHaveBeenCalledTimes(0);

    warnControlledUsage<IProps>({ ...params, props: { defaultValue: 'test', readOnly: true } });
    expect(warningCallback).toHaveBeenCalledTimes(0);

    warnControlledUsage<IProps>({ ...params, props: { readOnly: true } });
    expect(warningCallback).toHaveBeenCalledTimes(0);
  });

  it('does not warn if controlled and onChange is provided', () => {
    warnControlledUsage<IProps>({ ...params, props: { value: 'test', onChange: noOp } });
    expect(warningCallback).toHaveBeenCalledTimes(0);
  });

  it('does not warn if controlled and readOnly is true', () => {
    warnControlledUsage<IProps>({ ...params, props: { value: 'test', readOnly: true } });
    expect(warningCallback).toHaveBeenCalledTimes(0);
  });

  it('warns if controlled and onChange/readOnly is not provided', () => {
    warnControlledUsage<IProps>({ ...params, props: { value: 'test' } });
    expect(warningCallback).toHaveBeenCalledTimes(1);
    expect(warningCallback).toHaveBeenLastCalledWith(
      `Warning: You provided a 'value' prop to a TestComponent without an 'onChange' handler. This will render a ` +
        `read-only field. If the field should be mutable use 'defaultValue'. Otherwise, set 'onChange' or 'readOnly'.`,
    );

    // Don't re-warn
    warnControlledUsage<IProps>({ ...params, props: { value: 'test' } });
    expect(warningCallback).toHaveBeenCalledTimes(1);
  });

  it('warns if controlled and onChange is not provided (right message for component without readOnly)', () => {
    const { readOnlyProp, ...otherParams } = params;
    warnControlledUsage<IProps>({ ...otherParams, props: { value: 'test' } });
    expect(warningCallback).toHaveBeenCalledTimes(1);
    expect(warningCallback).toHaveBeenLastCalledWith(
      `Warning: You provided a 'value' prop to a TestComponent without an 'onChange' handler. This will render a ` +
        `read-only field. If the field should be mutable use 'defaultValue'. Otherwise, set 'onChange'.`,
    );

    // Don't re-warn
    warnControlledUsage<IProps>({ ...otherParams, props: { value: 'test' } });
    expect(warningCallback).toHaveBeenCalledTimes(1);
  });

  it('re-warns when componentId changes for controlled without onChange', () => {
    warnControlledUsage<IProps>({ ...params, props: { value: 'test' } });
    expect(warningCallback).toHaveBeenCalledTimes(1);

    warnControlledUsage<IProps>({ ...params, componentId: 'TestComponent2', props: { value: 'test' } });
    expect(warningCallback).toHaveBeenCalledTimes(2);
  });

  it('warns if controlled and readOnly is false', () => {
    warnControlledUsage<IProps>({ ...params, props: { value: 'test', readOnly: false } });
    expect(warningCallback).toHaveBeenCalledTimes(1);
    expect(warningCallback).toHaveBeenLastCalledWith(
      `Warning: You provided a 'value' prop to a TestComponent without an 'onChange' handler. This will render a ` +
        `read-only field. If the field should be mutable use 'defaultValue'. Otherwise, set 'onChange' or 'readOnly'.`,
    );

    // Don't re-warn
    warnControlledUsage<IProps>({ ...params, props: { value: 'test', readOnly: false } });
    expect(warningCallback).toHaveBeenCalledTimes(1);
  });

  it('warns if both value and defaultValue are provided', () => {
    warnControlledUsage<IProps>({ ...params, props: { value: 'hello', defaultValue: 'world', onChange: noOp } });
    expect(warningCallback).toHaveBeenCalledTimes(1);
    expect(warningCallback).toHaveBeenLastCalledWith(
      `Warning: You provided both 'value' and 'defaultValue' to a TestComponent. Form fields must be either ` +
        `controlled or uncontrolled (specify either the 'value' prop, or the 'defaultValue' prop, but not both). ` +
        `Decide between using a controlled or uncontrolled TestComponent and remove one of these props. ` +
        `More info: https://fb.me/react-controlled-components`,
    );

    // Don't re-warn
    warnControlledUsage<IProps>({ ...params, props: { value: 'hello', defaultValue: 'world', onChange: noOp } });
    expect(warningCallback).toHaveBeenCalledTimes(1);
  });

  it('re-warns when componentId changes if both value and defaultValue are provided', () => {
    warnControlledUsage<IProps>({ ...params, props: { value: 'hello', defaultValue: 'world', onChange: noOp } });
    expect(warningCallback).toHaveBeenCalledTimes(1);

    warnControlledUsage<IProps>({
      ...params,
      componentId: 'TestComponent2',
      props: { value: 'hello', defaultValue: 'world', onChange: noOp },
    });
    expect(warningCallback).toHaveBeenCalledTimes(2);
  });

  it('does not warn if old and new are uncontrolled', () => {
    warnControlledUsage<IProps>({ ...params, oldProps: { defaultValue: 'test' }, props: { defaultValue: 'test' } });
    expect(warningCallback).toHaveBeenCalledTimes(0);

    warnControlledUsage<IProps>({ ...params, props: {}, oldProps: {} });
    expect(warningCallback).toHaveBeenCalledTimes(0);
  });

  it('does not warn if old and new are controlled', () => {
    warnControlledUsage<IProps>({
      ...params,
      oldProps: { value: 'world', onChange: noOp },
      props: { value: 'test', onChange: noOp },
    });
    expect(warningCallback).toHaveBeenCalledTimes(0);
  });

  it('warns if old is implicitly uncontrolled and new is controlled', () => {
    warnControlledUsage<IProps>({ ...params, oldProps: {}, props: { value: 'test', onChange: noOp } });
    expect(warningCallback).toHaveBeenCalledTimes(1);
    expect(warningCallback).toHaveBeenLastCalledWith(
      `Warning: A component is changing an uncontrolled TestComponent to be controlled. TestComponents should not ` +
        `switch from controlled to uncontrolled (or vice versa). Decide between using controlled or uncontrolled ` +
        `for the lifetime of the component. More info: https://fb.me/react-controlled-components`,
    );

    // Don't re-warn
    warnControlledUsage<IProps>({ ...params, oldProps: {}, props: { value: 'test', onChange: noOp } });
    expect(warningCallback).toHaveBeenCalledTimes(1);
  });

  it('warns if old is uncontrolled and new is controlled', () => {
    warnControlledUsage<IProps>({ ...params, oldProps: {}, props: { value: 'test', onChange: noOp } });
    expect(warningCallback).toHaveBeenCalledTimes(1);
    expect(warningCallback).toHaveBeenLastCalledWith(
      `Warning: A component is changing an uncontrolled TestComponent to be controlled. TestComponents should not ` +
        `switch from controlled to uncontrolled (or vice versa). Decide between using controlled or uncontrolled ` +
        `for the lifetime of the component. More info: https://fb.me/react-controlled-components`,
    );
  });

  it('re-warns when componentId changes if old is uncontrolled and new is controlled', () => {
    warnControlledUsage<IProps>({ ...params, oldProps: {}, props: { value: 'test', onChange: noOp } });
    expect(warningCallback).toHaveBeenCalledTimes(1);

    warnControlledUsage<IProps>({
      ...params,
      componentId: 'TestComponent2',
      oldProps: {},
      props: { value: 'test', onChange: noOp },
    });
    expect(warningCallback).toHaveBeenCalledTimes(2);
  });

  it('warns if old is controlled and new is implicitly uncontrolled', () => {
    warnControlledUsage<IProps>({ ...params, oldProps: { value: 'test', onChange: noOp }, props: {} });
    expect(warningCallback).toHaveBeenCalledTimes(1);
    expect(warningCallback).toHaveBeenLastCalledWith(
      `Warning: A component is changing a controlled TestComponent to be uncontrolled. TestComponents should not ` +
        `switch from controlled to uncontrolled (or vice versa). Decide between using controlled or uncontrolled ` +
        `for the lifetime of the component. More info: https://fb.me/react-controlled-components`,
    );

    // Don't re-warn
    warnControlledUsage<IProps>({ ...params, oldProps: { value: 'test', onChange: noOp }, props: {} });
    expect(warningCallback).toHaveBeenCalledTimes(1);
  });

  it('warns if old is controlled and new is uncontrolled', () => {
    warnControlledUsage<IProps>({
      ...params,
      oldProps: { value: 'hello', onChange: noOp },
      props: { defaultValue: 'world' },
    });
    expect(warningCallback).toHaveBeenCalledTimes(1);
    expect(warningCallback).toHaveBeenLastCalledWith(
      `Warning: A component is changing a controlled TestComponent to be uncontrolled. TestComponents should not ` +
        `switch from controlled to uncontrolled (or vice versa). Decide between using controlled or uncontrolled ` +
        `for the lifetime of the component. More info: https://fb.me/react-controlled-components`,
    );

    // Don't re-warn
    warnControlledUsage<IProps>({
      ...params,
      oldProps: { value: 'hello', onChange: noOp },
      props: { defaultValue: 'world' },
    });
    expect(warningCallback).toHaveBeenCalledTimes(1);
  });

  it('re-warns when componentId changes if old is controlled and new is implicitly uncontrolled', () => {
    warnControlledUsage<IProps>({ ...params, oldProps: { value: 'test', onChange: noOp }, props: {} });
    expect(warningCallback).toHaveBeenCalledTimes(1);

    warnControlledUsage<IProps>({
      ...params,
      componentId: 'TestComponent2',
      oldProps: { value: 'test', onChange: noOp },
      props: {},
    });
    expect(warningCallback).toHaveBeenCalledTimes(2);
  });
});
