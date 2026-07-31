import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Persona } from '@fluentui/react-components';

import styles from './PersonaAvatarSize.module.css';

export const AvatarSize = (): JSXElement => {
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
