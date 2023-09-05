import * as React from 'react';
import {
  TagGroup,
  InteractionTag,
  InteractionTagPrimary,
  InteractionTagSecondary,
  TagSize,
} from '@fluentui/react-tags-preview';
import { Avatar, makeStyles } from '@fluentui/react-components';
import { CalendarMonthRegular } from '@fluentui/react-icons';

const useContainerStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    rowGap: '10px',
  },
});

export const Sizes = () => {
  const containerStyles = useContainerStyles();
  const sizes: TagSize[] = ['medium', 'small', 'extra-small'];
  return (
    <div className={containerStyles.root}>
      {sizes.map(size => (
        <div key={size}>
          {`${size}: `}
          <TagGroup size={size} aria-label={`${size} tag group example`}>
            <InteractionTag>
              <InteractionTagPrimary media={<Avatar name="Katri Athokas" />}>{size}</InteractionTagPrimary>
            </InteractionTag>
            <InteractionTag shape="circular">
              <InteractionTagPrimary icon={<CalendarMonthRegular />}>{size}</InteractionTagPrimary>
            </InteractionTag>
            <InteractionTag>
              <InteractionTagPrimary icon={<CalendarMonthRegular />} hasSecondaryAction id={`${size}-primary`}>
                {size}
              </InteractionTagPrimary>
              <InteractionTagSecondary
                id={`${size}-secondary`}
                aria-label="remove"
                aria-labelledby={`${size}-primary ${size}-secondary`}
              />
            </InteractionTag>
          </TagGroup>
        </div>
      ))}
    </div>
  );
};

Sizes.storyName = 'Sizes';
Sizes.parameters = {
  docs: {
    description: {
      story:
        'A TagGroup can set default size for all its tags. It supports `medium`, `small` and `extra-small` size. Default value is `medium`.',
    },
  },
};
