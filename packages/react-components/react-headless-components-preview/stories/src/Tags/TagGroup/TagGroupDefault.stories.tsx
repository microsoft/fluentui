import * as React from 'react';
import { TagGroup } from '@fluentui/react-headless-components-preview/tag-group';
import { Tag } from '@fluentui/react-headless-components-preview/tag';
import { InteractionTag, InteractionTagPrimary } from '@fluentui/react-headless-components-preview/interaction-tag';

import styles from './tagGroup.module.css';

export const Default = (): React.ReactNode => (
  <div className={styles.demo}>
    <div className={styles.label}>Example with Tag:</div>
    <TagGroup aria-label="Simple tag group with Tag" role="list" className={styles.group}>
      <Tag role="listitem" className={styles.tag}>
        Tag 1
      </Tag>
      <Tag role="listitem" className={styles.tag}>
        Tag 2
      </Tag>
      <Tag role="listitem" className={styles.tag}>
        Tag 3
      </Tag>
    </TagGroup>

    <div className={styles.label}>Example with InteractionTag:</div>
    <TagGroup aria-label="Simple tag group with InteractionTag" className={styles.group}>
      <InteractionTag className={styles.interactionTag}>
        <InteractionTagPrimary className={styles.primary}>Tag 1</InteractionTagPrimary>
      </InteractionTag>
      <InteractionTag className={styles.interactionTag}>
        <InteractionTagPrimary className={styles.primary}>Tag 2</InteractionTagPrimary>
      </InteractionTag>
      <InteractionTag className={styles.interactionTag}>
        <InteractionTagPrimary className={styles.primary}>Tag 3</InteractionTagPrimary>
      </InteractionTag>
    </TagGroup>
  </div>
);
