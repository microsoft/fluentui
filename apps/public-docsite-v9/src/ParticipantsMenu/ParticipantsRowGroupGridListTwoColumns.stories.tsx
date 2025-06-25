import * as React from 'react';
import { Button, List, ListItem, Menu, MenuTrigger, MenuPopover } from '@fluentui/react-components';

import { Prototype } from './utils';

import { participantsList } from './participantsList';

export const ParticipantsRowGroupGridListTwoColumns = () => {
  return (
    <Prototype pageTitle="Row group grid with just two columns">
      <h1>Row group grid with just two columns</h1>
      <Menu>
        <MenuTrigger>
          <Button>Add people, agents, and bots</Button>
        </MenuTrigger>
        <MenuPopover>
          <List navigationMode="composite">
            <div aria-hidden="true">People</div>
            <div role="rowgroup" aria-label="People">
              {participantsList.people.map((name, index) => (
                <ListItem key={index} role="row" aria-label={name}>
                  <div role="gridcell">{name}</div>
                  <div role="gridcell">
                    <Button aria-description={`Show profile card for ${name}`}>Avatar for {name}</Button>
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
                    <Button aria-description={`Show profile card for ${name}`}>Avatar for {name}</Button>
                    <Button>Remove {name}</Button>
                  </div>
                </ListItem>
              ))}
            </div>
          </List>
        </MenuPopover>
      </Menu>
    </Prototype>
  );
};
