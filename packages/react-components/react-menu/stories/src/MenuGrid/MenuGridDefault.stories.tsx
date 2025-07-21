import * as React from 'react';
import { Button } from '@fluentui/react-components';
import { MenuGrid, MenuGridCell, MenuGridRow, MenuGridRowGroup, MenuGridRowGroupHeader } from '@fluentui/react-menu';

const items = {
  people: ['Olivia Carter', 'Liam Thompson', 'Sophia Martinez', 'Noah Patel', 'Emma Robinson'],
  agentsAndBots: ['Facilitator', 'Copilot'],
};

export const Default = () => {
  return (
    <MenuGrid>
      <MenuGridRowGroup>
        <MenuGridRowGroupHeader>People</MenuGridRowGroupHeader>
        {items.people.map((name, index) => (
          <MenuGridRow key={index} aria-label={name}>
            <MenuGridCell>{name}</MenuGridCell>
            <MenuGridCell>
              <Button aria-label={`Profile card for ${name}`}>Avatar icon</Button>
            </MenuGridCell>
            <MenuGridCell>
              <Button>Remove {name}</Button>
            </MenuGridCell>
          </MenuGridRow>
        ))}
      </MenuGridRowGroup>
      <MenuGridRowGroup>
        <MenuGridRowGroupHeader>Agents and bots</MenuGridRowGroupHeader>
        {items.agentsAndBots.map((name, index) => (
          <MenuGridRow key={index} aria-label={name}>
            <MenuGridCell>{name}</MenuGridCell>
            <MenuGridCell>
              <Button aria-label={`Profile card for ${name}`}>Avatar icon</Button>
            </MenuGridCell>
            <MenuGridCell>
              <Button>Remove {name}</Button>
            </MenuGridCell>
          </MenuGridRow>
        ))}
      </MenuGridRowGroup>
    </MenuGrid>
  );
};
