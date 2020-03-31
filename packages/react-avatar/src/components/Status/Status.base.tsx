import * as React from 'react';
import { SizeValue } from '@fluentui/react-northstar';
import { getNativeProps, htmlElementProperties } from '@uifabric/utilities';
import { createSlot } from '../createSlot';
import { getClasses } from '../getClasses';

export type ShorthandValue<TProps> = string | boolean | number | TProps;

export interface UIComponentProps<TProps> {
  // Removing these props:
  // design - use style or className instead

  as?: string;

  className?: string;
}

export type ComponentClasses<TClasses, TState> = Partial<TClasses> | ((state: TState) => Partial<TClasses>);

export interface StatusClasses {
  root: string;
  icon: string;
}

// tslint:disable-next-line:no-any
export interface StatusProps extends UIComponentProps<StatusProps>, React.HTMLAttributes<any> {
  // Removing these props:
  // accessibility - no need

  /**
   * Status classes.
   */
  classes: ComponentClasses<StatusClasses, StatusProps>;

  /**
   * Renders the status using a custom color to be inlined using  `style`.
   * Note: May want to deprecate in favor of variables.
   */
  color?: string;

  /**
   * Shorthand icon. A shorthand prop can be a literal, object,
   * JSX, or function which takes render options.
   */
  icon?: ShorthandValue<{}>;

  /**
   * Size multiplier.
   */
  size?: SizeValue;

  /** The pre-defined state values which can be consumed directly. */
  state?: 'success' | 'info' | 'warning' | 'error' | 'unknown';
}

const icon = createSlot('icon');

/**
 * props.icon
 * slots.icon
 * props.slotComponents {
 *   icon: 'i'
 * }
 *
 */
export const StatusBase = (props: StatusProps) => {
  const { as: ElementType = 'span' as React.ElementType } = props;

  // Classes must always be resolved after state has been resolved.
  const classes = getClasses(props);

  return <ElementType {...getNativeProps(props, htmlElementProperties)}>{icon(props, classes, {})}</ElementType>;
};

StatusBase.options = {
  slots: {
    icon: {
      mappedProp: 'name',
      defaultProps: {},
      component: 'div',
    },
  },
};
