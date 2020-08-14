import { compose } from '@fluentui/react-bindings';
import { commonPropTypes } from '../../utils';
import { Box, BoxProps, BoxStylesProps } from '../Box/Box';

export interface ListItemHeaderMediaOwnProps {}
export interface ListItemHeaderMediaProps extends ListItemHeaderMediaOwnProps, BoxProps {}

export type ListItemHeaderMediaStylesProps = ListItemHeaderMediaOwnProps;
export const listItemHeaderMediaClassName = 'ui-list__itemheadermedia';

/**
 * Provides a header media for the ListItem.
 */
export const ListItemHeaderMedia = compose<
  'div',
  ListItemHeaderMediaOwnProps,
  ListItemHeaderMediaStylesProps,
  BoxProps,
  BoxStylesProps
>(Box, {
  className: listItemHeaderMediaClassName,
  displayName: 'ListItemHeaderMedia',

  overrideStyles: true,
  shorthandConfig: {
    mappedProp: 'content',
  },
});

ListItemHeaderMedia.propTypes = commonPropTypes.createCommon();
