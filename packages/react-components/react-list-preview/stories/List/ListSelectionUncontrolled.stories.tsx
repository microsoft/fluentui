import { Button, makeStyles, Persona, shorthands } from '@fluentui/react-components';
import { IList, List, ListItem } from '@fluentui/react-list-preview';
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
  button: {
    ...shorthands.padding(0),
  },
});

export const ListSelectionUncontrolled = () => {
  const classes = useStyles();
  const [currentIndex, setCurrentIndex] = React.useState(4);

  const items = React.useMemo(() => {
    return origItems.slice(0, currentIndex);
  }, [currentIndex]);

  const ref = React.useRef<IList>(null);
  const [selectedItems, setSelectedItems] = React.useState<Array<string | number>>([]);

  return (
    <div className={classes.wrapper}>
      <Button onClick={e => setCurrentIndex(cur => cur + 1)}>Add one</Button>
      <Button onClick={e => ref.current?.selection.toggleAllItems(e)}>Toggle all</Button>
      <div>Selected: {selectedItems.join(', ')}</div>

      <List
        selectable
        // this is just a notification to the parent component, it doesn't control the state
        onSelectionChange={(e, data) => setSelectedItems(Array.from(data.selectedItems))}
        componentRef={ref}
      >
        {items.map(({ name, avatar }) => {
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
              <Button
                onClick={e => {
                  e.preventDefault();
                  console.log('yo');
                }}
              >
                Text
              </Button>
            </ListItem>
          );
        })}
      </List>
    </div>
  );
};
