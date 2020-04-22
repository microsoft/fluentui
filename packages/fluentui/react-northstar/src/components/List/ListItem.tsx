import { Accessibility, listItemBehavior, ListItemBehaviorProps } from '@fluentui/accessibility';
import { getElementType, useUnhandledProps, useAccessibility, useStyles, useTelemetry } from '@fluentui/react-bindings';
import { useContextSelectors } from '@fluentui/react-context-selector';
import cx from 'classnames';
import * as _ from 'lodash';
import * as PropTypes from 'prop-types';
import * as React from 'react';
// @ts-ignore
import { ThemeContext } from 'react-fela';

import Box, { BoxProps } from '../Box/Box';
import {
  ShorthandValue,
  WithAsProp,
  ComponentEventHandler,
  withSafeTypeForAs,
  ProviderContextPrepared,
  FluentComponentStaticProps,
} from '../../types';
import { createShorthandFactory, UIComponentProps, commonPropTypes, ContentComponentProps } from '../../utils';
import { ListContext, ListContextSubscribedValue } from './listContext';

export interface ListItemSlotClassNames {
  header: string;
  headerMedia: string;
  headerWrapper: string;
  content: string;
  contentMedia: string;
  contentWrapper: string;
  main: string;
  media: string;
  endMedia: string;
}

export interface ListItemProps extends UIComponentProps, ContentComponentProps<ShorthandValue<BoxProps>> {
  /** Accessibility behavior if overridden by the user. */
  accessibility?: Accessibility<ListItemBehaviorProps>;
  contentMedia?: ShorthandValue<BoxProps>;
  /** Toggle debug mode. */
  debug?: boolean;
  header?: ShorthandValue<BoxProps>;
  endMedia?: ShorthandValue<BoxProps>;
  headerMedia?: ShorthandValue<BoxProps>;

  /** A list item can appear more important and draw the user's attention. */
  important?: boolean;
  media?: ShorthandValue<BoxProps>;

  index?: number;
  /** A list item can indicate that it can be selected. */
  selectable?: boolean;

  /** A list item can indicate that it can be navigable. */
  navigable?: boolean;

  /** Indicates if the current list item is selected. */
  selected?: boolean;
  truncateContent?: boolean;
  truncateHeader?: boolean;
  /**
   * Called on click.
   *
   * @param event - React's original SyntheticEvent.
   * @param data - All props.
   */
  onClick?: ComponentEventHandler<ListItemProps>;
}

export type ListItemStylesProps = Pick<
  ListItemProps,
  'debug' | 'important' | 'navigable' | 'selectable' | 'selected' | 'truncateContent' | 'truncateHeader'
> & {
  hasContent?: boolean;
  hasContentMedia?: boolean;
  hasHeader?: boolean;
  hasHeaderMedia?: boolean;
};

export const listItemClassName = 'ui-list__item';
export const listItemSlotClassNames: ListItemSlotClassNames = {
  header: `${listItemClassName}__header`,
  headerMedia: `${listItemClassName}__headerMedia`,
  headerWrapper: `${listItemClassName}__headerWrapper`,
  main: `${listItemClassName}__main`,
  content: `${listItemClassName}__content`,
  contentMedia: `${listItemClassName}__contentMedia`,
  contentWrapper: `${listItemClassName}__contentWrapper`,
  media: `${listItemClassName}__media`,
  endMedia: `${listItemClassName}__endMedia`,
};

