import { compose } from '@fluentui/react-bindings';

import { commonPropTypes } from '../../utils';
import Box, { BoxProps, BoxStylesProps } from '../Box/Box';

interface ToolbarMenuItemIconOwnProps {}
export interface ToolbarMenuItemIconProps extends ToolbarMenuItemIconOwnProps, BoxProps {}

export type ToolbarMenuItemIconStylesProps = { hasContent: boolean };
export const toolbarMenuItemIconClassName = 'ui-toolbar__menuitem__active-icon';

/**
 * TODO
 */
const ToolbarMenuItemIcon = compose<
  'span',
  ToolbarMenuItemIconOwnProps,
  ToolbarMenuItemIconStylesProps,
  BoxProps,
  BoxStylesProps
>(Box, {
  className: toolbarMenuItemIconClassName,
  displayName: 'ToolbarMenuItemIcon',

  mapPropsToStylesProps: props => ({
    hasContent: props.content,
  }),
  shorthandConfig: {
    mappedProp: 'content',
  },
  overrideStyles: true,
});

ToolbarMenuItemIcon.defaultProps = {
  as: 'span',
};
ToolbarMenuItemIcon.propTypes = commonPropTypes.createCommon();

export default ToolbarMenuItemIcon;
