import * as React from 'react';
import { Persona } from '@fluentui/react-persona';
import { makeStyles } from '@fluentui/react-components';

const useStyles = makeStyles({
  root: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    rowGap: '10px',
    width: '800px',
  },
});

export const SizingScaled = () => {
  const styles = useStyles();

  return (
    <div className={styles.root}>
      <Persona
        name="Kevin Sturgis"
        presence={{ status: 'available' }}
        secondaryText="Available"
        tertiaryText="Software engineer"
        quaternaryText="Last seen 40 mins ago"
      />
      <Persona
        name="Kevin Sturgis"
        presence={{ status: 'available' }}
        secondaryText="Available"
        tertiaryText="Software engineer"
      />
      <Persona name="Kevin Sturgis" presence={{ status: 'available' }} secondaryText="Available" />
      <Persona name="Kevin Sturgis" presence={{ status: 'available' }} />
    </div>
  );
};

SizingScaled.parameters = {
  docs: {
    description: {
      story:
        "When a size is not provided to the Avatar or Presence, Persona will adjust the Avatar's or Presence's size" +
        ' based on the number of text lines used.',
    },
  },
};
