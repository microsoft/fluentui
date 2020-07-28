import * as React from 'react';
import { css } from '@uifabric/utilities';
import { GenericDictionary } from './types';

export const mergeObjects = (target: GenericDictionary, ...propSets: (GenericDictionary | undefined)[]) => {
  for (const props of propSets) {
    if (props) {
      for (const propName of Object.keys(props)) {
        const propValue = props[propName];

        if (typeof propValue === 'object') {
          target[propName] = target[propName] || {};

          if (React.isValidElement(propValue)) {
            target[propName] = propValue;
          } else {
            mergeObjects(target[propName], propValue);
          }
        } else if (propName === 'className') {
          if (propValue) {
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
