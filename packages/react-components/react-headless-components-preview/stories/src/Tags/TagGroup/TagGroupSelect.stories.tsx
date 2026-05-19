import * as React from 'react';
import { TagGroup } from '@fluentui/react-headless-components-preview/tag-group';
import type { TagGroupProps } from '@fluentui/react-headless-components-preview/tag-group';
import { InteractionTag } from '@fluentui/react-headless-components-preview/interaction-tag';
import { InteractionTagPrimary } from '@fluentui/react-headless-components-preview/interaction-tag-primary';
import type { TagValue } from '@fluentui/react-components';

import styles from './tagGroup.module.css';

const tags: Array<{ value: string; children: string }> = [
  { value: '1', children: 'Tag 1' },
  { value: '2', children: 'Tag 2' },
  { value: '3', children: 'Tag 3' },
];

export const Select = (): React.ReactNode => {
  const [selectedTags, setSelectedTags] = React.useState<Array<TagValue>>([]);
  const onTagSelect: TagGroupProps['onTagSelect'] = (_e, { value }) => {
    setSelectedTags(prev => (prev.includes(value) ? prev.filter(t => t !== value) : [...prev, value]));
  };

  return (
    <div className={styles.demo}>
      <div className={styles.selectedReadout}>Selected values: [{selectedTags.join(', ')}]</div>
      <TagGroup onTagSelect={onTagSelect} aria-label="Multiselect tag group" className={styles.group}>
        {tags.map(t => (
          <InteractionTag key={t.value} value={t.value} className={styles.interactionTag}>
            <InteractionTagPrimary className={styles.primary}>{t.children}</InteractionTagPrimary>
          </InteractionTag>
        ))}
      </TagGroup>
    </div>
  );
};

Select.parameters = {
  docs: {
    description: {
      story:
        'A TagGroup with `onTagSelect` enables multi-select on InteractionTag children. Selection state is forwarded through context; the headless layer flips `aria-pressed` and `data-selected` on the primary.',
    },
  },
};
