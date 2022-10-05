import * as React from 'react';
import { Persona } from '@fluentui/react-persona';
import { makeStyles } from '@fluentui/react-components';

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
        presenceOnly
        presence={{ status: 'available', size: 'tiny' }}
        name="Kevin Sturgis"
        secondaryText="Available"
      />
      <Persona
        presenceOnly
        presence={{ status: 'available', size: 'extra-small' }}
        name="Kevin Sturgis"
        secondaryText="Available"
      />
      <Persona
        presenceOnly
        presence={{ status: 'available', size: 'small' }}
        name="Kevin Sturgis"
        secondaryText="Available"
      />
      <Persona
        presenceOnly
        presence={{ status: 'available', size: 'medium' }}
        name="Kevin Sturgis"
        secondaryText="Available"
      />
      <Persona
        presenceOnly
        presence={{ status: 'available', size: 'large' }}
        name="Kevin Sturgis"
        secondaryText="Available"
      />
      <Persona
        presenceOnly
        presence={{ status: 'available', size: 'extra-large' }}
        name="Kevin Sturgis"
        secondaryText="Available"
      />
    </div>
  );
};

PresenceSize.parameters = {
  docs: {
    description: {
      story:
        `A Persona supports all PresenceBadge's sizes respecting its default size medium. When a size is specified ` +
        `, Persona will apply styles to the text lines based on the size of the PresenceBadge.`,
    },
  },
};
