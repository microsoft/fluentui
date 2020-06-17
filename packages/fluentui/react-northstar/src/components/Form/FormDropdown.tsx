import * as React from 'react';
import * as _ from 'lodash';
import { compose } from '@fluentui/react-bindings';
import { commonPropTypes, createShorthand } from '../../utils';
import Dropdown, { DropdownProps } from '../Dropdown/Dropdown';
import FormFieldCustom, { FormFieldCustomProps, FormFieldCustomStylesProps } from './FormFieldCustom';

interface FormDropdownOwnProps extends Omit<DropdownProps, 'styles'> {}

export interface FormDropdownProps extends FormFieldCustomProps, FormDropdownOwnProps {}
export type FormDropdownStylesProps = never;

export const formDropdownClassName = 'ui-form-dropdown';

const FormDropdown = compose<
  'div',
  FormDropdownProps,
  FormDropdownStylesProps,
  FormFieldCustomProps,
  FormFieldCustomStylesProps
>(FormFieldCustom, {
  className: formDropdownClassName,
  displayName: 'FormDropdown',
  overrideStyles: true,
  slotProps: ({ styles, ...props }) => ({
    root: {
      children: (
        <>
          {createShorthand(
            Dropdown,
            {},
            {
              defaultProps: () => ({
                error: !!props.errorMessage,
                ..._.pick(props, Dropdown.handledProps),
              }),
            },
          )}
        </>
      ),
    },
    message: {
      error: props.errorMessage,
    },
  }),
});

FormDropdown.propTypes = {
  ...commonPropTypes.createCommon({
    content: 'shorthand',
  }),
};

export default FormDropdown;
