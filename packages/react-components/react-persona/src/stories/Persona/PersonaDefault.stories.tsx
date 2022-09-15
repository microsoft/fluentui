import * as React from 'react';
import { Persona, PersonaProps } from '@fluentui/react-persona';
import { makeStyles } from '@fluentui/react-components';

const useStyles = makeStyles({
  root: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
  },
});

export const Default = (props: Partial<PersonaProps>) => {
  const styles = useStyles();

  return (
    <div className={styles.root}>
      <Persona
        name="Kevin Sturgis"
        primaryText="PrimaryText"
        secondaryText="Secondary text"
        tertiaryText="Tertiary text"
        quaternaryText="Quaternary text"
        {...props}
      />
      <Persona
        name="Kevin Sturgis"
        presence={{ status: 'out-of-office' }}
        primaryText="PrimaryText"
        secondaryText="Secondary text"
        tertiaryText="Tertiary text"
        quaternaryText="Quaternary text"
        {...props}
      />
      <Persona
        presenceOnly
        presence={{ status: 'out-of-office' }}
        primaryText="PrimaryText"
        secondaryText="Secondary text"
        tertiaryText="Tertiary text"
        quaternaryText="Quaternary text"
        {...props}
      />
    </div>
  );
};
