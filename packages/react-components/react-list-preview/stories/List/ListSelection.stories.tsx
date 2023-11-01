import { Button, Checkbox, makeStyles, Persona, shorthands } from '@fluentui/react-components';
import { List, ListItem, useListFeatures, useListSelection } from '@fluentui/react-list-preview';
import * as React from 'react';
import names from './names';

type Item = {
  name: string;
  id: string;
  avatar: string;
};

const origItems: Item[] = names.map(name => ({
  name,
  id: name,
  avatar:
    'https://res-1.cdn.office.net/files/fabric-cdn-prod_20230815.002/office-ui-fabric-react-assets/persona-male.png',
}));

const useStyles = makeStyles({
  wrapper: {
    maxHeight: '300px',
    overflowY: 'auto',
    ...shorthands.padding('2px'),
  },
  button: {
    ...shorthands.padding(0),
  },
});

export const ListSelection = () => {
  const classes = useStyles();

  const { items, selection } = useListFeatures({ items: origItems }, [useListSelection()]);
  const { isSelected, toggleItem, selectItem, deselectItem, clearSelection } = selection;
  console.log('___', selection);

  return (
    <div className={classes.wrapper}>
      <Button onClick={e => selectItem(e, 'Melda Bevel')}>Select first</Button>
      <Button onClick={e => deselectItem(e, 'Melda Bevel')}>Deselect first</Button>
      <Button onClick={e => clearSelection(e)}>Clear selection</Button>

      <List>
        {items.map(({ name, avatar, id }) => (
          <ListItem key={name} button={{ onClick: (e: React.SyntheticEvent) => toggleItem(e, id) }}>
            <Checkbox checked={isSelected(id)} input={{ tabIndex: 0 }} />
            <Persona
              name={name}
              secondaryText="Available"
              presence={{ status: 'available' }}
              avatar={{
                image: {
                  src: avatar,
                },
              }}
            />
          </ListItem>
        ))}
      </List>
    </div>
  );
};
