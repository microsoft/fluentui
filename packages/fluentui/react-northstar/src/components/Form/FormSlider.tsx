import { compose } from '@fluentui/react-bindings';
import { commonPropTypes } from '../../utils';
import * as customPropTypes from '@fluentui/react-proptypes';
import FormFieldCustom, { FormFieldCustomProps, FormFieldCustomStylesProps } from './FormFieldCustom';
import Slider, { SliderProps } from '../Slider/Slider';

interface FormSliderOwnProps extends Omit<SliderProps, 'accessibility'> {}

export interface FormSliderProps extends FormFieldCustomProps, FormSliderOwnProps {}
export type FormSliderStylesProps = never;

export const FormSliderClassName = 'ui-form-slider';

const FormSlider = compose<
  'div',
  FormSliderProps,
  FormSliderStylesProps,
  FormFieldCustomProps,
  FormFieldCustomStylesProps
>(FormFieldCustom, {
  className: FormSliderClassName,
  displayName: 'FormSlider',
  overrideStyles: true,
  shorthandConfig: {},
  slotProps: () => ({
    control: {
      as: Slider,
    },
  }),
});

FormSlider.propTypes = {
  ...commonPropTypes.createCommon({
    content: 'shorthand',
  }),
  control: customPropTypes.shorthandAllowingChildren,
};

export default FormSlider;
