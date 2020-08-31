import { compose } from '@fluentui/react-bindings';
import { commonPropTypes } from '../../utils';
import { Datepicker, DatepickerProps } from '../Datepicker/Datepicker';
import { _FormFieldBase, FormFieldBaseProps } from './utils/formFieldBase';

interface FormDatepickerOwnProps extends DatepickerProps {}
type SelectedFormFieldCustomProps = Omit<
  FormFieldBaseProps,
  'control' | 'styles' | 'accessibility' | 'design' | 'variables'
>;
export interface FormDropdownProps extends SelectedFormFieldCustomProps, FormDatepickerOwnProps {}
export type FormDropdownStylesProps = never;

export const formDatepickerClassName = 'ui-form__datepicker';

/**
 * An FormDatepicker renders a Datepicker wrapped by FormField.
 */
export const FormDatepicker = compose<
  'div',
  DatepickerProps,
  FormDropdownStylesProps,
  SelectedFormFieldCustomProps,
  {}
>(_FormFieldBase, {
  className: formDatepickerClassName,
  displayName: 'FormDatepicker',
  overrideStyles: true,
  slots: {
    control: Datepicker,
  },
  slotProps: ({ errorMessage, required }) => ({
    control: {
      required,
    },
    message: {
      error: !!errorMessage,
    },
  }),
});

FormDatepicker.propTypes = commonPropTypes.createCommon({
  accessibility: false,
  children: false,
  content: false,
});
