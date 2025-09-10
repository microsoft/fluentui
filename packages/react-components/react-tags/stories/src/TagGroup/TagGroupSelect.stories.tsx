import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import {
  TagGroup,
  InteractionTag,
  TagGroupProps,
  InteractionTagPrimary,
  InteractionTagSecondary,
  Button,
  makeStyles,
  makeResetStyles,
  type TagValue,
} from '@fluentui/react-components';

const useContainerStyles = makeResetStyles({
  display: 'flex',
  flexDirection: 'column',
  rowGap: '10px',
});

const useStyles = makeStyles({
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
  const selectItem: TagGroupProps['onTagSelect'] = (_e, { value }) => {
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
      <TagGroup onTagSelect={selectItem} aria-label="Tag group with Multiselect Tag">
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
  const selectItem: TagGroupProps['onTagSelect'] = (_e, { value }) => {
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
        <TagGroup
          onTagSelect={selectItem}
          onDismiss={removeItem}
          aria-label="Tag group with Dismissable Multiselect Tag"
        >
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

export const Select = (): JSXElement => {
  const containerStyles = useContainerStyles();
  return (
    <div className={containerStyles}>
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
      story:
        'A TagGroup contains a collection of InteractionTag that can be selected. Note: This prop only changes the appearance of the tag at the moment. A future PR will add the integration with TagGroup.',
    },
  },
};
