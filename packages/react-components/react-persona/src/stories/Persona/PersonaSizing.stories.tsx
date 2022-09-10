import * as React from 'react';
import { Persona } from '@fluentui/react-persona';
import { makeStyles } from '@fluentui/react-components';

const useStyles = makeStyles({
  root: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, max-content)',
    rowGap: '10px',
  },
});

export const Sizing = () => {
  const styles = useStyles();

  return (
    <div className={styles.root}>
      <Persona
        sizing="scaled"
        avatar={{ name: 'Kevin Sturgis' }}
        presence={{ status: 'out-of-office' }}
        primaryText="Primary text"
        secondaryText="Secondary text"
        tertiaryText="Tertiary text"
        quaternaryText="Quaternary text"
      />
      <Persona
        sizing="scaled"
        avatar={{ name: 'Kevin Sturgis' }}
        presence={{ status: 'out-of-office' }}
        primaryText="Primary text"
        secondaryText="Secondary text"
        tertiaryText="Tertiary text"
      />
      <Persona
        sizing="scaled"
        avatar={{ name: 'Kevin Sturgis' }}
        presence={{ status: 'out-of-office' }}
        primaryText="Primary text"
        secondaryText="Secondary text"
      />
      <Persona
        sizing="scaled"
        avatar={{ name: 'Kevin Sturgis' }}
        presence={{ status: 'out-of-office' }}
        primaryText="Primary text"
      />
      <Persona
        sizing="scaled"
        presence={{ status: 'out-of-office' }}
        primaryText="Primary text"
        secondaryText="Secondary text"
        tertiaryText="Tertiary text"
        quaternaryText="Quaternary text"
      />
      <Persona
        sizing="scaled"
        presence={{ status: 'out-of-office' }}
        primaryText="Primary text"
        secondaryText="Secondary text"
        tertiaryText="Tertiary text"
      />
      <Persona
        sizing="scaled"
        presence={{ status: 'out-of-office' }}
        primaryText="Primary text"
        secondaryText="Secondary text"
      />
      <Persona sizing="scaled" presence={{ status: 'out-of-office' }} primaryText="Primary text" />
    </div>
  );
};
