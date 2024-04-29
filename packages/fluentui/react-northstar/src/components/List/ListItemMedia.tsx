import { compose } from '@fluentui/react-bindings';
import { commonPropTypes } from '../../utils';
import { Box, BoxProps, BoxStylesProps } from '../Box/Box';

export interface ListItemMediaOwnProps {
  hasContent?: boolean;
  hasHeader?: boolean;
  important?: boolean;
}
export interface ListItemMediaProps extends ListItemMediaOwnProps, BoxProps {}

export type ListItemMediaStylesProps = ListItemMediaOwnProps;
export const listItemMediaClassName = 'ui-list__itemmedia';

/**
 * Provides a content for the ListItem.
 */
export const ListItemMedia = compose<'div', ListItemMediaOwnProps, ListItemMediaStylesProps, BoxProps, BoxStylesProps>(
  Box,
  {
    className: listItemMediaClassName,
    displayName: 'ListItemMedia',
    mapPropsToStylesProps: ({ hasContent, hasHeader, important }) => ({ hasContent, hasHeader, important }),

    handledProps: ['hasContent', 'hasHeader', 'important'],
    overrideStyles: true,
    shorthandConfig: {
      mappedProp: 'content',
    },
  },
);

ListItemMedia.propTypes = commonPropTypes.createCommon();
