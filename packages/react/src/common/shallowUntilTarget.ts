import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';

/**
 * Duplicated enzyme's ShallowRendererProps
 *
 * @internal
 */
export interface IShallowRendererProps {
  lifecycleExperimental?: boolean;
  disableLifecycleMethods?: boolean;
}

/**
 * ShallowUntilTarget Interface
 *
 * @internal
 */
export interface IShallowUntilTarget {
  maxTries: number;
  shallowOptions: IShallowRendererProps;
}

/**
 * An extention of enzyme's shallow function which will fail to work
 * with decorated components and/or components using the styled() function.
 * This function allows you to pass a 'target' component (e.g. ComponentBase)
 * and keep running shallow on each child component till a match is found.
 *
 * @public
 */
export function shallowUntilTarget<P extends {}, S extends {}>(
  componentInstance: React.ReactElement<P>,
  TargetComponent: string,
  options: IShallowUntilTarget = {
    maxTries: 10,
    shallowOptions: {},
  },
): ShallowWrapper {
  const { maxTries, shallowOptions } = options;

  let root = shallow<P, S>(componentInstance, shallowOptions);
  let rootType = root.type();

  if (typeof rootType === 'string' || rootType.toString().indexOf(TargetComponent) !== -1) {
    // Default shallow()
    // If type() is a string then it's a DOM Node.
    // If it were wrapped, it would be a React component.
    return root;
  }

  for (let tries = 1; tries <= maxTries; tries++) {
    // Check for target as a string to avoid conflicts
    // with decoratored components name
    if (rootType.toString().indexOf(TargetComponent) !== -1) {
      // Now that we found the target component, render it.
      return root.first().shallow(shallowOptions);
    }
    // Unwrap the next component in the hierarchy.
    root = root.first().shallow(shallowOptions);
    rootType = root.type();
  }

  throw new Error(
    `Could not find ${TargetComponent} in React instance: ${componentInstance};
    gave up after ${maxTries} tries`,
  );
}
