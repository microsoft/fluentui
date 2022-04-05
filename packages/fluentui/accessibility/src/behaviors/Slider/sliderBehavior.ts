import { Accessibility } from '../../types';

/**
 * @description
 * Adds attribute 'aria-disabled=true' based on the property 'disabled'.
 * Adds attribute 'aria-orientation=vertical' or 'horizontal' based on the property 'vertical'.
 * Adds attribute 'aria-valuemin' with value based on the property 'min'.
 * Adds attribute 'aria-valuemax' with value based on the property 'max'.
 * Adds attribute 'aria-valuenow' with value based on the property 'value'.
 * Adds attribute 'aria-valuetext' with value based on the callback function 'getA11yValueMessageOnChange'.
 */
export const sliderBehavior: Accessibility<SliderBehaviorProps> = props => ({
  attributes: {
    root: {
      'aria-disabled': props.disabled,
    },
    input: {
      'aria-orientation': props.vertical ? 'vertical' : 'horizontal',
      'aria-valuemin': props.min,
      'aria-valuemax': props.max,
      'aria-valuenow': props.value,
      'aria-valuetext': props.getA11yValueMessageOnChange(props),
    },
  },
});

export type SliderBehaviorProps = {
  disabled?: boolean;
  min?: number;
  max?: number;
  value?: number;
  vertical?: boolean;
  getA11yValueMessageOnChange?: (props: SliderBehaviorProps) => string;
};
