import * as React from 'react';
import { compose, ComponentWithAs, ShorthandConfig } from '@fluentui/react-bindings';
import { commonPropTypes } from '../../utils';

import Input, { InputProps } from '../Input/Input';
import FormFieldCustom, { FormFieldCustomProps, FormFieldCustomStylesProps } from './FormFieldCustom';
import * as _ from 'lodash';

interface FormInputOwnProps extends Omit<InputProps, 'styles' | 'accessibility'> {}

export interface FormInputProps extends FormFieldCustomProps, FormInputOwnProps {}
export type FormInputStylesProps = never;

export const FormInputClassName = 'ui-form-input';

const FormInput = compose<
  'div',
  FormFieldCustomProps,
  FormInputStylesProps,
  FormFieldCustomProps,
  FormFieldCustomStylesProps
>(FormFieldCustom, {
  className: FormInputClassName,
  displayName: 'FormInput',
  overrideStyles: false,
  shorthandConfig: {},
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
  }),
}) as ComponentWithAs<'div', FormInputProps> & { shorthandConfig: ShorthandConfig<FormInputProps> };

FormInput.propTypes = {
  ...commonPropTypes.createCommon({
    content: 'shorthand',
  }),
};

export default FormInput;
