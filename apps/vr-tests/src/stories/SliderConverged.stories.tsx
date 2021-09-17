import * as React from 'react';
import Screener, { Steps } from 'screener-storybook/src/screener';
import { storiesOf } from '@storybook/react';
import { Slider, RangedSlider } from '@fluentui/react-slider';

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
    'Marks Custom',
    () => <Slider className="test-class" max={10} defaultValue={3} marks={[0, 1, 5, 8, 10]} />,
    {
      includeRtl: true,
    },
  )
  .addStory(
    'Marks Custom Vertical',
    () => (
      <Slider className="test-class" vertical max={10} defaultValue={3} marks={[0, 1, 5, 8, 10]} />
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
  .addStory(
    'Root',
    () => <RangedSlider className="test-class" defaultValue={{ lowerValue: 30, upperValue: 80 }} />,
    { includeRtl: true, includeHighContrast: true, includeDarkMode: true },
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
    { includeRtl: true },
  )
  .addStory(
    'Disabled',
    () => (
      <RangedSlider
        className="test-class"
        defaultValue={{ lowerValue: 10, upperValue: 80 }}
        disabled
      />
    ),
    { includeHighContrast: true, includeDarkMode: true },
  )
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
      includeRtl: true,
      includeHighContrast: true,
      includeDarkMode: true,
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
      includeRtl: true,
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
        defaultValue={{ lowerValue: 10, upperValue: 80 }}
        marks={[0, 1, 5, 8, 10]}
      />
    ),
    {
      includeRtl: true,
    },
  );
