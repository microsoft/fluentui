import * as React from 'react';
import { Tag, TagGroup, TagGroupProps } from '@fluentui/react-tags-preview';
import { Button, makeStyles } from '@fluentui/react-components';
import { usePrevious } from '@fluentui/react-utilities';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    rowGap: '10px',
  },
  resetButton: {
    width: 'fit-content',
  },
});

const initialTags = [
  { value: '1', children: 'Tag 1' },
  { value: '2', children: 'Tag 2' },
  { value: '3', children: 'Tag 3' },
];

/**
 * focus management for the reset button
 */
const useResetExample = (visibleTags: typeof initialTags) => {
  const resetButtonRef = React.useRef<HTMLButtonElement>(null);
  const firstTagRef = React.useRef<HTMLButtonElement>(null);

  React.useEffect(() => {
    if (visibleTags.length === 0) {
      resetButtonRef.current?.focus();
    }
  }, [visibleTags.length]);

  const prevVisibleTags = usePrevious(visibleTags);
  React.useEffect(() => {
    if (visibleTags.length && prevVisibleTags?.length === 0) {
      firstTagRef.current?.focus();
    }
  }, [prevVisibleTags?.length, visibleTags.length]);

  return { firstTagRef, resetButtonRef };
};

export const Dismiss = () => {
  const [visibleTags, setVisibleTags] = React.useState(initialTags);
  const removeItem: TagGroupProps['onDismiss'] = (_e, { value }) => {
    setVisibleTags([...visibleTags].filter(tag => tag.value !== value));
  };
  const resetItems = () => setVisibleTags(initialTags);
  const { firstTagRef, resetButtonRef } = useResetExample(visibleTags);

  const styles = useStyles();

  return (
    <div className={styles.container}>
      {visibleTags.length !== 0 && (
        <TagGroup onDismiss={removeItem} aria-label="Dismiss example">
          {visibleTags.map((tag, index) => (
            <Tag
              dismissible
              dismissIcon={{ 'aria-label': 'remove' }}
              value={tag.value}
              key={tag.value}
              ref={index === 0 ? firstTagRef : null}
            >
              {tag.children}
            </Tag>
          ))}
        </TagGroup>
      )}

      <Button
        onClick={resetItems}
        ref={resetButtonRef}
        disabled={visibleTags.length !== 0}
        className={styles.resetButton}
      >
        Reset Dismiss Example
      </Button>
    </div>
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
