import * as React from 'react';
import * as _ from 'lodash';
import { compose } from '@fluentui/react-bindings';
import { commonPropTypes } from '../../utils';
import Input, { InputProps } from '../Input/Input';
import FormFieldCustom, { FormFieldCustomProps, FormFieldCustomStylesProps } from './FormFieldCustom';

interface FormInputOwnProps extends Omit<InputProps, 'styles' | 'accessibility'> {}

export interface FormInputProps extends FormFieldCustomProps, FormInputOwnProps {}
export type FormInputStylesProps = never;

export const formInputClassName = 'ui-form-input';

const FormInput = compose<
  'div',
  FormInputProps,
  FormInputStylesProps,
  FormFieldCustomProps,
  FormFieldCustomStylesProps
>(FormFieldCustom, {
  className: formInputClassName,
  displayName: 'FormInput',
  overrideStyles: true,
  slotProps: ({ accessibility, styles, ...props }) => ({
    root: {
      children: (
        <>
          {Input.create(
            {},
            {
              defaultProps: () => ({
                error: !!props.errorMessage,
                ..._.pick(props, Input.handledProps),
              }),
            },
          )}
        </>
      ),
    },
    message: {
      error: !!props.errorMessage,
    },
  }),
});

FormInput.propTypes = {
  ...commonPropTypes.createCommon({
    content: 'shorthand',
  }),
};

export default FormInput;
