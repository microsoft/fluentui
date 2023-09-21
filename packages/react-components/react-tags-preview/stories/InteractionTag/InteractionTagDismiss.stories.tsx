import * as React from 'react';

import {
  InteractionTag,
  InteractionTagPrimary,
  InteractionTagSecondary,
  TagGroup,
  TagGroupProps,
} from '@fluentui/react-tags-preview';

const initialTags = [
  { value: '1', children: 'Tag 1' },
  { value: '2', children: 'Tag 2' },
  { value: '3', children: 'Tag 3' },
];

export const Dismiss = () => {
  const [visibleTags, setVisibleTags] = React.useState(initialTags);
  const removeItem: TagGroupProps['onDismiss'] = (_e, { dismissedTagValue }) => {
    setVisibleTags([...visibleTags].filter(tag => tag.value !== dismissedTagValue));
  };

  return (
    <TagGroup onDismiss={removeItem} aria-label="Dismiss example">
      {visibleTags.map(tag => {
        const primaryId = `dismiss-primary-${tag.value}`;
        const secondaryId = `dismiss-secondary-${tag.value}`;
        return (
          <InteractionTag value={tag.value} key={tag.value}>
            <InteractionTagPrimary id={primaryId} hasSecondaryAction>
              {tag.children}
            </InteractionTagPrimary>
            <InteractionTagSecondary
              id={secondaryId}
              aria-label="remove"
              aria-labelledby={`${primaryId} ${secondaryId}`}
            />
          </InteractionTag>
        );
      })}
    </TagGroup>
  );
};

Dismiss.storyName = 'Dismiss';
Dismiss.parameters = {
  docs: {
    description: {
      story:
        'An InteractionTag can have a secondary action that is usually dismiss. TagGroup can handle dismiss for a collection of tags. Ensure that focus is properly managed when all tags have been dismissed.',
    },
  },
};
