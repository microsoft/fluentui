import * as React from 'react';
import { css } from '@uifabric/utilities';
import { GenericDictionary } from './types';

/**
 * Helper which deep clones props, but respecting JSX and classnames.
 * @param target
 * @param propSets
 */
export const mergeProps = (target: GenericDictionary, ...propSets: (GenericDictionary | undefined)[]) => {
  for (const props of propSets) {
    if (props) {
      for (const propName of Object.keys(props)) {
        const propValue = props[propName];
        const propValueType = typeof propValue;

        if (propValueType === 'object') {
          if (Array.isArray(propValue)) {
            // for arrays, replace.
            target[propName] = propValue;
          } else {
            target[propName] = target[propName] || {};

            if (typeof target[propName] !== 'object' || React.isValidElement(propValue)) {
              // if target is not an object, or value is JSX, replace
              target[propName] = propValue;
            } else {
              // else merge.
              mergeProps(target[propName], propValue);
            }
          }
        } else if (propName === 'className') {
          if (propValue) {
            // for classnames, append
            target[propName] = css(target[propName], propValue);
          }
        } else {
          target[propName] = propValue;
        }
      }
    }
  }

  return target;
};
