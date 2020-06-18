import { compose } from '@fluentui/react-bindings';
import { commonPropTypes } from '../../utils';
import Button, { ButtonProps } from '../Button/Button';
import _FormFieldBase, { FormFieldBaseProps } from './utils/formFieldCustom';

interface FormButtonOwnProps extends ButtonProps {}
export type SelectedFormFieldCustomProps = Omit<
  FormFieldBaseProps,
  'control' | 'styles' | 'accessibility' | 'design' | 'variables'
>;
export interface FormButtonProps extends SelectedFormFieldCustomProps, FormButtonOwnProps {}
export type FormButtonStylesProps = never;

export const formButtonClassName = 'ui-form-button';

const FormButton = compose<'div', FormButtonProps, FormButtonStylesProps, SelectedFormFieldCustomProps, {}>(
  _FormFieldBase,
  {
    className: formButtonClassName,
    displayName: 'FormButton',
    overrideStyles: true,
    shorthandConfig: {},
    slotProps: () => ({
      control: {
        as: Button,
      },
    }),
  },
);

FormButton.propTypes = {
  ...commonPropTypes.createCommon({
    content: 'shorthand',
  }),
};

export default FormButton;
