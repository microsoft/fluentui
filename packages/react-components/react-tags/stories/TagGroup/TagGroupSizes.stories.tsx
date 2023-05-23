import * as React from 'react';
import { TagGroup, Tag, TagButton } from '@fluentui/react-tags';
import { Avatar, makeStyles } from '@fluentui/react-components';
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
  const sizes: TagSize[] = ['small', 'medium'];
  return (
    <div className={containerStyles.root}>
      {sizes.map(size => (
        <div key={size}>
          {`${size}: `}
          <TagGroup size={size}>
            <Tag media={<Avatar name="Katri Athokas" />} shape="circular">
              Tag 1
            </Tag>
            <TagButton media={<Avatar name="Katri Athokas" />} shape="circular">
              Tag 2
            </TagButton>
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
