import * as React from 'react';
import { InteractionTag } from '@fluentui/react-headless-components-preview/interaction-tag';
import { InteractionTagPrimary } from '@fluentui/react-headless-components-preview/interaction-tag-primary';

import styles from './interactionTag.module.css';

export const Default = (): React.ReactNode => (
  <InteractionTag className={styles.interactionTag}>
    <InteractionTagPrimary className={styles.primary}>Primary text</InteractionTagPrimary>
  </InteractionTag>
);
