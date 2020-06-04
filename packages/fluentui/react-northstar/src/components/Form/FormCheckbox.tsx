import { compose, ComponentWithAs, ShorthandConfig } from '@fluentui/react-bindings';
import { commonPropTypes } from '../../utils';
import * as customPropTypes from '@fluentui/react-proptypes';
import FormField, { FormFieldProps, FormFieldStylesProps } from './FormField';
import Checkbox, { CheckboxProps } from '../Checkbox/Checkbox';

interface FormCheckboxOwnProps extends Omit<CheckboxProps, 'styles' | 'accessibility'> {}

export interface FormCheckboxProps extends FormFieldProps, FormCheckboxOwnProps {}
export type FormCheckboxStylesProps = never;

export const FormCheckboxClassName = 'ui-form-checkbox';

const FormCheckbox = compose<'div', FormCheckboxProps, FormCheckboxStylesProps, FormFieldProps, FormFieldStylesProps>(
  FormField,
  {
    className: FormCheckboxClassName,
    displayName: 'FormCheckbox',
    overrideStyles: true,
    shorthandConfig: {},
    slotProps: ({ label }) => ({
      control: {
        as: Checkbox,
        label,
      },
    }),
  },
) as ComponentWithAs<'div', FormCheckboxProps> & { shorthandConfig: ShorthandConfig<FormCheckboxProps> };

FormCheckbox.defaultProps = {};

FormCheckbox.propTypes = {
  ...commonPropTypes.createCommon({
    content: 'shorthand',
  }),
  control: customPropTypes.shorthandAllowingChildren,
};

export default FormCheckbox;
