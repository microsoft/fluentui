import * as React from 'react';

import * as ReactDOM from 'react-dom';
import * as ReactTestUtils from 'react-dom/test-utils';

import { KeyCodes } from '../../Utilities';
import { Autofill } from './Autofill';

describe('Autofill', () => {
  let autoFill: Autofill;
  let autoFillInput: HTMLInputElement;
  const baseNode = document.createElement('div');
  document.body.appendChild(baseNode);
  beforeEach(() => {
    const component = ReactDOM.render(
      <Autofill ref={(c: Autofill | null) => c && (autoFill = c)} suggestedDisplayValue="hello" />,
      baseNode
    );
    autoFillInput = ReactDOM.findDOMNode((component as unknown) as React.ReactInstance) as HTMLInputElement;
  });

  it('correctly autofills', (done: (error?: Error) => void) => {
    const onInputValueChange = (text: string | undefined): void => {
      expect(text).toBe('hel');
      expect(autoFill.value).toBe('hel');
      done();
    };

    ReactDOM.render(
      <Autofill ref={(c: Autofill | null) => c && (autoFill = c)} onInputValueChange={onInputValueChange} suggestedDisplayValue="hello" />,
      baseNode
    );
    autoFillInput.value = 'hel';
    ReactTestUtils.Simulate.input(autoFillInput);
    ReactDOM.render(
      <Autofill ref={(c: Autofill | null) => c && (autoFill = c)} onInputValueChange={onInputValueChange} suggestedDisplayValue="hello" />,
      baseNode
    );
    expect(autoFill.inputElement && autoFill.inputElement.value).toBe('hello');
  });

  it('does not autofill if suggestedDisplayValue does not match input', (done: (error?: Error) => void) => {
    const onInputValueChange = (text: string | undefined): void => {
      expect(text).toBe('hep');
      expect(autoFill.value).toBe('hep');
      expect(autoFill.inputElement && autoFill.inputElement.value).toBe('hep');
      done();
    };

    autoFillInput.value = 'hep';
    ReactTestUtils.Simulate.input(autoFillInput);
    ReactDOM.render(
      <Autofill ref={(c: Autofill | null) => c && (autoFill = c)} onInputValueChange={onInputValueChange} suggestedDisplayValue="hello" />,
      baseNode
    );
    ReactTestUtils.Simulate.input(autoFillInput);
  });

  it('does not autofill if left or right arrow has been pressed', () => {
    autoFillInput.value = 'hel';
    ReactTestUtils.Simulate.input(autoFillInput);

    ReactDOM.render(<Autofill ref={(c: Autofill | null) => c && (autoFill = c)} suggestedDisplayValue="hello" />, baseNode);

    ReactTestUtils.Simulate.keyDown(autoFillInput, { keyCode: KeyCodes.left, which: KeyCodes.left });

    // Because reacttestutils doesn't allow you to enter text normally we need to reset the autofillinput value to hel.
    // If we don't the change event will cause the current input value, 'hello', to be set.
    autoFillInput.value = 'hel';

    ReactTestUtils.Simulate.input(autoFillInput);

    expect(autoFill.value).toBe('hel');
    expect(autoFill.inputElement && autoFill.inputElement.value).toBe('hel');
  });

  it('will autofill if keyCode up or down is pressed', () => {
    autoFillInput.value = 'hel';
    ReactTestUtils.Simulate.input(autoFillInput);

    ReactDOM.render(<Autofill ref={(c: Autofill | null) => c && (autoFill = c)} suggestedDisplayValue="hello" />, baseNode);

    expect(autoFill.value).toBe('hel');
    expect(autoFill.inputElement && autoFill.inputElement.value).toBe('hel');

    ReactTestUtils.Simulate.keyDown(autoFillInput, { keyCode: KeyCodes.left, which: KeyCodes.left });

    autoFillInput.value = 'hel';

    ReactTestUtils.Simulate.keyDown(autoFillInput, { keyCode: KeyCodes.up, which: KeyCodes.up });
    autoFillInput.value = 'hel';
    ReactTestUtils.Simulate.input(autoFillInput);

    ReactDOM.render(<Autofill ref={(c: Autofill | null) => c && (autoFill = c)} suggestedDisplayValue="hello" />, baseNode);

    expect(autoFill.value).toBe('hel');
    expect(autoFill.inputElement && autoFill.inputElement.value).toBe('hello');
  });

  it('will handle composition events', () => {
    autoFillInput.value = 'he';
    ReactTestUtils.Simulate.input(autoFillInput);

    ReactDOM.render(<Autofill ref={(c: Autofill | null) => c && (autoFill = c)} suggestedDisplayValue="he" />, baseNode);

    expect(autoFill.value).toBe('he');
    expect(autoFill.inputElement && autoFill.inputElement.value).toBe('he');

    ReactTestUtils.Simulate.compositionStart(autoFillInput, {});

    ReactTestUtils.Simulate.keyDown(autoFillInput, { keyCode: KeyCodes.l, which: KeyCodes.l });
    autoFillInput.value = 'hel';

    ReactTestUtils.Simulate.keyDown(autoFillInput, { keyCode: KeyCodes.p, which: KeyCodes.p });
    autoFillInput.value = 'help';

    ReactTestUtils.Simulate.compositionEnd(autoFillInput, {});
    autoFillInput.value = '🆘';

    ReactTestUtils.Simulate.input(autoFillInput);

    ReactDOM.render(<Autofill ref={(c: Autofill | null) => c && (autoFill = c)} suggestedDisplayValue="hel" />, baseNode);

    expect(autoFill.value).toBe('🆘');
  });

  it('will call onInputChange w/ composition events', () => {
    autoFillInput.value = 'he';
    ReactTestUtils.Simulate.input(autoFillInput);

    const onInputChange = jest.fn((a: string, b: boolean) => a);

    ReactDOM.render(
      <Autofill onInputChange={onInputChange} ref={(c: Autofill | null) => c && (autoFill = c)} suggestedDisplayValue="he" />,
      baseNode
    );

    expect(autoFill.value).toBe('he');
    expect(autoFill.inputElement && autoFill.inputElement.value).toBe('he');

    ReactTestUtils.Simulate.compositionStart(autoFillInput, {});

    ReactTestUtils.Simulate.keyDown(autoFillInput, { keyCode: KeyCodes.l, which: KeyCodes.l });
    autoFillInput.value = 'hel';
    ReactTestUtils.Simulate.input(autoFillInput, {});

    ReactTestUtils.Simulate.keyDown(autoFillInput, { keyCode: KeyCodes.p, which: KeyCodes.p });
    autoFillInput.value = 'help';
    ReactTestUtils.Simulate.input(autoFillInput, {});

    ReactTestUtils.Simulate.compositionEnd(autoFillInput, {});
    autoFillInput.value = '🆘';

    ReactTestUtils.Simulate.input(autoFillInput);

    ReactDOM.render(
      <Autofill onInputChange={onInputChange} ref={(c: Autofill | null) => c && (autoFill = c)} suggestedDisplayValue="he" />,
      baseNode
    );

    expect(onInputChange.mock.calls).toEqual([['hel', true], ['help', true], ['🆘', false]]);
  });

  it('will call onInputValueChanged w/ composition events', () => {
    autoFillInput.value = 'he';
    ReactTestUtils.Simulate.input(autoFillInput);

    const onInputValueChange = jest.fn((a: string, b: boolean) => {
      return void 0;
    });

    ReactDOM.render(
      <Autofill onInputValueChange={onInputValueChange} ref={(c: Autofill | null) => c && (autoFill = c)} suggestedDisplayValue="he" />,
      baseNode
    );

    expect(autoFill.value).toBe('he');
    expect(autoFill.inputElement && autoFill.inputElement.value).toBe('he');

    ReactTestUtils.Simulate.compositionStart(autoFillInput, {});

    ReactTestUtils.Simulate.keyDown(autoFillInput, { keyCode: KeyCodes.l, which: KeyCodes.l });
    autoFillInput.value = 'hel';
    ReactTestUtils.Simulate.input(autoFillInput, {});

    ReactTestUtils.Simulate.keyDown(autoFillInput, { keyCode: KeyCodes.p, which: KeyCodes.p });
    autoFillInput.value = 'help';
    ReactTestUtils.Simulate.input(autoFillInput, {});

    ReactTestUtils.Simulate.compositionEnd(autoFillInput, {});
    autoFillInput.value = '🆘';

    ReactTestUtils.Simulate.input(autoFillInput);

    ReactDOM.render(
      <Autofill onInputValueChange={onInputValueChange} ref={(c: Autofill | null) => c && (autoFill = c)} suggestedDisplayValue="he" />,
      baseNode
    );

    expect(onInputValueChange.mock.calls).toEqual([['hel', true], ['help', true], ['🆘', false]]);
  });
});
