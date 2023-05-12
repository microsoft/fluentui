import * as React from 'react';
import { TagButton, TagButtonProps } from '@fluentui/react-tags';
import { Calendar3Day20Regular } from '@fluentui/react-icons';
import { Avatar } from '@fluentui/react-components';

// TODO I added many examples here for easier implementation. This story will be simplified to keep only the default example
export const Default = (props: Partial<TagButtonProps>) => (
  <div style={{ display: 'flex', columnGap: 28 }}>
    <div style={{ display: 'flex', flexDirection: 'column', rowGap: 28 }}>
      <TagButton
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
        dismissible={true}
        {...props}
      >
        Primary text
      </TagButton>
      <TagButton
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
        dismissible={true}
        {...props}
      >
        Primary text
      </TagButton>
      <TagButton
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
        {...props}
      >
        Primary text
      </TagButton>
      <TagButton
        icon={<Calendar3Day20Regular />}
        secondaryText="Secondary text"
        dismissible={true}
        {...props}
        {...props}
      >
        Primary text
      </TagButton>
      <TagButton icon={<Calendar3Day20Regular />} dismissible={true} {...props}>
        Primary text
      </TagButton>
      <TagButton icon={<Calendar3Day20Regular />} {...props}>
        Primary text
      </TagButton>
      <TagButton {...props}>Primary text</TagButton>
    </div>
    <div style={{ display: 'flex', flexDirection: 'column', rowGap: 28 }}>
      <TagButton
        shape="circular"
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
        dismissible={true}
        {...props}
      >
        Primary text
      </TagButton>
      <TagButton
        shape="circular"
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
        dismissible={true}
        {...props}
      >
        Primary text
      </TagButton>
      <TagButton
        shape="circular"
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
        {...props}
      >
        Primary text
      </TagButton>
      <TagButton
        shape="circular"
        icon={<Calendar3Day20Regular />}
        secondaryText="Secondary text"
        dismissible={true}
        {...props}
        {...props}
      >
        Primary text
      </TagButton>
      <TagButton shape="circular" icon={<Calendar3Day20Regular />} dismissible={true} {...props}>
        Primary text
      </TagButton>
      <TagButton shape="circular" icon={<Calendar3Day20Regular />} {...props}>
        Primary text
      </TagButton>
      <TagButton shape="circular" {...props}>
        Primary text
      </TagButton>
    </div>
  </div>
);
