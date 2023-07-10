import * as React from 'react';
import { Tag, TagProps } from '@fluentui/react-tags';
import { Calendar3Day20Regular } from '@fluentui/react-icons';
import { Avatar } from '@fluentui/react-components';

// TODO I added many examples here for easier implementation. This story will be simplified to keep only the default example
export const Default = (props: Partial<TagProps>) => (
  <div style={{ display: 'flex', columnGap: 28 }}>
    <div style={{ display: 'flex', flexDirection: 'column', rowGap: 28 }}>
      <Tag
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
        dismissible
        {...props}
      >
        Primary text
      </Tag>
      <Tag
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
        dismissible
        {...props}
      >
        Primary text
      </Tag>
      <Tag
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
      </Tag>
      <Tag icon={<Calendar3Day20Regular />} secondaryText="Secondary text" dismissible {...props}>
        Primary text
      </Tag>
      <Tag icon={<Calendar3Day20Regular />} dismissible {...props}>
        Primary text
      </Tag>
      <Tag icon={<Calendar3Day20Regular />} {...props}>
        Primary text
      </Tag>
      <Tag {...props}>Primary text</Tag>
    </div>
    <div style={{ display: 'flex', flexDirection: 'column', rowGap: 28 }}>
      <Tag
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
        dismissible
        {...props}
      >
        Primary text
      </Tag>
      <Tag
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
        dismissible
        {...props}
      >
        Primary text
      </Tag>
      <Tag
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
      </Tag>
      <Tag shape="circular" icon={<Calendar3Day20Regular />} secondaryText="Secondary text" dismissible {...props}>
        Primary text
      </Tag>
      <Tag shape="circular" icon={<Calendar3Day20Regular />} dismissible {...props}>
        Primary text
      </Tag>
      <Tag shape="circular" icon={<Calendar3Day20Regular />} {...props}>
        Primary text
      </Tag>
      <Tag shape="circular" {...props}>
        Primary text
      </Tag>
    </div>
  </div>
);
