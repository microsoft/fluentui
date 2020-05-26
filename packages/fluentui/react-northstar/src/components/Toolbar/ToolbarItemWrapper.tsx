import { compose, ComponentWithAs, ShorthandConfig } from '@fluentui/react-bindings';
import { commonPropTypes } from '../../utils';
import Box, { BoxProps } from '../Box/Box';

interface ToolbarItemWrapperOwnProps {}

export interface ToolbarItemWrapperProps extends BoxProps, ToolbarItemWrapperOwnProps {}
export type ToolbarItemWrapperStylesProps = never;

export const toolbarItemWrapperClassName = 'ui-toolbar__itemwrapper';

/**
 * A ToolbarItemWrapper allows a user to have a dedicated component that can be targeted from the theme.
 */
const ToolbarItemWrapper = compose<'div', ToolbarItemWrapperProps, ToolbarItemWrapperStylesProps, BoxProps, {}>(Box, {
  className: toolbarItemWrapperClassName,
  displayName: 'ToolbarItemWrapper',

  overrideStyles: true,
  shorthandConfig: {
    mappedProp: 'content',
  },
}) as ComponentWithAs<'div', ToolbarItemWrapperProps> & { shorthandConfig: ShorthandConfig<ToolbarItemWrapperProps> };

ToolbarItemWrapper.propTypes = commonPropTypes.createCommon();

export default ToolbarItemWrapper;
