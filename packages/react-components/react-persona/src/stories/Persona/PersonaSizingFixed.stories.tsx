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

export const SizingFixed = () => {
  const styles = useStyles();

  return (
    <div className={styles.root}>
      <Persona sizing="fixed" name="Kevin Sturgis" presence={{ status: 'out-of-office' }} primaryText="Primary text" />
      <Persona
        sizing="fixed"
        name="Kevin Sturgis"
        presence={{ status: 'out-of-office' }}
        primaryText="Primary text"
        secondaryText="Secondary text"
        tertiaryText="Tertiary text"
        quaternaryText="Quaternary text"
      />
      <Persona
        sizing="fixed"
        name="Kevin Sturgis"
        size={48}
        presence={{ status: 'out-of-office' }}
        primaryText="Primary text"
      />
      <Persona
        sizing="fixed"
        name="Kevin Sturgis"
        size={48}
        presence={{ status: 'out-of-office' }}
        primaryText="Primary text"
        secondaryText="Secondary text"
        tertiaryText="Tertiary text"
        quaternaryText="Quaternary text"
      />
      <Persona
        sizing="fixed"
        presenceOnly
        presence={{ status: 'out-of-office', size: 'extra-small' }}
        primaryText="Primary text"
      />
      <Persona
        sizing="fixed"
        presenceOnly
        presence={{ status: 'out-of-office', size: 'extra-small' }}
        primaryText="Primary text"
        secondaryText="Secondary text"
        tertiaryText="Tertiary text"
        quaternaryText="Quaternary text"
      />
      <Persona
        sizing="fixed"
        presenceOnly
        presence={{ status: 'out-of-office', size: 'extra-large' }}
        primaryText="Primary text"
      />
      <Persona
        sizing="fixed"
        presenceOnly
        presence={{ status: 'out-of-office', size: 'extra-large' }}
        primaryText="Primary text"
        secondaryText="Secondary text"
        tertiaryText="Tertiary text"
        quaternaryText="Quaternary text"
      />
    </div>
  );
};
