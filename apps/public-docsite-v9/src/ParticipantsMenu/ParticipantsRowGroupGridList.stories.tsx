import * as React from 'react';
import { Button, List, ListItem } from '@fluentui/react-components';

import { Prototype } from './utils';
import { ParticipantsMenuWrapper } from './ParticipantsMenuWrapper';
import { participantsList } from './participantsList';

export const ParticipantsRowGroupGridList = () => {
  return (
    <Prototype pageTitle="Row group grid">
      <h1>Row group grid</h1>
      <ParticipantsMenuWrapper>
        <List navigationMode="composite">
          <div aria-hidden="true">People</div>
          <div role="rowgroup" aria-label="People">
            {participantsList.people.map((name, index) => (
              <ListItem key={index} role="row" aria-label={name}>
                <div role="gridcell">{name}</div>
                <div role="gridcell">
                  <Button aria-label={`Profile card for ${name}`}>Avatar icon</Button>
                </div>
                <div role="gridcell">
                  <Button>Remove {name}</Button>
                </div>
              </ListItem>
            ))}
          </div>
          <div aria-hidden="true">Agents and bots</div>
          <div role="rowgroup" aria-label="Agents and bots">
            {participantsList.agentsAndBots.map((name, index) => (
              <ListItem key={index} role="row" aria-label={name}>
                <div role="gridcell">{name}</div>
                <div role="gridcell">
                  <Button aria-label={`Profile card for ${name}`}>Avatar icon</Button>
                </div>
                <div role="gridcell">
                  <Button>Remove {name}</Button>
                </div>
              </ListItem>
            ))}
          </div>
        </List>
      </ParticipantsMenuWrapper>
    </Prototype>
  );
};
