import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Persona } from '@fluentui/react-components';

import styles from './PersonaTextPosition.module.css';

export const TextPosition = (): JSXElement => {
  return (
    <div className={styles.root}>
      <Persona textPosition="after" name="Kevin Sturgis" presence={{ status: 'available' }} secondaryText="Available" />
      <Persona textPosition="below" name="Kevin Sturgis" presence={{ status: 'available' }} secondaryText="Available" />
      <Persona
        textPosition="before"
        name="Kevin Sturgis"
        presence={{ status: 'available' }}
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
