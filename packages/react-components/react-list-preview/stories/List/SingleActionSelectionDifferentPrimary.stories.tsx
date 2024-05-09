import { Persona, SelectionItemId } from '@fluentui/react-components';
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

export const SingleActionSelectionDifferentPrimary = () => {
  const [selectedItems, setSelectedItems] = React.useState<SelectionItemId[]>(['Demetra Manwaring', 'Bart Merrill']);

  // This will be triggered by user pressing Enter or clicking on the list item
  const onAction = React.useCallback(event => {
    // This prevents the change in selection on click/Enter
    event.preventDefault();
    alert(`Triggered custom action!`);
  }, []);

  return (
    <List
      selectionMode="multiselect"
      selectedItems={selectedItems}
      onSelectionChange={(_, data) => setSelectedItems(data.selectedItems)}
    >
      {items.map(({ name, avatar }) => (
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
      ))}
    </List>
  );
};

SingleActionSelectionDifferentPrimary.parameters = {
  docs: {
    description: {
      story: [
        'This example is similar to the previous one, but it implements a custom primary action on `ListItem`,',
        'allowing us to trigger a',
        '__different action than the selection when the user clicks on the list item or presses Enter__',
        '. This is useful when you want to have a primary action on the list item, but still want ',
        'to allow the user to select it.',
        '',
        'To change the default action on the `ListItem` (when user clicks on it or presses Enter), you can use the',
        '`onAction` prop. By calling `event.preventDefault()` in the `onAction` callback, you can prevent the default',
        'action (toggling the selection) from happening. This way, you can perform a completely custom action.',
        'In this example, the custom action is an alert that triggers when the user',
        'clicks on the list item or presses Enter.',
        '',
        '__The selection can still be toggled by clicking on the checkbox or pressing `Space` when the item is focused.__',
      ].join('\n'),
    },
  },
};
