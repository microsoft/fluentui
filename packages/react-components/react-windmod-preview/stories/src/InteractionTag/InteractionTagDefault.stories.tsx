import * as React from 'react';
import {
  Avatar,
  FluentProvider,
  InteractionTag,
  InteractionTagPrimary,
  InteractionTagSecondary,
  TagGroup,
} from '@fluentui/react-windmod-preview';
import { CalendarMonthFilled, CalendarMonthRegular } from '@fluentui/react-icons/headless/svg/calendar-month';
import { bundleIcon } from '@fluentui/react-icons/headless';

import styles from '../compare.module.css';

const CalendarMonth = bundleIcon(CalendarMonthFilled, CalendarMonthRegular);

const appearances = ['filled', 'outline', 'brand'] as const;
const shapes = ['rounded', 'circular'] as const;
const sizes = ['medium', 'small', 'extra-small'] as const;

export const Default = (): React.ReactNode => {
  const [dismissed, setDismissed] = React.useState<string[]>([]);

  return (
    <FluentProvider>
      <div className={styles.stack}>
        <div className={styles.row}>
          {sizes.map(size => (
            <InteractionTag key={size} size={size}>
              <InteractionTagPrimary>{size}</InteractionTagPrimary>
            </InteractionTag>
          ))}
        </div>
        <div className={styles.row}>
          {appearances.map(appearance => (
            <InteractionTag key={appearance} appearance={appearance}>
              <InteractionTagPrimary>{appearance}</InteractionTagPrimary>
            </InteractionTag>
          ))}
        </div>
        <div className={styles.row}>
          {shapes.map(shape => (
            <InteractionTag key={shape} shape={shape}>
              <InteractionTagPrimary>{shape}</InteractionTagPrimary>
            </InteractionTag>
          ))}
        </div>
        <div className={styles.row}>
          <TagGroup dismissible onDismiss={(_event, { value }) => setDismissed(prev => [...prev, value])}>
            {['1', '2', '3']
              .filter(value => !dismissed.includes(value))
              .map(value => (
                <InteractionTag key={value} value={value}>
                  <InteractionTagPrimary hasSecondaryAction>Dismissible {value}</InteractionTagPrimary>
                  <InteractionTagSecondary aria-label={`dismiss ${value}`} />
                </InteractionTag>
              ))}
          </TagGroup>
        </div>
        <div className={styles.row}>
          {appearances.map(appearance => (
            <InteractionTag key={appearance} appearance={appearance} selected>
              <InteractionTagPrimary hasSecondaryAction>Selected</InteractionTagPrimary>
              <InteractionTagSecondary aria-label="dismiss" />
            </InteractionTag>
          ))}
        </div>
        <div className={styles.row}>
          {appearances.map(appearance => (
            <InteractionTag key={appearance} appearance={appearance} disabled>
              <InteractionTagPrimary hasSecondaryAction>Disabled</InteractionTagPrimary>
              <InteractionTagSecondary aria-label="dismiss" />
            </InteractionTag>
          ))}
        </div>
        <div className={styles.row}>
          <InteractionTag>
            <InteractionTagPrimary media={<Avatar name="Ada Lovelace" />}>Media</InteractionTagPrimary>
          </InteractionTag>
          <InteractionTag>
            <InteractionTagPrimary icon={<CalendarMonth />}>Icon</InteractionTagPrimary>
          </InteractionTag>
          <InteractionTag>
            <InteractionTagPrimary secondaryText="Secondary">Primary</InteractionTagPrimary>
          </InteractionTag>
        </div>
      </div>
    </FluentProvider>
  );
};
