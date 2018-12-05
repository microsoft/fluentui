import * as React from 'react';
import * as renderer from 'react-test-renderer';
import * as ReactTestUtils from 'react-dom/test-utils';
import { mount } from 'enzyme';

import { resetIds, setWarningCallback } from '../../Utilities';
import { TextField } from './TextField';

describe('TextField deprecated', () => {
  let warnFn: jest.Mock;
  let lastWarning = '';
  const noOp = () => undefined;

  beforeEach(() => {
    warnFn = jest.fn((warning: string) => {
      lastWarning = warning;
    });
    setWarningCallback(warnFn);
    resetIds();
  });

  afterEach(() => {
    setWarningCallback();
    lastWarning = '';
  });

  function mockEvent(targetValue: string = ''): ReactTestUtils.SyntheticEventData {
    const target: EventTarget = { value: targetValue } as HTMLInputElement;
    const event: ReactTestUtils.SyntheticEventData = { target };

    return event;
  }

  it('warns if deprecated props are provided', () => {
    mount(<TextField onChanged={noOp} />);
    expect(warnFn).toHaveBeenCalledTimes(1);

    mount(<TextField onBeforeChange={noOp} />);
    expect(warnFn).toHaveBeenCalledTimes(2);
  });

  it('does not warn if value and onChanged are provided', () => {
    mount(<TextField value="some value" onChanged={noOp} />);
    // There will be one deprecation warning (but no controlled usage warning)
    expect(warnFn).toHaveBeenCalledTimes(1);
    // Verify that the warning was a deprecation warning
    expect(lastWarning).toContain('deprecated');
  });

  it('renders with deprecated props affecting styling', () => {
    const component = renderer.create(<TextField addonString={'test addonString'} iconClass={'test-iconClass'} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should call deprecated onChanged handler for input change', () => {
    const onChangedSpy = jest.fn();

    const textField = mount(
      <TextField
        defaultValue="initial value"
        onChanged={onChangedSpy}
        // tslint:disable-next-line:jsx-no-lambda
        onGetErrorMessage={value => (value.length > 0 ? '' : 'error')}
      />
    );

    expect(onChangedSpy).toHaveBeenCalledTimes(0);
    const inputDOM = textField.getDOMNode().querySelector('input') as Element;

    ReactTestUtils.Simulate.input(inputDOM, mockEvent('value change'));
    ReactTestUtils.Simulate.change(inputDOM, mockEvent('value change'));
    expect(onChangedSpy).toHaveBeenCalledTimes(1);

    ReactTestUtils.Simulate.input(inputDOM, mockEvent(''));
    ReactTestUtils.Simulate.change(inputDOM, mockEvent(''));
    expect(onChangedSpy).toHaveBeenCalledTimes(2);
  });

  it('should not call deprecated onChanged when initial value is undefined and input change is an empty string', () => {
    const onChangedSpy = jest.fn();

    const textField = mount(<TextField onChanged={onChangedSpy} />);

    expect(onChangedSpy).toHaveBeenCalledTimes(0);
    const inputDOM = textField.getDOMNode().querySelector('input') as Element;

    ReactTestUtils.Simulate.input(inputDOM, mockEvent(''));
    ReactTestUtils.Simulate.change(inputDOM, mockEvent(''));
    expect(onChangedSpy).toHaveBeenCalledTimes(0);
  });
});
