import { compose } from '@fluentui/react-bindings';
import { TextArea, TextAreaProps } from '../TextArea/TextArea';
import { _FormFieldBase, FormFieldBaseProps } from './utils/formFieldBase';
import { commonPropTypes } from '../../utils';

interface FormTextAreaOwnProps extends Omit<TextAreaProps, 'accessibility'> {}
type SelectedFormFieldCustomProps = Omit<
  FormFieldBaseProps,
  'control' | 'styles' | 'accessibility' | 'design' | 'variables'
>;
export interface FormTextAreaProps extends SelectedFormFieldCustomProps, FormTextAreaOwnProps {}
export type FormTextAreaStylesProps = never;

export const formTextAreaClassName = 'ui-form__textarea';

/**
 * An FormTextArea renders a TextArea wrapped by FormField.
 */
export const FormTextArea = compose<
  'textarea',
  FormTextAreaProps,
  FormTextAreaStylesProps,
  SelectedFormFieldCustomProps,
  {}
>(_FormFieldBase, {
  className: formTextAreaClassName,
  displayName: 'FormTextArea',
  overrideStyles: true,
  slots: {
    control: TextArea,
  },
  slotProps: ({ errorMessage, required }) => ({
    label: {
      required,
    },
    control: {
      error: !!errorMessage,
    },
    message: {
      error: !!errorMessage,
    },
  }),
});

FormTextArea.propTypes = commonPropTypes.createCommon({
  children: false,
  content: false,
});
