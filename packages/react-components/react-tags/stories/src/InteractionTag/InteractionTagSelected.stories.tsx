import * as React from 'react';
import {
  InteractionTag,
  InteractionTagProps,
  InteractionTagPrimary,
  Avatar,
  makeStyles,
  InteractionTagSecondary,
  TagGroup,
  Button,
  TagGroupProps,
  Tooltip,
  Popover,
  PopoverSurface,
  PopoverTrigger,
  Link,
} from '@fluentui/react-components';
import { CalendarMonthRegular, CalendarMonthFilled, bundleIcon } from '@fluentui/react-icons';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    rowGap: '10px',
  },
  resetButton: {
    width: 'fit-content',
  },
  popover: {
    width: '360px',
    maxWidth: '100%',
    height: 'fit-content',
  },
});

const CalendarMonth = bundleIcon(CalendarMonthFilled, CalendarMonthRegular);

const initialTags = [
  { value: '1', children: 'Tag 1' },
  { value: '2', children: 'Tag 2' },
  { value: '3', children: 'Tag 3' },
];

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
export const InteractionTagSelected = (props: Partial<InteractionTagProps>) => {
  const [visibleTags, setVisibleTags] = React.useState(initialTags);
  const removeItem: TagGroupProps['onDismiss'] = (_e, { value }) => {
    setVisibleTags([...visibleTags].filter(tag => tag.value !== value));
  };
  const resetItems = () => setVisibleTags(initialTags);
  const { firstTagRef, resetButtonRef } = useResetExample(visibleTags.length);

  const styles = useStyles();
  return (
    <>
      <h3>Selected</h3>
      <InteractionTag selected>
        <InteractionTagPrimary icon={<CalendarMonth />} hasSecondaryAction>
          filled
        </InteractionTagPrimary>
        <InteractionTagSecondary aria-label="remove" />
      </InteractionTag>
      <InteractionTag selected appearance="outline">
        <InteractionTagPrimary icon={<CalendarMonth />} hasSecondaryAction>
          outline
        </InteractionTagPrimary>
        <InteractionTagSecondary aria-label="remove" />
      </InteractionTag>
      <InteractionTag selected appearance="brand">
        <InteractionTagPrimary icon={<CalendarMonth />} hasSecondaryAction>
          brand
        </InteractionTagPrimary>
        <InteractionTagSecondary aria-label="remove" />
      </InteractionTag>
      <h3>Media</h3>
      <InteractionTag selected>
        <InteractionTagPrimary media={<Avatar name="Katri Athokas" badge={{ status: 'busy' }} />}>
          Primary text
        </InteractionTagPrimary>
      </InteractionTag>
      <h3>Secondary text</h3>
      <InteractionTag selected>
        <InteractionTagPrimary secondaryText="Secondary text">Primary text</InteractionTagPrimary>
      </InteractionTag>
      <h3>Dismiss</h3>
      <div className={styles.container}>
        {visibleTags.length !== 0 && (
          <TagGroup onDismiss={removeItem} aria-label="Dismiss example">
            {visibleTags.map((tag, index) => (
              <InteractionTag selected appearance="outline" value={tag.value} key={tag.value}>
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
      </div>

      <h3>Disabled</h3>
      <InteractionTag selected disabled>
        <InteractionTagPrimary secondaryText="appearance=filled" icon={<CalendarMonthRegular />} hasSecondaryAction>
          Disabled
        </InteractionTagPrimary>
        <InteractionTagSecondary aria-label="remove" />
      </InteractionTag>
      <InteractionTag selected disabled appearance="outline">
        <InteractionTagPrimary secondaryText="appearance=outline" icon={<CalendarMonthRegular />} hasSecondaryAction>
          Disabled
        </InteractionTagPrimary>
        <InteractionTagSecondary aria-label="remove" />
      </InteractionTag>
      <InteractionTag selected disabled appearance="brand">
        <InteractionTagPrimary secondaryText="appearance=brand" icon={<CalendarMonthRegular />} hasSecondaryAction>
          Disabled
        </InteractionTagPrimary>
        <InteractionTagSecondary aria-label="remove" />
      </InteractionTag>
      <h3>Primary Action</h3>
      <InteractionTag selected>
        <Popover trapFocus>
          <PopoverTrigger>
            <InteractionTagPrimary hasSecondaryAction>Golden retriever</InteractionTagPrimary>
          </PopoverTrigger>
          <PopoverSurface className={styles.popover}>
            <Link href="https://en.wikipedia.org/wiki/Golden_Retriever">Find out more on wiki</Link>
            <ul>
              <li>Size: Medium to large-sized dog breed. </li>
              <li>
                Coat: Luxurious double coat with a dense, water-repellent outer layer and a soft, dense undercoat.
              </li>
              <li>Color: Typically a luscious golden or cream color, with variations in shade.</li>
              <li>Build: Sturdy and well-proportioned body with a friendly and intelligent expression.</li>
            </ul>
          </PopoverSurface>
        </Popover>
        <Tooltip content="dismiss" relationship="label">
          <InteractionTagSecondary />
        </Tooltip>
      </InteractionTag>
    </>
  );
};
