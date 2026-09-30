/**
 * Hour of the day, used for `startHour` and `endHour`. `24` represents midnight of the following day.
 */
export type Hour =
  | 0
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 13
  | 14
  | 15
  | 16
  | 17
  | 18
  | 19
  | 20
  | 21
  | 22
  | 23
  | 24;

/**
 * Data structure for rendering options in the TimePicker.
 */
export type TimePickerOption = {
  /**
   * The Date object associated with the option.
   */
  date: Date;

  /**
   * A unique identifier for the option.
   */
  key: string;

  /**
   * The display text for the option within the listbox.
   */
  text: string;
};

/**
 * Error types reported when a time is selected or parsed.
 */
export type TimePickerErrorType = 'invalid-input' | 'out-of-bounds' | 'required-input';

/**
 * Result of parsing a time string into a Date.
 */
export type TimeStringValidationResult = {
  date: Date | null;
  errorType?: TimePickerErrorType;
};

export type TimeFormatOptions = {
  /**
   * A string value indicating whether the 12-hour format ("h11", "h12") or the 24-hour format ("h23", "h24") should be used.
   * - 'h11' and 'h23' start with hour 0 and go up to 11 and 23 respectively.
   * - 'h12' and 'h24' start with hour 1 and go up to 12 and 24 respectively.
   * @default undefined
   */
  hourCycle?: 'h11' | 'h12' | 'h23' | 'h24' | undefined;

  /**
   * If true, show seconds in the listbox options and consider seconds for default validation purposes.
   * @default false
   */
  showSeconds?: boolean;
};
