import * as React from 'react';
import { Button, List, ListItem } from '@fluentui/react-components';

import { Prototype } from './utils';

import { participantsList } from './participantsList';

export const ParticipantsGridList = () => {
  return (
    <Prototype pageTitle="Grid">
      <h1>Grid</h1>
      <List navigationMode="composite">
        {participantsList.people.map((name, index) => (
          <ListItem key={index} aria-label={name}>
            <div role="gridcell">{name}</div>
            <div role="gridcell">
              <Button aria-description={`Show profile card for ${name}`}>Avatar for {name}</Button>
            </div>
            <div role="gridcell">
              <Button>Remove {name}</Button>
            </div>
          </ListItem>
        ))}
      </List>
    </Prototype>
  );
};
