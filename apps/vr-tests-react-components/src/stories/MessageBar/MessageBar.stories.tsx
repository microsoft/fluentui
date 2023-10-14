import * as React from 'react';
import {
  MessageBar,
  MessageBarActions,
  MessageBarBody,
  MessageBarIntent,
  MessageBarTitle,
} from '@fluentui/react-message-bar';
import { ComponentMeta } from '@storybook/react';
import { Steps } from 'storywright';
import { Button } from '@fluentui/react-button';
import { Link } from '@fluentui/react-link';
import { DismissRegular } from '@fluentui/react-icons';
import { getStoryVariant, withStoryWrightSteps, DARK_MODE, HIGH_CONTRAST, RTL } from '../../utilities';

const steps = new Steps().snapshot('default', { cropTo: '.testWrapper' }).end();

export default {
  title: 'MessageBar',
  Component: MessageBar,
  decorators: [story => withStoryWrightSteps({ story, steps })],
} as ComponentMeta<typeof MessageBar>;

const intents: MessageBarIntent[] = ['info', 'warning', 'error', 'success'];

export const Intents = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', padding: 10 }} className="testWrapper">
    {intents.map(intent => (
      <MessageBar key={intent} intent={intent}>
        <MessageBarBody>
          <MessageBarTitle>{intent}</MessageBarTitle>
          Message providing information to the user with actionable insights. <Link>Link</Link>
        </MessageBarBody>
        <MessageBarActions containerAction={<Button appearance="transparent" icon={<DismissRegular />} />}>
          <Button>Action</Button>
          <Button>Action</Button>
        </MessageBarActions>
      </MessageBar>
    ))}
  </div>
);

export const IntentsRTL = getStoryVariant(Intents, RTL);
export const IntentsDarkMode = getStoryVariant(Intents, DARK_MODE);
export const IntentsHighContrast = getStoryVariant(Intents, HIGH_CONTRAST);

export const Multiline = () => (
  <div
    style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: 500, padding: 10 }}
    className="testWrapper"
  >
    {intents.map(intent => (
      <MessageBar layout="multiline" key={intent} intent={intent}>
        <MessageBarBody>
          <MessageBarTitle>{intent}</MessageBarTitle>
          Message providing information to the user with actionable insights. <Link>Link</Link>
        </MessageBarBody>
        <MessageBarActions containerAction={<Button appearance="transparent" icon={<DismissRegular />} />}>
          <Button>Action</Button>
          <Button>Action</Button>
        </MessageBarActions>
      </MessageBar>
    ))}
  </div>
);

export const Auto = () => {
  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: 400, padding: 10 }}
      className="testWrapper"
    >
      <MessageBar layout="auto">
        <MessageBarBody>
          <MessageBarTitle>Title</MessageBarTitle>
          Message providing information to the user with actionable insights. <Link>Link</Link>
        </MessageBarBody>
        <MessageBarActions containerAction={<Button appearance="transparent" icon={<DismissRegular />} />}>
          <Button>Action</Button>
          <Button>Action</Button>
        </MessageBarActions>
      </MessageBar>
    </div>
  );
};

export const Square = () => {
  return (
    <MessageBar shape="square">
      <MessageBarBody>
        <MessageBarTitle>Title</MessageBarTitle>
        Message providing information to the user with actionable insights. <Link>Link</Link>
      </MessageBarBody>
      <MessageBarActions containerAction={<Button appearance="transparent" icon={<DismissRegular />} />}>
        <Button>Action</Button>
        <Button>Action</Button>
      </MessageBarActions>
    </MessageBar>
  );
};
