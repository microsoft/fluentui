import { compose } from '@fluentui/react-bindings';
import { commonPropTypes } from '../../utils';
import { Datepicker, DatepickerProps } from '../Datepicker/Datepicker';
import { _FormFieldBase, FormFieldBaseProps } from './utils/formFieldBase';

interface FormDatepickerOwnProps extends DatepickerProps {}
type SelectedFormFieldCustomProps = Omit<
  FormFieldBaseProps,
  'control' | 'styles' | 'accessibility' | 'design' | 'variables'
>;
export interface FormDatepickerProps extends SelectedFormFieldCustomProps, FormDatepickerOwnProps {}
export type FormDatepickerStylesProps = never;

export const formDatepickerClassName = 'ui-form__datepicker';

/**
 * An FormDatepicker renders a Datepicker wrapped by FormField.
 */
export const FormDatepicker = compose<
  'div',
  DatepickerProps,
  FormDatepickerStylesProps,
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
