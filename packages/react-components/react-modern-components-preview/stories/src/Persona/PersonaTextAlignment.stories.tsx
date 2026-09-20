import * as React from 'react';

import { makeStyles } from '@fluentui/react-components';
import { Persona } from '@fluentui/react-modern-components-preview/persona';

const useStyles = makeStyles({
  root: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    justifyItems: 'center',
  },
});

export const TextAlignment = (): React.ReactNode => {
  const styles = useStyles();

  return (
    <div className={styles.root}>
      <Persona
        textAlignment="start"
        name="Kevin Sturgis"
        avatar={{ badge: { status: 'available' } }}
        secondaryText="Available"
        tertiaryText="Software Engineer"
        quaternaryText="Microsoft"
      />
      <Persona
        textAlignment="center"
        name="Kevin Sturgis"
        avatar={{ badge: { status: 'available' } }}
        secondaryText="Available"
        tertiaryText="Software Engineer"
        quaternaryText="Microsoft"
      />
    </div>
  );
};

TextAlignment.parameters = {
  docs: {
    description: {
      story: 'A Persona supports two text alignments, `start` being the default position.',
    },
  },
};
