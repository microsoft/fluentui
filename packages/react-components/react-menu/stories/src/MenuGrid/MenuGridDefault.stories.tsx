import * as React from 'react';
import { Button, makeStyles, tokens } from '@fluentui/react-components';
import { MenuGrid, MenuGridCell, MenuGridRow, MenuGridRowGroup, MenuGridRowGroupHeader } from '@fluentui/react-menu';

const items = {
  people: ['Olivia Carter', 'Liam Thompson', 'Sophia Martinez', 'Noah Patel', 'Emma Robinson'],
  agentsAndBots: ['Facilitator', 'Copilot'],
};

const useMenuListContainerStyles = makeStyles({
  container: {
    backgroundColor: tokens.colorNeutralBackground1,
    minWidth: '128px',
    minHeight: '48px',
    maxWidth: '300px',
    width: 'max-content',
    boxShadow: `${tokens.shadow16}`,
    paddingTop: '4px',
    paddingBottom: '4px',
  },
});

export const Default = () => {
  const styles = useMenuListContainerStyles();
  return (
    <div className={styles.container}>
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
    </div>
  );
};
