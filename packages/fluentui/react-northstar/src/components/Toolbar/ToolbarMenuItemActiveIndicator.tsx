import { compose } from '@fluentui/react-bindings';

import { commonPropTypes } from '../../utils';
import { Box, BoxProps, BoxStylesProps } from '../Box/Box';

interface ToolbarMenuItemActiveIndicatorOwnProps {}
export interface ToolbarMenuItemActiveIndicatorProps extends ToolbarMenuItemActiveIndicatorOwnProps, BoxProps {}

export type ToolbarMenuItemActiveIndicatorStylesProps = {};
export const toolbarMenuItemActiveIndicatorClassName = 'ui-toolbar__menuitemactiveindicator';

/**
 * A ToolbarMenuItemActiveIndicator allows a user to have a dedicated component that can be targeted from the theme.
 */
export const ToolbarMenuItemActiveIndicator = compose<
  'span',
  ToolbarMenuItemActiveIndicatorProps,
  ToolbarMenuItemActiveIndicatorStylesProps,
  BoxProps,
  BoxStylesProps
>(Box, {
  className: toolbarMenuItemActiveIndicatorClassName,
  displayName: 'ToolbarMenuItemActiveIndicator',

  shorthandConfig: {
    mappedProp: 'content',
  },
  overrideStyles: true,
});

ToolbarMenuItemActiveIndicator.defaultProps = {
  as: 'span',
};
ToolbarMenuItemActiveIndicator.propTypes = commonPropTypes.createCommon();
