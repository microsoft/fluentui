import { compose } from '@fluentui/react-bindings';
import { commonPropTypes } from '../../utils';
import Input, { InputProps } from '../Input/Input';
import _FormFieldBase, { FormFieldBaseProps } from './utils/formFieldBase';

interface FormInputOwnProps extends InputProps {}
export type SelectedFormFieldCustomProps = Omit<
  FormFieldBaseProps,
  'control' | 'styles' | 'accessibility' | 'design' | 'variables'
>;
export interface FormInputProps extends SelectedFormFieldCustomProps, FormInputOwnProps {}
export type FormInputStylesProps = never;

export const formInputClassName = 'ui-form-input';

const FormInput = compose<'div', FormInputProps, FormInputStylesProps, SelectedFormFieldCustomProps, {}>(
  _FormFieldBase,
  {
    className: formInputClassName,
    displayName: 'FormInput',
    overrideStyles: false,
    shorthandConfig: {},
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

FormInput.propTypes = {
  ...commonPropTypes.createCommon({
    content: 'shorthand',
  }),
};

export default FormInput;
