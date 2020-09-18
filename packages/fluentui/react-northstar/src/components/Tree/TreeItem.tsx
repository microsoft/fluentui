import { Accessibility, treeItemBehavior, TreeItemBehaviorProps } from '@fluentui/accessibility';
import {
  ComponentWithAs,
  getElementType,
  useUnhandledProps,
  useAccessibility,
  useStyles,
  useTelemetry,
  useFluentContext,
} from '@fluentui/react-bindings';
import * as customPropTypes from '@fluentui/react-proptypes';
import * as _ from 'lodash';
import * as PropTypes from 'prop-types';
import * as React from 'react';

import { Ref } from '@fluentui/react-component-ref';
import {
  childrenExist,
  createShorthandFactory,
  commonPropTypes,
  UIComponentProps,
  ChildrenComponentProps,
  rtlTextContainer,
  shouldPreventDefaultOnKeyDown,
} from '../../utils';
import {
  ComponentEventHandler,
  ShorthandRenderFunction,
  ShorthandValue,
  ShorthandCollection,
  FluentComponentStaticProps,
} from '../../types';
import { TreeTitle, TreeTitleProps } from './TreeTitle';
import { BoxProps } from '../Box/Box';
import { hasSubtree, TreeContext } from './utils';

export interface TreeItemProps extends UIComponentProps, ChildrenComponentProps {
  /** Accessibility behavior if overridden by the user. */
  accessibility?: Accessibility<TreeItemBehaviorProps>;

  /** Ref for the item DOM element. */
  contentRef?: React.Ref<HTMLElement>;

  /** Id needed to identify this item inside the Tree. */
  id: string;

  /** The index of the item among its siblings. Count starts at 1. */
  index?: number;

  /** Array of props for sub tree. */
  items?: ShorthandCollection<TreeItemProps>;

  /** Level of the tree/subtree that contains this item. */
  level?: number;

  /** Called when the item's first child is about to be focused. */
  onFocusFirstChild?: ComponentEventHandler<TreeItemProps>;

  /** Called when the item's parent is about to be focused. */
  onFocusParent?: ComponentEventHandler<TreeItemProps>;

  /** Called when a tree title is clicked. */
  onTitleClick?: ComponentEventHandler<TreeItemProps>;

  /** Called when the item's siblings are about to be expanded. */
  onSiblingsExpand?: ComponentEventHandler<TreeItemProps>;

  /** Whether or not the item is in the expanded state. Only makes sense if item has children items. If set to true, item is initialy expanded. */
  expanded?: boolean;

  /** The id of the parent tree item, if any. */
  parent?: string;

  /**
   * A custom render iterator for rendering each tree title.
   * The default component, props, and children are available for each tree title.
   *
   * @param Component - The computed component for this slot.
   * @param props - The computed props for this slot.
   * @param children - The computed children for this slot.
   */
  renderItemTitle?: ShorthandRenderFunction<TreeTitleProps>;

  /** Size of the tree/subtree that contains this item. */
  treeSize?: number;

  /** Properties for TreeTitle. */
  title?: ShorthandValue<TreeTitleProps>;

  /** Whether or not the item can be selectable. */
  selectable?: boolean;

  /** A state of selection indicator. */
  selected?: boolean;

  /** A selection indicator icon can be customized. */
  selectionIndicator?: ShorthandValue<BoxProps>;

  /** Whether or not tree item is part of the selectable parent. */
  selectableParent?: boolean;

  indeterminate?: boolean;
}

export type TreeItemStylesProps = Required<Pick<TreeItemProps, 'level'>>;
export const treeItemClassName = 'ui-tree__item';

/**
 * A TreeItem renders an item of a Tree.
 *
 * @accessibility
 * Implements [ARIA TreeView](https://www.w3.org/TR/wai-aria-practices-1.1/#TreeView) design pattern.
 */
