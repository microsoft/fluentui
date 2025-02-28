import * as React from 'react';
import {
  TagGroup,
  InteractionTag,
  TagGroupProps,
  InteractionTagPrimary,
  InteractionTagSecondary,
  Button,
  makeStyles,
  type TagValue,
} from '@fluentui/react-components';

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

const WithMultiselectTags = () => {
  const [seletedTags, setSelectedTags] = React.useState<Array<TagValue> | undefined>([]);
  const selectItem: TagGroupProps['onSelect'] = (_e, { value }) => {
    if (!seletedTags) {
      return;
    }
    if (seletedTags.includes(value)) {
      setSelectedTags(seletedTags.filter(tag => tag !== value));
    } else {
      setSelectedTags([...seletedTags, value]);
    }
  };

  return (
    <>
      <p>Selected values: {seletedTags?.join(', ')}</p>
      <TagGroup onSelect={selectItem} aria-label="Tag group with Multiselect Tag">
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
    </>
  );
};

/**
 * focus management for the reset button
 */
const useResetExample = (visibleTagsLength: number) => {
  const resetButtonRef = React.useRef<HTMLButtonElement>(null);
  const firstTagRef = React.useRef<HTMLButtonElement>(null);

  const prevVisibleTagsLengthRef = React.useRef<number>(visibleTagsLength);
  React.useEffect(() => {
    if (visibleTagsLength === 0) {
      resetButtonRef.current?.focus();
    } else if (prevVisibleTagsLengthRef.current === 0) {
      firstTagRef.current?.focus();
    }

    prevVisibleTagsLengthRef.current = visibleTagsLength;
  }, [visibleTagsLength]);

  return { firstTagRef, resetButtonRef };
};

const DismissWithInteractionTags = () => {
  const [visibleTags, setVisibleTags] = React.useState(initialTags);
  const [seletedTags, setSelectedTags] = React.useState<Array<TagValue> | undefined>([]);

  const removeItem: TagGroupProps['onDismiss'] = (_e, { value }) => {
    if (seletedTags?.includes(value)) {
      setSelectedTags(seletedTags?.filter(tag => tag !== value));
    }
    setVisibleTags([...visibleTags].filter(tag => tag.value !== value));
  };

  const resetItems = () => setVisibleTags(initialTags);
  const selectItem: TagGroupProps['onSelect'] = (_e, { value }) => {
    if (!seletedTags) {
      return;
    }
    if (seletedTags.includes(value)) {
      setSelectedTags(seletedTags.filter(tag => tag !== value));
    } else {
      setSelectedTags([...seletedTags, value]);
    }
  };

  const { firstTagRef, resetButtonRef } = useResetExample(visibleTags.length);

  const styles = useStyles();

  return (
    <>
      <p>Selected values: {seletedTags?.join(', ')}</p>
      {visibleTags.length !== 0 && (
        <TagGroup onSelect={selectItem} onDismiss={removeItem} aria-label="Tag group with Dismissable Multiselect Tag">
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
        size="small"
      >
        Reset the example
      </Button>
    </>
  );
};

export const Select = () => {
  const styles = useStyles();
  return (
    <div className={styles.container}>
      Example with InteractionTag:
      <WithMultiselectTags />
      Example with Dismissable InteractionTag:
      <DismissWithInteractionTags />
    </div>
  );
};

Select.storyName = 'Select';
Select.parameters = {
  docs: {
    description: {
      story: 'A TagGroup contains a collection of InteractionTag that can be selected.',
    },
  },
};
