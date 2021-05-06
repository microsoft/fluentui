import { compose } from '@fluentui/react-bindings';
import { commonPropTypes } from '../../utils';
import { Checkbox, CheckboxProps } from '../Checkbox/Checkbox';
import { _FormFieldBase, FormFieldBaseProps } from './utils/formFieldBase';

interface FormCheckboxOwnProps extends Omit<CheckboxProps, 'accessibility'> {}
type SelectedFormFieldCustomProps = Omit<
  FormFieldBaseProps,
  'control' | 'styles' | 'accessibility' | 'design' | 'variables' | 'label'
>;
export interface FormCheckboxProps extends SelectedFormFieldCustomProps, FormCheckboxOwnProps {}
export type FormCheckboxStylesProps = never;

export const formCheckboxClassName = 'ui-form__checkbox';

/**
 * An FormCheckbox renders a Checkbox wrapped by FormField.
 */
export const FormCheckbox = compose<
  'div',
  FormCheckboxProps,
  FormCheckboxStylesProps,
  SelectedFormFieldCustomProps,
  {}
>(_FormFieldBase, {
  className: formCheckboxClassName,
  displayName: 'FormCheckbox',
  overrideStyles: true,
  handledProps: ['label'],
  slots: {
    label: () => null,
    control: Checkbox,
  },
  slotProps: ({ label, errorMessage }) => ({
    control: {
      label,
    },
    message: {
      error: !!errorMessage,
    },
  }),
});

FormCheckbox.propTypes = commonPropTypes.createCommon({
  content: false,
  children: false,
});
