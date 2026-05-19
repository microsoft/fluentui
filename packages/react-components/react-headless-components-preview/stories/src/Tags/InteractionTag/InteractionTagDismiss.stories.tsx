import * as React from 'react';
import { InteractionTag } from '@fluentui/react-headless-components-preview/interaction-tag';
import { InteractionTagPrimary } from '@fluentui/react-headless-components-preview/interaction-tag-primary';
import { InteractionTagSecondary } from '@fluentui/react-headless-components-preview/interaction-tag-secondary';
import { TagGroup } from '@fluentui/react-headless-components-preview/tag-group';
import type { TagGroupProps } from '@fluentui/react-headless-components-preview/tag-group';
import { DismissRegular } from '@fluentui/react-icons';

import styles from './interactionTag.module.css';

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

export const Dismiss = (): React.ReactNode => {
  const [visibleTags, setVisibleTags] = React.useState(initialTags);
  const onDismiss: TagGroupProps['onDismiss'] = (_e, { value }) =>
    setVisibleTags(prev => prev.filter(t => t.value !== value));
  const { firstTagRef, resetButtonRef } = useResetExample(visibleTags.length);

  return (
    <div className={styles.demoCol}>
      {visibleTags.length > 0 && (
        <TagGroup aria-label="Dismiss example" onDismiss={onDismiss}>
          <div className={styles.demo}>
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
          </div>
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
    </div>
  );
};

Dismiss.parameters = {
  docs: {
    description: {
      story:
        'An InteractionTag pairs a focusable primary action with an optional dismiss `InteractionTagSecondary`. The headless TagGroup does NOT restore focus after a dismiss - the consumer wires that up via refs.',
    },
  },
};
