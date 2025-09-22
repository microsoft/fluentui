import { Button, makeStyles, Persona, mergeClasses, Text, tokens, SelectionItemId } from '@fluentui/react-components';
import { Mic16Regular } from '@fluentui/react-icons';
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
  'Kristan Cable',
].map(name => ({
  name,
  id: name,
  avatar:
    'https://res-1.cdn.office.net/files/fabric-cdn-prod_20230815.002/office-ui-fabric-react-assets/persona-male.png',
}));

const useStyles = makeStyles({
  selectedInfo: {
    marginTop: '16px',
  },
  buttonWrapper: {
    alignSelf: 'center',
  },
  item: {
    cursor: 'pointer',
    padding: '2px 6px',
    justifyContent: 'space-between',
  },
  itemSelected: {
    backgroundColor: tokens.colorSubtleBackgroundSelected,
    '@media (forced-colors:active)': {
      background: 'Highlight',
    },
  },
  personaSelected: {
    '@media (forced-colors:active)': {
      forcedColorAdjust: 'none',
      color: 'HighlightText',
    },
  },
});

export const ListActiveElement = (): JSXElement => {
  const classes = useStyles();

  const [selectedItems, setSelectedItems] = React.useState<SelectionItemId[]>(['Melda Bevel']);

  const onSelectionChange = React.useCallback(
    (_: React.SyntheticEvent | Event, data: { selectedItems: SelectionItemId[] }) => {
      setSelectedItems(data.selectedItems);
    },
    [],
  );

  const onFocus = React.useCallback((event: React.FocusEvent<HTMLLIElement>) => {
    // Ignore bubbled up events from the children
    if (event.target !== event.currentTarget) {
      return;
    }
    setSelectedItems([event.currentTarget.dataset.value as SelectionItemId]);
  }, []);

  return (
    <div>
      <List
        selectionMode="single"
        navigationMode="composite"
        selectedItems={selectedItems}
        onSelectionChange={onSelectionChange}
      >
        {items.map(({ name, avatar }) => (
          <ListItem
            key={name}
            value={name}
            className={mergeClasses(classes.item, selectedItems.includes(name) && classes.itemSelected)}
            data-value={name}
            aria-label={name}
            onFocus={onFocus}
            checkmark={null}
          >
            <Persona
              name={name}
              role="gridcell"
              secondaryText="Available"
              presence={{ status: 'available' }}
              className={mergeClasses(selectedItems.includes(name) && classes.personaSelected)}
              avatar={{
                image: {
                  src: avatar,
                },
              }}
            />
            <div role="gridcell" className={classes.buttonWrapper}>
              <Button
                aria-label={`Mute ${name}`}
                size="small"
                icon={<Mic16Regular />}
                onClick={e => {
                  e.stopPropagation();
                  alert(`Muting ${name}`);
                }}
              />
            </div>
          </ListItem>
        ))}
      </List>
      <div className={classes.selectedInfo}>
        Currently selected:{' '}
        <Text block weight="bold">
          {selectedItems[0]}
        </Text>
      </div>
    </div>
  );
};

ListActiveElement.parameters = {
  docs: {
    description: {
      story: [
        'You can use selection and custom styles to show the active element in a different way. This is useful for scenarios where you want to show the details of the selected item, for example.',
        '',
        'In this example, we are also demonstrating how the `onFocus` prop can be utilized to change the selected item immediately upon receiving focus. This allows us to show the details of the selected item in the right panel as user navigates through the list with the keyboard.',
      ].join('\n'),
    },
  },
};
