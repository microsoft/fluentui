/*! Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license. */
import * as React from 'react';
import { Fabric } from 'office-ui-fabric-react';
import { storiesOf } from '@storybook/react';
import { setRTL } from 'office-ui-fabric-react/lib/Utilities';

// Wrap all stories in a Fabric component for proper styling

// tslint:disable:jsx-ban-props
export const FabricDecorator = (story) => (
  <Fabric style={{ display: 'flex' }}>
    <div className='testWrapper' style={{ padding: '10px', overflow: 'hidden' }}>
      {story()}
    </div>
  </Fabric>
);

export const FabricDecoratorTall = (story) => (
  <Fabric style={{ display: 'flex' }}>
    <div className='testWrapper' style={{ padding: '10px 10px 120px' }}>
      {story()}
    </div>
  </Fabric>
);

export const FabricDecoratorTallFixedWdith = (story) => (
  <Fabric style={{ display: 'flex' }}>
    <div className='testWrapper' style={{ padding: '10px 10px 120px', width: '300px' }}>
      {story()}
    </div>
  </Fabric>
);

export const FabricDecoratorFixedWidth = (story) => (
  <Fabric style={{ display: 'flex' }}>
    <div className='testWrapper' style={{ padding: '10px', width: '300px' }}>
      {story()}
    </div>
  </Fabric>
);

export interface IStorySet {
  decorators: ((story) => JSX.Element)[];
  stories: { [key: string]: () => JSX.Element };
}

/**
 * Runs the given set of stories for the component name twice:
 *  once in LTR and once in RTL
 *  (optionally excluding some stories from being run in RTL)
 */
export const runStories = (componentName: string, allStories: IStorySet[], rtlExclusions: string[] = []): void => {
  _createStorySet(componentName, allStories, rtlExclusions, false);
  // TODO: use same component name for RTL tests, or create new story set with different name,
  // e.g. componentName + ' - RTL'?
  _createStorySet(componentName, allStories, rtlExclusions, true);
};

// Helper function to run a set of stories in either LTR or RTL
const _createStorySet =
  (componentName: string,
    allStories: IStorySet[],
    rtlExclusions: string[],
    rtl: boolean
  ): void => {
    for (let i = 0; i < allStories.length; i++) {
      const decorators = allStories[i].decorators;
      const stories = allStories[i].stories;

      const componentStories = storiesOf(componentName, module);

      for (let j = 0; j < decorators.length; j++) {
        componentStories.addDecorator((story) => {
          setRTL(rtl);
          return decorators[j](story);
        });
      }

      for (const title in stories) {
        if (rtl && rtlExclusions.indexOf(title) !== -1) {
          continue;
        }

        const displayTitle = title + (rtl ? ' - RTL' : '');
        componentStories.add(displayTitle, stories[title]);
      }
    }
  };
