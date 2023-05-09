import * as React from 'react';
import { Tag } from '@fluentui/react-tags';
import { Calendar3Day20Regular } from '@fluentui/react-icons';
import { Avatar, makeStyles } from '@fluentui/react-components';

const useContainerStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    rowGap: '10px',
  },
});

export const Interactive = () => {
  const containerStyles = useContainerStyles();

  return (
    <div className={containerStyles.root}>
      <Tag
        interactive
        dismissible
        content={{
          onClick: () => {
            console.log('Tag with avatar clicked');
          },
        }}
        media={
          <Avatar
            {...{
              name: 'Katri Athokas',
              badge: { status: 'busy' },
              image: {
                src: 'https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/KatriAthokas.jpg',
              },
            }}
          />
        }
        secondaryText="Secondary text"
      >
        Primary text
      </Tag>
      <Tag
        interactive
        content={{
          onClick: () => {
            console.log('Tag with icon clicked');
          },
        }}
        icon={<Calendar3Day20Regular />}
      >
        Primary text
      </Tag>
    </div>
  );
};

Interactive.storyName = 'Interactive';
Interactive.parameters = {
  docs: {
    description: {
      story: 'A Tag can render as an interactive button',
    },
  },
};
