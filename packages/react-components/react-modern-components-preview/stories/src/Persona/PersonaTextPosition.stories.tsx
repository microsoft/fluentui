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

export const TextPosition = (): React.ReactNode => {
  const styles = useStyles();

  return (
    <div className={styles.root}>
      <Persona
        textPosition="after"
        name="Kevin Sturgis"
        avatar={{ badge: { status: 'available' } }}
        secondaryText="Available"
      />
      <Persona
        textPosition="below"
        name="Kevin Sturgis"
        avatar={{ badge: { status: 'available' } }}
        secondaryText="Available"
      />
      <Persona
        textPosition="before"
        name="Kevin Sturgis"
        avatar={{ badge: { status: 'available' } }}
        secondaryText="Available"
      />
    </div>
  );
};

TextPosition.parameters = {
  docs: {
    description: {
      story: 'A Persona supports three text positions, `after` being the default position.',
    },
  },
};
