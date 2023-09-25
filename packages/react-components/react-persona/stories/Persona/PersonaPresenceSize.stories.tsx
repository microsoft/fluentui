import * as React from 'react';
import { makeStyles, Persona } from '@fluentui/react-components';

const useStyles = makeStyles({
  root: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, max-content)',
    columnGap: '10px',
    rowGap: '10px',
  },
});

export const PresenceSize = () => {
  const styles = useStyles();

  return (
    <div className={styles.root}>
      <Persona
        size="extra-small"
        presenceOnly
        presence={{ status: 'available' }}
        name="Kevin Sturgis"
        secondaryText="Available"
      />
      <Persona
        size="small"
        presenceOnly
        presence={{ status: 'available' }}
        name="Kevin Sturgis"
        secondaryText="Available"
      />
      <Persona
        size="medium"
        presenceOnly
        presence={{ status: 'available' }}
        name="Kevin Sturgis"
        secondaryText="Available"
      />
      <Persona
        size="large"
        presenceOnly
        presence={{ status: 'available' }}
        name="Kevin Sturgis"
        secondaryText="Available"
      />
      <Persona
        size="extra-large"
        presenceOnly
        presence={{ status: 'available' }}
        name="Kevin Sturgis"
        secondaryText="Available"
      />
      <Persona
        size="huge"
        presenceOnly
        presence={{ status: 'available' }}
        name="Kevin Sturgis"
        secondaryText="Available"
      />
    </div>
  );
};

PresenceSize.parameters = {
  docs: {
    description: {
      story: `A Persona supports different sizes, medium being the default.`,
    },
  },
};
