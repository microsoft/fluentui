import * as React from 'react';
import { InteractionTag, InteractionTagProps } from '@fluentui/react-tags-preview';
import { Calendar3Day20Regular } from '@fluentui/react-icons';
import { Avatar } from '@fluentui/react-components';

// TODO I added many examples here for easier implementation. This story will be simplified to keep only the default example
export const Default = (props: Partial<InteractionTagProps>) => (
  <div style={{ display: 'flex', columnGap: 28 }}>
    <div style={{ display: 'flex', flexDirection: 'column', rowGap: 28 }}>
      <InteractionTag
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
      </InteractionTag>
      <InteractionTag
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
      </InteractionTag>
      <InteractionTag
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
      </InteractionTag>
      <InteractionTag
        icon={<Calendar3Day20Regular />}
        secondaryText="Secondary text"
        dismissible={true}
        {...props}
        {...props}
      >
        Primary text
      </InteractionTag>
      <InteractionTag icon={<Calendar3Day20Regular />} dismissible={true} {...props}>
        Primary text
      </InteractionTag>
      <InteractionTag icon={<Calendar3Day20Regular />} {...props}>
        Primary text
      </InteractionTag>
      <InteractionTag {...props}>Primary text</InteractionTag>
    </div>
    <div style={{ display: 'flex', flexDirection: 'column', rowGap: 28 }}>
      <InteractionTag
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
      </InteractionTag>
      <InteractionTag
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
      </InteractionTag>
      <InteractionTag
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
      </InteractionTag>
      <InteractionTag
        shape="circular"
        icon={<Calendar3Day20Regular />}
        secondaryText="Secondary text"
        dismissible={true}
        {...props}
        {...props}
      >
        Primary text
      </InteractionTag>
      <InteractionTag shape="circular" icon={<Calendar3Day20Regular />} dismissible={true} {...props}>
        Primary text
      </InteractionTag>
      <InteractionTag shape="circular" icon={<Calendar3Day20Regular />} {...props}>
        Primary text
      </InteractionTag>
      <InteractionTag shape="circular" {...props}>
        Primary text
      </InteractionTag>
    </div>
  </div>
);
