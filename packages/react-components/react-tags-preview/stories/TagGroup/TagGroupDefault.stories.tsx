import * as React from 'react';
import { TagGroup, InteractionTag, InteractionTagPrimary, TagGroupProps } from '@fluentui/react-tags-preview';

export const Default = (props: Partial<TagGroupProps>) => (
  <TagGroup {...props} aria-label="Simple tag group example">
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
