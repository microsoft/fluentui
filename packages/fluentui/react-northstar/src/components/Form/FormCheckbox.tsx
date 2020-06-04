import { compose, ComponentWithAs, ShorthandConfig, useUnhandledProps } from '@fluentui/react-bindings';
import { commonPropTypes } from '../../utils';
import * as customPropTypes from '@fluentui/react-proptypes';
import { ShorthandValue } from '../../types';
import FormField, { FormFieldProps, FormFieldStylesProps } from './FormField';
import Checkbox from '../Checkbox/Checkbox';
import { TextProps } from '../Text/Text';

interface FormCheckboxOwnProps {
  label: ShorthandValue<TextProps>;
}

export interface FormCheckboxProps extends FormFieldProps, FormCheckboxOwnProps {
  label: ShorthandValue<TextProps>;
}
export type FormCheckboxStylesProps = never;

export const FormCheckboxClassName = 'ui-form-input';

const FormCheckbox = compose<'div', FormCheckboxProps, FormCheckboxStylesProps, FormFieldProps, FormFieldStylesProps>(
  (props, ref, composeOptions) => {
    const unhandledProps = useUnhandledProps(composeOptions.handledProps, props);

    return FormField.create(
      {},
      {
        defaultProps: () => ({
          ref,
          control: {
            as: Checkbox,
            label: props.label,
          },
          ...unhandledProps,
        }),
      },
    );
  },
  {
    className: FormCheckboxClassName,
    displayName: 'FormCheckbox',
    overrideStyles: true,
    handledProps: ['label'],
    shorthandConfig: {
      mappedProp: 'label',
    },
  },
) as ComponentWithAs<'div', FormCheckboxProps> & { shorthandConfig: ShorthandConfig<FormCheckboxProps> };

FormCheckbox.defaultProps = {};

FormCheckbox.propTypes = {
  ...commonPropTypes.createCommon({
    content: 'shorthand',
  }),
  control: customPropTypes.shorthandAllowingChildren,
};

export default FormCheckbox;
