import { compose, ComponentWithAs, ShorthandConfig, useUnhandledProps } from '@fluentui/react-bindings';
import { commonPropTypes } from '../../utils';
import * as customPropTypes from '@fluentui/react-proptypes';
import FormField, { FormFieldProps, FormFieldStylesProps } from './FormField';
import Dropdown, { DropdownProps } from '../Dropdown/Dropdown';

interface FormDropdownOwnProps {
  items: DropdownProps['items'];
}

export interface FormDropdownProps extends FormFieldProps, FormDropdownOwnProps {}
export type FormDropdownStylesProps = never;

export const FormDropdownClassName = 'ui-form-input';

const FormDropdown = compose<'div', FormDropdownProps, FormDropdownStylesProps, FormFieldProps, FormFieldStylesProps>(
  (props, ref, composeOptions) => {
    const unhandledProps = useUnhandledProps(composeOptions.handledProps, props);

    return FormField.create(
      {},
      {
        defaultProps: () => ({
          ref,
          control: {
            as: Dropdown,
            items: props.items,
          },
          ...unhandledProps,
        }),
      },
    );
  },
  {
    className: FormDropdownClassName,
    displayName: 'FormDropdown',
    overrideStyles: true,
    handledProps: ['items'],
    shorthandConfig: {
      mappedProp: 'items',
    },
  },
) as ComponentWithAs<'div', FormDropdownProps> & { shorthandConfig: ShorthandConfig<FormDropdownProps> };

FormDropdown.defaultProps = {};

FormDropdown.propTypes = {
  ...commonPropTypes.createCommon({
    content: 'shorthand',
  }),
  control: customPropTypes.shorthandAllowingChildren,
};

export default FormDropdown;
