import { compose } from '@fluentui/react-bindings';
import { commonPropTypes } from '../../utils';
import { Box, BoxProps, BoxStylesProps } from '../Box/Box';

export interface DividerContentOwnProps {}
export interface DividerContentProps extends DividerContentOwnProps, BoxProps {}

export type DividerContentStylesProps = never;
export const dividerContentClassName = 'ui-divider__content';

/**
 * A DividerContent provides a content for the Divider.
 */
export const DividerContent = compose<
  'span',
  DividerContentOwnProps,
  DividerContentStylesProps,
  BoxProps,
  BoxStylesProps
>(Box, {
  className: dividerContentClassName,
  displayName: 'DividerContent',
  overrideStyles: true,
});

DividerContent.propTypes = commonPropTypes.createCommon();
