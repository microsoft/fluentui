import { Button, makeStyles, Persona, shorthands } from '@fluentui/react-components';
import { ListComponentRef, List, ListItem } from '@fluentui/react-list-preview';
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

export const ListSelectionUncontrolled = () => {
  const classes = useStyles();
  const [currentIndex, setCurrentIndex] = React.useState(4);

  const items = React.useMemo(() => {
    return origItems.slice(0, currentIndex);
  }, [currentIndex]);

  const defaultSelectedItems = ['Demetra Manwaring', 'Bart Merrill'];

  const ref = React.useRef<ListComponentRef>(null);

  return (
    <div className={classes.wrapper}>
      <div className={classes.buttonControls}>
        <Button onClick={e => setCurrentIndex(cur => cur + 1)}>Add item</Button>
        <Button onClick={e => ref.current?.selection?.toggleAllItems(e)}>Toggle all</Button>
      </div>
      <List
        selectable
        componentRef={ref}
        defaultSelectedItems={defaultSelectedItems}
        // this is just a notification to the parent component, it doesn't control the state
        onSelectionChange={(_, data) => console.log(data.selectedItems)}
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
            </ListItem>
          );
        })}
      </List>
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
