import { Button, makeStyles, Persona, shorthands } from '@fluentui/react-components';
import { Checkmark16Filled } from '@fluentui/react-icons';
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
  buttonControls: {
    display: 'flex',
    columnGap: '8px',
    marginBottom: '16px',
  },
  button: {
    ...shorthands.padding(0),
  },
});

export const ListSelectionControlled = () => {
  const classes = useStyles();
  const [currentIndex, setCurrentIndex] = React.useState(4);

  const items = React.useMemo(() => {
    return origItems.slice(0, currentIndex);
  }, [currentIndex]);

  const { selection } = useListFeatures({ items }, [
    useListSelection({
      selectionMode: 'multiselect',
      onSelectionChange: (_, data) => console.log(data.selectedItems),
    }),
  ]);

  return (
    <div className={classes.wrapper}>
      <div className={classes.buttonControls}>
        <Button onClick={e => setCurrentIndex(cur => cur + 1)}>Add one</Button>
        <Button onClick={e => selection.toggleAllItems(e)}>Toggle all</Button>
      </div>

      <List {...selection.getListProps()}>
        {items.map(({ name, avatar }) => {
          return (
            <ListItem
              key={name}
              aria-label={name}
              {...selection.getListItemProps(name)}
              onClick={e => selection.toggleItem(e, name)}
              onKeyDown={e => {
                if (e.key === ' ') {
                  e.preventDefault();
                  selection.toggleItem(e, name);
                }
              }}
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
          );
        })}
      </List>
    </div>
  );
};
