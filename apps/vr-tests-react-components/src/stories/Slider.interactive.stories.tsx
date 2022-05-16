import * as React from 'react';
import Screener, { Steps } from 'screener-storybook/src/screener';
import { storiesOf } from '@storybook/react';
import { Slider } from '@fluentui/react-slider';

storiesOf('Slider Converged', module)
  .addDecorator(story => (
    <Screener
      steps={new Steps()
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
  .addStoryInteractive('Root', () => <Slider className="test-class" defaultValue={30} />, {
    includeRtl: true,
    includeHighContrast: true,
    includeDarkMode: true,
  })
  .addStoryInteractive('Vertical', () => <Slider className="test-class" vertical defaultValue={30} />, {
    includeRtl: true,
  })
  .addStoryInteractive('Disabled', () => <Slider className="test-class" disabled defaultValue={30} />, {
    includeHighContrast: true,
    includeDarkMode: true,
  })
  .addStoryInteractive('Disabled Vertical', () => <Slider className="test-class" disabled vertical defaultValue={30} />)
  .addStoryInteractive('Origin', () => <Slider className="test-class" origin={30} />, { includeRtl: true })
  .addStoryInteractive('Origin Vertical', () => <Slider className="test-class" vertical origin={30} />, {
    includeRtl: true,
  })
  .addStoryInteractive('Origin (min)', () => <Slider className="test-class" min={0} origin={0} />)
  .addStoryInteractive('Origin Vertical (min)', () => <Slider className="test-class" min={0} vertical origin={0} />)
  .addStoryInteractive('Origin (max)', () => <Slider className="test-class" max={10} origin={10} />)
  .addStoryInteractive('Origin Vertical (max)', () => <Slider className="test-class" min={10} vertical origin={10} />);
