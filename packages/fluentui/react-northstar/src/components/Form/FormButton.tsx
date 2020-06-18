import { compose } from '@fluentui/react-bindings';
import { commonPropTypes } from '../../utils';
import * as customPropTypes from '@fluentui/react-proptypes';
import Button, { ButtonProps } from '../Button/Button';
import FormFieldCustom, { FormFieldCustomProps, FormFieldCustomStylesProps } from './FormFieldCustom';

interface FormButtonOwnProps extends Omit<ButtonProps, 'styles' | 'accessibility'> {}

export interface FormButtonProps extends FormFieldCustomProps, FormButtonOwnProps {}
export type FormButtonStylesProps = never;

export const formButtonClassName = 'ui-form-button';

const FormButton = compose<
  'div',
  FormButtonProps,
  FormButtonStylesProps,
  FormFieldCustomProps,
  FormFieldCustomStylesProps
>(FormFieldCustom, {
  className: formButtonClassName,
  displayName: 'FormButton',
  overrideStyles: true,
  shorthandConfig: {},
  slotProps: () => ({
    control: {
      as: Button,
    },
  }),
});

FormButton.propTypes = {
  ...commonPropTypes.createCommon({
    content: 'shorthand',
  }),
  control: customPropTypes.shorthandAllowingChildren,
};

export default FormButton;
