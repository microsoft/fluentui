import {
  Accessibility,
  hierarchicalTreeItemBehavior,
  hierarchicalSubtreeBehavior,
  HierarchicalTreeItemBehaviorProps,
} from '@fluentui/accessibility';
import {
  ComponentWithAs,
  getFirstFocusable,
  useTelemetry,
  getElementType,
  useUnhandledProps,
  useAccessibility,
  useStyles,
} from '@fluentui/react-bindings';
import * as customPropTypes from '@fluentui/react-proptypes';
import { Ref } from '@fluentui/react-component-ref';
import * as _ from 'lodash';
import * as PropTypes from 'prop-types';
import * as React from 'react';

import { HierarchicalTree, HierarchicalTreeProps } from './HierarchicalTree';
import { HierarchicalTreeTitle, HierarchicalTreeTitleProps } from './HierarchicalTreeTitle';
import {
  childrenExist,
  createShorthandFactory,
  commonPropTypes,
  UIComponentProps,
  ChildrenComponentProps,
  rtlTextContainer,
} from '../../utils';
import {
  ComponentEventHandler,
  ShorthandRenderFunction,
  ShorthandValue,
  ShorthandCollection,
  FluentComponentStaticProps,
  ProviderContextPrepared,
} from '../../types';
// @ts-ignore
import { ThemeContext } from 'react-fela';

export interface HierarchicalTreeItemSlotClassNames {
  subtree: string;
}

export interface HierarchicalTreeItemProps extends UIComponentProps, ChildrenComponentProps {
  /** Accessibility behavior if overridden by the user. */
  accessibility?: Accessibility<HierarchicalTreeItemBehaviorProps>;

  /** Only allow one subtree to be open at a time. */
  exclusive?: boolean;

  /** The index of the item among its sibbling */
  index?: number;

  /** Array of props for sub tree. */
  items?: ShorthandValue<HierarchicalTreeProps> | ShorthandCollection<HierarchicalTreeItemProps>;

  /** Called when a tree title is clicked. */
  onTitleClick?: ComponentEventHandler<HierarchicalTreeItemProps>;

  /** Whether or not the subtree of the item is in the open state. */
  open?: boolean;

  /**
   * A custom render iterator for rendering each Accordion panel title.
   * The default component, props, and children are available for each panel title.
   *
   * @param Component - The computed component for this slot.
   * @param props - The computed props for this slot.
   * @param children - The computed children for this slot.
   */
  renderItemTitle?: ShorthandRenderFunction<HierarchicalTreeTitleProps>;

  /** Properties for TreeTitle. */
  title?: ShorthandValue<HierarchicalTreeTitleProps>;
}

export const hierarchicalTreeItemClassName = 'ui-hierarchicaltree__item';
export const hierarchicalTreeItemSlotClassNames: HierarchicalTreeItemSlotClassNames = {
  subtree: `${hierarchicalTreeItemClassName}__subtree`,
};

export type HierarchicalTreeItemStyles = never;

/**
 * A TreeItem renders an item of a Tree.
 *
 * @accessibility
 * Implements [ARIA TreeView](https://www.w3.org/TR/wai-aria-practices-1.1/#TreeView) design pattern.
 */
