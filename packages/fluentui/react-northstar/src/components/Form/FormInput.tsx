import { compose } from '@fluentui/react-bindings';
import Input, { InputProps } from '../Input/Input';
import _FormFieldBase, { FormFieldBaseProps } from './utils/formFieldBase';
import { commonPropTypes } from '../../utils';

interface FormInputOwnProps extends InputProps {}
type SelectedFormFieldCustomProps = Omit<
  FormFieldBaseProps,
  'control' | 'styles' | 'accessibility' | 'design' | 'variables'
>;
export interface FormInputProps extends SelectedFormFieldCustomProps, FormInputOwnProps {}
export type FormInputStylesProps = never;

export const formInputClassName = 'ui-form__input';

/**
 * An FormInput renders a Input wrapped by FormField.
 */
const FormInput = compose<'div', FormInputProps, FormInputStylesProps, SelectedFormFieldCustomProps, {}>(
  _FormFieldBase,
  {
    className: formInputClassName,
    displayName: 'FormInput',
    overrideStyles: true,
    slots: {
      control: Input,
    },
    slotProps: ({ errorMessage }) => ({
      control: {
        error: !!errorMessage,
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

export default FormInput;
