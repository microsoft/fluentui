import { ComponentSlotClasses, useStyles, useTelemetry, useFluentContext } from '@fluentui/react-bindings';
import { ComponentSlotStylesPrepared, ComponentSlotStylesResolved, mergeStyles } from '@fluentui/styles';
import cx from 'classnames';
import * as _ from 'lodash';
import * as PropTypes from 'prop-types';
import * as React from 'react';

import { commonPropTypes, UIComponentProps, ChildrenComponentProps } from '../../utils';

type ChildrenFunction = (params: { styles: ComponentSlotStylesPrepared; classes: string }) => React.ReactElement;

export type FlexItemChildren = React.ReactElement | ChildrenFunction;

export interface FlexItemProps extends UIComponentProps, ChildrenComponentProps<FlexItemChildren> {
  /** Controls item's alignment. */
  align?: 'auto' | 'start' | 'end' | 'center' | 'baseline' | 'stretch';

  /** Defines size of the item. */
  size?: 'size.half' | 'size.quarter' | 'size.small' | 'size.medium' | 'size.large' | string;

  /**
   * Item can fill remaining space of the container.
   * If numeric value is provided, remaining space will be distributed proportionally between all the items.
   * */
  grow?: boolean | number;

  /**
   * Controls item's ability to shrink.
   * */
  shrink?: boolean | number;

  /**
   * Item can be pushed towards opposite side in the container's direction.
   */
  push?: boolean;

  /**
   * IGNORE (will be refactored and not exposed via API).
   * Value is automatically set by parent Flex component.
   */
  flexDirection?: 'row' | 'column';
}

export type FlexItemStylesProps = Pick<FlexItemProps, 'align' | 'grow' | 'flexDirection' | 'push' | 'shrink' | 'size'>;

const applyStyles = (
  element: React.ReactElement,
  styles: ComponentSlotStylesResolved,
  classes: ComponentSlotClasses,
): React.ReactElement => {
  if (!styles) {
    return element;
  }

  // if element is DOM element
  if (typeof element.type === 'string') {
    return React.cloneElement(element, {
      className: cx(element.props.className, classes.root),
    });
  }

  // assuming element is Fluent UI element
  return React.cloneElement(element, {
    styles: mergeStyles(styles.root || {}, element.props.styles),
  });
};

export const flexItemClassName = 'ui-flex__item';

/**
 * A FlexItem is a layout component that customizes alignment of Flex child.
 */
export const FlexItem: React.FC<FlexItemProps> & { __isFlexItem: boolean } = props => {
  const context = useFluentContext();
  const { setStart, setEnd } = useTelemetry(FlexItem.displayName, context.telemetry);
  setStart();

  const { align, children, className, design, grow, flexDirection, push, shrink, size, styles, variables } = props;

  const { classes, styles: resolvedStyles } = useStyles<FlexItemStylesProps>(FlexItem.displayName, {
    className: flexItemClassName,
    mapPropsToStyles: () => ({
      align,
      grow,
      flexDirection,
      push,
      shrink,
      size,
    }),
    mapPropsToInlineStyles: () => ({
      className,
      design,
      styles,
      variables,
    }),
    rtl: context.rtl,
  });

  let element: React.ReactElement;

  // pass calculated bits using Render Props pattern
  if (typeof children === 'function') {
    element = children({
      styles: resolvedStyles.root as ComponentSlotStylesPrepared,
      classes: classes.root,
    });
  } else if (_.isNil(children)) {
    element = null;
  } else {
    element = applyStyles(React.Children.only(children) as React.ReactElement, resolvedStyles, classes);
  }

  setEnd();

  return element;
};

FlexItem.displayName = 'FlexItem';

FlexItem.propTypes = {
  ...commonPropTypes.createCommon({
    children: false,
    accessibility: false,
    content: false,
  }),
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),

  align: PropTypes.oneOf(['auto', 'start', 'end', 'center', 'baseline', 'stretch']),
  size: PropTypes.oneOfType([
    PropTypes.oneOf(['size.half', 'size.quarter', 'size.small', 'size.medium', 'size.large']),
    PropTypes.string,
  ]),
  shrink: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),

  push: PropTypes.bool,

  /**
   * Will be automatically set by parent Flex component
   */
  flexDirection: PropTypes.oneOf(['row', 'column']),
};

// Boolean flag for now, Symbol-based approach may be used instead.
// However, there are  concerns related to browser compatibility if Symbols will be used.
// Completely alternative approach - check class name of React element (and generalize this logic).
FlexItem.__isFlexItem = true;
