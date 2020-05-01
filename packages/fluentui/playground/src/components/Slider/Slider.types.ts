import { IClasses, ISlotProps, ISlottableProps } from '@fluentui/react-theming';

export interface ISliderSlots {
  /** Intended to contain the slider */
  root: React.ReactType;
  /** Intended to provide a track space for the thumb to slide on */
  rail: React.ReactType;
  /** Intended to provide a selected track section from left to thumb. */
  track: React.ReactType;
  /** Intended to be a child of the track, where left represents a percentage */
  thumb: React.ReactType;
}

export type ISliderSlotProps = ISlotProps<ISliderSlots>;

export interface ISliderClasses extends IClasses<ISliderSlots> {
  rootFocused: string;
  rootVertical: string;
  rootDisabled: string;
}

export interface ISliderProps extends ISlottableProps<ISliderSlots, ISliderClasses> {
  /** Sets the disabled flag, causing the control to be inactive. */
  disabled?: boolean;

  /** min value */
  min?: number;

  /** max value */
  max?: number;

  /** step */
  step?: number;

  /** should snap to step */
  snapToStep?: boolean;

  /** whether this is vertical or not */
  vertical?: boolean;

  /** current value (controlled) */
  value?: number;

  /** default value (uncontrolled) */
  defaultValue?: number;

  /** on change handler (controlled) */
  onChange?: (ev: MouseEvent | KeyboardEvent, value: number) => void;
}
