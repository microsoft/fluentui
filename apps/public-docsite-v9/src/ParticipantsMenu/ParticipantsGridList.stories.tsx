import * as React from 'react';
import { Button, List, ListItem } from '@fluentui/react-components';

import { Prototype } from './utils';
import { ParticipantsMenuWrapper } from './ParticipantsMenuWrapper';
import { participantsList } from './participantsList';

const participantsListMerged = participantsList.people.concat(participantsList.agentsAndBots);

export const ParticipantsGridList = () => {
  return (
    <Prototype pageTitle="Grid">
      <h1>Grid</h1>
      <ParticipantsMenuWrapper>
        <List navigationMode="composite">
          {participantsListMerged.map((name, index) => (
            <ListItem key={index} aria-label={name}>
              <div role="gridcell">{name}</div>
              <div role="gridcell">
                <Button aria-label={`Profile card for ${name}`}>Avatar icon</Button>
              </div>
              <div role="gridcell">
                <Button>Remove {name}</Button>
              </div>
            </ListItem>
          ))}
        </List>
      </ParticipantsMenuWrapper>
    </Prototype>
  );
};
