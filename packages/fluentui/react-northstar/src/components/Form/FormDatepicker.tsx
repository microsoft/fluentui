import { compose } from '@fluentui/react-bindings';
import { commonPropTypes } from '../../utils';
import { Datepicker, DatepickerProps } from '../Datepicker/Datepicker';
import { _FormFieldBase, FormFieldBaseProps } from './utils/formFieldBase';

interface FormDatepickerOwnProps extends DatepickerProps {}
type SelectedFormFieldCustomProps = Omit<
  FormFieldBaseProps,
  'control' | 'styles' | 'accessibility' | 'design' | 'variables' | 'label'
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
  handledProps: ['label', 'labelPosition', 'required'],
  overrideStyles: true,
  slots: {
    control: Datepicker,
    label: () => null,
  },
  slotProps: ({ errorMessage, label, labelPosition, required }) => ({
    control: {
      required,
      label,
      labelPosition,
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
