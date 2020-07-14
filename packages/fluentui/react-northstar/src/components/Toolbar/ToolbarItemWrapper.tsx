import { compose } from '@fluentui/react-bindings';
import { commonPropTypes } from '../../utils';
import { Box, BoxProps } from '../Box/Box';

interface ToolbarItemWrapperOwnProps {}

export interface ToolbarItemWrapperProps extends BoxProps, ToolbarItemWrapperOwnProps {}
export type ToolbarItemWrapperStylesProps = never;

export const toolbarItemWrapperClassName = 'ui-toolbar__itemwrapper';

/**
 * A ToolbarItemWrapper allows a user to have a dedicated component that can be targeted from the theme.
 */
export const ToolbarItemWrapper = compose<'div', ToolbarItemWrapperProps, ToolbarItemWrapperStylesProps, BoxProps, {}>(
  Box,
  {
    className: toolbarItemWrapperClassName,
    displayName: 'ToolbarItemWrapper',

    overrideStyles: true,
    shorthandConfig: {
      mappedProp: 'content',
    },
  },
);

ToolbarItemWrapper.propTypes = commonPropTypes.createCommon();
