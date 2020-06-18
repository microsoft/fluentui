import { compose } from '@fluentui/react-bindings';
import { commonPropTypes } from '../../utils';
import Checkbox, { CheckboxProps } from '../Checkbox/Checkbox';
import _FormFieldBase, { FormFieldBaseProps } from './utils/formFieldCustom';

interface FormCheckboxOwnProps extends CheckboxProps {}
export type SelectedFormFieldCustomProps = Omit<
  FormFieldBaseProps,
  'control' | 'styles' | 'accessibility' | 'design' | 'label'
>;
export interface FormCheckboxProps extends SelectedFormFieldCustomProps, FormCheckboxOwnProps {}
export type FormCheckboxStylesProps = never;

export const formCheckboxClassName = 'ui-form-checkbox';

const FormCheckbox = compose<'div', FormCheckboxProps, FormCheckboxStylesProps, SelectedFormFieldCustomProps, {}>(
  _FormFieldBase,
  {
    className: formCheckboxClassName,
    displayName: 'FormCheckbox',
    overrideStyles: true,
    slots: {
      label: () => null,
    },
    slotProps: ({ label }) => ({
      control: {
        as: Checkbox,
        label,
      },
    }),
  },
);

FormCheckbox.propTypes = {
  ...commonPropTypes.createCommon({
    content: 'shorthand',
  }),
};

export default FormCheckbox;
