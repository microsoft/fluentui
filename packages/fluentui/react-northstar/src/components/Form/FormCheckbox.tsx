import { compose } from '@fluentui/react-bindings';
import { commonPropTypes } from '../../utils';
import * as customPropTypes from '@fluentui/react-proptypes';
import Checkbox, { CheckboxProps } from '../Checkbox/Checkbox';
import FormFieldCustom, { FormFieldCustomProps, FormFieldCustomStylesProps } from './FormFieldCustom';

interface FormCheckboxOwnProps extends Omit<CheckboxProps, 'styles' | 'accessibility' | 'label'> {}

export interface FormCheckboxProps extends FormFieldCustomProps, FormCheckboxOwnProps {}
export type FormCheckboxStylesProps = never;

export const formCheckboxClassName = 'ui-form-checkbox';

const FormCheckbox = compose<
  'div',
  FormCheckboxProps,
  FormCheckboxStylesProps,
  FormFieldCustomProps,
  FormFieldCustomStylesProps
>(FormFieldCustom, {
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
});

FormCheckbox.defaultProps = {};

FormCheckbox.propTypes = {
  ...commonPropTypes.createCommon({
    content: 'shorthand',
  }),
  control: customPropTypes.shorthandAllowingChildren,
};

export default FormCheckbox;
