import * as React from 'react';
import Screener, { Steps } from 'screener-storybook/src/screener';
import { storiesOf } from '@storybook/react';
import { FluentProviderDecorator } from '../utilities/index';
import { RangedSlider } from '@fluentui/react-slider';

storiesOf('RangedSliderConverged', module)
  .addDecorator(FluentProviderDecorator)
  .addDecorator(story => (
    <Screener
      steps={new Steps()
        .snapshot('default', { cropTo: '.testWrapper' })
        .hover('.test-class')
        .snapshot('hover', { cropTo: '.testWrapper' })
        .mouseDown('.test-class')
        .snapshot('pressed', { cropTo: '.testWrapper' })
        .mouseUp('.test-class')
        .end()}
    >
      {story()}
    </Screener>
  ))
  .addStory(
    'Root',
    () => <RangedSlider className="test-class" defaultValue={{ lowerValue: 30, upperValue: 80 }} />,
    { rtl: true },
  )
  .addStory(
    'Vertical',
    () => (
      <RangedSlider
        className="test-class"
        defaultValue={{ lowerValue: 20, upperValue: 45 }}
        vertical
      />
    ),
    { rtl: true },
  )
  .addStory('Vertical', () => (
    <RangedSlider
      className="test-class"
      defaultValue={{ lowerValue: 10, upperValue: 80 }}
      disabled
    />
  ))
  .addStory('Disabled Vertical', () => (
    <RangedSlider
      className="test-class"
      defaultValue={{ lowerValue: 15, upperValue: 58 }}
      disabled
      vertical
    />
  ))
  .addStory(
    'Marks',
    () => (
      <RangedSlider
        className="test-class"
        max={10}
        defaultValue={{ lowerValue: 10, upperValue: 80 }}
        marks
      />
    ),
    {
      rtl: true,
    },
  )
  .addStory(
    'Marks Vertical',
    () => (
      <RangedSlider
        className="test-class"
        vertical
        max={10}
        defaultValue={{ lowerValue: 10, upperValue: 80 }}
        marks
      />
    ),
    {
      rtl: true,
    },
  )
  .addStory(
    'Marks Custom',
    () => (
      <RangedSlider
        className="test-class"
        max={10}
        defaultValue={{ lowerValue: 10, upperValue: 80 }}
        marks={[0, 1, 5, 8, 10]}
      />
    ),
    {
      rtl: true,
    },
  )
  .addStory(
    'Marks Custom Vertical',
    () => (
      <RangedSlider
        className="test-class"
        vertical
        max={10}
        defaultValue={{ lowerValue: 10, upperValue: 80 }}
        marks={[0, 1, 5, 8, 10]}
      />
    ),
    {
      rtl: true,
    },
  );
