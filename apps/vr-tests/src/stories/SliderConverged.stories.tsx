import * as React from 'react';
import Screener, { Steps } from 'screener-storybook/src/screener';
import { storiesOf } from '@storybook/react';
import { Slider, RangedSlider } from '@fluentui/react-slider';

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

storiesOf('Slider Converged', module)
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
  .addStory('Root', () => <Slider className="test-class" defaultValue={30} />, {
    includeRtl: true,
    includeHighContrast: true,
    includeDarkMode: true,
  })
  .addStory('Vertical', () => <Slider className="test-class" vertical defaultValue={30} />, {
    includeRtl: true,
  })
  .addStory('Disabled', () => <Slider className="test-class" disabled defaultValue={30} />, {
    includeHighContrast: true,
    includeDarkMode: true,
  })
  .addStory('Disabled Vertical', () => (
    <Slider className="test-class" disabled vertical defaultValue={30} />
  ))
  .addStory('Origin', () => <Slider className="test-class" origin={30} />, { includeRtl: true })
  .addStory('Origin Vertical', () => <Slider className="test-class" vertical origin={30} />, {
    includeRtl: true,
  })
  .addStory('Origin (min)', () => <Slider className="test-class" min={0} origin={0} />)
  .addStory('Origin Vertical (min)', () => (
    <Slider className="test-class" min={0} vertical origin={0} />
  ))
  .addStory('Origin (max)', () => <Slider className="test-class" max={10} origin={10} />)
  .addStory('Origin Vertical (max)', () => (
    <Slider className="test-class" min={10} vertical origin={10} />
  ))
  .addStory('Marks', () => <Slider className="test-class" max={10} defaultValue={3} marks />, {
    includeRtl: true,
    includeHighContrast: true,
    includeDarkMode: true,
  })
  .addStory(
    'Marks Vertical',
    () => <Slider className="test-class" vertical max={10} defaultValue={3} marks />,
    {
      includeRtl: true,
    },
  )
  .addStory(
    'Marks Custom Value',
    () => <Slider className="test-class" max={10} defaultValue={3} marks={[0, 1, 5, 8, 10]} />,
    {
      includeRtl: true,
    },
  )
  .addStory(
    'Marks Custom Value Vertical',
    () => (
      <Slider className="test-class" vertical max={10} defaultValue={3} marks={[0, 1, 5, 8, 10]} />
    ),
    {
      includeRtl: true,
    },
  )
  .addStory(
    'Marks Label Value',
    () => (
      <Slider
        className="test-class"
        max={10}
        defaultValue={3}
        marks={[
          0,
          { value: 1, label: 'hello world' },
          { value: 2, label: 'hello' },
          8,
          { value: 10, label: '10' },
        ]}
      />
    ),
    {
      includeRtl: true,
    },
  )
  .addStory(
    'Marks Label Vertical',
    () => (
      <Slider
        className="test-class"
        vertical
        max={10}
        defaultValue={3}
        marks={[
          0,
          { value: 1, label: 'hello world' },
          { value: 2, label: 'hello' },
          8,
          { value: 10, label: '10' },
        ]}
      />
    ),
    {
      includeRtl: true,
    },
  )
  .addStory('Marks Label Disabled', () => (
    <Slider
      className="test-class"
      disabled
      max={10}
      defaultValue={7}
      marks={[
        0,
        { value: 1, label: 'hello world' },
        { value: 2, label: 'hello' },
        8,
        { value: 10, label: '10' },
      ]}
    />
  ))
  .addStory(
    'Marks Custom Label Value',
    () => (
      <Slider
        className="test-class"
        max={10}
        defaultValue={6}
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
      <Slider
        className="test-class"
        vertical
        max={10}
        defaultValue={6}
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
      <Slider
        className="test-class"
        max={10}
        defaultValue={6}
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
      <Slider
        className="test-class"
        vertical
        max={10}
        defaultValue={6}
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
        defaultValue={[3, 9]}
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
        defaultValue={[3, 9]}
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
