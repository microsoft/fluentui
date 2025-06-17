import * as React from 'react';
import { screen, render, fireEvent, cleanup } from '@testing-library/react';
import { KeyCodes } from '../../Utilities';
import { Autofill } from './index';
import { mockEvent } from '../../common/testUtilities';
import type { IRefObject } from '../../Utilities';
import type { IAutofill } from './index';
import { act } from 'react-test-renderer';

jest.useFakeTimers();

describe('Autofill', () => {
  let autofillRef: React.RefObject<IAutofill>;
  let updatedText: string | undefined;
  let onInputValueChange: (text: string | undefined, composing?: boolean) => void;

  afterEach(() => {
    cleanup();
    updatedText = undefined;
  });

  beforeEach(() => {
    autofillRef = React.createRef<IAutofill>();
    updatedText = undefined;
    onInputValueChange = (text: string | undefined) => {
      updatedText = text;
    };
  });

  it('correctly autofills', () => {
    render(
      <Autofill
        componentRef={autofillRef as IRefObject<IAutofill>}
        onInputValueChange={onInputValueChange}
        suggestedDisplayValue="hello"
      />,
    );

    const input = screen.getByRole('textbox') as HTMLInputElement;

    // simulate typing "hel"
    fireEvent.input(input, mockEvent('hel'));
    expect(updatedText).toBe('hel');
    expect(autofillRef.current!.value).toBe('hel');
    expect(input.value).toBe('hello');
  });

  it('correctly autofills with composable languages', () => {
    render(
      <Autofill
        componentRef={autofillRef as IRefObject<IAutofill>}
        onInputValueChange={onInputValueChange}
        suggestedDisplayValue="こんにちは"
      />,
    );

    const input = screen.getByRole('textbox') as HTMLInputElement;
    fireEvent.input(input, mockEvent('こん'));

    expect(updatedText).toBe('こん');
    expect(autofillRef.current!.value).toBe('こん');
    expect(input.value).toBe('こんにちは');
  });

  it('does not autofill if suggestedDisplayValue does not match input', () => {
    render(
      <Autofill
        componentRef={autofillRef as IRefObject<IAutofill>}
        onInputValueChange={onInputValueChange}
        suggestedDisplayValue="hello"
      />,
    );

    const input = screen.getByRole('textbox') as HTMLInputElement;
    fireEvent.input(input, mockEvent('hep'));

    expect(updatedText).toBe('hep');
    expect(autofillRef.current!.value).toBe('hep');
    expect(input.value).toBe('hep');
  });

  it('autofills if left arrow is pressed', () => {
    render(<Autofill componentRef={autofillRef as IRefObject<IAutofill>} suggestedDisplayValue="hello" />);

    const input = screen.getByRole('textbox') as HTMLInputElement;
    fireEvent.input(input, mockEvent('hel'));

    // before arrow
    expect(autofillRef.current!.value).toBe('hel');
    expect(input.value).toBe('hello');

    // left arrow
    fireEvent.keyDown(input, { keyCode: KeyCodes.left, which: KeyCodes.left });
    expect(autofillRef.current!.value).toBe('hello');
    expect(input.value).toBe('hello');
  });

  it('autofills if right arrow is pressed', () => {
    render(<Autofill componentRef={autofillRef as IRefObject<IAutofill>} suggestedDisplayValue="hello" />);

    const input = screen.getByRole('textbox') as HTMLInputElement;
    fireEvent.input(input, mockEvent('hel'));

    fireEvent.keyDown(input, { keyCode: KeyCodes.right, which: KeyCodes.right });
    expect(autofillRef.current!.value).toBe('hello');
    expect(input.value).toBe('hello');
  });

  it('does not autofill if up or down is pressed', () => {
    render(<Autofill componentRef={autofillRef as IRefObject<IAutofill>} suggestedDisplayValue="hello" />);

    const input = screen.getByRole('textbox') as HTMLInputElement;
    fireEvent.input(input, mockEvent('hel'));

    fireEvent.keyDown(input, { keyCode: KeyCodes.up, which: KeyCodes.up });
    expect(autofillRef.current!.value).toBe('hel');
    expect(input.value).toBe('hello');

    fireEvent.keyDown(input, { keyCode: KeyCodes.down, which: KeyCodes.down });
    expect(autofillRef.current!.value).toBe('hel');
    expect(input.value).toBe('hello');
  });

  it('value changes when updateValueInWillReceiveProps is passed in', () => {
    const propsString = 'Updated';
    // eslint-disable-next-line @typescript-eslint/no-deprecated
    const updateValueInWillReceiveProps = () => propsString;

    const { rerender } = render(
      <Autofill
        componentRef={autofillRef as IRefObject<IAutofill>}
        suggestedDisplayValue=""
        // eslint-disable-next-line @typescript-eslint/no-deprecated
        updateValueInWillReceiveProps={updateValueInWillReceiveProps}
      />,
    );

    const input = screen.getByRole('textbox') as HTMLInputElement;
    fireEvent.input(input, mockEvent('hel'));

    // rerender with new suggestion
    rerender(
      <Autofill
        componentRef={autofillRef as IRefObject<IAutofill>}
        suggestedDisplayValue="hello"
        // eslint-disable-next-line @typescript-eslint/no-deprecated
        updateValueInWillReceiveProps={updateValueInWillReceiveProps}
      />,
    );

    expect(autofillRef.current!.value).toBe('Updated');
    expect(input.value).toBe('Updated');
  });

  it('handles composition events', () => {
    render(<Autofill componentRef={autofillRef as IRefObject<IAutofill>} suggestedDisplayValue="he" />);

    const input = screen.getByRole('textbox') as HTMLInputElement;

    // initial input
    input.value = 'he';
    fireEvent.input(input);
    expect(autofillRef.current!.value).toBe('he');

    // start composing
    fireEvent.compositionStart(input);

    // type "l", "p"
    fireEvent.keyDown(input, { keyCode: KeyCodes.l, which: KeyCodes.l });
    input.value = 'hel';
    fireEvent.keyDown(input, { keyCode: KeyCodes.p, which: KeyCodes.p });
    input.value = 'help';

    // finish composition, then change to emoji
    fireEvent.compositionEnd(input);
    input.value = '🆘';
    fireEvent.input(input);

    expect(autofillRef.current!.value).toBe('🆘');
  });

  it('handles complex composition lifecycle', () => {
    const onInputChange = jest.fn((a: string, b: boolean) => a);

    render(
      <Autofill
        componentRef={autofillRef as IRefObject<IAutofill>}
        // eslint-disable-next-line @typescript-eslint/no-deprecated
        onInputChange={onInputChange}
        suggestedDisplayValue="he"
      />,
    );

    const input = screen.getByRole('textbox') as HTMLInputElement;

    // initial
    fireEvent.input(input, { target: { value: 'hel' } });
    expect(autofillRef.current!.value).toBe('hel');

    fireEvent.compositionStart(input);

    // "p" with isComposing true
    fireEvent.keyDown(input, {
      keyCode: KeyCodes.p,
      which: KeyCodes.p,
      isComposing: true,
    });

    fireEvent.input(input, {
      target: { value: 'help' },
      isComposing: true,
    });

    // compositionEnd
    fireEvent.compositionEnd(input);

    fireEvent.input(input, {
      target: { value: '🆘' },
      isComposing: true,
    });

    act(() => {
      jest.runOnlyPendingTimers();
    });

    // type "m" while composing
    fireEvent.keyDown(input, {
      keyCode: KeyCodes.m,
      which: KeyCodes.m,
      isComposing: true,
    });

    fireEvent.input(input, {
      target: { value: '🆘m' },
      isComposing: true,
    });

    fireEvent.compositionEnd(input);

    fireEvent.input(input, {
      target: { value: '🆘Ⓜ' },
      isComposing: false,
    });

    act(() => {
      jest.runOnlyPendingTimers();
    });

    expect(onInputChange.mock.calls).toEqual([
      ['hel', false],
      ['help', true],
      ['🆘', true], // from input event
      ['🆘', false], // from timeout on compositionend event
      ['🆘m', true],
      ['🆘Ⓜ', false], // from input event
      ['🆘Ⓜ', false], // from timeout on compositionend event
    ]);

    expect(autofillRef.current!.value).toBe('🆘Ⓜ');
  });

  it('calls onInputChange w/ composition events', () => {
    const onInputChange = jest.fn((a: string, b: boolean) => a);
    render(
      <Autofill
        componentRef={autofillRef as IRefObject<IAutofill>}
        // eslint-disable-next-line @typescript-eslint/no-deprecated
        onInputChange={onInputChange}
        suggestedDisplayValue="he"
      />,
    );

    // initial non‐composing input
    const input = screen.getByRole('textbox');

    fireEvent.input(input, { target: { value: 'he' } });

    expect(autofillRef.current!.value).toBe('he');

    // start composition
    fireEvent.compositionStart(input, { type: 'compositionstart' });

    // type "l" — still composing
    fireEvent.keyDown(input, { keyCode: KeyCodes.l, which: KeyCodes.l, isComposing: true });

    fireEvent.input(input, {
      target: { value: 'hel' },
      isComposing: true,
    });

    // type "p" — still composing
    fireEvent.keyDown(input, { keyCode: KeyCodes.p, which: KeyCodes.p, isComposing: true });

    fireEvent.input(input, {
      target: { value: 'help' },
      isComposing: true,
    });

    fireEvent.compositionEnd(input, { data: '' });

    fireEvent.input(input, {
      target: { value: '🆘' },
      isComposing: false,
    });

    expect(onInputChange.mock.calls).toEqual([
      ['he', false],
      ['hel', true],
      ['help', true],
      ['🆘', false],
    ]);

    expect(autofillRef.current!.value).toBe('🆘');
  });

  it('calls onInputValueChange w/ composition events', () => {
    const onInputChange = jest.fn((a: string, b: boolean) => undefined);

    render(
      <Autofill
        componentRef={autofillRef as IRefObject<IAutofill>}
        onInputValueChange={onInputChange}
        suggestedDisplayValue="he"
      />,
    );

    const input = screen.getByRole('textbox') as HTMLInputElement;

    // initial non‐composing input
    input.value = 'he';

    fireEvent.input(input, {
      target: input,
    });

    expect(autofillRef.current!.value).toBe('he');

    // start composition
    fireEvent.compositionStart(input);

    // "l" while composing
    fireEvent.keyDown(input, { keyCode: KeyCodes.l, which: KeyCodes.l });
    input.value = 'hel';
    fireEvent.input(input, {
      target: input,
      isComposing: true,
    });

    // "p" while composing
    fireEvent.keyDown(input, { keyCode: KeyCodes.p, which: KeyCodes.p });
    input.value = 'help';
    fireEvent.input(input, {
      target: input,
      isComposing: true,
    });

    // end composition + final input
    fireEvent.compositionEnd(input);
    input.value = '🆘';
    fireEvent.input(input, {
      target: input,
      isComposing: false,
    });

    expect(onInputChange.mock.calls).toEqual([
      ['he', false],
      ['hel', true],
      ['help', true],
      ['🆘', false],
    ]);

    expect(autofillRef.current!.value).toBe('🆘');
  });
});
