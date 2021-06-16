import { IComboBoxProps } from '../ComboBox';

// Can only be numbers between 0-23
export interface TimeRange {
  start: number;
  end: number;
}

type PartialIComboBoxProps = Omit<IComboBoxProps, 'options'>;

export interface ITimePickerProps extends PartialIComboBoxProps {
  /**
   * Label of the component
   */
  label?: string;
  /**
   * Time increments, in minutes, of the options in the dropdown
   */
  increments?: number;
  /**
   * Whether to show seconds in the component
   */
  showSeconds?: boolean;
  /**
   * Callback to localize the date strings displayed for dropdown options
   */
  onFormatDate?: (date: Date) => string;
  /**
   * Whether to use 12 or 24 hour time //
   */
  useHour12?: boolean;
  /**
   * Toggle to allow user input
   */
  allowFreeform?: boolean;
  /**
   * Custom time range to for time options
   */
  timeRange?: TimeRange;
}
