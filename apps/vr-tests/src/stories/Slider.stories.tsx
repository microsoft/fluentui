/*! Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license. */
import * as React from 'react';
import Screener, { Steps } from 'screener-storybook/src/screener';
import { FabricDecoratorTall, runStories } from '../utilities';
import { Slider } from 'office-ui-fabric-react';

const SliderDecorator = story => (
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
);

// tslint:disable:jsx-ban-props
const sliderStories = {
  decorators: [FabricDecoratorTall, SliderDecorator],
  stories: {
    'Root': () => (
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
    ),
    'Disabled': () => (
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
    ),
    'Vertical': () => (
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
    )
  }
};

runStories('Slider', sliderStories);