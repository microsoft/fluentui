import { compose } from '@fluentui/react-bindings';
import { commonPropTypes } from '../../utils';
import * as customPropTypes from '@fluentui/react-proptypes';
import Dropdown, { DropdownProps } from '../Dropdown/Dropdown';
import FormFieldCustom, { FormFieldCustomProps, FormFieldCustomStylesProps } from './FormFieldCustom';

interface FormDropdownOwnProps extends Omit<DropdownProps, 'styles'> {}

export interface FormDropdownProps extends FormFieldCustomProps, FormDropdownOwnProps {}
export type FormDropdownStylesProps = never;

export const formDropdownClassName = 'ui-form-dropdown';

const FormDropdown = compose<
  'div',
  FormDropdownProps,
  FormDropdownStylesProps,
  FormFieldCustomProps,
  FormFieldCustomStylesProps
>(FormFieldCustom, {
  className: formDropdownClassName,
  displayName: 'FormDropdown',
  overrideStyles: true,
  shorthandConfig: {},
  slotProps: ({ errorMessage }) => ({
    control: {
      as: Dropdown,
    },
    message: {
      error: errorMessage,
    },
  }),
});

FormDropdown.propTypes = {
  ...commonPropTypes.createCommon({
    content: 'shorthand',
  }),
  control: customPropTypes.shorthandAllowingChildren,
};

export default FormDropdown;
