import { compose } from '@fluentui/react-bindings';
import * as customPropTypes from '@fluentui/react-proptypes';
import { commonPropTypes, SizeValue } from '../../utils';
import { Box, BoxProps } from '../Box/Box';

interface ButtonContentOwnProps {
  size?: SizeValue;
}

export interface ButtonContentProps extends BoxProps, ButtonContentOwnProps {}
export type ButtonContentStylesProps = Pick<ButtonContentProps, 'size'>;

export const buttonContentClassName = 'ui-button__content';

/**
 * A ButtonContent allows a user to have a dedicated component that can be targeted from the theme.
 */
export const ButtonContent = compose<'span', ButtonContentProps, ButtonContentStylesProps, BoxProps, {}>(Box, {
  className: buttonContentClassName,
  displayName: 'ButtonContent',
  mapPropsToStylesProps: props => ({ size: props.size }),
  handledProps: ['size'],

  overrideStyles: true,
  shorthandConfig: {
    mappedProp: 'content',
  },
});

ButtonContent.defaultProps = {
  as: 'span',
};
ButtonContent.propTypes = {
  ...commonPropTypes.createCommon(),
  size: customPropTypes.size,
};
