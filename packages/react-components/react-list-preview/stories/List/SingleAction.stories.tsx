import { makeStyles, Persona, shorthands } from '@fluentui/react-components';
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

const useStyles = makeStyles({
  wrapper: {
    maxHeight: '300px',
    overflowY: 'auto',
    ...shorthands.padding('2px'),
  },
  button: {
    display: 'block',
    width: '100%',
    textAlign: 'left',
  },
});

export const SingleAction = () => {
  const classes = useStyles();
  return (
    <div className={classes.wrapper}>
      <List navigationMode="items">
        {names.map(name => (
          <ListItem
            id={`id_${name}`}
            key={name}
            aria-label={`${name}, available`}
            onAction={() => alert(`Triggered action on ${name}`)}
          >
            <Persona
              name={name}
              secondaryText="Available"
              presence={{ status: 'available' }}
              avatar={{
                image: {
                  src: 'https://res-1.cdn.office.net/files/fabric-cdn-prod_20230815.002/office-ui-fabric-react-assets/persona-male.png',
                },
              }}
            />
          </ListItem>
        ))}
      </List>
    </div>
  );
};
SingleAction.parameters = {
  docs: {
    description: {
      story: [
        'When the list item should have a custom primary action on it, you can pass the `onAction` prop to the `ListItem` component.',
        'This callback will also be automatically called when the user presses the Enter or Space key on the list item.',
        '',
        'To learn more about what event triggered the action, you can check the `event.details.originalEvent`.',
        '',
        'To enable keyboard navigation between the list items, the `navigationMode` prop should be set to `items`.',
      ].join('\n'),
    },
  },
};
