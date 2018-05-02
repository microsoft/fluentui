import * as React from 'react';
import { SliderBase } from './Slider.base';
import { ITheme, IStyle } from '../../Styling';
import { IStyleFunction } from '../../Utilities';

export interface ISlider {
  value: number | undefined;

  focus: () => void;
}

/**
 * Props which alter Slider base styles.
 */
export interface ISliderStyleProps {
  /**
   * Accept theme prop.
   */
  theme: ITheme;
  /**
   * Accept custom classNames.
   */
  className?: string;
  /**
   * Accept the orientation of the slider.
   */
  vertical?: boolean;

  buttonClassName?: string;

  showValue?: boolean;

  disabled?: boolean;
}

/**
 * Available element styles.
 */
export interface ISliderStyles {
  /**
   * Style for the root element.
   */
  root: IStyle;
  /**
   * Style for the slider container element.
   */
  container: IStyle;
  /**
   * Style for the slide box element.
   */
  slideBox: IStyle;
  /**
   * Style for the slider's line (track) element.
   */
  line: IStyle;
  /**
   * Style for the slider's thumb draggable element.
   */
  thumb: IStyle;
  /**
   * Style for the slider's active state element.
   */
  active: IStyle;
  /**
   * Style for the slider's inactive state element.
   */
  inactive: IStyle;
  /**
   * Style for the slider's value element.
   */
  value: IStyle;
  /**
   * Style for the slider's transition animations.
   */
  showTransitions: IStyle;
}

export interface ISliderProps extends React.Props<SliderBase> {
  /**
   * Optional callback to access the ISlider interface. Use this instead of ref for accessing
   * the public methods and properties of the component.
   */
  componentRef?: (component: ISlider | null) => void;

  /**
   * Call to provide customized styling that will layer on top of the variant rules.
   */
  getStyles?: IStyleFunction<ISliderStyleProps, ISliderStyles>;

  /**
   * Theme to apply to the component.
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
   * The min value of the Slider
   * @default 0
   */
  min?: number;

  /**
   * The max value of the Slider
   * @default 10
   */
  max?: number;

  /**
   * The difference between the two adjacent values of the Slider
   * @default 1
   */
  step?: number;

  /**
   * Whether to show the value on the right of the Slider.
   * @default true
   */
  showValue?: boolean;

  /**
   * Callback when the value has been changed
   */
  onChange?: (value: number) => void;

  /**
   * A description of the Slider for the benefit of screen readers.
   */
  ariaLabel?: string;

  /**
   * A text description of the Slider number value for the benefit of screen readers. This should be used when the Slider number value is not accurately represented by a number.
   */
  ariaValueText?: (value: number) => string;
  /**
   * Optional flag to render the slider vertically. Defaults to rendering horizontal.
   */
  vertical?: boolean;

  /**
   * Optional flag to render the Slider as disabled.
   */
  disabled?: boolean;

  /**
  * Optional className to attach to the slider root element.
  */
  className?: string;

  /**
   * Optional mixin for additional props on the thumb button within the slider.
   */
  buttonProps?: React.HTMLAttributes<HTMLButtonElement>;
}
