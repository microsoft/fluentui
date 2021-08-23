import { compose } from '@fluentui/react-bindings';
import { commonPropTypes } from '../../utils';
import { _FormFieldBase } from './utils/formFieldBase';
import { Slider } from '../Slider/Slider';
import type { FormFieldBaseProps } from './utils/formFieldBase';
import type { SliderProps } from '../Slider/Slider';

interface FormSliderOwnProps extends Omit<SliderProps, 'accessibility'> {}
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
export const FormSlider = compose<'div', FormSliderProps, FormSliderStylesProps, SelectedFormFieldCustomProps, {}>(
  _FormFieldBase,
  {
    className: formSliderClassName,
    displayName: 'FormSlider',
    overrideStyles: true,
    slots: {
      control: Slider,
    },
    slotProps: ({ errorMessage }) => ({
      message: {
        error: !!errorMessage,
      },
    }),
  },
);

FormSlider.propTypes = commonPropTypes.createCommon({
  children: false,
  content: false,
});
