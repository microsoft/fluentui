import * as React from 'react';
import { TagGroup, InteractionTag, InteractionTagPrimary, Tag, makeStyles } from '@fluentui/react-components';

const WithTags = () => (
  <TagGroup aria-label="Simple tag group with Tag" role="list">
    <Tag role="listitem">Tag 1</Tag>
    <Tag role="listitem">Tag 2</Tag>
    <Tag role="listitem">Tag 3</Tag>
  </TagGroup>
);

const WithInteractionTags = () => (
  <TagGroup aria-label="Simple tag group with InteractionTag">
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

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    rowGap: '10px',
  },
});

export const Default = () => {
  const styles = useStyles();
  return (
    <div className={styles.container}>
      Example with Tag:
      <WithTags />
      Example with InteractionTag:
      <WithInteractionTags />
    </div>
  );
};
