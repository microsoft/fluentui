import * as React from 'react';
import { makeStyles, Persona } from '@fluentui/react-components';

const useStyles = makeStyles({
  root: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    justifyItems: 'center',
  },
});

export const TextPosition = () => {
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

TextPosition.parameters = {
  docs: {
    description: {
      story: 'A Persona supports three text positions, `after` being the default position.',
    },
  },
};
