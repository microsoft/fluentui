/*! Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license. */
import * as React from 'react';
import Screener, { Steps } from 'screener-storybook/src/screener';
import { storiesOf } from '@storybook/react';
import { FabricDecoratorTall } from '../utilities';
import { Slider } from 'office-ui-fabric-react';

// tslint:disable:jsx-ban-props
storiesOf('Slider', module)
  .addDecorator(FabricDecoratorTall)
  .addDecorator(story => (
    <Screener
      steps={new Screener.Steps()
        .snapshot('default', { cropTo: '.testWrapper' })
        .hover('.ms-Slider-line')
        .snapshot('hover', { cropTo: '.testWrapper' })
        .end()
      }
    >
      {story()}
    </Screener>
  )).addStory('Root', () => (
    <div style={{ flexDirection: 'column', width: '300px', display: 'flex' }}>
      <Slider
        label='Basic example:'
        min={1}
        max={3}
        step={1}
        defaultValue={2}
        showValue={true}
      />
    </div>
  ), { rtl: true })
  .addStory('Disabled', () => (
    <div style={{ flexDirection: 'column', width: '300px', display: 'flex' }}>
      <Slider
        label='Basic example:'
        min={1}
        max={3}
        step={1}
        defaultValue={2}
        showValue={true}
        disabled
      />
    </div>
  )).addStory('Vertical', () => (
    <div style={{ flexDirection: 'row', height: '200px', display: 'flex' }}>
      <Slider
        label='Basic example:'
        min={1}
        max={3}
        step={1}
        defaultValue={2}
        showValue={true}
        vertical={true}
      />
    </div>
  )).addStory('EqualMinMax', () => (
    <div style={{ flexDirection: 'column', width: '300px', display: 'flex' }}>
      <Slider
        label='Basic example:'
        min={1}
        max={1}
        step={1}
        defaultValue={1}
        showValue={true}
      />
    </div>
  ));