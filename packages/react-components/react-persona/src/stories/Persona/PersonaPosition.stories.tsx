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
      <Persona
        textPosition="after"
        sizing="scaled"
        name="Kevin Sturgis"
        presence={{ status: 'out-of-office' }}
        primaryText="Primary text"
        secondaryText="Secondary text"
        tertiaryText="Tertiary text"
        quaternaryText="Quaternary text"
      />
      <Persona
        textPosition="below"
        sizing="scaled"
        name="Kevin Sturgis"
        presence={{ status: 'out-of-office' }}
        primaryText="Primary text"
        secondaryText="Secondary text"
        tertiaryText="Tertiary text"
        quaternaryText="Quaternary text"
      />
      <Persona
        textPosition="before"
        sizing="scaled"
        name="Kevin Sturgis"
        presence={{ status: 'out-of-office' }}
        primaryText="Primary text"
        secondaryText="Secondary text"
        tertiaryText="Tertiary text"
        quaternaryText="Quaternary text"
      />
    </div>
  );
};
