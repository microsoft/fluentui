import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Persona } from '@fluentui/react-components';

import styles from './PersonaTextAlignment.module.css';

export const TextAlignment = (): JSXElement => {
  return (
    <div className={styles.root}>
      <Persona
        textAlignment="start"
        name="Kevin Sturgis"
        presence={{ status: 'available' }}
        secondaryText="Available"
        tertiaryText="Software Engineer"
        quaternaryText="Microsoft"
      />
      <Persona
        textAlignment="center"
        name="Kevin Sturgis"
        presence={{ status: 'available' }}
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
