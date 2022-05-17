import * as React from 'react';
import Screener, { Steps } from 'screener-storybook/src/screener';
import { storiesOf } from '@storybook/react';
import { Switch } from '@fluentui/react-switch';
import { TestWrapperDecorator } from '../utilities/TestWrapperDecorator';

storiesOf('Switch Converged', module)
  .addDecorator(TestWrapperDecorator)
  .addDecorator(story => (
    <Screener steps={new Steps().snapshot('default', { cropTo: '.testWrapper' }).end()}>{story()}</Screener>
  ))
  .addStory(
    'Variations',
    () => (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <Switch className="test-class" defaultChecked={false} label="Checked" />
        <Switch className="test-class" defaultChecked={true} label="Unchecked" />
        <Switch className="test-class" disabled defaultChecked={false} label="Disabled unchecked" />
        <Switch className="test-class" disabled defaultChecked={true} label="Disbabled checked" />
        <Switch className="test-class" label="Label above" labelPosition="above" />
        <Switch className="test-class" label="Label after" labelPosition="after" />
        <Switch className="test-class" label="Label before" labelPosition="before" />
        <Switch
          className="test-class"
          label={`
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
          et dolore magna aliqua.
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
          Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          `}
        />
        <Switch className="test-class" label="Required" required />
      </div>
    ),
    {
      includeRtl: true,
      includeHighContrast: true,
      includeDarkMode: true,
    },
  );
