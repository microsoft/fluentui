import { compose } from '@fluentui/react-bindings';
import { Input, InputProps } from '../Input/Input';
import { _FormFieldBase, FormFieldBaseProps } from './utils/formFieldBase';
import { commonPropTypes } from '../../utils';

interface FormInputOwnProps extends Omit<InputProps, 'accessibility'> {}
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
      control: Input,
    },
    slotProps: ({ errorMessage, required, labelPosition }) => ({
      label: {
        required,
      },
      control: {
        error: !!errorMessage,
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
