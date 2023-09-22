import * as React from 'react';
import {
  TagGroup,
  Tag,
  InteractionTag,
  TagGroupProps,
  InteractionTagPrimary,
  InteractionTagSecondary,
} from '@fluentui/react-tags-preview';
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

const DismissWithTags = () => {
  const [visibleTags, setVisibleTags] = React.useState(initialTags);
  const removeItem: TagGroupProps['onDismiss'] = (_e, { value }) => {
    setVisibleTags([...visibleTags].filter(tag => tag.value !== value));
  };
  const resetItems = () => setVisibleTags(initialTags);
  const { firstTagRef, resetButtonRef } = useResetExample(visibleTags);

  const styles = useStyles();

  return (
    <>
      {visibleTags.length !== 0 && (
        <TagGroup onDismiss={removeItem} aria-label="TagGroup example with dismissible Tags">
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
        Reset Dismiss Tag Example
      </Button>
    </>
  );
};

const DismissWithInteractionTags = () => {
  const [visibleTags, setVisibleTags] = React.useState(initialTags);
  const removeItem: TagGroupProps['onDismiss'] = (_e, { value }) => {
    setVisibleTags([...visibleTags].filter(tag => tag.value !== value));
  };
  const resetItems = () => setVisibleTags(initialTags);
  const { firstTagRef, resetButtonRef } = useResetExample(visibleTags);

  const styles = useStyles();

  return (
    <>
      {visibleTags.length !== 0 && (
        <TagGroup onDismiss={removeItem} aria-label="Dismiss example">
          {visibleTags.map((tag, index) => (
            <InteractionTag value={tag.value} key={tag.value}>
              <InteractionTagPrimary hasSecondaryAction ref={index === 0 ? firstTagRef : null}>
                {tag.children}
              </InteractionTagPrimary>
              <InteractionTagSecondary aria-label="remove" />
            </InteractionTag>
          ))}
        </TagGroup>
      )}
      <Button
        onClick={resetItems}
        ref={resetButtonRef}
        disabled={visibleTags.length !== 0}
        className={styles.resetButton}
      >
        Reset Dismiss InteractionTag Example
      </Button>
    </>
  );
};

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
      story:
        'A TagGroup contains a collection of Tag/InteractionTag that can be dismissed. Ensure that focus is properly managed when all tags have been dismissed.',
    },
  },
};
