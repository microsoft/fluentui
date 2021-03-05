import { compose } from '@fluentui/react-bindings';
import { commonPropTypes } from '../../utils';
import { Box, BoxProps, BoxStylesProps } from '../Box/Box';

export interface ListItemContentMediaOwnProps {}
export interface ListItemContentMediaProps extends ListItemContentMediaOwnProps, BoxProps {}

export type ListItemContentMediaStylesProps = ListItemContentMediaOwnProps;
export const listItemContentMediaClassName = 'ui-list__itemcontentmedia';

/**
 * Provides a content media for the ListItem.
 */
export const ListItemContentMedia = compose<
  'div',
  ListItemContentMediaOwnProps,
  ListItemContentMediaStylesProps,
  BoxProps,
  BoxStylesProps
>(Box, {
  className: listItemContentMediaClassName,
  displayName: 'ListItemContentMedia',

  overrideStyles: true,
  shorthandConfig: {
    mappedProp: 'content',
  },
});

ListItemContentMedia.propTypes = commonPropTypes.createCommon();
