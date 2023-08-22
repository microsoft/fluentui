import * as React from 'react';
import { TagGroup, Tag, TagGroupProps } from '@fluentui/react-tags-preview';

export const Default = (props: Partial<TagGroupProps>) => (
  <TagGroup {...props} aria-label="Default">
    <Tag>Tag 1</Tag>
    <Tag>Tag 2</Tag>
    <Tag>Tag 3</Tag>
  </TagGroup>
);
