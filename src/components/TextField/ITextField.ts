/**
 * TextField class interface.
 */
export interface ITextField {
  /** Gets the current value of the input. */
  value: string;

  /** Sets focus to the input. */
  focus(): void;

  /** Select the value of the text field. */
  select(): void;

  /** Sets the selection start of the text field to a specified value */
  setSelectionStart(value: number): void;

    /** Sets the selection end of the text field to a specified value */
  setSelectionEnd(value: number): void;
}