import * as React from 'react';
import {
  TagGroup,
  InteractionTag,
  InteractionTagPrimary,
  InteractionTagSecondary,
  TagSize,
  Avatar,
  makeStyles,
} from '@fluentui/react-components';
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
              <InteractionTagPrimary icon={<CalendarMonthRegular />} hasSecondaryAction>
                {size}
              </InteractionTagPrimary>
              <InteractionTagSecondary aria-label="remove" />
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
