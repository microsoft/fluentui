import { compose } from '@fluentui/react-bindings';
import { toolbarMenuRadioGroupWrapperBehavior } from '@fluentui/accessibility';
import { commonPropTypes } from '../../utils';
import { Box, BoxProps, BoxStylesProps } from '../Box/Box';

export interface ToolbarMenuRadioGroupWrapperOwnProps {}
export interface ToolbarMenuRadioGroupWrapperProps extends ToolbarMenuRadioGroupWrapperOwnProps, BoxProps {}

export type ToolbarMenuRadioGroupWrapperStylesProps = never;
export const toolbarMenuRadioGroupWrapperClassName = 'ui-toolbars'; // FIXME: required by getComponentInfo/isConformant. But this is group inside a toolbar not a group of toolbars

/**
 * An ToolbarMenuRadioGroupWrapper provides a wrapping slot for in  ToolbarMenuRadioGroup.
 */
export const ToolbarMenuRadioGroupWrapper = compose<
  'li',
  ToolbarMenuRadioGroupWrapperOwnProps,
  ToolbarMenuRadioGroupWrapperStylesProps,
  BoxProps,
  BoxStylesProps
>(Box, {
  className: toolbarMenuRadioGroupWrapperClassName,
  displayName: 'ToolbarMenuRadioGroupWrapper',

  overrideStyles: true,
  shorthandConfig: { mappedProp: 'content' },
});

ToolbarMenuRadioGroupWrapper.defaultProps = {
  as: 'li',
  accessibility: toolbarMenuRadioGroupWrapperBehavior,
};
ToolbarMenuRadioGroupWrapper.propTypes = commonPropTypes.createCommon();
