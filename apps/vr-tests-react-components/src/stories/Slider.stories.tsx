import * as React from 'react';
import { Steps, StoryWright } from 'storywright';
import { storiesOf } from '@storybook/react';
import { Slider } from '@fluentui/react-slider';
import { TestWrapperDecorator } from '../utilities/TestWrapperDecorator';

storiesOf('Slider Converged', module)
  .addDecorator(TestWrapperDecorator)
  .addDecorator(story => (
    <StoryWright
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
    </StoryWright>
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
  .addStory('Disabled Vertical', () => <Slider className="test-class" disabled vertical defaultValue={30} />);

storiesOf('Slider Converged', module)
  .addDecorator(TestWrapperDecorator)
  .addDecorator(story => (
    <StoryWright steps={new Steps().snapshot('default', { cropTo: '.testWrapper' }).end()}>{story()}</StoryWright>
  ))
  .addStory('Horizontal - 0%', () => <Slider defaultValue={0} />, { includeRtl: true })
  .addStory('Horizontal - 100%', () => <Slider defaultValue={100} />, { includeRtl: true })
  .addStory('Vertical - 0%', () => <Slider vertical defaultValue={0} />, { includeRtl: true })
  .addStory('Vertical - 100%', () => <Slider vertical defaultValue={100} />, { includeRtl: true });
