import { Button, makeStyles, Persona, shorthands, SelectionItemId } from '@fluentui/react-components';
import { List, ListItem } from '@fluentui/react-list-preview';

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

export const ListSelectionControlledBasic = () => {
  const classes = useStyles();
  const [currentIndex, setCurrentIndex] = React.useState(4);

  const items = React.useMemo(() => {
    return origItems.slice(0, currentIndex);
  }, [currentIndex]);

  const defaultSelectedItems = ['Demetra Manwaring', 'Bart Merrill'];

  const [selectedItems, setSelectedItems] = React.useState<SelectionItemId[]>(defaultSelectedItems);

  return (
    <div className={classes.wrapper}>
      <div className={classes.buttonControls}>
        <Button onClick={e => setCurrentIndex(cur => cur + 1)}>Add item</Button>
        <Button onClick={e => setSelectedItems(items.map(({ id }) => id))}>Select all</Button>
      </div>

      <List
        selectable
        defaultSelectedItems={defaultSelectedItems}
        selectedItems={selectedItems}
        onSelectionChange={(_, data) => setSelectedItems(data.selectedItems)}
      >
        {items.map(({ name, avatar }) => (
          <MyListItem key={name} name={name} avatar={avatar} />
        ))}
      </List>
      <div>Selected people: {selectedItems.join(', ')}</div>
    </div>
  );
};

ListSelectionControlledBasic.parameters = {
  docs: {
    description: {
      story: [
        'This example is similar to the previous one, but shows how to use the `selectedItems` and `onSelectionChange`',
        'props to control the selection state.',
        '',
        'This is a basic example how selection can be controlled with a simple array of selected values in a state.',
      ].join('\n'),
    },
  },
};
