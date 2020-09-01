// FIXME: these types are copy&paste from @fluentui/docs to avoid circular dependency
// componentInfo should be a part of components package? -> discuss with Levi

import * as React from 'react';
import { ComponentInfo } from './types';

function importAll(contexts: __WebpackModuleApi.RequireContext[]): ComponentInfo[] {
  const cache: ComponentInfo[] = [];

  contexts.forEach(context => {
    context.keys().forEach(key => cache.push(context(key)));
  });

  return cache;
}

/**
 * Get the Webpack Context for all Component.info.json files.
 */
const infoObjects = importAll([
  require.context('@fluentui/react-component-ref/componentInfo', true, /\.info\.json$/),
  require.context('@fluentui/react-bindings/componentInfo', true, /\.info\.json$/),
  require.context('@fluentui/react-northstar/componentInfo', true, /\.info\.json$/),
]);

export const componentInfoContext: {
  byDisplayName: { [componentName: string]: ComponentInfo };
  fromComponent: (Component: React.ComponentType) => ComponentInfo;
  parents: ComponentInfo[];
} = {} as any;

componentInfoContext.byDisplayName = infoObjects.reduce((acc, next) => {
  next.moduleName = '@fluentui/react-northstar';
  acc[next.displayName] = next;
  return acc;
}, {});

componentInfoContext.fromComponent = Component => {
  const displayName = Component.displayName || Component.name;

  return componentInfoContext.byDisplayName[displayName];
};

componentInfoContext.parents = infoObjects.filter(({ isParent }) => isParent);