export const HierarchicalTreeItem: ComponentWithAs<'li', HierarchicalTreeItemProps> &
  FluentComponentStaticProps<HierarchicalTreeItemProps> = props => {
  const context: ProviderContextPrepared = React.useContext(ThemeContext);
  const { setStart, setEnd } = useTelemetry(HierarchicalTreeItem.displayName, context.telemetry);
  setStart();
  const { items, title, renderItemTitle, open, exclusive, children, className, design, styles, variables } = props;
  const ElementType = getElementType(props);
  const unhandledProps = useUnhandledProps(HierarchicalTreeItem.handledProps, props);

  const actionHandlers = {
    performClick: e => {
      e.preventDefault();
      e.stopPropagation();

      _.invoke(props, 'onTitleClick', e, props);
    },
    receiveFocus: e => {
      e.preventDefault();
      e.stopPropagation();

      // Focuses the title if the event comes from a child item.
      if (eventComesFromChildItem(e)) {
        itemRef.current.focus();
      }
    },
    collapse: e => {
      e.preventDefault();
      e.stopPropagation();

      // Handle click on title if the keyboard event was dispatched on that title
      if (!eventComesFromChildItem(e)) {
        handleTitleClick(e);
      }
    },
    expand: e => {
      e.preventDefault();
      e.stopPropagation();

      handleTitleClick(e);
    },
    focusSubtree: e => {
      e.preventDefault();
      e.stopPropagation();

      const element = getFirstFocusable(treeRef.current, treeRef.current, true);
      if (element) {
        element.focus();
      }
    },
  };
  const getA11yProps = useAccessibility<HierarchicalTreeItemBehaviorProps>(props.accessibility, {
    debugName: HierarchicalTreeItem.displayName,
    actionHandlers,
    mapPropsToBehavior: () => ({
      hasItems: items && !!(items as HierarchicalTreeItemProps[]).length,
      open,
    }),
    rtl: context.rtl,
  });

  const itemRef = React.useRef<HTMLElement>();
  const treeRef = React.useRef<HTMLElement>();

  const { classes } = useStyles<HierarchicalTreeItemStyles>(HierarchicalTreeItem.displayName, {
    className: hierarchicalTreeItemClassName,
    mapPropsToInlineStyles: () => ({
      className,
      design,
      styles,
      variables,
    }),
    rtl: context.rtl,
  });

  const eventComesFromChildItem = e => {
    return e.currentTarget !== e.target;
  };

  const handleTitleClick = e => {
    _.invoke(props, 'onTitleClick', e, props);
  };

  const handleTitleOverrides = (predefinedProps: HierarchicalTreeTitleProps) => ({
    onClick: (e, titleProps) => {
      handleTitleClick(e);
      _.invoke(predefinedProps, 'onClick', e, titleProps);
    },
  });

  const renderContent = () => {
    const hasSubtree = !_.isNil(items);

    return (
      <>
        {HierarchicalTreeTitle.create(title, {
          defaultProps: () => ({
            open,
            hasSubtree,
            as: hasSubtree ? 'span' : 'a',
          }),
          render: renderItemTitle,
          overrideProps: handleTitleOverrides,
        })}
        {hasSubtree && open && (
          <Ref innerRef={treeRef}>
            {HierarchicalTree.create(items, {
              defaultProps: () =>
                getA11yProps('item', {
                  accessibility: hierarchicalSubtreeBehavior,
                  className: hierarchicalTreeItemSlotClassNames.subtree,
                  exclusive,
                  renderItemTitle,
                }),
            })}
          </Ref>
        )}
      </>
    );
  };

  const element = (
    <Ref innerRef={itemRef}>
      <ElementType
        {...getA11yProps('root', {
          className: classes.root,
          ...unhandledProps,
          ...rtlTextContainer.getAttributes({ forElements: [children] }),
        })}
      >
        {childrenExist(children) ? children : renderContent()}
      </ElementType>
    </Ref>
  );

  setEnd();
  return element;
};

HierarchicalTreeItem.displayName = 'HierarchicalTreeItem';

HierarchicalTreeItem.propTypes = {
  ...commonPropTypes.createCommon({
    content: false,
  }),
  items: customPropTypes.collectionShorthand,
  index: PropTypes.number,
  exclusive: PropTypes.bool,
  onTitleClick: PropTypes.func,
  open: PropTypes.bool,
  renderItemTitle: PropTypes.func,
  title: customPropTypes.itemShorthand,
};

HierarchicalTreeItem.defaultProps = {
  as: 'li',
  accessibility: hierarchicalTreeItemBehavior,
};

HierarchicalTreeItem.handledProps = Object.keys(HierarchicalTreeItem.propTypes) as any;

HierarchicalTreeItem.create = createShorthandFactory({
  Component: HierarchicalTreeItem,
  mappedProp: 'title',
});
