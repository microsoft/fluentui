import * as React from 'react';
import { TagGroup } from '@fluentui/react-headless-components-preview/tag-group';
import { Tag } from '@fluentui/react-headless-components-preview/tag';
import { DismissRegular } from '@fluentui/react-icons';

import styles from './tagGroup.module.css';

const allTags = Array.from({ length: 11 }, (_, i) => ({
  value: String(i + 1),
  children: `Tag ${i + 1}`,
}));

const COLLAPSED_COUNT = 4;

export const Overflow = (): React.ReactNode => {
  const [expanded, setExpanded] = React.useState(false);
  const [visibleTags, setVisibleTags] = React.useState(allTags);

  const visible = expanded ? visibleTags : visibleTags.slice(0, COLLAPSED_COUNT);
  const hiddenCount = Math.max(0, visibleTags.length - COLLAPSED_COUNT);

  return (
    <div className={styles.overflowContainer}>
      <TagGroup
        aria-label="Overflow example"
        className={styles.group}
        onDismiss={(_, { value }) => setVisibleTags(prev => prev.filter(t => t.value !== value))}
      >
        {visible.map(t => (
          <Tag
            key={t.value}
            value={t.value}
            dismissible
            className={styles.tag}
            dismissIcon={{
              className: styles.dismissIcon,
              'aria-label': 'remove',
              children: <DismissRegular aria-hidden />,
            }}
          >
            {t.children}
          </Tag>
        ))}
        {!expanded && hiddenCount > 0 && (
          <button
            type="button"
            className={styles.overflowMore}
            onClick={() => setExpanded(true)}
            aria-label={`Show ${hiddenCount} more tags`}
          >
            +{hiddenCount} more
          </button>
        )}
        {expanded && visibleTags.length > COLLAPSED_COUNT && (
          <button type="button" className={styles.overflowMore} onClick={() => setExpanded(false)}>
            Collapse
          </button>
        )}
      </TagGroup>
    </div>
  );
};

Overflow.parameters = {
  docs: {
    description: {
      story:
        'Headless has no built-in overflow primitive. Consumers control which tags render and surface the rest however they like - here, the first 4 tags render and a `+N more` button toggles a "show all" mode.',
    },
  },
};
