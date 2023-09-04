import * as React from 'react';
import {
  TagGroup,
  Tag,
  InteractionTag,
  TagGroupProps,
  InteractionTagPrimary,
  InteractionTagSecondary,
} from '@fluentui/react-tags-preview';
import { makeStyles } from '@fluentui/react-components';

const initialTags = [
  { value: '1', children: 'Tag 1' },
  { value: '2', children: 'Tag 2' },
  { value: '3', children: 'Tag 3' },
];

const DismissWithTags = () => {
  const [visibleTags, setVisibleTags] = React.useState(initialTags);
  const removeItem: TagGroupProps['onDismiss'] = (_e, { dismissedTagValue }) => {
    setVisibleTags([...visibleTags].filter(tag => tag.value !== dismissedTagValue));
  };

  return (
    <TagGroup onDismiss={removeItem} aria-label="TagGroup example with dismissible Tags">
      {visibleTags.map(tag => (
        <Tag dismissible dismissIcon={{ 'aria-label': 'remove' }} value={tag.value} key={tag.value}>
          {tag.children}
        </Tag>
      ))}
    </TagGroup>
  );
};

const DismissWithInteractionTags = () => {
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

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    rowGap: '10px',
  },
});

export const Dismiss = () => {
  const styles = useStyles();
  return (
    <div className={styles.container}>
      Example with Tag:
      <DismissWithTags />
      Example with InteractionTag:
      <DismissWithInteractionTags />
    </div>
  );
};

Dismiss.storyName = 'Dismiss';
Dismiss.parameters = {
  docs: {
    description: {
      story: 'A TagGroup contains a collection of Tag/InteractionTag that can be dismissed',
    },
  },
};
