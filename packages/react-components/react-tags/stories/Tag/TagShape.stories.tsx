import * as React from 'react';
import { Avatar, makeStyles } from '@fluentui/react-components';
import { Calendar3Day20Regular } from '@fluentui/react-icons';

import { Tag, TagContent } from '@fluentui/react-tags';

const useContainerStyles = makeStyles({
  root: {
    display: 'grid',
    rowGap: '10px',
    columnGap: '10px',
    gridTemplateColumns: 'auto 1fr',
  },
});

export const Shape = () => {
  const containerStyles = useContainerStyles();
  return (
    <div className={containerStyles.root}>
      <Tag>
        <TagContent media={<Avatar name="Katri Athokas" badge={{ status: 'busy' }} />}>Rounded </TagContent>
      </Tag>
      <Tag shape="circular">
        <TagContent media={<Avatar name="Katri Athokas" badge={{ status: 'busy' }} />}>Circular</TagContent>
      </Tag>

      <Tag dismissible>
        <TagContent icon={<Calendar3Day20Regular />} secondaryText="Secondary text">
          Rounded
        </TagContent>
      </Tag>
      <Tag shape="circular" dismissible>
        <TagContent icon={<Calendar3Day20Regular />} secondaryText="Secondary text">
          Circular
        </TagContent>
      </Tag>
    </div>
  );
};

Shape.storyName = 'Shape';
Shape.parameters = {
  docs: {
    description: {
      story: 'A tag can be rounded or circular,',
    },
  },
};
