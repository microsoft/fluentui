import * as React from 'react';
import { SliderBase } from './Slider.base';
import type { IStyle, ITheme } from '../../Styling';
import type { IStyleFunctionOrObject, IRefObject } from '../../Utilities';

/* eslint-disable deprecation/deprecation */

/**
 * @deprecated
 * {@docCategory Slider}
 */
export interface ISlider {
  /** @deprecated */
  value: number | undefined;

  /** @deprecated */
  focus: () => void;
}
/**
 * @deprecated
 * Format for the array of custom marks.
 * {@docCategory Slider}
 */
export interface ISliderMarks {
  /**
   * value denotes the "where" or at what location the label should be placed at
   * @deprecated
   */
  value: number;
  /**
   * the custom label string that will be placed at the location denoted by the value
   * @deprecated
   */
  label: string;
}

/**
 * @deprecated This component was experimental and is not longer being developed on, nor will it be supported in the
 * future.
 * {@docCategory Slider}
 */
export interface ISliderProps extends React.ClassAttributes<SliderBase> {
  /**
   * Optional callback to access the ISlider interface. Use this instead of ref for accessing
   * the public methods and properties of the component.
   * @deprecated
   */
  componentRef?: IRefObject<ISlider>;

  /**
   * Call to provide customized styling that will layer on top of the variant rules.
   * @deprecated
   */
  styles?: IStyleFunctionOrObject<ISliderStyleProps, ISliderStyles>;

  /**
   * Theme provided by High-Order Component.
   * @deprecated
   */
  theme?: ITheme;

  /**
   * Description label of the Slider.
   * @deprecated
   */
  label?: string;

  /**
   * The initial value of the Slider. Use this if you intend for the Slider to be an uncontrolled component.
   * This value is mutually exclusive to value. Use one or the other.
   * @deprecated
   */
  defaultValue?: number;

  /**
   * The initial value of the Slider. Use this if you intend to pass in a new value as a result of onChange events.
   * This value is mutually exclusive to defaultValue. Use one or the other.
   * @deprecated
   */
  value?: number;

  /**
   * The min value of the Slider
   * @defaultvalue 0
   * @deprecated
   */
  min?: number;

  /**
   * The max value of the Slider
   * @defaultvalue 10
   * @deprecated
   */
  max?: number;

  /**
   * The difference between the two adjacent values of the Slider
   * @defaultvalue 1
   * @deprecated
   */
  step?: number;

  /**
   * Whether to show the value on the right of the Slider.
   * @defaultvalue true
   * @deprecated
   */
  showValue?: boolean;

  /**
   * Callback when the value has been changed
   * @deprecated
   */
  onChange?: (value: number) => void;

  /**
   * Callback on mouse up or touch end
   * @deprecated
   */
  onChanged?: (event: MouseEvent | TouchEvent | KeyboardEvent, value: number) => void;

  /**
   * A description of the Slider for the benefit of screen readers.
   * @deprecated
   */
  ariaLabel?: string;

  /**
   * A text description of the Slider number value for the benefit of screen readers.
   * This should be used when the Slider number value is not accurately represented by a number.
   * @deprecated
   */
  ariaValueText?: (value: number) => string;
  /**
   * Optional flag to render the slider vertically. Defaults to rendering horizontal.
   * @deprecated
   */
  vertical?: boolean;

  /**
   * Optional flag to render the Slider as disabled.
   * @defaultvalue false
   * @deprecated
   */
  disabled?: boolean;

  /**
   * Optional className to attach to the slider root element.
   * @deprecated
   */
  className?: string;

  /**
   * Optional mixin for additional props on the thumb button within the slider.
   * @deprecated
   */
  buttonProps?: React.HTMLAttributes<HTMLButtonElement>;

  /**
   * Optional function to format the slider value.
   * @deprecated
   */
  valueFormat?: (value: number) => string;

  /**
   * Optional flag to attach the origin of slider to zero. Helpful when the range include negatives.
   * @defaultvalue false
   * @deprecated
   */
  originFromZero?: boolean;

  /**
   * Optional flag to display tooltip on hover.
   * @defaultvalue false
   * @deprecated
   */
  showThumbTooltip?: boolean;

  /**
   * Optional flag to indicate whether to have the Slider component render tick marks or add custom labels
   * If marks is `true`, tick marks will be placed according to the value of the `step` prop.
   * If marks is an array, it should contain objects with keys of `value` (denote the where to place the label on the
   * slider if specified) and `label` (what to label to display at specified position).
   * @defaultvalue false
   * @deprecated
   */
  marks?: boolean | ISliderMarks[];

  /**
   *  Optional flag to decide that thumb will snap to closest value while moving the slider.
   *  @defaultvalue false
   * @deprecated
   */
  snapToStep?: boolean;
}

/**
 * @deprecated
 * {@docCategory Slider}
 */
export type ISliderStyleProps = Required<Pick<ISliderProps, 'theme'>> &
  Pick<ISliderProps, 'className' | 'disabled' | 'vertical'> & {
    /** @deprecated */
    showTransitions?: boolean;
    /** @deprecated */
    showValue?: boolean;
    /** @deprecated */
    titleLabelClassName?: string;
  };

/**
 * @deprecated
 * {@docCategory Slider}
 */
export interface ISliderStyles {
  /**
   * Style set for the root element.
   * @deprecated
   */
  root: IStyle;

  /**
   * Style set for the title label above the slider.
   * @deprecated
   */
  titleLabel: IStyle;

  /**
   * Style set for the container of the slider.
   * @deprecated
   */
  container: IStyle;

  /**
   * Style set for the actual box containting interactive elements of the slider.
   * @deprecated
   */
  slideBox: IStyle;

  /**
   * Style set for element that contains all the lines.
   * @deprecated
   */
  line: IStyle;

  /**
   * Style set for thumb of the slider.
   * @deprecated
   */
  thumb: IStyle;

  /**
   * Style set for both active and inactive sections of the line.
   * @deprecated
   */
  lineContainer: IStyle;

  /**
   * Style set for active portion of the line.
   * @deprecated
   */
  activeSection: IStyle;

  /**
   * Style set for inactive portion of the line.
   * @deprecated
   */
  inactiveSection: IStyle;

  /**
   * Style set for value label on right/below of the slider.
   * @deprecated
   */
  valueLabel: IStyle;

  /**
   * Style set for tick on 0 on number line. This element only shows up when originFromZero prop is true.
   * @deprecated
   */
  zeroTick: IStyle;

  /**
   * Style set for tick on number line. This element only shows up when marks prop is true.
   * @deprecated
   */
  regularTick: IStyle;

  /**
   * Style set for specified labels on number line. This element only shows up when marks prop is true.
   * @deprecated
   */
  regularLabel: IStyle;
}
