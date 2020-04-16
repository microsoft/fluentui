import { compose, ComponentWithAs } from '@fluentui/react-bindings';
import * as customPropTypes from '@fluentui/react-proptypes';

import { commonPropTypes, createShorthandFactory, ShorthandFactory, SizeValue } from '../../utils';
import Box, { BoxProps, BoxStylesProps } from '../Box/Box';
import { ButtonStylesProps } from 'src/components/Button/Button';

interface ButtonContentOwnProps {
  size?: SizeValue;
}

export interface ButtonContentProps extends BoxProps, ButtonContentOwnProps {}
export type ButtonContentStylesProps = Pick<ButtonContentProps, 'size'>;

export const buttonContentClassName = 'ui-button__content';

/**
 * A ButtonContent allows a user to have a dedicated component that can be targeted from the theme.
 */
const ButtonContent = compose<'div', ButtonContentProps, ButtonStylesProps, BoxProps, BoxStylesProps>(Box, {
  className: buttonContentClassName,
  displayName: 'ButtonContent',
  handledProps: ['size'],

  overrideStyles: true,
}) as ComponentWithAs<'div', ButtonContentProps> & { create: ShorthandFactory<ButtonContentProps> };

ButtonContent.propTypes = {
  ...commonPropTypes.createCommon(),
  size: customPropTypes.size,
};
ButtonContent.create = createShorthandFactory({
  Component: ButtonContent,
  mappedProp: 'content',
});

export default ButtonContent;
