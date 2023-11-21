import { Button, makeStyles, Persona, shorthands, useEventCallback } from '@fluentui/react-components';
import { List, ListItem, useListFeatures, useListSelection } from '@fluentui/react-list-preview';

import * as React from 'react';
import { ListSelectionState } from '../../src/hooks/types';

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

// This component is memoized, i.e. it will only re-render if the props change.
// This is important for performance, as we don't want to re-render the entire list
// when the selection state changes.
const MyListItem: React.FC<{
  name: string;
  avatar: string;
  toggleItem: (e: React.SyntheticEvent, id: string) => void;
  selectionProps: ReturnType<ListSelectionState['getListItemProps']>;
}> = React.memo(({ name, avatar, toggleItem, selectionProps }) => {
  const onClick = useEventCallback((e: React.MouseEvent) => toggleItem(e, name));
  const onKeyDown = useEventCallback((e: React.KeyboardEvent) => {
    if (e.key === ' ') {
      e.preventDefault();
      toggleItem(e, name);
    }
  });

  return (
    <ListItem key={name} aria-label={name} {...selectionProps} onClick={onClick} onKeyDown={onKeyDown}>
      <Persona
        name={name}
        secondaryText="Available"
        presence={{
          status: 'available',
        }}
        avatar={{
          image: {
            src: avatar,
          },
        }}
      />
    </ListItem>
  );
});

export const ListSelectionControlled = () => {
  const classes = useStyles();
  const [currentIndex, setCurrentIndex] = React.useState(4);

  const items = React.useMemo(() => {
    return origItems.slice(0, currentIndex);
  }, [currentIndex]);

  const selection = useListSelection({
    selectionMode: 'multiselect',
    onSelectionChange: (_, data) => console.log(data.selectedItems),
  });

  return (
    <div className={classes.wrapper}>
      <div className={classes.buttonControls}>
        <Button onClick={e => setCurrentIndex(cur => cur + 1)}>Add one</Button>
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
      </div>

      <List {...selection.getListProps()}>
        {items.map(({ name, avatar }) => (
          <MyListItem
            name={name}
            avatar={avatar}
            key={name}
            toggleItem={selection.toggleItem}
            selectionProps={selection.getListItemProps(name)}
          />
        ))}
      </List>
    </div>
  );
};

ListSelectionControlled.parameters = {
  docs: {
    description: {
      story: [
        'In the controlled approach you are in charge of the selection state. First, you create the state using `useListFeatures` in combination with `useListSelection` hooks.',
        '',
        'This will return a List state object with `selection` property. You can then use the `selection` object to control the selection state.',
        '',
        'In this case, you are in control of deciding what item should be selected and when, including listening on events and calling the `selection` methods.',
        '',
        'The `selection` object also provides utility functions like `getListProps` and `getListItemProps`. These functions return props that should be applied to the List and ListItems respectively to ensure the right accessibility attributes are passed.',
        '',
        'The `getListItemProps` also configures the `checkmark` hook to visualize the selection state of the item. Feel free to override this behavior by passing your own `checkmark` prop to the ListItem.',
      ].join('\n'),
    },
  },
};
