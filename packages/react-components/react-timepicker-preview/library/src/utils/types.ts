/**
 * Hour of the day. `24` is midnight of the next day.
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
 * An option rendered in the TimePicker listbox.
 */
export type TimePickerOption = {
  /** Time of the option. */
  date: Date;

  /** Unique option value. */
  key: string;

  /** Text shown in the listbox. */
  text: string;
};

/**
 * Why a time string could not be used.
 */
export type TimePickerErrorType = 'invalid-input' | 'out-of-bounds' | 'required-input';

/**
 * Result of parsing a time string.
 */
export type TimeStringValidationResult = {
  date: Date | null;
  errorType?: TimePickerErrorType;
};

/**
 * 12-hour (`h11`: 0–11, `h12`: 1–12) or 24-hour (`h23`: 0–23, `h24`: 1–24) format.
 */
export type HourCycle = 'h11' | 'h12' | 'h23' | 'h24';

export type TimeFormatOptions = {
  /**
   * 12-hour (`h11`: 0–11, `h12`: 1–12) or 24-hour (`h23`: 0–23, `h24`: 1–24) format.
   * Defaults to the locale's format, see `getResolvedHourCycle`.
   */
  hourCycle?: HourCycle | undefined;

  /**
   * Show seconds in the options and require them when parsing.
   * @default false
   */
  showSeconds?: boolean;
};
