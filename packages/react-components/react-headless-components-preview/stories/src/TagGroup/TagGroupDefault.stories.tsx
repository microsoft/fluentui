import * as React from 'react';
import { TagGroup } from '@fluentui/react-headless-components-preview/tag-group';
import { Tag } from '@fluentui/react-headless-components-preview/tag';
import { DismissRegular } from '@fluentui/react-icons';

import styles from './tagGroup.module.css';

const initialTags = [
  { value: '1', label: 'Tag one' },
  { value: '2', label: 'Tag two' },
  { value: '3', label: 'Tag three' },
];

export const Default = (): React.ReactNode => {
  const [tags, setTags] = React.useState(initialTags);

  return (
    <div className={styles.demo}>
      <TagGroup
        aria-label="Headless tag group"
        className={styles.group}
        onDismiss={(_, data) => setTags(prev => prev.filter(t => t.value !== data.value))}
      >
        {tags.map(t => (
          <Tag
            key={t.value}
            value={t.value}
            dismissible
            className={styles.tag}
            dismissIcon={{ className: styles.dismissIcon, children: <DismissRegular aria-hidden /> }}
          >
            {t.label}
          </Tag>
        ))}
      </TagGroup>

      <TagGroup aria-label="Disabled tag group" className={styles.group} disabled>
        <Tag value="a" className={styles.tag} dismissible dismissIcon={{ children: <DismissRegular aria-hidden /> }}>
          Locked
        </Tag>
        <Tag value="b" className={styles.tag} dismissible dismissIcon={{ children: <DismissRegular aria-hidden /> }}>
          Read-only
        </Tag>
      </TagGroup>
    </div>
  );
};
