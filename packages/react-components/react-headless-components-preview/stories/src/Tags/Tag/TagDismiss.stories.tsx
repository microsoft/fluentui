import * as React from 'react';
import { Tag } from '@fluentui/react-headless-components-preview/tag';
import { TagGroup } from '@fluentui/react-headless-components-preview/tag-group';
import type { TagGroupProps } from '@fluentui/react-headless-components-preview/tag-group';
import { DismissRegular } from '@fluentui/react-icons';

import styles from './tag.module.css';

const initialTags = [
  { value: '1', children: 'Tag 1' },
  { value: '2', children: 'Tag 2' },
  { value: '3', children: 'Tag 3' },
];

// Focus management is consumer-supplied in headless: after the last tag is dismissed,
// move focus to the reset button; when the list refills, focus the first tag.
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
  const onDismiss: TagGroupProps['onDismiss'] = (_e, { value }) => {
    setVisibleTags(prev => prev.filter(t => t.value !== value));
  };
  const { firstTagRef, resetButtonRef } = useResetExample(visibleTags.length);

  return (
    <div className={styles.demo}>
      {visibleTags.length > 0 && (
        <TagGroup aria-label="Dismiss example" onDismiss={onDismiss}>
          <div className={styles.demoRow}>
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
        'A Tag can be dismissible. TagGroup handles dismissal via `onDismiss`. The headless TagGroup does NOT auto-restore focus - the consumer wires focus management here via refs.',
    },
  },
};
