import { compose } from '@fluentui/react-bindings';
import { commonPropTypes } from '../../utils';
import { Box, BoxProps, BoxStylesProps } from '../Box/Box';

export interface ListItemHeaderOwnProps {
  hasContent?: boolean;
  hasHeaderMedia?: boolean;
  truncate?: boolean;
}
export interface ListItemHeaderProps extends ListItemHeaderOwnProps, BoxProps {}

export type ListItemHeaderStylesProps = ListItemHeaderOwnProps;
export const listItemHeaderClassName = 'ui-list__itemheader';

/**
 * Provides a header for the ListItem.
 */
export const ListItemHeader = compose<
  'div',
  ListItemHeaderOwnProps,
  ListItemHeaderStylesProps,
  BoxProps,
  BoxStylesProps
>(Box, {
  className: listItemHeaderClassName,
  displayName: 'ListItemHeader',
  mapPropsToStylesProps: ({ hasContent, hasHeaderMedia, truncate }) => ({ hasContent, hasHeaderMedia, truncate }),

  handledProps: ['hasContent', 'hasHeaderMedia', 'truncate'],
  overrideStyles: true,
  shorthandConfig: {
    mappedProp: 'content',
  },
});

ListItemHeader.propTypes = commonPropTypes.createCommon();
