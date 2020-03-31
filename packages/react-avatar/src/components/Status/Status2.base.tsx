import * as React from 'react';
import { SizeValue } from '@fluentui/react-northstar';
import cx from 'classnames';
import { merge, getNativeProps, htmlElementProperties } from '@uifabric/utilities';

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

export const StatusBase = (props: StatusProps) => {
  const { as: ElementType = 'span' as React.ElementType } = props;

  // Classes must always be resolved after state has been resolved.
  const classes = getClasses(props);

  return <ElementType {...getNativeProps(props, htmlElementProperties)}>{icon(props, classes, {})}</ElementType>;
};

SlotsBase.options = {
  slots: {
    icon: {
      mappedProp: 'name',
      component: 'div',
    },
  },
};

const getClasses = (state: any) => {
  const { classes } = state;

  return typeof classes === 'function' ? classes(state) : classes;
};

// Shorthand prop can be:
//
// 1. literal: "info"
// 2. object: { state: "info" }
// 3. jsx: <Component />
// 4. function: (options) => JSX
//
// Expectations:
// If no prop was provided and no default component is provided, render nothing
const createSlot = (slotName: string) => (state, classes, defaultProps) => {
  let userProps = state[slotName];
  let { component: Component, handledProp } = state.slots[slotName];
  const Component = slot.component;
  const className = classes[slotName];

  // If the user has provided shorthand, or if a default component is provided,
  // try to do work.

  if (userProps || Component) {
    switch (typeof userProps) {
      case 'boolean':
      case 'string':
      case 'number':
        userProps = {
          [handledProp]: userProps,
        };
        break;
      case 'function':
        return userProps({
          component: Component,
          props: defaultProps,
          state,
        });
      default:
        break;
    }

    if (Component) {
      return (
        <Component
          {...merge(defaultProps, userProps)}
          classes={cx(defaultProps.className, userProps.className, className)}
        />
      );
    }
  }

  return null;
};
