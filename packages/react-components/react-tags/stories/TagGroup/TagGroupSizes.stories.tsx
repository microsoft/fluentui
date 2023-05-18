import * as React from 'react';
import { TagGroup, Tag, TagButton } from '@fluentui/react-tags';
import { Avatar, makeStyles } from '@fluentui/react-components';
import { Calendar3Day20Regular } from '@fluentui/react-icons';
import { TagSize } from '../../src/Tag';

const useContainerStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    rowGap: '10px',
  },
});

export const Sizes = () => {
  const containerStyles = useContainerStyles();
  // TODO add one more size
  const sizes: TagSize[] = ['medium', 'small', 'extra-small'];
  return (
    <div className={containerStyles.root}>
      {sizes.map(size => (
        <div key={size}>
          {`${size}: `}
          <TagGroup size={size}>
            <Tag>Tag 1</Tag>
            <Tag media={<Avatar name="Katri Athokas" />}>Tag 1</Tag>
            <Tag icon={<Calendar3Day20Regular />}>Tag 1</Tag>

            <Tag dismissible>Tag 1</Tag>
            <Tag dismissible media={<Avatar name="Katri Athokas" />}>
              Tag 1
            </Tag>
            <Tag dismissible icon={<Calendar3Day20Regular />}>
              Tag 1
            </Tag>
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
      story: 'A TagGroup supports different sizes',
    },
  },
};
