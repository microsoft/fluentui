import * as React from 'react';
import { TagGroup, Tag, InteractionTag, Primary, Secondary, TagSize } from '@fluentui/react-tags-preview';
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
          <TagGroup size={size}>
            <Tag dismissible media={<Avatar name="Katri Athokas" />}>
              {size}
            </Tag>
            <Tag icon={<CalendarMonthRegular />} shape="circular" dismissible>
              {size}
            </Tag>
            <InteractionTag>
              <Primary icon={<CalendarMonthRegular />}>{size}</Primary>
              <Secondary />
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
