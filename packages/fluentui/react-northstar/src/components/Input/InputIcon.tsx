import { compose, ComponentWithAs, ShorthandConfig } from '@fluentui/react-bindings';
import { commonPropTypes } from '../../utils';
import Box, { BoxProps, BoxStylesProps } from '../Box/Box';

interface InputIconOwnProps {
  error?: boolean;
  requiredAndSuccessful?: boolean;
  disabled?: boolean;
  iconPosition?: string;
  clearable?: boolean;
  hasValue?: boolean;
}
export interface InputIconProps extends InputIconOwnProps, BoxProps {}

export type InputIconStylesProps = Required<
  Pick<InputIconOwnProps, 'clearable' | 'disabled' | 'error' | 'hasValue' | 'iconPosition' | 'requiredAndSuccessful'>
>;
export const inputIconClassName = 'ui-input__icon';

/**
 * An InputIcon provides a slot for a icon.
 */
const InputIcon = compose<'span', InputIconOwnProps, InputIconStylesProps, BoxProps, BoxStylesProps>(Box, {
  className: inputIconClassName,
  displayName: 'InputIcon',
  handledProps: ['clearable', 'disabled', 'error', 'hasValue', 'iconPosition', 'requiredAndSuccessful'],
  mapPropsToStylesProps: ({ clearable, disabled, error, hasValue, iconPosition, requiredAndSuccessful }) => ({
    clearable,
    disabled,
    error,
    hasValue,
    iconPosition,
    requiredAndSuccessful,
  }),
  overrideStyles: true,
}) as ComponentWithAs<'span', InputIconProps> & { shorthandConfig: ShorthandConfig<InputIconProps> };

InputIcon.defaultProps = {
  as: 'span',
};
InputIcon.propTypes = commonPropTypes.createCommon();
InputIcon.shorthandConfig = {
  mappedProp: 'content',
};

export default InputIcon;
