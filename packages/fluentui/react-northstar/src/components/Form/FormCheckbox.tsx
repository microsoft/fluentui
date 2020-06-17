import * as React from 'react';
import * as _ from 'lodash';
import { compose, ComponentWithAs, ShorthandConfig } from '@fluentui/react-bindings';
import { commonPropTypes } from '../../utils';
import Checkbox, { CheckboxProps } from '../Checkbox/Checkbox';
import { ShorthandValue } from '../../types';
import { TextProps } from '../Text/Text';
import FormFieldCustom, { FormFieldCustomProps, FormFieldCustomStylesProps } from './FormFieldCustom';

interface FormCheckboxOwnProps extends Omit<CheckboxProps, 'styles' | 'accessibility'> {
  checkboxLabel?: ShorthandValue<TextProps>;
}

export interface FormCheckboxProps extends FormFieldCustomProps, FormCheckboxOwnProps {}
export type FormCheckboxStylesProps = never;

export const FormCheckboxClassName = 'ui-form-checkbox';

const FormCheckbox = compose<
  'div',
  FormCheckboxProps,
  FormCheckboxStylesProps,
  FormFieldCustomProps,
  FormFieldCustomStylesProps
>(FormFieldCustom, {
  className: FormCheckboxClassName,
  displayName: 'FormCheckbox',
  overrideStyles: true,
  shorthandConfig: {},
  handledProps: ['checkboxLabel'],
  slots: {
    label: () => null,
  },
  slotProps: ({ styles, accessibility, ...props }) => ({
    root: {
      children: (
        <>
          {Checkbox.create(
            {},
            {
              defaultProps: () => ({
                ..._.pick(props, Checkbox.handledProps),
              }),
            },
          )}
        </>
      ),
    },
  }),
}) as ComponentWithAs<'div', FormCheckboxProps> & { shorthandConfig: ShorthandConfig<FormCheckboxProps> };

FormCheckbox.defaultProps = {};

FormCheckbox.propTypes = {
  ...commonPropTypes.createCommon({
    content: 'shorthand',
  }),
};

export default FormCheckbox;
