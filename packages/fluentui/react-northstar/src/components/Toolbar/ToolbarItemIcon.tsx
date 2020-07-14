import { compose } from '@fluentui/react-bindings';
import { commonPropTypes } from '../../utils';
import { Box, BoxProps } from '../Box/Box';

interface ToolbarItemIconOwnProps {}

export interface ToolbarItemIconProps extends BoxProps, ToolbarItemIconOwnProps {}
export type ToolbarItemIconStylesProps = never;

export const toolbarItemIconClassName = 'ui-toolbar__itemicon';

/**
 * A ToolbarItemIcon allows a user to have a dedicated component that can be targeted from the theme.
 */
export const ToolbarItemIcon = compose<'div', ToolbarItemIconProps, ToolbarItemIconStylesProps, BoxProps, {}>(Box, {
  className: toolbarItemIconClassName,
  displayName: 'ToolbarItemIcon',

  overrideStyles: true,
  shorthandConfig: {
    mappedProp: 'content',
  },
});

ToolbarItemIcon.propTypes = commonPropTypes.createCommon();
