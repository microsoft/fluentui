import { Button, makeStyles, Persona, shorthands } from '@fluentui/react-components';
import { List, ListItem } from '@fluentui/react-list-preview';
import * as React from 'react';
import names from './names';

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

export const ListOverflowing = () => {
  const classes = useStyles();
  return (
    <div className={classes.wrapper}>
      <List>
        {names.map(name => (
          <ListItem id={`id_${name}`} key={name} button={{ onClick: () => alert(name), 'aria-label': name }}>
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
