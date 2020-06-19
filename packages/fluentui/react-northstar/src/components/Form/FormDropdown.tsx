import { compose } from '@fluentui/react-bindings';
import { commonPropTypes } from '../../utils';
import Dropdown, { DropdownProps } from '../Dropdown/Dropdown';
import _FormFieldBase, { FormFieldBaseProps } from './utils/formFieldBase';
import * as PropTypes from 'prop-types';

interface FormDropdownOwnProps extends DropdownProps {}
type SelectedFormFieldCustomProps = Omit<
  FormFieldBaseProps,
  'control' | 'styles' | 'accessibility' | 'design' | 'variables'
>;
export interface FormDropdownProps extends SelectedFormFieldCustomProps, FormDropdownOwnProps {}
export type FormDropdownStylesProps = never;

export const formDropdownClassName = 'ui-form__dropdown';

/**
 * An FormDropdown renders a Dropdown wrapped by FormField.
 */
const FormDropdown = compose<'div', DropdownProps, FormDropdownStylesProps, SelectedFormFieldCustomProps, {}>(
  _FormFieldBase,
  {
    className: formDropdownClassName,
    displayName: 'FormDropdown',
    overrideStyles: true,
    handledProps: Dropdown.handledProps as any,
    slots: {
      control: Dropdown,
    },
    slotProps: ({ errorMessage, onChange }) => ({
      control: {
        onChange,
      },
      message: {
        error: errorMessage,
      },
    }),
  },
);

FormDropdown.propTypes = {
  ...commonPropTypes.createCommon({
    content: false,
    children: false,
  }),
  onChange: PropTypes.func,
};

export default FormDropdown;
