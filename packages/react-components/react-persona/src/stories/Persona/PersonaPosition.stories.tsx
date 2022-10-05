import * as React from 'react';
import { Persona } from '@fluentui/react-persona';
import { makeStyles } from '@fluentui/react-components';

const useStyles = makeStyles({
  root: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    justifyItems: 'center',
  },
});

export const Position = () => {
  const styles = useStyles();

  return (
    <div className={styles.root}>
      <Persona textPosition="after" name="Kevin Sturgis" presence={{ status: 'available' }} secondaryText="Available" />
      <Persona textPosition="below" name="Kevin Sturgis" presence={{ status: 'available' }} secondaryText="Available" />
      <Persona
        textPosition="before"
        name="Kevin Sturgis"
        presence={{ status: 'available' }}
        secondaryText="Available"
      />
    </div>
  );
};

Position.parameters = {
  docs: {
    description: {
      story: 'A Persona supports three text positions, `after` being the default position.',
    },
  },
};
