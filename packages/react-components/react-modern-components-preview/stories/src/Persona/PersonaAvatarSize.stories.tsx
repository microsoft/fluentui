import * as React from 'react';

import { makeStyles } from '@fluentui/react-components';
import { Persona } from '@fluentui/react-modern-components-preview/persona';

const useStyles = makeStyles({
  root: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, max-content)',
    columnGap: '10px',
    rowGap: '10px',
  },
});

export const AvatarSize = (): React.ReactNode => {
  const styles = useStyles();

  return (
    <div className={styles.root}>
      <Persona
        size="extra-small"
        name="Kevin Sturgis"
        avatar={{ badge: { status: 'available' }, color: 'colorful' }}
        secondaryText="Available"
      />
      <Persona
        size="small"
        name="Kevin Sturgis"
        avatar={{ badge: { status: 'available' }, color: 'colorful' }}
        secondaryText="Available"
      />
      <Persona
        size="medium"
        name="Kevin Sturgis"
        avatar={{ badge: { status: 'available' }, color: 'colorful' }}
        secondaryText="Available"
      />
      <Persona
        size="large"
        name="Kevin Sturgis"
        avatar={{ badge: { status: 'available' }, color: 'colorful' }}
        secondaryText="Available"
      />
      <Persona
        size="extra-large"
        name="Kevin Sturgis"
        avatar={{ badge: { status: 'available' }, color: 'colorful' }}
        secondaryText="Available"
      />
      <Persona
        size="huge"
        name="Kevin Sturgis"
        avatar={{ badge: { status: 'available' }, color: 'colorful' }}
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