const ListItem: React.FC<WithAsProp<ListItemProps> & { index: number }> &
  FluentComponentStaticProps<ListItemProps> = props => {
  const context: ProviderContextPrepared = React.useContext(ThemeContext);
  const { setStart, setEnd } = useTelemetry(ListItem.displayName, context.telemetry);

  setStart();

  const {
    accessibility,
    className,
    content,
    contentMedia,
    design,
    endMedia,
    header,
    important,
    headerMedia,
    media,
    styles,
  } = props;

  const parentProps: ListContextSubscribedValue = useContextSelectors(ListContext, {
    debug: v => v.debug,
    navigable: v => v.navigable,
    selectable: v => v.selectable,
    truncateContent: v => v.truncateContent,
    truncateHeader: v => v.truncateHeader,
    variables: v => v.variables,
    onItemClick: v => v.onItemClick,
    selected: v => v.selectedIndex === props.index,
  });
  const {
    debug = parentProps.debug,
    navigable = parentProps.navigable,
    selectable = parentProps.selectable,
    selected = parentProps.selected,
    truncateContent = parentProps.truncateContent,
    truncateHeader = parentProps.truncateHeader,
    variables = parentProps.variables,
  } = props;

  const getA11Props = useAccessibility(accessibility, {
    debugName: ListItem.displayName,
    actionHandlers: {
      performClick: e => {
        e.preventDefault();
        handleClick(e);
      },
    },
    mapPropsToBehavior: () => ({
      navigable,
      selectable,
      selected,
    }),
    rtl: context.rtl,
  });
  const { classes, styles: resolvedStyles } = useStyles<ListItemStylesProps>(ListItem.displayName, {
    className: listItemClassName,
    mapPropsToStyles: () => ({
      debug,
      navigable,
      important,
      selectable,
      selected,
      truncateContent,
      truncateHeader,

      hasContent: !!content,
      hasContentMedia: !!contentMedia,
      hasHeader: !!header,
      hasHeaderMedia: !!headerMedia,
    }),
    mapPropsToInlineStyles: () => ({ className, design, styles, variables }),
    rtl: context.rtl,
  });

  const ElementType = getElementType(props);
  const unhandledProps = useUnhandledProps(ListItem.handledProps, props);

  const handleClick = (e: React.MouseEvent | React.KeyboardEvent) => {
    _.invoke(props, 'onClick', e, props);
    parentProps.onItemClick(e, props.index);
  };

  const contentElement = Box.create(content, {
    defaultProps: () => ({
      className: listItemSlotClassNames.content,
      styles: resolvedStyles.content,
    }),
  });
  const contentMediaElement = Box.create(contentMedia, {
    defaultProps: () => ({
      className: listItemSlotClassNames.contentMedia,
      styles: resolvedStyles.contentMedia,
    }),
  });
  const headerElement = Box.create(header, {
    defaultProps: () => ({
      className: listItemSlotClassNames.header,
      styles: resolvedStyles.header,
    }),
  });
  const headerMediaElement = Box.create(headerMedia, {
    defaultProps: () => ({
      className: listItemSlotClassNames.headerMedia,
      styles: resolvedStyles.headerMedia,
    }),
  });
  const endMediaElement = Box.create(endMedia, {
    defaultProps: () => ({
      className: listItemSlotClassNames.endMedia,
      styles: resolvedStyles.endMedia,
    }),
  });
  const mediaElement = Box.create(media, {
    defaultProps: () => ({
      className: listItemSlotClassNames.media,
      styles: resolvedStyles.media,
    }),
  });

  const element = (
    <ElementType
      {...getA11Props('root', {
        className: classes.root,
        onClick: handleClick,
        ...unhandledProps,
      })}
    >
      {mediaElement}

      <div className={cx(listItemSlotClassNames.main, classes.main)}>
        {(headerElement || headerMediaElement) && (
          <div className={cx(listItemSlotClassNames.headerWrapper, classes.headerWrapper)}>
            {headerElement}
            {headerMediaElement}
          </div>
        )}
        {(contentElement || contentMediaElement) && (
          <div className={cx(listItemSlotClassNames.contentWrapper, classes.contentWrapper)}>
            {contentElement}
            {contentMediaElement}
          </div>
        )}
      </div>

      {endMediaElement}
    </ElementType>
  );

  setEnd();

  return element;
};

ListItem.displayName = 'ListItem';

ListItem.defaultProps = {
  as: 'li',
  accessibility: listItemBehavior,
};

ListItem.propTypes = {
  ...commonPropTypes.createCommon({
    content: false,
  }),
  contentMedia: PropTypes.any,
  content: PropTypes.any,

  debug: PropTypes.bool,

  header: PropTypes.any,
  endMedia: PropTypes.any,
  headerMedia: PropTypes.any,

  important: PropTypes.bool,
  media: PropTypes.any,

  selectable: PropTypes.bool,
  navigable: PropTypes.bool,
  index: PropTypes.number,
  selected: PropTypes.bool,

  truncateContent: PropTypes.bool,
  truncateHeader: PropTypes.bool,

  onClick: PropTypes.func,
};
ListItem.handledProps = Object.keys(ListItem.propTypes) as any;

ListItem.create = createShorthandFactory({ Component: ListItem, mappedProp: 'content' });

/**
 * A ListItem contains a single piece of content within a List.
 */
export default withSafeTypeForAs<typeof ListItem, ListItemProps, 'li'>(ListItem);
