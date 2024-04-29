import { compose } from '@fluentui/react-bindings';
import { commonPropTypes } from '../../utils';
import { Button, ButtonProps } from '../Button/Button';
import { _FormFieldBase, FormFieldBaseProps } from './utils/formFieldBase';

interface FormButtonOwnProps extends ButtonProps {}
type SelectedFormFieldCustomProps = Omit<
  FormFieldBaseProps,
  'control' | 'styles' | 'accessibility' | 'design' | 'variables'
>;
export interface FormButtonProps extends SelectedFormFieldCustomProps, FormButtonOwnProps {}
export type FormButtonStylesProps = never;

export const formButtonClassName = 'ui-form__button';

/**
 * An FormButton renders a Button wrapped by FormField.
 */
export const FormButton = compose<'button', FormButtonProps, FormButtonStylesProps, SelectedFormFieldCustomProps, {}>(
  _FormFieldBase,
  {
    className: formButtonClassName,
    displayName: 'FormButton',
    overrideStyles: true,
    slots: {
      control: Button,
    },
  },
);

FormButton.propTypes = commonPropTypes.createCommon({
  content: false, // Should be `true`, but will be passed via unhandled props to a Button
  children: false,
});
