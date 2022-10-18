import * as React from 'react';

import { Card, CardHeader, CardFooter } from '@fluentui/react-components/unstable';

import { Button } from '@fluentui/react-components';

import { Scenario } from './utils';

export const UserProfileCards: React.FunctionComponent = () => {
  return (
    <Scenario pageTitle="User profile cards">
      <div role="group" aria-label="Press enter to enter card contents, press Escape to leave it">
        <Card focusMode="no-tab" aria-label="Bruce Wayne card">
          <CardHeader
            image={{ as: 'img', src: '#', alt: 'Face of a person' }}
            header={<h2>Bruce Wayne</h2>}
            description="Last seen 5 hours ago."
          />
          <CardFooter>
            <Button>Private message</Button>
            <Button aria-haspopup="menu">More options</Button>
          </CardFooter>
        </Card>

        <Card focusMode="no-tab" aria-label="Clark Kent card">
          <CardHeader
            image={{ as: 'img', src: '#', alt: 'Face of a person' }}
            header={<h2>Clark Kent</h2>}
            description="Last seen 30 minutes ago."
          />
          <CardFooter>
            <Button>Private message</Button>
            <Button aria-haspopup="menu">More options</Button>
          </CardFooter>
        </Card>
      </div>
    </Scenario>
  );
};
