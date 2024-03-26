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
  button: {
    ...shorthands.padding(0),
  },
});

// Memoizing the ListItem like this allows the unaffected ListItem not to be re-rendered when the selection changes.
const MyListItem = React.memo(({ name, avatar }: { name: string; avatar: string }) => {
  const onAction = React.useCallback(
    event => {
      // This prevents the change in selection on click/Enter
      event.preventDefault();
      alert(`Triggered action on ${name}`);
    },
    [name],
  );
  return (
    <ListItem key={name} value={name} aria-label={name} onAction={onAction}>
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

export const SingleActionSelectionDifferentPrimary = () => {
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

SingleActionSelectionDifferentPrimary.parameters = {
  docs: {
    description: {
      story: [
        'This example is similar to the previous one, but it implements a custom primary action on `ListItem`,',
        'allowing us to trigger a different action than the selection when the user clicks on the list item or ',
        'presses Enter. This is useful when you want to have a primary action on the list item, but still want ',
        'to allow the user to select it.',
        '',
        'To change the default action on the `ListItem` (when user clicks on it or presses Enter), you can use the',
        '`onAction` prop. By callign `event.preventDefault()` in the `onAction` callback, you can prevent the default',
        'action (toggling the selection) from happening. This way, you can perform a completely custom action.',
        'In this example, the custom action is an alert that triggers when the user',
        'clicks on the list item or presses Enter.',
        '',
        '',
        'The selection can still be toggled by clicking on the checkbox or pressing `Space` when the item is focused.',
      ].join('\n'),
    },
  },
};
