import * as React from 'react';
import { merge } from '@uifabric/utilities';
import cx from 'classnames';

// Shorthand prop can be:
//
// 1. literal: "info"
// 2. object: { state: "info" }
// 3. jsx: <Component />
// 4. function: (options) => JSX
//
// Expectations:
// If no prop was provided and no default component is provided, render nothing
// tslint:disable-next-line:no-any
export const createSlot = (slotName: string) => (state: any, classes: any, defaultProps: any) => {
  let userProps = state[slotName];
  const { slots = {} } = state;
  const slot = slots[slotName] || {};
  const { component: DefaultComponent, handledProp } = slot;
  const className = classes[slotName];

  // If the user has provided shorthand, or if a default component is provided,
  // try to do work.

  if (userProps || DefaultComponent) {
    switch (typeof userProps) {
      case 'boolean':
      case 'string':
      case 'number':
        userProps = {
          [handledProp]: userProps,
        };
        break;

      // children function, but not as children
      case 'function':
        return userProps({
          component: DefaultComponent,
          props: defaultProps,
          state,
        });

      default:
        if (React.isValidElement(userProps)) {
          return userProps;
        }
        break;
    }

    if (DefaultComponent) {
      return (
        <DefaultComponent
          {...merge(defaultProps, userProps)}
          classes={cx(defaultProps.className, userProps.className, className)}
        />
      );
    }
  }

  return null;
};
