/*! Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license. */
import * as React from 'react';
import { StoryWright, Steps } from 'storywright';
import { storiesOf } from '@storybook/react';
import { FabricDecoratorTall } from '../utilities';
import { Slider } from 'office-ui-fabric-react';

storiesOf('Slider', module)
  .addDecorator(FabricDecoratorTall)
  .addDecorator(story => (
    <StoryWright
      steps={new Steps()
        .snapshot('default', { cropTo: '.testWrapper' })
        .hover('.ms-Slider-line')
        .snapshot('hover', { cropTo: '.testWrapper' })
        .end()}
    >
      {story()}
    </StoryWright>
  ))
  .addStory(
    'Root',
    () => (
      <div style={{ flexDirection: 'column', width: '300px', display: 'flex' }}>
        <Slider label="Basic example:" min={1} max={3} step={1} defaultValue={2} showValue />
      </div>
    ),
    { rtl: true },
  )
  .addStory('Disabled', () => (
    <div style={{ flexDirection: 'column', width: '300px', display: 'flex' }}>
      <Slider label="Basic example:" min={1} max={3} step={1} defaultValue={2} showValue disabled />
    </div>
  ))
  .addStory('Vertical', () => (
    <div style={{ flexDirection: 'row', height: '200px', display: 'flex' }}>
      <Slider label="Basic example:" min={1} max={3} step={1} defaultValue={2} showValue vertical />
    </div>
  ))
  .addStory('EqualMinMax', () => (
    <div style={{ flexDirection: 'column', width: '300px', display: 'flex' }}>
      <Slider label="Basic example:" min={1} max={1} step={1} defaultValue={1} showValue />
    </div>
  ))
  .addStory('Max not multiple of step', () => (
    <div style={{ flexDirection: 'column', width: '300px', display: 'flex' }}>
      <Slider label="Basic example:" min={18} max={48} step={10} defaultValue={48} showValue />
    </div>
  ))
  .addStory('Step less than 1', () => (
    <div style={{ flexDirection: 'column', width: '300px', display: 'flex' }}>
      <Slider label="Basic example:" min={1} max={3} step={0.1} defaultValue={1.4} showValue />
    </div>
  ));
