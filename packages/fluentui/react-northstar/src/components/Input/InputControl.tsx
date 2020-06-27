import { compose, ComponentWithAs, ShorthandConfig } from '@fluentui/react-bindings';
import { commonPropTypes } from '../../utils';
import Box, { BoxProps, BoxStylesProps } from '../Box/Box';

interface InputControlOwnProps {
  inverted?: boolean;
  fluid?: boolean;
  disabled?: boolean;
  inline?: boolean;
  clearable?: boolean;
  hasIcon?: boolean;
  iconPosition?: string;
}
export interface InputControlProps extends InputControlOwnProps, BoxProps {}

export type InputControlStylesProps = Required<
  Pick<InputControlOwnProps, 'clearable' | 'disabled' | 'fluid' | 'hasIcon' | 'iconPosition' | 'inverted' | 'inline'>
>;
export const inputControlClassName = 'ui-input__control';

/**
 * A InputControl provides a control for the Input.
 */
const InputControl = compose<'input', InputControlOwnProps, InputControlStylesProps, BoxProps, BoxStylesProps>(Box, {
  className: inputControlClassName,
  displayName: 'InputControl',
  overrideStyles: true,
  handledProps: ['inverted', 'fluid', 'inline', 'clearable', 'hasIcon', 'iconPosition'],
  mapPropsToStylesProps: ({ inverted, fluid, disabled, inline, clearable, hasIcon, iconPosition }) => ({
    inverted,
    fluid,
    disabled,
    inline,
    clearable,
    hasIcon,
    iconPosition,
  }),
}) as ComponentWithAs<'input', InputControlProps> & {
  shorthandConfig: ShorthandConfig<InputControlProps>;
};

InputControl.defaultProps = {
  as: 'input',
};
InputControl.propTypes = commonPropTypes.createCommon();
InputControl.shorthandConfig = {
  mappedProp: 'content',
};

export default InputControl;
