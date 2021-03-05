import { compose } from '@fluentui/react-bindings';

import { commonPropTypes } from '../../utils';
import { Box, BoxProps, BoxStylesProps } from '../Box/Box';

interface ToolbarMenuItemIconOwnProps {
  hasContent?: boolean;
}
export interface ToolbarMenuItemIconProps extends ToolbarMenuItemIconOwnProps, BoxProps {}

export type ToolbarMenuItemIconStylesProps = { hasContent?: boolean };
export const toolbarMenuItemIconClassName = 'ui-toolbar__menuitemicon';

/**
 * A ToolbarMenuItemIcon allows a user to have a dedicated component that can be targeted from the theme.
 */
export const ToolbarMenuItemIcon = compose<
  'span',
  ToolbarMenuItemIconProps,
  ToolbarMenuItemIconStylesProps,
  BoxProps,
  BoxStylesProps
>(Box, {
  className: toolbarMenuItemIconClassName,
  displayName: 'ToolbarMenuItemIcon',

  mapPropsToStylesProps: props => ({
    hasContent: props.hasContent,
  }),
  shorthandConfig: {
    mappedProp: 'content',
  },
  handledProps: ['hasContent'],
  overrideStyles: true,
});

ToolbarMenuItemIcon.defaultProps = {
  as: 'span',
};
ToolbarMenuItemIcon.propTypes = commonPropTypes.createCommon();
