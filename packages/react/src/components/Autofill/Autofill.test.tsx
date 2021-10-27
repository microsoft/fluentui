jest.useFakeTimers();

import * as React from 'react';

import * as ReactTestUtils from 'react-dom/test-utils';

import { KeyCodes } from '../../Utilities';
import { Autofill } from './index';
import { ReactWrapper, mount } from 'enzyme';
import { mockEvent } from '../../common/testUtilities';
import type { IRefObject } from '../../Utilities';
import type { IAutofillState, IAutofill, IAutofillProps } from './index';

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

    component = mount(
      <Autofill componentRef={autofillRef} onInputValueChange={onInputValueChange} suggestedDisplayValue="hello" />,
    );

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

    component = mount(
      <Autofill
        componentRef={autofillRef}
        onInputValueChange={onInputValueChange}
        suggestedDisplayValue="こんにちは"
      />,
    );

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

    component = mount(
      <Autofill componentRef={autofillRef} onInputValueChange={onInputValueChange} suggestedDisplayValue="hello" />,
    );
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
    component = mount(
      <Autofill
        componentRef={autofillRef}
        suggestedDisplayValue=""
        updateValueInWillReceiveProps={receivePropsUpdater}
      />,
    );

    ReactTestUtils.Simulate.input(autofill.inputElement!, mockEvent('hel'));
    component.setProps({ suggestedDisplayValue: 'hello' });

    expect(autofill.value).toBe('Updated');
    expect(autofill.inputElement!.value).toBe('Updated');
  });

  it('handles composition events', () => {
    component = mount(<Autofill componentRef={autofillRef} suggestedDisplayValue="he" />);

    autofill.inputElement!.value = 'he';
    ReactTestUtils.Simulate.input(autofill.inputElement!);
    expect(autofill.value).toBe('he');

    ReactTestUtils.Simulate.compositionStart(autofill.inputElement!, {});

    ReactTestUtils.Simulate.keyDown(autofill.inputElement!, { keyCode: KeyCodes.l, which: KeyCodes.l });
    autofill.inputElement!.value = 'hel';

    ReactTestUtils.Simulate.keyDown(autofill.inputElement!, { keyCode: KeyCodes.p, which: KeyCodes.p });
    autofill.inputElement!.value = 'help';

    ReactTestUtils.Simulate.compositionEnd(autofill.inputElement!, {});
    autofill.inputElement!.value = '🆘';

    ReactTestUtils.Simulate.input(autofill.inputElement!);

    expect(autofill.value).toBe('🆘');
  });

  it('handles composition events when multiple compositionEnd events are dispatched without a compositionStart', () => {
    const onInputChange = jest.fn((a: string, b: boolean) => a);
    component = mount(<Autofill componentRef={autofillRef} onInputChange={onInputChange} suggestedDisplayValue="he" />);

    autofill.inputElement!.value = 'hel';
    ReactTestUtils.Simulate.input(autofill.inputElement!);
    expect(autofill.value).toBe('hel');

    ReactTestUtils.Simulate.compositionStart(autofill.inputElement!, {});

    ReactTestUtils.Simulate.keyDown(autofill.inputElement!, {
      keyCode: KeyCodes.p,
      which: KeyCodes.p,
    });
    autofill.inputElement!.value = 'help';
    ReactTestUtils.Simulate.input(autofill.inputElement!, {
      target: autofill.inputElement!,
      nativeEvent: {
        isComposing: true,
      } as any,
    });

    ReactTestUtils.Simulate.compositionEnd(autofill.inputElement!, {});
    autofill.inputElement!.value = '🆘';
    ReactTestUtils.Simulate.input(autofill.inputElement!, {
      target: autofill.inputElement!,
      nativeEvent: {
        isComposing: true,
      } as any,
    });
    jest.runOnlyPendingTimers();

    ReactTestUtils.Simulate.keyDown(autofill.inputElement!, {
      keyCode: KeyCodes.m,
      which: KeyCodes.m,
      nativeEvent: {
        isComposing: true,
      } as any,
    });
    autofill.inputElement!.value = '🆘m';
    ReactTestUtils.Simulate.input(autofill.inputElement!, {
      target: autofill.inputElement!,
      nativeEvent: {
        isComposing: true,
      } as any,
    });

    ReactTestUtils.Simulate.compositionEnd(autofill.inputElement!, {});
    autofill.inputElement!.value = '🆘Ⓜ';
    ReactTestUtils.Simulate.input(autofill.inputElement!, {
      target: autofill.inputElement!,
      nativeEvent: {
        isComposing: false,
      } as any,
    });
    jest.runOnlyPendingTimers();

    expect(onInputChange.mock.calls).toEqual([
      ['hel', false],
      ['help', true],
      ['🆘', true], // from input event
      ['🆘', false], // from timeout on compositionEnd event
      ['🆘m', true],
      ['🆘Ⓜ', false], // from input event
      ['🆘Ⓜ', false], // from  timeout on compositionEnd event
    ]);
    expect(autofill.value).toBe('🆘Ⓜ');
  });

  it('will call onInputChange w/ composition events', () => {
    const onInputChange = jest.fn((a: string, b: boolean) => a);

    component = mount(<Autofill componentRef={autofillRef} onInputChange={onInputChange} suggestedDisplayValue="he" />);

    autofill.inputElement!.value = 'he';
    ReactTestUtils.Simulate.input(autofill.inputElement!);
    expect(autofill.value).toBe('he');

    ReactTestUtils.Simulate.compositionStart(autofill.inputElement!, {});

    ReactTestUtils.Simulate.keyDown(autofill.inputElement!, { keyCode: KeyCodes.l, which: KeyCodes.l });
    autofill.inputElement!.value = 'hel';
    ReactTestUtils.Simulate.input(autofill.inputElement!!, {});

    ReactTestUtils.Simulate.keyDown(autofill.inputElement!, { keyCode: KeyCodes.p, which: KeyCodes.p });
    autofill.inputElement!.value = 'help';
    ReactTestUtils.Simulate.input(autofill.inputElement!!, {});

    ReactTestUtils.Simulate.compositionEnd(autofill.inputElement!, {});
    autofill.inputElement!.value = '🆘';

    ReactTestUtils.Simulate.input(autofill.inputElement!);

    expect(onInputChange.mock.calls).toEqual([
      ['he', false],
      ['hel', true],
      ['help', true],
      ['🆘', false],
    ]);
  });

  it('will call onInputValueChanged w/ composition events', () => {
    const onInputValueChange = jest.fn((a: string, b: boolean) => {
      return undefined;
    });

    component = mount(
      <Autofill componentRef={autofillRef} onInputValueChange={onInputValueChange} suggestedDisplayValue="he" />,
    );

    autofill.inputElement!.value = 'he';
    ReactTestUtils.Simulate.input(autofill.inputElement!);
    expect(autofill.value).toBe('he');

    ReactTestUtils.Simulate.compositionStart(autofill.inputElement!, {});

    ReactTestUtils.Simulate.keyDown(autofill.inputElement!, { keyCode: KeyCodes.l, which: KeyCodes.l });
    autofill.inputElement!.value = 'hel';
    ReactTestUtils.Simulate.input(autofill.inputElement!!, {});

    ReactTestUtils.Simulate.keyDown(autofill.inputElement!, { keyCode: KeyCodes.p, which: KeyCodes.p });
    autofill.inputElement!.value = 'help';
    ReactTestUtils.Simulate.input(autofill.inputElement!!, {});

    ReactTestUtils.Simulate.compositionEnd(autofill.inputElement!, {});
    autofill.inputElement!.value = '🆘';

    ReactTestUtils.Simulate.input(autofill.inputElement!);

    expect(onInputValueChange.mock.calls).toEqual([
      ['he', false],
      ['hel', true],
      ['help', true],
      ['🆘', false],
    ]);
  });
});
