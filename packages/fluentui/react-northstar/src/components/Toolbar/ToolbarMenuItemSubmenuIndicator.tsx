import { compose } from '@fluentui/react-bindings';

import { commonPropTypes } from '../../utils';
import { Box, BoxProps, BoxStylesProps } from '../Box/Box';

interface ToolbarMenuItemSubmenuIndicatorOwnProps {
  hasContent?: boolean;
}
export interface ToolbarMenuItemSubmenuIndicatorProps extends ToolbarMenuItemSubmenuIndicatorOwnProps, BoxProps {}

export type ToolbarMenuItemSubmenuIndicatorStylesProps = { hasContent?: boolean };
export const toolbarMenuItemSubmenuIndicatorClassName = 'ui-toolbar__menuitemsubmenuindicator';

/**
 * A ToolbarMenuItemSubmenuIndicator allows a user to have a dedicated component that can be targeted from the theme.
 */
export const ToolbarMenuItemSubmenuIndicator = compose<
  'span',
  ToolbarMenuItemSubmenuIndicatorProps,
  ToolbarMenuItemSubmenuIndicatorStylesProps,
  BoxProps,
  BoxStylesProps
>(Box, {
  className: toolbarMenuItemSubmenuIndicatorClassName,
  displayName: 'ToolbarMenuItemSubmenuIndicator',

  mapPropsToStylesProps: props => ({
    hasContent: props.hasContent,
  }),
  shorthandConfig: {
    mappedProp: 'content',
  },
  overrideStyles: true,
});

ToolbarMenuItemSubmenuIndicator.defaultProps = {
  as: 'span',
};
ToolbarMenuItemSubmenuIndicator.propTypes = commonPropTypes.createCommon();
