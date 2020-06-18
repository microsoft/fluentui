import { compose } from '@fluentui/react-bindings';
import { commonPropTypes } from '../../utils';
import * as customPropTypes from '@fluentui/react-proptypes';
import Input, { InputProps } from '../Input/Input';
import FormFieldCustom, { FormFieldCustomProps, FormFieldCustomStylesProps } from './FormFieldCustom';

interface FormInputOwnProps extends Omit<InputProps, 'styles' | 'accessibility'> {}

export interface FormInputProps extends FormFieldCustomProps, FormInputOwnProps {}
export type FormInputStylesProps = never;

export const formInputClassName = 'ui-form-input';

const FormInput = compose<
  'div',
  FormInputProps,
  FormInputStylesProps,
  FormFieldCustomProps,
  FormFieldCustomStylesProps
>(FormFieldCustom, {
  className: formInputClassName,
  displayName: 'FormInput',
  overrideStyles: false,
  shorthandConfig: {},
  slotProps: ({ errorMessage }) => ({
    control: {
      as: Input,
      error: !!errorMessage,
    },
    message: {
      error: !!errorMessage,
    },
  }),
});

FormInput.propTypes = {
  ...commonPropTypes.createCommon({
    content: 'shorthand',
  }),
  control: customPropTypes.shorthandAllowingChildren,
};

export default FormInput;
