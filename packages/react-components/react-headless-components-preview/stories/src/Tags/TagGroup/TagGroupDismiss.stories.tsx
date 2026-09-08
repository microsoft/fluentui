import * as React from 'react';
import { TagGroup } from '@fluentui/react-headless-components-preview/tag-group';
import type { TagGroupProps } from '@fluentui/react-headless-components-preview/tag-group';
import { Tag } from '@fluentui/react-headless-components-preview/tag';
import {
  InteractionTag,
  InteractionTagPrimary,
  InteractionTagSecondary,
} from '@fluentui/react-headless-components-preview/interaction-tag';
import { DismissRegular } from '@fluentui/react-icons';

import styles from './tagGroup.module.css';

const initialTags = [
  { value: '1', children: 'Tag 1' },
  { value: '2', children: 'Tag 2' },
  { value: '3', children: 'Tag 3' },
];

const useResetExample = (visibleTagsLength: number) => {
  const resetButtonRef = React.useRef<HTMLButtonElement>(null);
  const firstTagRef = React.useRef<HTMLButtonElement>(null);
  const prevLength = React.useRef(visibleTagsLength);
  React.useEffect(() => {
    if (visibleTagsLength === 0) {
      resetButtonRef.current?.focus();
    } else if (prevLength.current === 0) {
      firstTagRef.current?.focus();
    }
    prevLength.current = visibleTagsLength;
  }, [visibleTagsLength]);
  return { firstTagRef, resetButtonRef };
};

const DismissWithTags = () => {
  const [visibleTags, setVisibleTags] = React.useState(initialTags);
  const onDismiss: TagGroupProps['onDismiss'] = (_e, { value }) =>
    setVisibleTags(prev => prev.filter(t => t.value !== value));
  const { firstTagRef, resetButtonRef } = useResetExample(visibleTags.length);

  return (
    <>
      {visibleTags.length > 0 && (
        <TagGroup aria-label="Dismiss example with Tag" onDismiss={onDismiss} className={styles.group}>
          {visibleTags.map((tag, i) => (
            <Tag
              key={tag.value}
              value={tag.value}
              dismissible
              className={styles.tag}
              ref={i === 0 ? (firstTagRef as React.Ref<HTMLButtonElement>) : null}
              dismissIcon={{
                className: styles.dismissIcon,
                'aria-label': 'remove',
                children: <DismissRegular aria-hidden />,
              }}
            >
              {tag.children}
            </Tag>
          ))}
        </TagGroup>
      )}
      <button
        type="button"
        ref={resetButtonRef}
        className={styles.resetButton}
        disabled={visibleTags.length === initialTags.length}
        onClick={() => setVisibleTags(initialTags)}
      >
        Reset the example
      </button>
    </>
  );
};

const DismissWithInteractionTags = () => {
  const [visibleTags, setVisibleTags] = React.useState(initialTags);
  const onDismiss: TagGroupProps['onDismiss'] = (_e, { value }) =>
    setVisibleTags(prev => prev.filter(t => t.value !== value));
  const { firstTagRef, resetButtonRef } = useResetExample(visibleTags.length);

  return (
    <>
      {visibleTags.length > 0 && (
        <TagGroup aria-label="Dismiss example with InteractionTag" onDismiss={onDismiss} className={styles.group}>
          {visibleTags.map((tag, i) => (
            <InteractionTag key={tag.value} value={tag.value} className={styles.interactionTag}>
              <InteractionTagPrimary
                className={styles.primary}
                ref={i === 0 ? (firstTagRef as React.Ref<HTMLButtonElement>) : null}
                hasSecondaryAction
              >
                {tag.children}
              </InteractionTagPrimary>
              <InteractionTagSecondary aria-label="remove" className={styles.secondary}>
                <DismissRegular aria-hidden />
              </InteractionTagSecondary>
            </InteractionTag>
          ))}
        </TagGroup>
      )}
      <button
        type="button"
        ref={resetButtonRef}
        className={styles.resetButton}
        disabled={visibleTags.length === initialTags.length}
        onClick={() => setVisibleTags(initialTags)}
      >
        Reset the example
      </button>
    </>
  );
};

export const Dismiss = (): React.ReactNode => (
  <div className={styles.demo}>
    <div className={styles.label}>Example with Tag:</div>
    <DismissWithTags />
    <div className={styles.label}>Example with InteractionTag:</div>
    <DismissWithInteractionTags />
  </div>
);

Dismiss.parameters = {
  docs: {
    description: {
      story:
        'A TagGroup contains a collection of Tag / InteractionTag children that can be dismissed. The headless TagGroup does NOT restore focus after dismissal - consumers wire that up themselves with refs.',
    },
  },
};
