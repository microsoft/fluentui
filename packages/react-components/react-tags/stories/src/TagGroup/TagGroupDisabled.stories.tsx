import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { TagGroup, InteractionTag, InteractionTagPrimary, Tag } from '@fluentui/react-components';

import styles from './TagGroupDisabled.module.css';

const WithTags = () => (
  <TagGroup disabled aria-label="Disabled tag group with Tag" role="list">
    <Tag role="listitem">Tag 1</Tag>
    <Tag role="listitem">Tag 2</Tag>
    <Tag role="listitem">Tag 3</Tag>
  </TagGroup>
);

const WithInteractionTags = () => (
  <TagGroup disabled aria-label="Disabled tag group with InteractionTag">
    <InteractionTag>
      <InteractionTagPrimary>Tag 1</InteractionTagPrimary>
    </InteractionTag>
    <InteractionTag>
      <InteractionTagPrimary>Tag 2</InteractionTagPrimary>
    </InteractionTag>
    <InteractionTag>
      <InteractionTagPrimary>Tag 3</InteractionTagPrimary>
    </InteractionTag>
  </TagGroup>
);

export const Disabled = (): JSXElement => {
  return (
    <div className={styles.container}>
      Disabled example with Tag:
      <WithTags />
      Disabled example with InteractionTag:
      <WithInteractionTags />
    </div>
  );
};

Disabled.storyName = 'Disabled';
Disabled.parameters = {
  docs: {
    description: {
      story: 'A TagGroup can be disabled. The collection of Tag/InteractionTag will also be disabled.',
    },
  },
};
