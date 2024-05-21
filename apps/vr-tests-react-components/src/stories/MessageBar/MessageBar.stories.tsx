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

export const MultilineWithoutActions = () => (
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
        <MessageBarActions containerAction={<Button appearance="transparent" icon={<DismissRegular />} />} />
      </MessageBar>
    ))}
  </div>
);

export const MultilineNoActions = () => (
  <div
    style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: 500, padding: 10 }}
    className="testWrapper"
  >
    {intents.map(intent => (
      <MessageBar layout="multiline" key={intent} intent={intent}>
        <MessageBarBody>
          <MessageBarTitle>{intent}</MessageBarTitle>
          Message providing information to the user with actionable insights. <Link>Link</Link>
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
          consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
          est laborum."
        </MessageBarBody>
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
