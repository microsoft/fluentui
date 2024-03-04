import { makeStyles, Persona, shorthands, List, ListItem } from '@fluentui/react-components';

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
      <List>
        {names.map(name => (
          <ListItem
            id={`id_${name}`}
            key={name}
            aria-label={`${name}, available`}
            aria-roledescription="button" //needs to be a translated string!
            onClick={() => alert(`Triggered action on ${name}`)}
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
        'When the list item should have a primary action on it, you can pass the `onClick` prop to the `ListItem` component.',
        'This callback will also be automatically called when the user presses the Enter or Space key on the list item.',
        '',
        'Since we are directly attaching the `onClick` handler on the `ListItem` itself, it is important to',
        'explicitely mark the `ListItem` as a button by setting the `aria-roledescription` attribute to a localized string `button`.',
        '',
        'This way the screen reader users will be informed that the list item is actionable and can be activated by pressing the Enter key.',
      ].join('\n'),
    },
  },
};
