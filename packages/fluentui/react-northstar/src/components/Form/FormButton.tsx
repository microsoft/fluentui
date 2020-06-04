import { compose, ComponentWithAs, ShorthandConfig } from '@fluentui/react-bindings';
import { commonPropTypes } from '../../utils';
import * as customPropTypes from '@fluentui/react-proptypes';
import FormField, { FormFieldProps, FormFieldStylesProps } from './FormField';
import Button, { ButtonProps } from '../Button/Button';

interface FormButtonOwnProps extends Omit<ButtonProps, 'styles' | 'accessibility'> {}

export interface FormButtonProps extends FormFieldProps, FormButtonOwnProps {}
export type FormButtonStylesProps = never;

export const FormButtonClassName = 'ui-form-button';

const FormButton = compose<'div', FormButtonProps, FormButtonStylesProps, FormFieldProps, FormFieldStylesProps>(
  FormField,
  {
    className: FormButtonClassName,
    displayName: 'FormButton',
    overrideStyles: true,
    shorthandConfig: {
      mappedProp: 'content',
    },
    mapPropsToSlotProps: ({ content }) => ({
      control: {
        as: Button,
        content,
      },
    }),
  },
) as ComponentWithAs<'div', FormButtonProps> & { shorthandConfig: ShorthandConfig<FormButtonProps> };

FormButton.defaultProps = {};

FormButton.propTypes = {
  ...commonPropTypes.createCommon({
    content: 'shorthand',
  }),
  control: customPropTypes.shorthandAllowingChildren,
};

export default FormButton;
