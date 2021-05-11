import { compose } from '@fluentui/react-bindings';
import { commonPropTypes } from '../../utils';
import { Box, BoxProps, BoxStylesProps } from '../Box/Box';

export interface ListItemEndMediaOwnProps {
  navigable?: boolean;
  selectable?: boolean;
}
export interface ListItemEndMediaProps extends ListItemEndMediaOwnProps, BoxProps {}

export type ListItemEndMediaStylesProps = ListItemEndMediaOwnProps;
export const listItemEndMediaClassName = 'ui-list__itemendmedia';

/**
 * Provides a header media for the ListItem.
 */
export const ListItemEndMedia = compose<
  'div',
  ListItemEndMediaOwnProps,
  ListItemEndMediaStylesProps,
  BoxProps,
  BoxStylesProps
>(Box, {
  className: listItemEndMediaClassName,
  displayName: 'ListItemEndMedia',
  mapPropsToStylesProps: ({ navigable, selectable }) => ({ navigable, selectable }),

  handledProps: ['navigable', 'selectable'],
  overrideStyles: true,
  shorthandConfig: {
    mappedProp: 'content',
  },
});

ListItemEndMedia.propTypes = commonPropTypes.createCommon();
