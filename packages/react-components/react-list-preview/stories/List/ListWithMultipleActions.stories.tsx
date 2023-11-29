import { Button, makeStyles, Persona, shorthands } from '@fluentui/react-components';
import { List, ListItem } from '@fluentui/react-list-preview';
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
  listItem: {
    display: 'flex',
    alignItems: 'center',
    ...shorthands.gap('4px'),
  },
  primaryButton: {
    marginRight: 'auto',
  },
});

export const ListWithMultipleActions = () => {
  const classes = useStyles();
  return (
    <div className={classes.wrapper}>
      <List navigable>
        {names.map(name => (
          <ListItem key={name} className={classes.listItem} aria-label={name}>
            <Button
              appearance="transparent"
              onClick={() => alert(name)}
              className={classes.primaryButton}
              aria-label={name}
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
            </Button>
            <Button>Mute</Button>
            <Button>Block</Button>
          </ListItem>
        ))}
      </List>
    </div>
  );
};
