/*! Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license. */
import * as React from 'react';
import Screener, { Steps } from 'screener-storybook/src/screener';
import { FabricDecorator, TestWrapperDecorator, runStories } from '../utilities';
import { ProgressIndicator } from 'office-ui-fabric-react';

const progressIndicatorStories = {
  decorators: [FabricDecorator, TestWrapperDecorator],
  stories: {
    '0%': () => (
      <ProgressIndicator
        label='Example title'
        description='Example description'
        percentComplete={0}
      />
    ),
    '50%': () => (
      <ProgressIndicator
        label='Example title'
        description='Example description'
        percentComplete={0.5}
      />
    ),
    '100%': () => (
      <ProgressIndicator
        label='Example title'
        description='Example description'
        percentComplete={1}
      />
    )
  }
};

runStories('ProgressIndicator', progressIndicatorStories);