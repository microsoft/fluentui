import * as React from 'react';
import { Persona } from '@fluentui/react-persona';
import { AvatarSizes, makeStyles } from '@fluentui/react-components';

const useStyles = makeStyles({
  root: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, max-content)',
    rowGap: '10px',
  },
});

const sizes: AvatarSizes[] = [16, 20, 24, 28, 32, 36, 40, 48, 56, 64, 72, 96, 120, 128];

export const AvatarSize = () => {
  const styles = useStyles();

  return (
    <div className={styles.root}>
      {sizes.map(size => (
        <>
          <Persona
            avatar={{ name: 'Kevin Sturgis', size }}
            presence={{ status: 'out-of-office' }}
            primaryText="PrimaryText"
            secondaryText="Secondary text"
            tertiaryText="Tertiary text"
            quaternaryText="Quaternary text"
          />
          <Persona
            avatar={{ name: 'Kevin Sturgis', size }}
            presence={{ status: 'out-of-office' }}
            primaryText="PrimaryText"
            secondaryText="Secondary text"
            tertiaryText="Tertiary text"
          />
          <Persona
            avatar={{ name: 'Kevin Sturgis', size }}
            presence={{ status: 'out-of-office' }}
            primaryText="PrimaryText"
            secondaryText="Secondary text"
          />
          <Persona
            avatar={{ name: 'Kevin Sturgis', size }}
            presence={{ status: 'out-of-office' }}
            primaryText="PrimaryText"
          />
        </>
      ))}
    </div>
  );
};
