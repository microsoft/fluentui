import * as React from 'react';
import { GenericDictionary } from './types';

export const simplifyShorthand = (props: GenericDictionary, shorthandPropNames?: string[]) => {
  let newProps = props;

  if (shorthandPropNames && shorthandPropNames.length) {
    newProps = {
      ...props,
    };
    for (const propName of shorthandPropNames) {
      const propValue = props[propName];

      if (propValue !== undefined && (typeof propValue !== 'object' || React.isValidElement(propValue))) {
        newProps[propName] = { children: propValue };
      }
    }
  }

  return newProps;
};
