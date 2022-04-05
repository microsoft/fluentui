import { compose } from '@fluentui/react-bindings';

import { commonPropTypes } from '../../utils';
import { Box, BoxProps, BoxStylesProps } from '../Box/Box';

interface ToolbarMenuItemContentOwnProps {}
export interface ToolbarMenuItemContentProps extends ToolbarMenuItemContentOwnProps, BoxProps {}

export type ToolbarMenuItemContentStylesProps = never;
export const toolbarMenuItemContentClassName = 'ui-toolbar__menuitemcontent';

/**
 * A ToolbarMenuItemContent allows a user to have a dedicated component that can be targeted from the theme.
 */
export const ToolbarMenuItemContent = compose<
  'span',
  ToolbarMenuItemContentProps,
  ToolbarMenuItemContentStylesProps,
  BoxProps,
  BoxStylesProps
>(Box, {
  className: toolbarMenuItemContentClassName,
  displayName: 'ToolbarMenuItemContent',

  shorthandConfig: {
    mappedProp: 'content',
  },
  overrideStyles: true,
});

ToolbarMenuItemContent.defaultProps = {
  as: 'span',
};
ToolbarMenuItemContent.propTypes = commonPropTypes.createCommon();
