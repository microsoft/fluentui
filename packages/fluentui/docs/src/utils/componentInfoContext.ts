import * as React from 'react';
import { ComponentInfo } from '../types';

// function importAll(contexts: __WebpackModuleApi.RequireContext[]): ComponentInfo[] {
//   const cache: ComponentInfo[] = [];
//
//   contexts.forEach(context => {
//     context.keys().forEach(key => cache.push(context(key)));
//   });
//
//   return cache;
// }

/**
 * Get the Webpack Context for all Component.info.json files.
 */
const infoObjects = [];

const componentInfoContext: {
  byDisplayName: { [componentName: string]: ComponentInfo };
  fromComponent: (Component: React.ComponentType) => ComponentInfo;
  parents: ComponentInfo[];
} = {} as any;

componentInfoContext.byDisplayName = infoObjects.reduce((acc, next) => {
  acc[next.displayName] = next;
  return acc;
}, {});

componentInfoContext.fromComponent = Component => {
  const displayName = Component.displayName || Component.name;

  return componentInfoContext.byDisplayName[displayName];
};

componentInfoContext.parents = infoObjects.filter(({ isParent }) => isParent);

export default componentInfoContext;
