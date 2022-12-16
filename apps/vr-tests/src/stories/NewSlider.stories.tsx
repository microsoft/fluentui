import * as React from 'react';
import { Steps, StoryWright } from 'storywright';
import { storiesOf } from '@storybook/react';
import { FabricDecoratorTall } from '../utilities';
import { Slider } from '@uifabric/experiments';

const marks = [
  { value: 0, label: '0' },
  { value: 40, label: '40' },
  { value: 60, label: '60' },
  { value: 100, label: '100' },
];

storiesOf('Experimental Slider', module)
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
  .addStory('With Tickmarks', () => (
    <div style={{ flexDirection: 'column', width: '300px', display: 'flex' }}>
      <Slider
        label="Slider with Tickmarks"
        min={0}
        max={50}
        step={10}
        defaultValue={20}
        marks
        showValue
      />
    </div>
  ))
  .addStory('Vertical With Custom Labels', () => (
    <div style={{ flexDirection: 'row', height: '200px', display: 'flex' }}>
      <Slider
        label="Slider with Custom Labels"
        min={10}
        max={100}
        step={10}
        marks={marks}
        vertical
      />
    </div>
  ));
