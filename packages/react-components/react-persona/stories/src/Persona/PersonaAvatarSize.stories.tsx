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

export const AvatarSize = () => {
  const styles = useStyles();

  return (
    <div className={styles.root}>
      <Persona
        presence={{ status: 'available' }}
        size="extra-small"
        name="Kevin Sturgis"
        avatar={{ color: 'colorful' }}
        secondaryText="Available"
      />
      <Persona
        presence={{ status: 'available' }}
        size="small"
        name="Kevin Sturgis"
        avatar={{ color: 'colorful' }}
        secondaryText="Available"
      />
      <Persona
        presence={{ status: 'available' }}
        size="medium"
        name="Kevin Sturgis"
        avatar={{ color: 'colorful' }}
        secondaryText="Available"
      />
      <Persona
        presence={{ status: 'available' }}
        size="large"
        name="Kevin Sturgis"
        avatar={{ color: 'colorful' }}
        secondaryText="Available"
      />
      <Persona
        presence={{ status: 'available' }}
        size="extra-large"
        name="Kevin Sturgis"
        avatar={{ color: 'colorful' }}
        secondaryText="Available"
      />
      <Persona
        presence={{ status: 'available' }}
        size="huge"
        name="Kevin Sturgis"
        avatar={{ color: 'colorful' }}
        secondaryText="Available"
      />
    </div>
  );
};

AvatarSize.parameters = {
  docs: {
    description: {
      story: `A Persona supports different sizes, medium being the default.`,
    },
  },
};
