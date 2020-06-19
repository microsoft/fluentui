import { compose } from '@fluentui/react-bindings';
import { commonPropTypes } from '../../utils';
import _FormFieldBase, { FormFieldBaseProps } from './utils/formFieldBase';
import Slider, { SliderProps } from '../Slider/Slider';
import * as PropTypes from 'prop-types';

interface FormSliderOwnProps extends SliderProps {}
type SelectedFormFieldCustomProps = Omit<
  FormFieldBaseProps,
  'control' | 'styles' | 'accessibility' | 'design' | 'variables'
>;
export interface FormSliderProps extends SelectedFormFieldCustomProps, FormSliderOwnProps {}
export type FormSliderStylesProps = never;
export const formSliderClassName = 'ui-form__slider';

/**
 * An FormSlider renders a Slider wrapped by FormField.
 */
const FormSlider = compose<'div', FormSliderProps, FormSliderStylesProps, SelectedFormFieldCustomProps, {}>(
  _FormFieldBase,
  {
    className: formSliderClassName,
    displayName: 'FormSlider',
    overrideStyles: true,
    handledProps: Slider.handledProps,
    slots: {
      control: Slider,
    },
    slotProps: ({ onChange }) => ({
      control: {
        onChange,
      },
    }),
  },
);

FormSlider.propTypes = {
  ...commonPropTypes.createCommon({
    content: false,
    children: false,
  }),
  onChange: PropTypes.func,
};

export default FormSlider;
