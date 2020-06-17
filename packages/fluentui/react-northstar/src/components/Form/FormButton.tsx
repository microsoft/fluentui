import * as React from 'react';
import * as _ from 'lodash';
import { compose } from '@fluentui/react-bindings';
import { commonPropTypes } from '../../utils';
import Button, { ButtonProps, buttonHandledProps } from '../Button/Button';
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
  slotProps: ({ accessibility, styles, ...props }) => ({
    root: {
      children: (
        <>
          {Button.create(
            {},
            {
              defaultProps: () => ({
                ..._.pick(props, buttonHandledProps),
              }),
            },
          )}
        </>
      ),
    },
  }),
});

FormButton.propTypes = {
  ...commonPropTypes.createCommon({
    content: 'shorthand',
  }),
};

export default FormButton;
