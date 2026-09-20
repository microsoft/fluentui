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

export const PresenceSize = (): React.ReactNode => {
  const styles = useStyles();

  return (
    <div className={styles.root}>
      <Persona
        size="extra-small"
        avatar={{ badge: { status: 'available' } }}
        name="Kevin Sturgis"
        secondaryText="Available"
      />
      <Persona
        size="small"
        avatar={{ badge: { status: 'available' } }}
        name="Kevin Sturgis"
        secondaryText="Available"
      />
      <Persona
        size="medium"
        avatar={{ badge: { status: 'available' } }}
        name="Kevin Sturgis"
        secondaryText="Available"
      />
      <Persona
        size="large"
        avatar={{ badge: { status: 'available' } }}
        name="Kevin Sturgis"
        secondaryText="Available"
      />
      <Persona
        size="extra-large"
        avatar={{ badge: { status: 'available' } }}
        name="Kevin Sturgis"
        secondaryText="Available"
      />
      <Persona size="huge" avatar={{ badge: { status: 'available' } }} name="Kevin Sturgis" secondaryText="Available" />
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
