import * as React from 'react';
import { InteractionTag } from '@fluentui/react-headless-components-preview/interaction-tag';
import { InteractionTagPrimary } from '@fluentui/react-headless-components-preview/interaction-tag-primary';
import { InteractionTagSecondary } from '@fluentui/react-headless-components-preview/interaction-tag-secondary';
import { TagGroup } from '@fluentui/react-headless-components-preview/tag-group';
import { DismissRegular } from '@fluentui/react-icons';

import styles from './interactionTag.module.css';

const initial = [
  { value: '1', label: 'Project Alpha' },
  { value: '2', label: 'Project Beta' },
];

export const Default = (): React.ReactNode => {
  const [tags, setTags] = React.useState(initial);

  return (
    <TagGroup
      aria-label="Headless interaction tags"
      onDismiss={(_, data) => setTags(prev => prev.filter(t => t.value !== data.value))}
    >
      <div className={styles.demo}>
        {tags.map(t => (
          <InteractionTag key={t.value} value={t.value} className={styles.interactionTag}>
            <InteractionTagPrimary className={styles.primary}>{t.label}</InteractionTagPrimary>
            <InteractionTagSecondary aria-label={`Remove ${t.label}`} className={styles.secondary}>
              <DismissRegular aria-hidden />
            </InteractionTagSecondary>
          </InteractionTag>
        ))}
      </div>
    </TagGroup>
  );
};
