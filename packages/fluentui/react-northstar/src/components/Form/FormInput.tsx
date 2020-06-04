import { compose, ComponentWithAs, ShorthandConfig } from '@fluentui/react-bindings';
import { commonPropTypes } from '../../utils';
import * as customPropTypes from '@fluentui/react-proptypes';

import FormField, { FormFieldProps, FormFieldStylesProps } from './FormField';
import Input, { InputProps } from '../Input/Input';

interface FormInputOwnProps extends Omit<InputProps, 'styles' | 'accessibility'> {}

export interface FormInputProps extends FormFieldProps, FormInputOwnProps {}
export type FormInputStylesProps = never;

export const FormInputClassName = 'ui-form-input';

const FormInput = compose<'div', FormInputProps, FormInputStylesProps, FormFieldProps, FormFieldStylesProps>(
  FormField,
  {
    className: FormInputClassName,
    displayName: 'FormInput',
    overrideStyles: true,
    shorthandConfig: {},
    slotProps: _ => ({
      control: {
        as: Input,
      },
    }),
  },
) as ComponentWithAs<'div', FormInputProps> & { shorthandConfig: ShorthandConfig<FormInputProps> };

FormInput.propTypes = {
  ...commonPropTypes.createCommon({
    content: 'shorthand',
  }),
  control: customPropTypes.shorthandAllowingChildren,
};

export default FormInput;