export const TreeItem: ComponentWithAs<'div', TreeItemProps> & FluentComponentStaticProps<TreeItemProps> = props => {
  const context = useFluentContext();
  const { setStart, setEnd } = useTelemetry(TreeItem.displayName, context.telemetry);
  setStart();

  const {
    accessibility,
    children,
    className,
    contentRef,
    design,
    title,
    renderItemTitle,
    expanded,
    level,
    index,
    styles,
    variables,
    treeSize,
    selectionIndicator,
    selectableParent,
    selected,
    selectable,
    indeterminate,
    id,
  } = props;

  const hasSubtreeItem = hasSubtree(props);

  const { onFocusParent, onSiblingsExpand, onFocusFirstChild, onTitleClick } = React.useContext(TreeContext);

  const getA11Props = useAccessibility(accessibility, {
    actionHandlers: {
      performClick: e => {
        if (shouldPreventDefaultOnKeyDown(e)) {
          e.preventDefault();
        }
        e.stopPropagation();
        handleTitleClick(e);
      },
      focusParent: e => {
        e.preventDefault();
        e.stopPropagation();

        handleFocusParent(e);
      },
      collapse: e => {
        e.preventDefault();
        e.stopPropagation();

        handleTitleClick(e);
      },
      expand: e => {
        e.preventDefault();
        e.stopPropagation();

        handleTitleClick(e);
      },
      focusFirstChild: e => {
        e.preventDefault();
        e.stopPropagation();

        handleFocusFirstChild(e);
      },
      expandSiblings: e => {
        e.preventDefault();
        e.stopPropagation();

        handleSiblingsExpand(e);
      },
      performSelection: e => {
        e.preventDefault();
        e.stopPropagation();
        handleSelection(e);
      },
    },
    debugName: TreeItem.displayName,
    mapPropsToBehavior: () => ({
      expanded,
      level,
      index,
      hasSubtree: hasSubtreeItem,
      treeSize,
      selected,
      selectable,
      selectableParent,
    }),
    rtl: context.rtl,
  });
  const { classes } = useStyles<TreeItemStylesProps>(TreeItem.displayName, {
    className: treeItemClassName,
    mapPropsToStyles: () => ({
      level,
    }),
    mapPropsToInlineStyles: () => ({ className, design, styles, variables }),
    rtl: context.rtl,
  });

  const handleSelection = e => {
    onTitleClick(e, props, true);
    _.invoke(props, 'onTitleClick', e, props);
  };

  const handleTitleClick = e => {
    onTitleClick(e, props);
    _.invoke(props, 'onTitleClick', e, props);
  };
  const handleFocusFirstChild = e => {
    _.invoke(props, 'onFocusFirstChild', e, props);
    onFocusFirstChild(props.id);
  };
  const handleFocusParent = e => {
    _.invoke(props, 'onFocusParent', e, props);
    onFocusParent(props.parent);
  };
  const handleSiblingsExpand = e => {
    _.invoke(props, 'onSiblingsExpand', e, props);
    onSiblingsExpand(e, props);
  };
  const handleTitleOverrides = (predefinedProps: TreeTitleProps) => ({
    onClick: (e, titleProps) => {
      handleTitleClick(e);
      _.invoke(predefinedProps, 'onClick', e, titleProps);
    },
  });

  const ElementType = getElementType(props);
  const unhandledProps = useUnhandledProps(TreeItem.handledProps, props);
  const element = (
    <ElementType
      {...getA11Props('root', {
        className: classes.root,
        id,
        selected,
        ...rtlTextContainer.getAttributes({ forElements: [children] }),
        ...unhandledProps,
      })}
    >
      {childrenExist(children)
        ? children
        : TreeTitle.create(title, {
            defaultProps: () =>
              getA11Props('title', {
                hasSubtree: hasSubtreeItem,
                as: hasSubtreeItem ? 'span' : 'a',
                level,
                treeSize,
                expanded,
                index,
                selected,
                selectable,
                ...(hasSubtreeItem && !selectableParent && { selectable: false }),
                ...(selectableParent && { indeterminate }),
                selectableParent,
                selectionIndicator,
              }),
            render: renderItemTitle,
            overrideProps: handleTitleOverrides,
          })}
    </ElementType>
  );

  const elementWithRef = contentRef ? <Ref innerRef={contentRef}>{element}</Ref> : element;
  setEnd();

  return elementWithRef;
};

TreeItem.displayName = 'TreeItem';

TreeItem.propTypes = {
  ...commonPropTypes.createCommon({
    content: false,
  }),
  contentRef: customPropTypes.ref,
  id: PropTypes.string.isRequired,
  index: PropTypes.number,
  items: customPropTypes.collectionShorthand,
  level: PropTypes.number,
  onFocusFirstChild: PropTypes.func,
  onFocusParent: PropTypes.func,
  onTitleClick: PropTypes.func,
  onSiblingsExpand: PropTypes.func,
  expanded: PropTypes.bool,
  parent: PropTypes.string,
  renderItemTitle: PropTypes.func,
  treeSize: PropTypes.number,
  title: customPropTypes.itemShorthand,
  selectionIndicator: customPropTypes.shorthandAllowingChildren,
  selected: PropTypes.bool,
  selectable: PropTypes.bool,
  selectableParent: PropTypes.bool,
  indeterminate: PropTypes.bool,
};
TreeItem.defaultProps = {
  accessibility: treeItemBehavior,
};
TreeItem.handledProps = Object.keys(TreeItem.propTypes) as any;

TreeItem.create = createShorthandFactory({
  Component: TreeItem,
  mappedProp: 'title',
});
