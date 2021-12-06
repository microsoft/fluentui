import * as React from 'react';
import { Ref, RefFindNode, RefForward } from '@fluentui/react-component-ref';

/**
 * Return the event handlers on an element.
 * Useful when the element is wrapped in Ref
 *
 * @param element
 */
export function getRealEventProps(element: React.ReactElement) {
  if (element.type === Ref || element.type === RefFindNode || element.type === RefForward) {
    return getRealEventProps(element.props.children as React.ReactElement);
  }

  return Object.keys(element.props).reduce((acc, propName) => {
    return propName.startsWith('on') ? { ...acc, [propName]: element.props[propName] } : acc;
  }, {});
}
