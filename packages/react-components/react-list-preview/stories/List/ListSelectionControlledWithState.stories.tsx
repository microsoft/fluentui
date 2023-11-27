import { Button, makeStyles, Persona, shorthands } from '@fluentui/react-components';
import { List, ListItem, useListSelection } from '@fluentui/react-list-preview';

import * as React from 'react';
const names = [
  'Melda Bevel',
  'Demetra Manwaring',
  'Eusebia Stufflebeam',
  'Israel Rabin',
  'Bart Merrill',
  'Sonya Farner',
  'Kristan Cable',
  'Cythia Ignacio',
  'Gia Laura',
  'Dewayne Oda',
  'Lang Yeldell',
  'Kathlyn Brewer',
  'Nia Woodworth',
];

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
  buttonControls: {
    display: 'flex',
    columnGap: '8px',
    marginBottom: '16px',
  },
  button: {
    ...shorthands.padding(0),
  },
});

// Memoizing the ListItem like this allows the unaffected ListItem not to be re-rendered when the selection changes.
const MyListItem = React.memo(({ name, avatar }: { name: string; avatar: string }) => {
  return (
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
  );
});

export const ListSelectionControlledWithState = () => {
  const classes = useStyles();
  const [currentIndex, setCurrentIndex] = React.useState(4);

  const items = React.useMemo(() => {
    return origItems.slice(0, currentIndex);
  }, [currentIndex]);

  const defaultSelectedItems = ['Demetra Manwaring', 'Bart Merrill'];

  const selection = useListSelection({
    selectionMode: 'multiselect',
    defaultSelectedItems,
  });

  return (
    <div className={classes.wrapper}>
      <div className={classes.buttonControls}>
        <Button onClick={e => setCurrentIndex(cur => cur + 1)}>Add item</Button>
        <Button
          onClick={e =>
            selection.toggleAllItems(
              e,
              items.map(({ id }) => id),
            )
          }
        >
          Toggle all
        </Button>
        <Button onClick={e => selection.clearSelection(e)}>Clear selection</Button>
      </div>

      <List
        selectable
        defaultSelectedItems={defaultSelectedItems}
        selectedItems={selection.selectedItems}
        onSelectionChange={(_, data) => selection.setSelectedItems(data.selectedItems)}
      >
        {items.map(({ name, avatar }) => (
          <MyListItem key={name} name={name} avatar={avatar} />
        ))}
      </List>
      <div>Selected people: {selection.selectedItems.join(', ')}</div>
    </div>
  );
};

ListSelectionControlledWithState.parameters = {
  docs: {
    description: {
      story: [
        'This example is an extension of the previous examle of controlled selection. ',
        'It shows how to use the `useListSelection` hook to control the selection state.',
        '',
        'The `useListSelection` hook is by no means required for the selection to work, but it provides a convenient ',
        'way to control the selection state by providing selection specific helper functions.',
      ].join('\n'),
    },
  },
};
