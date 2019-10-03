import * as React from 'react';

import * as ReactTestUtils from 'react-dom/test-utils';

import { IRefObject, KeyCodes } from '../../Utilities';
import { Autofill, IAutofillState, IAutofill, IAutofillProps } from './index';
import { ReactWrapper, mount } from 'enzyme';
import { mockEvent } from 'office-ui-fabric-react/lib/common/testUtilities';

describe('Autofill', () => {
  let autofill: Autofill;
  const autofillRef: IRefObject<IAutofill> = (ref: IAutofill | null) => {
    autofill = ref as Autofill;
  };
  let component: ReactWrapper<IAutofillProps, IAutofillState, Autofill>;

  afterEach(() => {
    component.unmount();
  });

  it('correctly autofills', () => {
    let updatedText: string | undefined;
    const onInputValueChange = (text: string | undefined): void => {
      updatedText = text;
    };

    component = mount(<Autofill componentRef={autofillRef} onInputValueChange={onInputValueChange} suggestedDisplayValue="hello" />);

    ReactTestUtils.Simulate.input(autofill.inputElement!, mockEvent('hel'));
    expect(updatedText).toBe('hel');
    expect(autofill.value).toBe('hel');
    expect(autofill.inputElement!.value).toBe('hello');
  });

  it('correctly autofills with composable languages', () => {
    let updatedText: string | undefined;
    const onInputValueChange = (text: string | undefined): void => {
      updatedText = text;
    };

    component = mount(<Autofill componentRef={autofillRef} onInputValueChange={onInputValueChange} suggestedDisplayValue="こんにちは" />);

    ReactTestUtils.Simulate.input(autofill.inputElement!, mockEvent('こん'));
    expect(updatedText).toBe('こん');
    expect(autofill.value).toBe('こん');
    expect(autofill.inputElement!.value).toBe('こんにちは');
  });

  it('does not autofill if suggestedDisplayValue does not match input', () => {
    let updatedText: string | undefined;
    const onInputValueChange = (text: string | undefined): void => {
      updatedText = text;
    };

    component = mount(<Autofill componentRef={autofillRef} onInputValueChange={onInputValueChange} suggestedDisplayValue="hello" />);
    ReactTestUtils.Simulate.input(autofill.inputElement!, mockEvent('hep'));

    expect(updatedText).toBe('hep');
    expect(autofill.value).toBe('hep');
    expect(autofill.inputElement!.value).toBe('hep');
  });

  it('autofills if left arrow is pressed', () => {
    component = mount(<Autofill componentRef={autofillRef} suggestedDisplayValue="hello" />);

    ReactTestUtils.Simulate.input(autofill.inputElement!, mockEvent('hel'));
    expect(autofill.value).toBe('hel');
    expect(autofill.inputElement!.value).toBe('hello');

    ReactTestUtils.Simulate.keyDown(autofill.inputElement!, { keyCode: KeyCodes.left, which: KeyCodes.left });
    expect(autofill.value).toBe('hello');
    expect(autofill.inputElement!.value).toBe('hello');
  });

  it('autofills if right arrow is pressed', () => {
    component = mount(<Autofill componentRef={autofillRef} suggestedDisplayValue="hello" />);

    ReactTestUtils.Simulate.input(autofill.inputElement!, mockEvent('hel'));
    expect(autofill.value).toBe('hel');
    expect(autofill.inputElement!.value).toBe('hello');

    ReactTestUtils.Simulate.keyDown(autofill.inputElement!, { keyCode: KeyCodes.right, which: KeyCodes.right });
    expect(autofill.value).toBe('hello');
    expect(autofill.inputElement!.value).toBe('hello');
  });

  it('does not autofill if up or down is pressed', () => {
    component = mount(<Autofill componentRef={autofillRef} suggestedDisplayValue="hello" />);

    ReactTestUtils.Simulate.input(autofill.inputElement!, mockEvent('hel'));
    expect(autofill.value).toBe('hel');
    expect(autofill.inputElement!.value).toBe('hello');

    ReactTestUtils.Simulate.keyDown(autofill.inputElement!, { keyCode: KeyCodes.up, which: KeyCodes.up });
    expect(autofill.value).toBe('hel');
    expect(autofill.inputElement!.value).toBe('hello');

    ReactTestUtils.Simulate.keyDown(autofill.inputElement!, { keyCode: KeyCodes.down, which: KeyCodes.down });
    expect(autofill.value).toBe('hel');
    expect(autofill.inputElement!.value).toBe('hello');
  });

  it('value changes when updateValueInWillReceiveProps is passed in', () => {
    const propsString = 'Updated';
    const receivePropsUpdater = () => {
      return propsString;
    };
    component = mount(<Autofill componentRef={autofillRef} suggestedDisplayValue="" updateValueInWillReceiveProps={receivePropsUpdater} />);

    ReactTestUtils.Simulate.input(autofill.inputElement!, mockEvent('hel'));
    component.setProps({ suggestedDisplayValue: 'hello' });

    expect(autofill.value).toBe('Updated');
    expect(autofill.inputElement!.value).toBe('Updated');
  });
});
