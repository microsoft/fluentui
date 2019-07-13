/*! Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license. */
import * as React from 'react';
import Screener from 'screener-storybook/src/screener';
import { storiesOf } from '@storybook/react';
import { FabricDecorator } from '../utilities';
import { ProgressIndicator } from 'office-ui-fabric-react';

storiesOf('ProgressIndicator', module)
  .addDecorator(FabricDecorator)
  .addDecorator(story =>
    // prettier-ignore
    <Screener
      steps={new Screener.Steps()
        .snapshot('default', { cropTo: '.testWrapper' })
        .end()}
    >
      {story()}
    </Screener>
  )
  .addStory('0%', () => (
    <ProgressIndicator
      label="Example title"
      description="Example description"
      percentComplete={0}
    />
  ))
  .addStory(
    '50%',
    () => (
      <ProgressIndicator
        label="Example title"
        description="Example description"
        percentComplete={0.5}
      />
    ),
    { rtl: true }
  )
  .addStory('100%', () => (
    <ProgressIndicator
      label="Example title"
      description="Example description"
      percentComplete={1}
    />
  ));
