import { compose } from '@fluentui/react-bindings';
import { Input, InputProps } from '../Input/Input';
import { _FormFieldBase, FormFieldBaseProps } from './utils/formFieldBase';
import { commonPropTypes } from '../../utils';

interface FormInputOwnProps extends InputProps {}
type SelectedFormFieldCustomProps = Omit<
  FormFieldBaseProps,
  'control' | 'styles' | 'accessibility' | 'design' | 'variables' | 'label'
>;
export interface FormInputProps extends SelectedFormFieldCustomProps, FormInputOwnProps {}
export type FormInputStylesProps = never;

export const formInputClassName = 'ui-form__input';

/**
 * An FormInput renders a Input wrapped by FormField.
 */
export const FormInput = compose<'input', FormInputProps, FormInputStylesProps, SelectedFormFieldCustomProps, {}>(
  _FormFieldBase,
  {
    className: formInputClassName,
    displayName: 'FormInput',
    handledProps: ['label', 'labelPosition', 'required'],
    overrideStyles: true,
    slots: {
      label: () => null,
      control: Input,
    },
    slotProps: ({ errorMessage, label, labelPosition, required }) => ({
      control: {
        error: !!errorMessage,
        label,
        labelPosition,
        required,
      },
      message: {
        error: !!errorMessage,
      },
    }),
  },
);

FormInput.propTypes = commonPropTypes.createCommon({
  children: false,
  content: false,
});
