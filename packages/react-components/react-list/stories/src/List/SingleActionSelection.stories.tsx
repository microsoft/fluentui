import { Persona } from '@fluentui/react-components';
import { List, ListItem } from '@fluentui/react-components';

import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';

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

export const SingleActionSelection = (): JSXElement => {
  const defaultSelectedItems = ['Demetra Manwaring', 'Bart Merrill'];

  return (
    <List selectionMode="multiselect" defaultSelectedItems={defaultSelectedItems} aria-label="People example">
      {items.map(({ name, avatar }, i) => (
        <ListItem
          key={name}
          value={name}
          aria-label={name}
          checkmark={{ 'aria-label': name }}
          disabledSelection={i > 3} // Example of disabling selection for last 2 items
        >
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

SingleActionSelection.parameters = {
  docs: {
    description: {
      story: [
        'Any List can be selectable. You have an option to control the selection state yourself or let the List manage it for you.',
        '',
        'You can pass `selectionMode` prop with value "single" or "multiselect" to the List component to get support for selection.',
        'The items can be toggled by clicking on the list item, or pressing `Spacebar` or `Enter` when the item is focused. Keyboard navigation is automatically enabled and `navigationMode` is set to `items`.',
        '',
        "Also this example only has one action in the list item, and it's for toggling the selection. The roles for this one are listbox and option.",
      ].join('\n'),
    },
  },
};
