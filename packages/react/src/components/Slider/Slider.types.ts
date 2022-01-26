import * as React from 'react';
import type { IStyle, ITheme } from '@fluentui/style-utilities';
import type { IStyleFunctionOrObject, IRefObject } from '@fluentui/utilities';

/**
 * {@docCategory Slider}
 */
export interface ISlider {
  value: number | undefined;

  focus: () => void;

  range?: [number, number];
}

/**
 * {@docCategory Slider}
 */
export interface ISliderProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'defaultValue' | 'onChange'>,
    React.RefAttributes<HTMLDivElement> {
  /**
   * Optional callback to access the ISlider interface. Use this instead of ref for accessing
   * the public methods and properties of the component.
   */
  componentRef?: IRefObject<ISlider>;

  /**
   * Call to provide customized styling that will layer on top of the variant rules.
   */
  styles?: IStyleFunctionOrObject<ISliderStyleProps, ISliderStyles>;

  /**
   * Theme provided by High-Order Component.
   */
  theme?: ITheme;

  /**
   * Description label of the Slider
   */
  label?: string;

  /**
   * The initial value of the Slider. Use this if you intend for the Slider to be an uncontrolled component.
   * This value is mutually exclusive to value. Use one or the other.
   */
  defaultValue?: number;

  /**
   * The initial value of the Slider. Use this if you intend to pass in a new value as a result of onChange events.
   * This value is mutually exclusive to defaultValue. Use one or the other.
   */
  value?: number;

  /**
   * The initial lower value of the Slider is ranged is true. Use this if you intend for the Slider to be an
   * uncontrolled component. This value is mutually exclusive to lowerValue. Use one or the other.
   */
  defaultLowerValue?: number;

  /**
   * The initial lower value of the Slider is ranged is true. Use this if you intend to pass in a new value as a
   * result of onChange events. This value is mutually exclusive to defaultLowerValue. Use one or the other.
   */
  lowerValue?: number;

  /**
   * The min value of the Slider
   * @defaultvalue 0
   */
  min?: number;

  /**
   * The max value of the Slider
   * @defaultvalue 10
   */
  max?: number;

  /**
   * The difference between the two adjacent values of the Slider
   * @defaultvalue 1
   */
  step?: number;

  /**
   * Whether to show the value on the right of the Slider.
   * @defaultvalue true
   */
  showValue?: boolean;

  /**
   * Callback when the value has been changed. This will be called on every individual step;
   * to only be notified after changes have stopped, use `onChanged` instead.
   * If `ranged` is true, `value` is the upper value, and `range` contains the lower and upper bounds of the range.
   */
  onChange?: (
    value: number,
    range?: [number, number],
    event?: React.MouseEvent | React.TouchEvent | MouseEvent | TouchEvent | React.KeyboardEvent,
  ) => void;

  /**
   * Callback on mouse up, touch end, or after key presses have stopped.
   * To be notified on every individual step, use `onChange` instead.
   * @param event - Type is `React.MouseEvent | React.TouchEvent | MouseEvent | TouchEvent | React.KeyboardEvent`
   * (may be corrected in a future major version)
   */
  // TODO: fix event type if we release another major version
  onChanged?: (event: any, value: number, range?: [number, number]) => void;

  /**
   * A description of the Slider for the benefit of screen readers.
   */
  ariaLabel?: string;

  /**
   * If `ranged` is true, display two thumbs that allow the lower and upper bounds of a range to be selected.
   * The lower bound is defined by `lowerValue`, and the upper bound is defined by `value`.
   */
  ranged?: boolean;

  /**
   * A text description of the Slider number value for the benefit of screen readers.
   * This should be used when the Slider number value is not accurately represented by a number.
   */
  ariaValueText?: (value: number) => string;

  /**
   * Whether to render the slider vertically.
   * @default `false` (render horizontally)
   */
  vertical?: boolean;

  /**
   * Whether to render the Slider as disabled.
   * @defaultvalue false
   */
  disabled?: boolean;

  /**
   * Whether to decide that thumb will snap to closest value while moving the slider
   * @defaultvalue false
   */
  snapToStep?: boolean;

  /**
   * Class name to attach to the slider root element.
   */
  className?: string;

  /**
   * Additional props for the actual `role="slider"` (slider box) element.
   * (Note that this element is not actually a button in the current implementation.)
   */
  buttonProps?: React.HTMLAttributes<HTMLButtonElement>;

  /**
   * Custom formatter for the slider value.
   */
  valueFormat?: (value: number) => string;

  /**
   * Whether to attach the origin of slider to zero. Helpful when the range include negatives.
   * @defaultvalue false
   */
  originFromZero?: boolean;
}

/**
 * {@docCategory Slider}
 */
export type ISliderStyleProps = Required<Pick<ISliderProps, 'theme'>> &
  Pick<ISliderProps, 'className' | 'disabled' | 'vertical' | 'ranged'> & {
    showTransitions?: boolean;
    showValue?: boolean;
    titleLabelClassName?: string;
  };

/**
 * {@docCategory Slider}
 */
export interface ISliderStyles {
  /**
   * Style set for the root element.
   */
  root: IStyle;

  /**
   * Style set for the title label above the slider.
   */
  titleLabel: IStyle;

  /**
   * Style set for the container of the slider.
   */
  container: IStyle;

  /**
   * Style set for the actual box containting interactive elements of the slider.
   */
  slideBox: IStyle;

  /**
   * Style set for element that contains all the lines.
   */
  line: IStyle;

  /**
   * Style set for thumb of the slider.
   */
  thumb: IStyle;

  /**
   * Style set for both active and inactive sections of the line.
   */
  lineContainer: IStyle;

  /**
   * Style set for active portion of the line.
   */
  activeSection: IStyle;

  /**
   * Style set for inactive portion of the line.
   */
  inactiveSection: IStyle;

  /**
   * Style set for value label on right/below of the slider.
   */
  valueLabel: IStyle;

  /**
   * Style set for tick on 0 on number line. This element only shows up when originFromZero prop is true.
   */
  zeroTick: IStyle;
}
