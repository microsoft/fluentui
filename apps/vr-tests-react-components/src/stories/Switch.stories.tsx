import * as React from 'react';
import { Steps, StoryWright } from 'storywright';
import { storiesOf } from '@storybook/react';
import { Switch } from '@fluentui/react-switch';
import { TestWrapperDecorator } from '../utilities/TestWrapperDecorator';

storiesOf('Switch Converged', module)
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
  .addStory(
    'Enabled and unchecked',
    () => <Switch className="test-class" defaultChecked={false} label="Toggle switch" />,
    {
      includeRtl: true,
      includeHighContrast: true,
      includeDarkMode: true,
    },
  )
  .addStory(
    'Enabled and checked',
    () => <Switch className="test-class" defaultChecked={true} label="Toggle switch" />,
    {
      includeRtl: true,
      includeHighContrast: true,
      includeDarkMode: true,
    },
  )
  .addStory(
    'Disabled and unchecked',
    () => <Switch className="test-class" disabled defaultChecked={false} label="Toggle switch" />,
    {
      includeHighContrast: true,
      includeDarkMode: true,
    },
  )
  .addStory(
    'Disabled and checked',
    () => <Switch className="test-class" disabled defaultChecked={true} label="Toggle switch" />,
    {
      includeHighContrast: true,
      includeDarkMode: true,
    },
  )
  .addStory('With label above', () => <Switch className="test-class" label="Toggle switch" labelPosition="above" />, {
    includeRtl: true,
  })
  .addStory('With label after', () => <Switch className="test-class" label="Toggle switch" labelPosition="after" />, {
    includeRtl: true,
  })
  .addStory('With label before', () => <Switch className="test-class" label="Toggle switch" labelPosition="before" />, {
    includeRtl: true,
  })
  .addStory('With label wrapping', () => (
    <Switch
      className="test-class"
      label={`Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
         dolore magna aliqua`}
    />
  ))
  .addStory('Required', () => <Switch className="test-class" label="Toggle switch" required />);
