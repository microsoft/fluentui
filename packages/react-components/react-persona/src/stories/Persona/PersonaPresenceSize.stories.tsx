import * as React from 'react';
import { Persona } from '@fluentui/react-persona';
import { makeStyles, PresenceBadgeProps } from '@fluentui/react-components';

const useStyles = makeStyles({
  root: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, max-content)',
    rowGap: '10px',
  },
});

const sizes: PresenceBadgeProps['size'][] = ['tiny', 'extra-small', 'small', 'medium', 'large', 'extra-large'];

export const PresenceSize = () => {
  const styles = useStyles();

  return (
    <div className={styles.root}>
      {sizes.map(size => (
        <>
          <Persona
            presence={{ status: 'out-of-office', size }}
            primaryText="PrimaryText"
            secondaryText="Secondary text"
            tertiaryText="Tertiary text"
            quaternaryText="Quaternary text"
          />
          <Persona
            presence={{ status: 'out-of-office', size }}
            primaryText="PrimaryText"
            secondaryText="Secondary text"
            tertiaryText="Tertiary text"
          />
          <Persona
            presence={{ status: 'out-of-office', size }}
            primaryText="PrimaryText"
            secondaryText="Secondary text"
          />
          <Persona presence={{ status: 'out-of-office', size }} primaryText="PrimaryText" />
        </>
      ))}
    </div>
  );
};
