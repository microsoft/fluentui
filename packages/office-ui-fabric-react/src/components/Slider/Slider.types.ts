import * as React from 'react';
import { SliderBase } from './Slider.base';
import { IStyle, ITheme } from '../../Styling';
import { IStyleFunctionOrObject, IRefObject } from '../../Utilities';

export interface ISlider {
  value: number | undefined;

  focus: () => void;
}

export interface ISliderProps extends React.ClassAttributes<SliderBase> {
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
   * Callback when the value has been changed
   */
  onChange?: (value: number) => void;

  /**
   * Callback on mouse up or touch end
   */
  onChanged?: (event: MouseEvent | TouchEvent, value: number) => void;

  /**
   * A description of the Slider for the benefit of screen readers.
   */
  ariaLabel?: string;

  /**
   * A text description of the Slider number value for the benefit of screen readers.
   * This should be used when the Slider number value is not accurately represented by a number.
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

  /**
   * Optional function to format the slider value.
   */
  valueFormat?: (value: number) => string;
}

export type ISliderStyleProps = Required<Pick<ISliderProps, 'theme'>> &
  Pick<ISliderProps, 'className' | 'disabled' | 'vertical'> & {
    showTransitions?: boolean;
    showValue?: boolean;
    titleLabelClassName?: string;
  };

export interface ISliderStyles {
  root: IStyle;
  titleLabel: IStyle;
  container: IStyle;
  slideBox: IStyle;
  line: IStyle;
  thumb: IStyle;
  lineContainer: IStyle;
  activeSection: IStyle;
  inactiveSection: IStyle;
  valueLabel: IStyle;
}
