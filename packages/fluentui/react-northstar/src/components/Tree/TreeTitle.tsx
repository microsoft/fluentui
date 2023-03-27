import { Accessibility, treeTitleBehavior, TreeTitleBehaviorProps } from '@fluentui/accessibility';
import {
  getElementType,
  useUnhandledProps,
  useAccessibility,
  useStyles,
  useFluentContext,
  useTelemetry,
  ForwardRefWithAs,
} from '@fluentui/react-bindings';
import { Box, BoxProps } from '../Box/Box';
import { SupportedIntrinsicInputProps } from '../../utils/htmlPropsUtils';
import * as customPropTypes from '@fluentui/react-proptypes';
import * as _ from 'lodash';
import * as PropTypes from 'prop-types';
import * as React from 'react';

import {
  childrenExist,
  createShorthandFactory,
  commonPropTypes,
  UIComponentProps,
  ChildrenComponentProps,
  ContentComponentProps,
  rtlTextContainer,
  shouldPreventDefaultOnKeyDown,
} from '../../utils';
import { ComponentEventHandler, FluentComponentStaticProps, ShorthandValue } from '../../types';
import { TreeContext } from './context';

export interface TreeTitleSlotClassNames {
  indicator: string;
}

export interface TreeTitleProps extends UIComponentProps, ChildrenComponentProps, ContentComponentProps {
  /** Accessibility behavior if overridden by the user. */
  accessibility?: Accessibility<TreeTitleBehaviorProps>;

  /** Internal usage only -  Id needed to identify this item inside the Tree, passed down from TreeItem */
  id?: string;

  /** Whether or not the title has a subtree. */
  hasSubtree?: boolean;

  /** The index of the title among its siblings. Count starts at 1. */
  index?: number;

  /** Level of the tree/subtree that contains this title. */
  level?: number;

  /**
   * Called on click.
   *
   * @param event - React's original SyntheticEvent.
   * @param data - All props.
   */
  onClick?: ComponentEventHandler<TreeTitleProps>;

  /** Whether or not the subtree of the title is in the open state. */
  expanded?: boolean;

  /** Size of the tree containing this title without any children. */
  treeSize?: number;

  /** A selection indicator icon can be customized. */
  selectionIndicator?: ShorthandValue<BoxProps>;

  /** A selection indicator can appear disabled and be unable to change states. */
  disabled?: SupportedIntrinsicInputProps['disabled'];

  /** A state of selection indicator. */
  selected?: boolean;

  /** Whether or not tree title is selectable. */
  selectable?: boolean;

  /** For selectable parents define if all nested children are checked */
  indeterminate?: boolean;

  /** The id of the parent tree title, if any. */
  parent?: string;

  unstyled?: boolean;
}

export type TreeTitleStylesProps = Pick<
  TreeTitleProps,
  'selected' | 'selectable' | 'disabled' | 'indeterminate' | 'level'
> & {
  showIndicator: boolean;
};

export const treeTitleClassName = 'ui-tree__title';

export const treeTitleSlotClassNames = {
  indicator: `${treeTitleClassName}__selection-indicator`,
};

/**
 * A TreeTitle renders a title of TreeItem.
 */
export const TreeTitle = React.forwardRef<HTMLAnchorElement, TreeTitleProps>((props, ref) => {
  const context = useFluentContext();
  const { setStart, setEnd } = useTelemetry(TreeTitle.displayName, context.telemetry);
  setStart();
  const { focusItemById, toggleItemActive, toggleItemSelect } = React.useContext(TreeContext);
  const {
    accessibility,
    id,
    children,
    className,
    content,
    design,
    hasSubtree,
    level,
    index,
    styles,
    treeSize,
    variables,
    selectionIndicator,
    disabled,
    selected,
    selectable,
    expanded,
    indeterminate,
  } = props;

  const getA11Props = useAccessibility<TreeTitleBehaviorProps>(accessibility, {
    debugName: TreeTitle.displayName,
    actionHandlers: {
      performClick: e => {
        if (shouldPreventDefaultOnKeyDown(e)) {
          e.preventDefault();
        }
        e.stopPropagation();
        handleClick(e);
      },
      focusParent: e => {
        // allow bubbling up to parent treeItem
        focusItemById(props.parent);
      },
    },
    mapPropsToBehavior: () => ({
      hasSubtree,
      level,
      index,
      treeSize,
      selected,
      selectable,
    }),
    rtl: context.rtl,
  });

  const { classes, styles: resolvedStyles } = useStyles<TreeTitleStylesProps>(TreeTitle.displayName, {
    className: treeTitleClassName,
    mapPropsToStyles: () => ({
      selected,
      disabled,
      selectable,
      indeterminate,
      level,
      showIndicator: selectable && ((hasSubtree && expanded) || selected || indeterminate),
    }),
    mapPropsToInlineStyles: () => ({
      className,
      design,
      styles,
      variables,
    }),
    rtl: context.rtl,
    unstyled: props.unstyled,
  });

  const ElementType = getElementType(props);
  const unhandledProps = useUnhandledProps(TreeTitle.handledProps, props);

  const handleClick = e => {
    if (hasSubtree) {
      toggleItemActive(e, id);
    } else {
      toggleItemSelect(e, id);
    }
    _.invoke(props, 'onClick', e, props);
  };

  const selectionIndicatorOverrideProps = (predefinedProps: BoxProps) => ({
    onClick: (e: React.SyntheticEvent) => {
      e.stopPropagation(); // otherwise onClick on title will also be executed
      if (selectable) {
        toggleItemSelect(e, id);
      }

      _.invoke(predefinedProps, 'onClick', e);
    },
  });

  const selectionIndicatorElement =
    selectable &&
    Box.create(selectionIndicator, {
      defaultProps: () => ({
        as: 'span',
        selected,
        ...getA11Props('indicator', {
          className: treeTitleSlotClassNames.indicator,
          styles: resolvedStyles.selectionIndicator,
        }),
      }),
      overrideProps: selectionIndicatorOverrideProps,
    });

  const element = (
    <ElementType
      {...getA11Props('root', {
        className: classes.root,
        onClick: handleClick,
        selected,
        ref,
        ...rtlTextContainer.getAttributes({ forElements: [children, content] }),
        ...unhandledProps,
      })}
    >
      {childrenExist(children) ? children : content}
      {selectionIndicatorElement}
    </ElementType>
  );
  setEnd();

  return element;
}) as unknown as ForwardRefWithAs<'a', HTMLAnchorElement, TreeTitleProps> & FluentComponentStaticProps<TreeTitleProps>;

TreeTitle.displayName = 'TreeTitle';

TreeTitle.propTypes = {
  ...commonPropTypes.createCommon(),
  id: PropTypes.string,
  hasSubtree: PropTypes.bool,
  index: PropTypes.number,
  level: PropTypes.number,
  onClick: PropTypes.func,
  expanded: PropTypes.bool,
  selected: PropTypes.bool,
  selectable: PropTypes.bool,
  treeSize: PropTypes.number,
  selectionIndicator: customPropTypes.shorthandAllowingChildren,
  unstyled: PropTypes.bool,
  indeterminate: PropTypes.bool,
  parent: PropTypes.string,
};
TreeTitle.defaultProps = {
  as: 'a' as const,
  selectionIndicator: {},
  accessibility: treeTitleBehavior,
};
TreeTitle.handledProps = Object.keys(TreeTitle.propTypes) as any;

TreeTitle.create = createShorthandFactory({
  Component: TreeTitle,
  mappedProp: 'content',
});
