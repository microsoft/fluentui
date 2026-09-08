import * as React from 'react';
import { Persona } from '@fluentui/react-headless-components-preview/persona';

import styles from './persona.module.css';

export const Default = (): React.ReactNode => (
  <Persona
    name="Kevin Sturgis"
    className={styles.persona}
    primaryText={{ className: styles.primaryText }}
    secondaryText={{ className: styles.secondaryText, children: 'Software Engineer' }}
    avatar={{
      className: styles.avatar,
      initials: { className: styles.avatarInitials },
      image: {
        className: styles.avatarImage,
        src: 'https://res-1.cdn.office.net/files/fabric-cdn-prod_20230815.002/office-ui-fabric-react-assets/persona-male.png',
      },
    }}
  />
);
