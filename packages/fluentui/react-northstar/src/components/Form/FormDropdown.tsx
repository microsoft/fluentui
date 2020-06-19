import { compose } from '@fluentui/react-bindings';
import { commonPropTypes } from '../../utils';
import Dropdown, { DropdownProps } from '../Dropdown/Dropdown';
import _FormFieldBase, { FormFieldBaseProps } from './utils/formFieldBase';

interface FormDropdownOwnProps extends DropdownProps {}
type SelectedFormFieldCustomProps = Omit<
  FormFieldBaseProps,
  'control' | 'styles' | 'accessibility' | 'design' | 'variables'
>;
export interface FormDropdownProps extends SelectedFormFieldCustomProps, FormDropdownOwnProps {}
export type FormDropdownStylesProps = never;

export const formDropdownClassName = 'ui-form-dropdown';

/**
 * An FormDropdown renders a Dropdown wrapped by FormField.
 */
const FormDropdown = compose<'div', FormDropdownProps, FormDropdownStylesProps, SelectedFormFieldCustomProps, {}>(
  _FormFieldBase,
  {
    className: formDropdownClassName,
    displayName: 'FormDropdown',
    overrideStyles: true,
    shorthandConfig: {},
    slots: {
      control: Dropdown,
    },
    slotProps: ({ errorMessage }) => ({
      message: {
        error: !!errorMessage,
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
