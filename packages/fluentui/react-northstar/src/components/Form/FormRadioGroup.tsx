import { compose, ComponentWithAs, ShorthandConfig } from '@fluentui/react-bindings';
import { commonPropTypes } from '../../utils';
import * as customPropTypes from '@fluentui/react-proptypes';
import FormFieldCustom, { FormFieldCustomProps, FormFieldCustomStylesProps } from './FormFieldCustom';
import RadioGroup, { RadioGroupProps } from '../RadioGroup/RadioGroup';

interface FormRadioGroupOwnProps extends Omit<RadioGroupProps, 'styles' | 'accessibility'> {}

export interface FormRadioGroupProps extends FormFieldCustomProps, FormRadioGroupOwnProps {}
export type FormRadioGroupStylesProps = never;

export const FormRadioGroupClassName = 'ui-form-radio_group';

const FormRadioGroup = compose<
  'div',
  FormRadioGroupProps,
  FormRadioGroupStylesProps,
  FormFieldCustomProps,
  FormFieldCustomStylesProps
>(FormFieldCustom, {
  className: FormRadioGroupClassName,
  displayName: 'FormRadioGroup',
  overrideStyles: true,
  shorthandConfig: {},
  slotProps: () => ({
    control: {
      as: RadioGroup,
    },
  }),
}) as ComponentWithAs<'div', FormRadioGroupProps> & { shorthandConfig: ShorthandConfig<FormRadioGroupProps> };

FormRadioGroup.defaultProps = {};

FormRadioGroup.propTypes = {
  ...commonPropTypes.createCommon({
    content: 'shorthand',
  }),
  control: customPropTypes.shorthandAllowingChildren,
};

export default FormRadioGroup;
