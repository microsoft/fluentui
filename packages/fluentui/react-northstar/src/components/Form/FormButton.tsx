import { compose } from '@fluentui/react-bindings';
import { commonPropTypes } from '../../utils';
import Button, { ButtonProps } from '../Button/Button';
import _FormFieldBase, { FormFieldBaseProps } from './utils/formFieldBase';
import * as PropTypes from 'prop-types';

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
const FormButton = compose<'div', FormButtonProps, FormButtonStylesProps, SelectedFormFieldCustomProps, {}>(
  _FormFieldBase,
  {
    className: formButtonClassName,
    displayName: 'FormButton',
    overrideStyles: true,
    handledProps: Object.keys(Button.propTypes) as any,
    slots: {
      control: Button,
    },
    slotProps: ({ onFocus, onClick }) => ({
      control: {
        onFocus,
        onClick,
      },
    }),
  },
);

FormButton.propTypes = {
  ...commonPropTypes.createCommon({
    content: false,
    children: false,
  }),
  onFocus: PropTypes.func,
  onClick: PropTypes.func,
};

export default FormButton;
