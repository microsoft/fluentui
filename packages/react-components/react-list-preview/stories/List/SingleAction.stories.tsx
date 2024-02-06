import { makeStyles, Persona, shorthands } from '@fluentui/react-components';
import { List, ListItem, ListItemButton } from '@fluentui/react-list-preview';
import * as React from 'react';
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
          <ListItem id={`id_${name}`} key={name}>
            <ListItemButton aria-label={name} onClick={() => alert(name)}>
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
            </ListItemButton>
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
        'When the list item contains actionable element, it is recommended to use the built-in `button` slot on the `ListItem` component to handle these interactions. This will ensure the proper keyboard navigation and accessibility announcements.',
        ``,
        'In this case, the `ListItem` itself should __not be focusable, neither it should have any aria roles assigned__. It should be transparent to the screen reader and keyboard navigation.',
      ].join('\n'),
    },
  },
};
