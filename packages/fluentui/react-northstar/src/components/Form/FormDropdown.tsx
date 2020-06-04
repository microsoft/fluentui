import { compose, ComponentWithAs, ShorthandConfig } from '@fluentui/react-bindings';
import { commonPropTypes } from '../../utils';
import * as customPropTypes from '@fluentui/react-proptypes';
import FormField, { FormFieldProps, FormFieldStylesProps } from './FormField';
import Dropdown, { DropdownProps } from '../Dropdown/Dropdown';

interface FormDropdownOwnProps extends Omit<DropdownProps, 'styles'> {}

export interface FormDropdownProps extends FormFieldProps, FormDropdownOwnProps {}
export type FormDropdownStylesProps = never;

export const FormDropdownClassName = 'ui-form-dropdown';

const FormDropdown = compose<'div', FormDropdownProps, FormDropdownStylesProps, FormFieldProps, FormFieldStylesProps>(
  FormField,
  {
    className: FormDropdownClassName,
    displayName: 'FormDropdown',
    overrideStyles: true,
    shorthandConfig: {},
    slotProps: ({ items, placeholder }) => ({
      control: {
        as: Dropdown,
        items,
        placeholder,
      },
    }),
  },
) as ComponentWithAs<'div', FormDropdownProps> & { shorthandConfig: ShorthandConfig<FormDropdownProps> };

FormDropdown.defaultProps = {};

FormDropdown.propTypes = {
  ...commonPropTypes.createCommon({
    content: 'shorthand',
  }),
  control: customPropTypes.shorthandAllowingChildren,
};

export default FormDropdown;
