import { compose } from '@fluentui/react-bindings';
import { commonPropTypes } from '../../utils';
import { _FormFieldBase, FormFieldBaseProps } from './utils/formFieldBase';
import { RadioGroup, RadioGroupProps } from '../RadioGroup/RadioGroup';

interface FormRadioGroupOwnProps extends RadioGroupProps {}
type SelectedFormFieldCustomProps = Omit<
  FormFieldBaseProps,
  'control' | 'styles' | 'accessibility' | 'design' | 'variables'
>;
export interface FormRadioGroupProps extends SelectedFormFieldCustomProps, FormRadioGroupOwnProps {}
export type FormRadioGroupStylesProps = never;

export const formRadioGroupClassName = 'ui-forms';

/**
 * An FormRadioGroup renders a RadioGroup wrapped by FormField.
 */
export const FormRadioGroup = compose<
  'div',
  FormRadioGroupProps,
  FormRadioGroupStylesProps,
  SelectedFormFieldCustomProps,
  {}
>(_FormFieldBase, {
  className: formRadioGroupClassName,
  displayName: 'FormRadioGroup',
  overrideStyles: true,
  slots: {
    control: RadioGroup,
  },
  slotProps: ({ errorMessage }) => ({
    message: {
      error: !!errorMessage,
    },
  }),
});

FormRadioGroup.propTypes = commonPropTypes.createCommon({
  children: false,
  content: false,
});
