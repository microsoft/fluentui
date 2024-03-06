import { makeStyles, Persona, shorthands, SelectionItemId } from '@fluentui/react-components';
import { List, ListItem } from '@fluentui/react-list-preview';

import * as React from 'react';
const names = [
  'Melda Bevel',
  'Demetra Manwaring',
  'Eusebia Stufflebeam',
  'Israel Rabin',
  'Bart Merrill',
  'Sonya Farner',
];

type Item = {
  name: string;
  id: string;
  avatar: string;
};

const items: Item[] = names.map(name => ({
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

export const SingleActionSelection = () => {
  const classes = useStyles();

  const defaultSelectedItems = ['Demetra Manwaring', 'Bart Merrill'];

  const [selectedItems, setSelectedItems] = React.useState<SelectionItemId[]>(defaultSelectedItems);

  return (
    <div className={classes.wrapper}>
      <List
        selectionMode="multiselect"
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

SingleActionSelection.parameters = {
  docs: {
    description: {
      story: [
        'Any List can be selectable. You have an option to control the selection state yourself or let the List manage it for you.',
        '',
        'You can pass `selectionMode` prop with value "single" or "multiselect" to the List component to get support for selection. The List notifies the parent about changes in selection via the `onSelectionChange` props. In the example we are also using the `defaultSelectedItems` prop to set the initial selection state. While we are saving the results of `onSelectionChange`, it is purely for keeping track of the selection state and is not used to control the selection.',
        '',
        'The items can be toggled by clicking on them, clicking on the checkbox or pressing a Spacebar when the item is focused.',
        '',
        'Also this example only has one action in the list item, and its for toggling the selection. The roles for this one are listbox and option.',
      ].join('\n'),
    },
  },
};
