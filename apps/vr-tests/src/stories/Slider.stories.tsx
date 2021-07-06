import * as React from 'react';
import Screener from 'screener-storybook/src/screener';
import { storiesOf } from '@storybook/react';
import { FabricDecoratorTall } from '../utilities/index';
import { Slider, ThemeProvider } from '@fluentui/react';

storiesOf('Slider', module)
  .addDecorator(FabricDecoratorTall)
  .addDecorator(story => (
    <ThemeProvider>
      <Screener
        steps={new Screener.Steps()
          .snapshot('default', { cropTo: '.testWrapper' })
          .hover('.ms-Slider-line')
          .snapshot('hover', { cropTo: '.testWrapper' })
          .end()}
      >
        {story()}
      </Screener>
    </ThemeProvider>
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
