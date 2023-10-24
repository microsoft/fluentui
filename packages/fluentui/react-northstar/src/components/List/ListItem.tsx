import { Accessibility, listItemBehavior, ListItemBehaviorProps } from '@fluentui/accessibility';
import {
  getElementType,
  useUnhandledProps,
  useAccessibility,
  useFluentContext,
  useStyles,
  useTelemetry,
  useContextSelectors,
  ForwardRefWithAs,
} from '@fluentui/react-bindings';
import cx from 'classnames';
import * as _ from 'lodash';
import * as PropTypes from 'prop-types';
import * as React from 'react';

import { ShorthandValue, ComponentEventHandler, FluentComponentStaticProps } from '../../types';
import {
  createShorthandFactory,
  UIComponentProps,
  commonPropTypes,
  ContentComponentProps,
  createShorthand,
} from '../../utils';
import { ListContext, ListContextSubscribedValue } from './listContext';
import { ListItemContent, ListItemContentProps } from './ListItemContent';
import { ListItemContentMedia, ListItemContentMediaProps } from './ListItemContentMedia';
import { ListItemEndMedia, ListItemEndMediaProps } from './ListItemEndMedia';
import { ListItemHeader, ListItemHeaderProps } from './ListItemHeader';
import { ListItemHeaderMedia, ListItemHeaderMediaProps } from './ListItemHeaderMedia';
import { ListItemMedia, ListItemMediaProps } from './ListItemMedia';

export interface ListItemSlotClassNames {
  headerWrapper: string;
  contentWrapper: string;
  main: string;
}

export interface ListItemProps extends UIComponentProps, ContentComponentProps<ShorthandValue<ListItemContentProps>> {
  /** Accessibility behavior if overridden by the user. */
  accessibility?: Accessibility<ListItemBehaviorProps>;
  contentMedia?: ShorthandValue<ListItemContentMediaProps>;
  /** Toggle debug mode. */
  debug?: boolean;
  header?: ShorthandValue<ListItemHeaderProps>;
  headerMedia?: ShorthandValue<ListItemHeaderMediaProps>;
  endMedia?: ShorthandValue<ListItemEndMediaProps>;

  /** A list item can appear more important and draw the user's attention. */
  important?: boolean;
  media?: ShorthandValue<ListItemMediaProps>;

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

export type ListItemStylesProps = Pick<ListItemProps, 'debug' | 'important' | 'navigable' | 'selectable' | 'selected'>;

export const listItemClassName = 'ui-list__item';
export const listItemSlotClassNames: ListItemSlotClassNames = {
  headerWrapper: `${listItemClassName}__headerWrapper`,
  main: `${listItemClassName}__main`,
  contentWrapper: `${listItemClassName}__contentWrapper`,
};

/**
 * A ListItem contains a single piece of content within a List.
 */
export const ListItem = React.forwardRef<HTMLLIElement, ListItemProps>((props, ref) => {
  const context = useFluentContext();
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
  const { classes } = useStyles<ListItemStylesProps>(ListItem.displayName, {
    className: listItemClassName,
    mapPropsToStyles: () => ({
      debug,
      navigable,
      important,
      selectable,
      selected,
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

  const contentElement = createShorthand(ListItemContent, content, {
    defaultProps: () => ({
      hasContentMedia: !!contentMedia,
      hasHeader: !!header,
      truncate: truncateContent,
    }),
  });
  const contentMediaElement = createShorthand(ListItemContentMedia, contentMedia);
  const headerElement = createShorthand(ListItemHeader, header, {
    defaultProps: () => ({
      hasContent: !!content,
      hasHeaderMedia: !!headerMedia,
      truncate: truncateHeader,
    }),
  });
  const headerMediaElement = createShorthand(ListItemHeaderMedia, headerMedia);
  const endMediaElement = createShorthand(ListItemEndMedia, endMedia, {
    defaultProps: () => ({
      navigable,
      selectable,
    }),
  });
  const mediaElement = createShorthand(ListItemMedia, media, {
    defaultProps: () => ({
      hasContent: !!content,
      hasHeader: !!header,
      important,
    }),
  });

  const element = getA11Props.unstable_wrapWithFocusZone(
    <ElementType
      {...getA11Props('root', {
        className: classes.root,
        onClick: handleClick,
        ...unhandledProps,
        ref,
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
    </ElementType>,
  );

  setEnd();

  return element;
}) as unknown as ForwardRefWithAs<'li', HTMLLIElement, ListItemProps & { index: number }> &
  FluentComponentStaticProps<ListItemProps>;

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
