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

export const ListSelectionUncontrolled = () => {
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
      </div>

      <List
        selectable
        defaultSelectedItems={defaultSelectedItems}
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

ListSelectionUncontrolled.parameters = {
  docs: {
    description: {
      story: [
        'Any List can be selectable. You have an option to control the selection state yourself or let the List manage it for you.',
        '',
        'You can pass `selectable` prop inside of the List component to get built-in selection. The List notifies the parent about changes in selection via the `onSelectionChange` props. In the example we are also using the `defaultSelectedItems` prop to set the initial selection state.',
        '',
        "You can see that the default selection contains an object, which is not yet rendered in the list. Try adding a new item and see that it's selected by default. This is to demonstrate that you can decouple your selection state from ",
        'your list items and even store and retrieve them separately.',
      ].join('\n'),
    },
  },
};
