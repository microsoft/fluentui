// FIXME: these types are copy&paste from @fluentui/docs to avoid circular dependency
// componentInfo should be a part of components package? -> discuss with Levi

import * as React from 'react';
import { ComponentInfo } from './types';
import { v9ComponentsInfo } from './v9componentsInfo';

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
  next.shortName = next.displayName;
  next.displayName = `FluentV0.${next.displayName}`;
  next.componentLibrary = 'Fluent UI v0';
  next.parentDisplayName = `FluentV0.${next.parentDisplayName}`;
  acc[next.displayName] = next;
  return acc;
}, {});

v9ComponentsInfo.forEach(item => {
  item.moduleName = '@fluentui/react-components';
  item.shortName = item.displayName;
  item.componentLibrary = 'Fluent UI v9';
  item.displayName = `FluentV9.${item.displayName}`;

  item.props.forEach((prop, i) => {
    if (prop.name === 'children') {
      item.props.splice(i, 1);
      return false;
    }
    return true;
  });

  item.props.push({
    defaultValue: '',
    description: 'children property',
    name: 'children',
    required: false,
    tags: [],
    types: [
      {
        name: 'string',
        keyword: true,
      },
    ],
  });

  componentInfoContext.byDisplayName[item.displayName] = item;
});

componentInfoContext.fromComponent = Component => {
  const displayName = Component.displayName || Component.name;

  return componentInfoContext.byDisplayName[displayName];
};

componentInfoContext.parents = infoObjects.filter(({ isParent }) => isParent);
