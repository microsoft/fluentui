// FIXME: these types are copy&paste from @fluentui/docs to avoid circular dependency
// componentInfo should be a part of components package? -> discuss with Levi

import * as React from 'react';
import { ComponentInfo } from './types';

/**
 * Get the Webpack Context for all Component.info.json files.
 */
const requireContext = require.context('../../../docs/src/componentInfo', true, /\.info\.json$/);

const keys: string[] = requireContext.keys();
const infoObjects = keys.map(requireContext) as ComponentInfo[];

export const componentInfoContext: {
  byDisplayName: { [componentName: string]: ComponentInfo };
  fromComponent: (Component: React.ComponentType) => ComponentInfo;
  parents: ComponentInfo[];
} = {} as any;

componentInfoContext.byDisplayName = infoObjects.reduce((acc, next) => {
  acc[next.displayName] = next;
  return acc;
}, {});

componentInfoContext.byDisplayName['MaterialButton'] = {
  constructorName: 'MaterialButton',
  componentClassName: 'MaterialButton',
  implementsCreateShorthand: false,
  displayName: 'MaterialButton',
  filename: 'foo',
  filenameWithoutExt: 'foo',
  docblock: {
    description: 'foo',
    tags: [
      {
        description: 'foo',
        title: 'foo',
      },
    ],
  },
  apiPath: 'foo',
  isChild: false,
  isParent: false,
  parentDisplayName: 'foo',
  props: [],
  repoPath: 'ff',
  subcomponentName: 'ff',
  subcomponents: [],
  type: 'component',
};

componentInfoContext.fromComponent = Component => {
  const displayName = Component.displayName || Component.name;

  return componentInfoContext.byDisplayName[displayName];
};

componentInfoContext.parents = infoObjects.filter(({ isParent }) => isParent);
