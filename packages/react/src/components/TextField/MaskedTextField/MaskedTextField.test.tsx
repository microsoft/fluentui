import '@testing-library/jest-dom';
import * as React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { resetIds } from '@fluentui/utilities';
import { MaskedTextField } from './MaskedTextField';
import { safeCreate } from '@fluentui/test-utilities';
import { isConformant } from '../../../common/isConformant';

export function createMockClipboardData(opts?: Partial<DataTransfer>): DataTransfer {
  const clipboardData = { ...opts };
  return clipboardData as unknown as DataTransfer;
}

describe('MaskedTextField', () => {
  beforeEach(() => {
    resetIds();
  });

  it('renders correctly', () => {
    safeCreate(<MaskedTextField label="With input mask" mask="m\ask: (999) 999 - 9999" />, component => {
      const tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });
  });

  isConformant({
    Component: MaskedTextField,
    displayName: 'MaskedTextField',
    disabledTests: ['has-top-level-file'],
  });

  it('moves caret to first input position on focus', () => {
    render(<MaskedTextField label="With input mask" mask="m\ask: (999) 999 - 9999" />);
    const input = screen.getByRole('textbox') as HTMLInputElement;
    userEvent.tab();
    expect(input.selectionStart).toBe(7);
  });

  it('accepts valid numeric input and moves caret accordingly', () => {
    render(<MaskedTextField label="With input mask" mask="m\ask: (999) 999 - 9999" />);
    const input = screen.getByRole('textbox') as HTMLInputElement;
    userEvent.tab();
    // Type '1'
    userEvent.type(input, '1');
    // Type '2'
    userEvent.type(input, '2');
    expect(input.value).toBe('mask: (12_) ___ - ____');
  });

  it('replaces existing character when typing over selection', () => {
    render(<MaskedTextField label="With input mask" mask="m\ask: (999) 999 - 9999" />);
    const input = screen.getByRole('textbox') as HTMLInputElement;
    userEvent.tab();
    // Type '1'
    userEvent.type(input, '1');
    expect(input.value).toBe('mask: (1__) ___ - ____');
    // Move caret back and type '2' to replace
    input.setSelectionRange(7, 8);
    userEvent.type(input, '2');
    expect(input.value).toBe('mask: (2__) ___ - ____');
  });

  it('ignores invalid characters', () => {
    render(<MaskedTextField label="With input mask" mask="m\ask: (999) 999 - 9999" />);
    const input = screen.getByRole('textbox') as HTMLInputElement;
    userEvent.tab();
    // Type '1'
    userEvent.type(input, '1');
    expect(input.value).toBe('mask: (1__) ___ - ____');
    // Attempt to type 'a'
    userEvent.type(input, 'a');
    expect(input.value).toBe('mask: (1__) ___ - ____');
  });

  it('handles backspace correctly', () => {
    render(<MaskedTextField label="With input mask" mask="m\ask: (999) 999 - 9999" value="1234567890" />);
    const input = screen.getByRole('textbox') as HTMLInputElement;
    userEvent.tab();
    input.setSelectionRange(9, 9);
    userEvent.keyboard('{Backspace}');
    expect(input.value).toBe('mask: (1_3) 456 - 7890');
  });

  it('handles delete correctly', () => {
    render(<MaskedTextField label="With input mask" mask="m\ask: (999) 999 - 9999" value="1234567890" />);
    const input = screen.getByRole('textbox') as HTMLInputElement;
    userEvent.tab();
    // Position caret after '2' (index 9) and delete
    input.setSelectionRange(9, 9);
    userEvent.keyboard('{Delete}');
    expect(input.value).toBe('mask: (12_) 456 - 7890');
  });

  it('handles paste operations', () => {
    const onPaste = jest.fn();

    render(
      <MaskedTextField label="With input mask" mask="m\ask: (999) 999 - 9999" value="1234567890" onPaste={onPaste} />,
    );

    const input = screen.getByLabelText('With input mask') as HTMLInputElement;
    userEvent.tab();
    input.setSelectionRange(0, 0);

    // Paste a 7777 into the start of the input
    userEvent.paste(
      input,
      '7777',
      {
        clipboardData: createMockClipboardData({
          getData: () => '7777',
        }),
      },
      { initialSelectionStart: 0, initialSelectionEnd: 0 },
    );

    expect(onPaste).toHaveBeenCalledTimes(1);
    expect(input.value).toBe('mask: (777) 756 - 7890');

    input.setSelectionRange(22, 22);

    // Paste a 9999 into the end
    userEvent.paste(
      input,
      '9999',
      {
        clipboardData: createMockClipboardData({
          getData: () => '9999',
        }),
      },
      { initialSelectionStart: 22, initialSelectionEnd: 22 },
    );

    expect(onPaste).toHaveBeenCalledTimes(2);
    expect(input.value).toEqual('mask: (777) 756 - 7890');

    // Paste invalid characters mixed with valid characters
    input.setSelectionRange(0, 0);

    userEvent.paste(
      input,
      '1a2b3c',
      {
        clipboardData: createMockClipboardData({
          getData: () => '1a2b3c',
        }),
      },
      { initialSelectionStart: 0, initialSelectionEnd: 0 },
    );

    expect(onPaste).toHaveBeenCalledTimes(3);
    expect(input.value).toBe('mask: (123) 756 - 7890');
  });

  it('should paste over selected characters', () => {
    render(<MaskedTextField label="With input mask" mask="m\ask: (999) 999 - 9999" value="1234567890" />);
    const input = screen.getByRole('textbox') as HTMLInputElement;
    userEvent.tab();
    input.setSelectionRange(7, 10);
    userEvent.paste(
      input,
      '000',
      { clipboardData: createMockClipboardData({ getData: () => '000' }) },
      { initialSelectionStart: 7, initialSelectionEnd: 10 },
    );
    expect(input.value).toBe('mask: (000) 456 - 7890');

    input.setSelectionRange(0, input.value.length);
    userEvent.paste(
      input,
      '98765',
      { clipboardData: createMockClipboardData({ getData: () => '98765' }) },
      { initialSelectionStart: 0, initialSelectionEnd: input.value.length },
    );
    expect(input.value).toBe('mask: (987) 65_ - ____');
  });

  it('should replace selected text when a char is added', () => {
    render(<MaskedTextField label="With input mask" mask="m\ask: (999) 999 - 9999" value="1234567890" />);
    const input = screen.getByRole('textbox') as HTMLInputElement;
    userEvent.tab();
    input.setSelectionRange(8, 14);
    userEvent.keyboard('6');
    expect(input.value).toBe('mask: (16_) __6 - 7890');

    input.setSelectionRange(0, input.value.length);
    userEvent.keyboard('9');
    expect(input.value).toBe('mask: (9__) ___ - ____');
  });

  it('should ignore overflowed characters', () => {
    let onChangeValue: string | undefined;
    render(
      <MaskedTextField
        label="With input mask"
        mask="m\ask: (999) 999 - 9999"
        value="1234567890"
        onChange={(_, newVal) => (onChangeValue = newVal!)}
      />,
    );
    const input = screen.getByRole('textbox') as HTMLInputElement;
    userEvent.tab();
    input.setSelectionRange(22, 22);
    userEvent.keyboard('1');
    expect(input.value).toBe('mask: (123) 456 - 7890');
    expect(onChangeValue).toBe('mask: (123) 456 - 7890');
  });

  it('updates when props.value changes', () => {
    const { rerender } = render(<MaskedTextField label="With input mask" mask="m\ask: (999) 999 - 9999" value="" />);
    const input = screen.getByRole('textbox') as HTMLInputElement;
    expect(input.value).toBe('mask: (___) ___ - ____');

    rerender(<MaskedTextField label="With input mask" mask="m\ask: (999) 999 - 9999" value="1234567890" />);
    expect(input.value).toBe('mask: (123) 456 - 7890');
  });

  it('updates when props.value changes', () => {
    const { rerender } = render(<MaskedTextField label="With input mask" mask="m\ask: (999) 999 - 9999" value="" />);
    const input = screen.getByRole('textbox') as HTMLInputElement;
    expect(input.value).toBe('mask: (___) ___ - ____');

    rerender(<MaskedTextField label="With input mask" mask="m\ask: (999) 999 - 9999" value="1234567890" />);
    expect(input.value).toBe('mask: (123) 456 - 7890');
  });
});
