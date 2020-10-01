import { Accessibility, treeTitleBehavior, TreeTitleBehaviorProps } from '@fluentui/accessibility';
import {
  ComponentWithAs,
  getElementType,
  useUnhandledProps,
  useAccessibility,
  useStyles,
  useFluentContext,
  useTelemetry,
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
import { TreeContext } from './utils';

export interface TreeTitleSlotClassNames {
  indicator: string;
}

export interface TreeTitleProps extends UIComponentProps, ChildrenComponentProps, ContentComponentProps {
  /** Accessibility behavior if overridden by the user. */
  accessibility?: Accessibility<TreeTitleBehaviorProps>;

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

  /** Whether or not tree title is part of the selectable parent. */
  selectableParent?: boolean;

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
}

export type TreeTitleStylesProps = Pick<
  TreeTitleProps,
  'selected' | 'selectable' | 'disabled' | 'selectableParent' | 'indeterminate' | 'level'
>;

export const treeTitleClassName = 'ui-tree__title';

export const treeTitleSlotClassNames = {
  indicator: `${treeTitleClassName}__selection-indicator`,
};

/**
 * A TreeTitle renders a title of TreeItem.
 */
export const TreeTitle: ComponentWithAs<'a', TreeTitleProps> & FluentComponentStaticProps<TreeTitleProps> = props => {
  const context = useFluentContext();
  const { setStart, setEnd } = useTelemetry(TreeTitle.displayName, context.telemetry);
  setStart();
  const { onFocusParent } = React.useContext(TreeContext);
  const {
    accessibility,
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
    selectableParent,
    expanded,
    indeterminate,
  } = props;

  const handleFocusParent = e => {
    onFocusParent(props.parent);
  };

  const getA11Props = useAccessibility(accessibility, {
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

        handleFocusParent(e);
      },
      performSelection: e => {
        e.preventDefault();
        e.stopPropagation();
        handleClick(e);
      },
    },
    mapPropsToBehavior: () => ({
      hasSubtree,
      level,
      index,
      treeSize,
      selected,
      selectable,
      selectableParent,
    }),
    rtl: context.rtl,
  });

  const { classes, styles: resolvedStyles } = useStyles<TreeTitleStylesProps>(TreeTitle.displayName, {
    className: treeTitleClassName,
    mapPropsToStyles: () => ({
      selected,
      selectableParent,
      disabled,
      selectable,
      indeterminate,
      level,
    }),
    mapPropsToInlineStyles: () => ({
      className,
      design,
      styles,
      variables,
    }),
    rtl: context.rtl,
  });

  const ElementType = getElementType(props);
  const unhandledProps = useUnhandledProps(TreeTitle.handledProps, props);
  const handleClick = e => {
    _.invoke(props, 'onClick', e, props);
  };

  const selectIndicator = Box.create(selectionIndicator, {
    defaultProps: () => ({
      as: 'span',
      selected,
      ...(selectableParent && !_.isEmpty(selectionIndicator) && { expanded }),
      ...getA11Props('indicator', {
        className: treeTitleSlotClassNames.indicator,
        ...(((selectable && !hasSubtree) || (selectableParent && expanded)) &&
          _.isEmpty(selectionIndicator) && {
            styles: resolvedStyles.selectionIndicator,
          }),
      }),
    }),
  });

  const element = (
    <ElementType
      {...getA11Props('root', {
        className: classes.root,
        onClick: handleClick,
        selected,
        ...rtlTextContainer.getAttributes({ forElements: [children, content] }),
        ...unhandledProps,
      })}
    >
      {childrenExist(children) ? children : content}

      {selectable && selectIndicator}
    </ElementType>
  );
  setEnd();

  return element;
};

TreeTitle.displayName = 'TreeTitle';

TreeTitle.propTypes = {
  ...commonPropTypes.createCommon(),
  hasSubtree: PropTypes.bool,
  index: PropTypes.number,
  level: PropTypes.number,
  onClick: PropTypes.func,
  expanded: PropTypes.bool,
  selected: PropTypes.bool,
  selectable: PropTypes.bool,
  selectableParent: PropTypes.bool,
  treeSize: PropTypes.number,
  selectionIndicator: customPropTypes.shorthandAllowingChildren,
  indeterminate: PropTypes.bool,
  parent: PropTypes.string,
};
TreeTitle.defaultProps = {
  as: 'a',
  selectionIndicator: {},
  accessibility: treeTitleBehavior,
};
TreeTitle.handledProps = Object.keys(TreeTitle.propTypes) as any;

TreeTitle.create = createShorthandFactory({
  Component: TreeTitle,
  mappedProp: 'content',
});
