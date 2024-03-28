import { Button, makeStyles, Persona, SelectionItemId } from '@fluentui/react-components';
import { List, ListItem } from '@fluentui/react-list-preview';

import * as React from 'react';

type Item = {
  name: string;
  id: string;
  avatar: string;
};

const items: Item[] = [
  'Melda Bevel',
  'Demetra Manwaring',
  'Eusebia Stufflebeam',
  'Israel Rabin',
  'Bart Merrill',
  'Sonya Farner',
].map(name => ({
  name,
  id: name,
  avatar:
    'https://res-1.cdn.office.net/files/fabric-cdn-prod_20230815.002/office-ui-fabric-react-assets/persona-male.png',
}));

const useStyles = makeStyles({
  buttonControls: {
    display: 'flex',
    columnGap: '8px',
    marginBottom: '16px',
  },
});

export const SingleActionSelectionControlled = () => {
  const classes = useStyles();

  const [selectedItems, setSelectedItems] = React.useState<SelectionItemId[]>(['Demetra Manwaring', 'Bart Merrill']);

  return (
    <div>
      <div className={classes.buttonControls}>
        <Button onClick={e => setSelectedItems(items.map(({ id }) => id))}>Select all</Button>
      </div>

      <List
        selectionMode="multiselect"
        selectedItems={selectedItems}
        onSelectionChange={(_, data) => setSelectedItems(data.selectedItems)}
      >
        {items.map(({ name, avatar }) => (
          <ListItem key={name} value={name} aria-label={name}>
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

SingleActionSelectionControlled.parameters = {
  docs: {
    description: {
      story: [
        'This example shows how to use the `selectedItems` and `onSelectionChange`',
        'props to control the selection state of the List and keep track of it in the parent component.',
        '',
        'This is more in line with how we expect the selection to be used in production environment.',
      ].join('\n'),
    },
  },
};
