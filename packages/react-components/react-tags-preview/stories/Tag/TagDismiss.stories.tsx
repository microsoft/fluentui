import * as React from 'react';
import { Tag, TagGroup, TagGroupProps } from '@fluentui/react-tags-preview';

const initialTags = [
  { value: '1', children: 'Tag 1' },
  { value: '2', children: 'Tag 2' },
  { value: '3', children: 'Tag 3' },
];

export const Dismiss = () => {
  const [visibleTags, setVisibleTags] = React.useState(initialTags);
  const removeItem: TagGroupProps['onDismiss'] = (_e, { value }) => {
    setVisibleTags([...visibleTags].filter(tag => tag.value !== value));
  };

  return (
    <TagGroup onDismiss={removeItem} aria-label="Dismiss example">
      {visibleTags.map(tag => (
        <Tag dismissible dismissIcon={{ 'aria-label': 'remove' }} value={tag.value} key={tag.value}>
          {tag.children}
        </Tag>
      ))}
    </TagGroup>
  );
};

Dismiss.storyName = 'Dismiss';
Dismiss.parameters = {
  docs: {
    description: {
      story:
        'A tag can have a dismiss icon and become focusable. TagGroup can handle dismiss for a collection of tags. Ensure that focus is properly managed when all tags have been dismissed.',
    },
  },
};
