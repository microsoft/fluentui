import * as React from 'react';
import { InteractionTag, InteractionTagPrimary } from '@fluentui/react-headless-components-preview/interaction-tag';

import styles from './interactionTag.module.css';

export const Default = (): React.ReactNode => (
  <InteractionTag className={styles.interactionTag}>
    <InteractionTagPrimary className={styles.primary}>Primary text</InteractionTagPrimary>
  </InteractionTag>
);
