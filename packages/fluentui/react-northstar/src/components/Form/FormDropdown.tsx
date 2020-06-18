import { compose } from '@fluentui/react-bindings';
import { commonPropTypes } from '../../utils';
import Dropdown, { DropdownProps } from '../Dropdown/Dropdown';
import _FormFieldBase, { FormFieldBaseProps } from './utils/formFieldCustom';

interface FormDropdownOwnProps extends DropdownProps {}
export type SelectedFormFieldCustomProps = Omit<
  FormFieldBaseProps,
  'control' | 'styles' | 'accessibility' | 'design' | 'variables'
>;
export interface FormDropdownProps extends SelectedFormFieldCustomProps, FormDropdownOwnProps {}
export type FormDropdownStylesProps = never;

export const formDropdownClassName = 'ui-form-dropdown';

const FormDropdown = compose<'div', FormDropdownProps, FormDropdownStylesProps, SelectedFormFieldCustomProps, {}>(
  _FormFieldBase,
  {
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
  },
);

FormDropdown.propTypes = {
  ...commonPropTypes.createCommon({
    content: 'shorthand',
  }),
};

export default FormDropdown;
