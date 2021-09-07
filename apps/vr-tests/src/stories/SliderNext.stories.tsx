import * as React from 'react';
import Screener, { Steps } from 'screener-storybook/src/screener';
import { storiesOf } from '@storybook/react';
import { Slider } from '@fluentui/react-slider';

storiesOf('SliderNext', module)
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
  .addStory('Root', () => <Slider className="test-class" defaultValue={30} />, { rtl: true })
  .addStory('Vertical', () => <Slider className="test-class" vertical defaultValue={30} />, {
    rtl: true,
  })
  .addStory('Disabled', () => <Slider className="test-class" disabled defaultValue={30} />)
  .addStory('Disabled Vertical', () => (
    <Slider className="test-class" disabled vertical defaultValue={30} />
  ))
  .addStory('Origin', () => <Slider className="test-class" origin={30} />, { rtl: true })
  .addStory('Origin Vertical', () => <Slider className="test-class" vertical origin={30} />, {
    rtl: true,
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
    rtl: true,
  })
  .addStory(
    'Marks Vertical',
    () => <Slider className="test-class" vertical max={10} defaultValue={3} marks />,
    {
      rtl: true,
    },
  )
  .addStory(
    'Marks Custom',
    () => <Slider className="test-class" max={10} defaultValue={3} marks={[0, 1, 5, 8, 10]} />,
    {
      rtl: true,
    },
  )
  .addStory(
    'Marks Custom Vertical',
    () => (
      <Slider className="test-class" vertical max={10} defaultValue={3} marks={[0, 1, 5, 8, 10]} />
    ),
    {
      rtl: true,
    },
  );
