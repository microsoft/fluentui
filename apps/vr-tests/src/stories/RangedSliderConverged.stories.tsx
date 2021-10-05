import * as React from 'react';
import Screener, { Steps } from 'screener-storybook/src/screener';
import { storiesOf } from '@storybook/react';
import { RangedSlider } from '@fluentui/react-slider';

const LabelComponent = () => <div style={{ width: '30px', height: '30px', background: 'green' }} />;

const MarkComponent = () => (
  <div
    style={{
      width: '10px',
      height: '10px',
      background: 'red',
    }}
  />
);

storiesOf('RangedSlider Converged', module)
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
  .addStory('Root', () => <RangedSlider className="test-class" />, {
    includeRtl: true,
    includeHighContrast: true,
    includeDarkMode: true,
  })
  .addStory('Vertical', () => <RangedSlider className="test-class" vertical />, {
    includeRtl: true,
  })
  .addStory(
    'Disabled',
    () => <RangedSlider className="test-class" defaultValue={[15, 58]} disabled />,
    { includeHighContrast: true, includeDarkMode: true },
  )
  .addStory('Disabled Vertical', () => (
    <RangedSlider className="test-class" defaultValue={[15, 58]} disabled vertical />
  ))
  .addStory(
    'Marks',
    () => <RangedSlider className="test-class" max={10} defaultValue={[1, 8]} marks />,
    {
      includeRtl: true,
      includeHighContrast: true,
      includeDarkMode: true,
    },
  )
  .addStory(
    'Marks Vertical',
    () => <RangedSlider className="test-class" vertical max={10} defaultValue={[1, 8]} marks />,
    {
      includeRtl: true,
    },
  )
  .addStory(
    'Marks Custom',
    () => (
      <RangedSlider
        className="test-class"
        max={10}
        defaultValue={[1, 8]}
        marks={[0, 1, 5, 8, 10]}
      />
    ),
    {
      includeRtl: true,
    },
  )
  .addStory(
    'Marks Custom Vertical',
    () => (
      <RangedSlider
        className="test-class"
        vertical
        max={10}
        defaultValue={[1, 8]}
        marks={[0, 1, 5, 8, 10]}
      />
    ),
    {
      includeRtl: true,
    },
  )
  .addStory(
    'Marks Custom Label Value',
    () => (
      <RangedSlider
        className="test-class"
        max={10}
        defaultValue={[3, 9]}
        marks={[
          1,
          {
            value: 3,
            label: <LabelComponent />,
          },
          { value: 4, label: 'world' },
          8,
        ]}
      />
    ),
    {
      includeRtl: true,
    },
  )
  .addStory(
    'Marks Custom Label Vertical',
    () => (
      <RangedSlider
        className="test-class"
        vertical
        max={10}
        defaultValue={[3, 9]}
        marks={[
          1,
          {
            value: 3,
            label: <LabelComponent />,
          },
          { value: 4, label: 'world' },
          8,
        ]}
      />
    ),
    {
      includeRtl: true,
    },
  )
  .addStory(
    'Custom Marks',
    () => (
      <RangedSlider
        className="test-class"
        max={10}
        defaultValue={[0, 10]}
        marks={[
          1,
          {
            value: 3,
            label: <LabelComponent />,
            mark: <MarkComponent />,
          },
          { value: 4, label: 'world' },
          8,
        ]}
      />
    ),
    {
      includeRtl: true,
    },
  )
  .addStory(
    'Custom Marks Vertical',
    () => (
      <RangedSlider
        className="test-class"
        vertical
        max={10}
        defaultValue={[0, 10]}
        marks={[
          1,
          {
            value: 3,
            label: <LabelComponent />,
            mark: <MarkComponent />,
          },
          { value: 4, label: 'world' },
          8,
        ]}
      />
    ),
    {
      includeRtl: true,
    },
  );
