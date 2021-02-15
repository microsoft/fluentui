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

import { handleRef, Ref } from '@fluentui/react-component-ref';
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
import { TreeContext } from './context';

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

  /**
   * Called on click.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onClick?: ComponentEventHandler<TreeItemProps>;

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

  /** A selection indicator icon can be customized. */
  selectionIndicator?: ShorthandValue<BoxProps>;
}

export type TreeItemStylesProps = Required<Pick<TreeItemProps, 'level'>> & {
  selectable?: boolean;
};
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
    selectable,
    id,
    parent,
  } = props;

  const {
    getItemById,
    registerItemRef,
    toggleItemActive,
    focusItemById,
    expandSiblings,
    toggleItemSelect,
    getToFocusIDByFirstCharacter,
  } = React.useContext(TreeContext);

  const { selected, hasSubtree, childrenIds } = getItemById(id);

  const getA11Props = useAccessibility(accessibility, {
    actionHandlers: {
      performClick: e => {
        if (shouldPreventDefaultOnKeyDown(e)) {
          e.preventDefault();
        }
        e.stopPropagation();
        toggleItemActive(e, id);
      },
      focusParent: e => {
        e.preventDefault();
        e.stopPropagation();

        handleFocusParent(e);
      },
      collapse: e => {
        e.preventDefault();
        e.stopPropagation();
        toggleItemActive(e, id);
      },
      expand: e => {
        e.preventDefault();
        e.stopPropagation();
        toggleItemActive(e, id);
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
      setFocusByFirstCharacter: e => {
        e.preventDefault();
        e.stopPropagation();
        const toFocusID = getToFocusIDByFirstCharacter(e, props.id);
        if (toFocusID !== props.id) {
          focusItemById(toFocusID);
        }
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
      hasSubtree,
      treeSize,
      selected: selected === true,
      selectable,
      indeterminate: selected === 'indeterminate',
    }),
    rtl: context.rtl,
  });

  const { classes } = useStyles<TreeItemStylesProps>(TreeItem.displayName, {
    className: treeItemClassName,
    mapPropsToStyles: () => ({
      level,
      selectable,
    }),
    mapPropsToInlineStyles: () => ({ className, design, styles, variables }),
    rtl: context.rtl,
  });

  const handleSelection = e => {
    if (selectable) {
      toggleItemSelect(e, id);
    }
    _.invoke(props, 'onTitleClick', e, props);
  };

  const handleFocusFirstChild = e => {
    _.invoke(props, 'onFocusFirstChild', e, props);
    focusItemById(childrenIds?.[0]);
  };

  const handleFocusParent = e => {
    _.invoke(props, 'onFocusParent', e, props);
    focusItemById(parent);
  };

  const handleSiblingsExpand = e => {
    _.invoke(props, 'onSiblingsExpand', e, props);
    expandSiblings(e, props.id);
  };

  const handleTitleOverrides = (predefinedProps: TreeTitleProps) => ({
    id,
    onClick: (e, titleProps) => {
      _.invoke(props, 'onTitleClick', e, props);
      _.invoke(predefinedProps, 'onClick', e, titleProps);
    },
  });

  const handleClick = (e: React.SyntheticEvent) => {
    if (e.target === e.currentTarget) {
      // onClick listener for mouse click on treeItem DOM only,
      // which could be triggered by VO+space on selectable tree parent node
      handleSelection(e);
    }

    _.invoke(props, 'onClick', e, props);
  };

  const ref = React.useCallback(
    node => {
      registerItemRef(id, node);
      handleRef(contentRef, node);
    },
    [id, contentRef, registerItemRef],
  );

  const ElementType = getElementType(props);
  const unhandledProps = useUnhandledProps(TreeItem.handledProps, props);
  const element = (
    <ElementType
      {...getA11Props('root', {
        className: classes.root,
        id,
        selected: selected === true,
        onClick: handleClick,
        ...rtlTextContainer.getAttributes({ forElements: [children] }),
        ...unhandledProps,
      })}
    >
      {childrenExist(children)
        ? children
        : TreeTitle.create(title, {
            defaultProps: () =>
              getA11Props('title', {
                hasSubtree,
                as: hasSubtree ? 'span' : 'a',
                level,
                treeSize,
                expanded,
                index,
                selected: selected === true,
                selectable,
                parent,
                ...(hasSubtree && {
                  indeterminate: selected === 'indeterminate',
                }),
                selectionIndicator,
              }),
            render: renderItemTitle,
            overrideProps: handleTitleOverrides,
          })}
    </ElementType>
  );

  const elementWithRef = <Ref innerRef={ref}>{element}</Ref>;
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
  selectable: PropTypes.bool,
};

TreeItem.defaultProps = {
  accessibility: treeItemBehavior,
  selectable: true,
};

TreeItem.handledProps = Object.keys(TreeItem.propTypes) as any;

TreeItem.create = createShorthandFactory({
  Component: TreeItem,
  mappedProp: 'title',
});
