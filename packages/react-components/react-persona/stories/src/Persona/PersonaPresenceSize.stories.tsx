import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Persona } from '@fluentui/react-components';

import styles from './PersonaPresenceSize.module.css';

export const PresenceSize = (): JSXElement => {
  return (
    <div className={styles.root}>
      <Persona
        size="extra-small"
        presenceOnly
        presence={{ status: 'available' }}
        name="Kevin Sturgis"
        secondaryText="Available"
      />
      <Persona
        size="small"
        presenceOnly
        presence={{ status: 'available' }}
        name="Kevin Sturgis"
        secondaryText="Available"
      />
      <Persona
        size="medium"
        presenceOnly
        presence={{ status: 'available' }}
        name="Kevin Sturgis"
        secondaryText="Available"
      />
      <Persona
        size="large"
        presenceOnly
        presence={{ status: 'available' }}
        name="Kevin Sturgis"
        secondaryText="Available"
      />
      <Persona
        size="extra-large"
        presenceOnly
        presence={{ status: 'available' }}
        name="Kevin Sturgis"
        secondaryText="Available"
      />
      <Persona
        size="huge"
        presenceOnly
        presence={{ status: 'available' }}
        name="Kevin Sturgis"
        secondaryText="Available"
      />
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
