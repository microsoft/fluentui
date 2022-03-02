import * as React from 'react';
import Screener, { Steps } from 'screener-storybook/src/screener';
import { storiesOf } from '@storybook/react';
import { Switch } from '@fluentui/react-switch';

storiesOf('Switch Converged', module)
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
  .addStory('With label above', () => <Switch className="test-class" label="Toggle switch" labelPosition="above" />)
  .addStory('With label after', () => <Switch className="test-class" label="Toggle switch" labelPosition="after" />)
  .addStory('With label before', () => <Switch className="test-class" label="Toggle switch" labelPosition="before" />)
  .addStory('With label wrapping', () => (
    <Switch
      className="test-class"
      label={`Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
         dolore magna aliqua`}
    />
  ))
  .addStory('Required', () => <Switch className="test-class" label="Toggle switch" required />);
