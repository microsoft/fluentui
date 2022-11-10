import * as React from 'react';

import { Card, CardHeader, CardFooter } from '@fluentui/react-components/unstable';
import { Button } from '@fluentui/react-components';

import { Scenario } from './utils';

type FocusModeType = 'off' | 'no-tab' | 'tab-exit' | 'tab-only';

interface CardTemplateProps {
  cardId: string;
  name: string;
  lastSeen: string;
  focusMode: FocusModeType;
}
const CardTemplate: React.FunctionComponent<CardTemplateProps> = ({ cardId, name, lastSeen, focusMode }) => {
  const messageDescId = `${cardId}-message-desc`;
  return (
    <Card focusMode={focusMode} aria-label={`${name} card`}>
      <CardHeader
        image={{ as: 'img', src: '#', alt: 'Face of a person' }}
        header={{ as: 'h3', children: name }}
        description={`Last seen ${lastSeen} ago.`}
      />
      <CardFooter>
        <Button aria-describedby={messageDescId}>Private message</Button>
        <span id={messageDescId} style={{ display: 'none' }}>
          Send a private message to {name}.
        </span>
        <Button aria-haspopup="menu">More options</Button>
      </CardFooter>
    </Card>
  );
};

interface CardGroupProps {
  groupId: string;
  focusMode: FocusModeType;
}
const CardGroup: React.FunctionComponent<CardGroupProps> = ({ groupId, focusMode }) => (
  <>
    <CardTemplate cardId={`card1-${groupId}`} name="Bruce wayne" lastSeen="4 hours" focusMode={focusMode} />
    <CardTemplate cardId={`card2-${groupId}`} name="Clark Kent" lastSeen="30 minutes" focusMode={focusMode} />
    <CardTemplate cardId={`card3-${groupId}`} name="Peter Parker" lastSeen="2 days" focusMode={focusMode} />
  </>
);

export const UserProfileCards: React.FunctionComponent = () => (
  <Scenario pageTitle="User profile cards">
    <h2>Variant 1: No card focus with Tab</h2>
    <CardGroup groupId="group1" focusMode="off" />

    <h2>Variant 2: Enter card with Enter and leave with Escape only</h2>
    <div role="group" aria-label="Press enter to enter card contents, press Escape to leave it">
      <CardGroup groupId="group2" focusMode="no-tab" />
    </div>

    <h2>Variant 3: Enter card with Enter and leave with Escape or Tab</h2>
    <div
      role="group"
      aria-label="Press enter to enter card contents, press Escape or Tab when on last element to leave it"
    >
      <CardGroup groupId="group3" focusMode="tab-exit" />
    </div>

    <h2>Variant 4: Focus card with Tab, but no enter or leave</h2>
    <CardGroup groupId="group4" focusMode="tab-only" />
  </Scenario>
);
