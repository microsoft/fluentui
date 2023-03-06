import * as React from 'react';
import { Tag, TagProps } from '@fluentui/react-tags';
import { Calendar3Day28Regular } from '@fluentui/react-icons';

export const Default = (props: Partial<TagProps>) => (
  <Tag
    avatar={{
      name: 'Katri Athokas',
      badge: { status: 'busy' },
      image: {
        src: 'https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/KatriAthokas.jpg',
      },
    }}
    icon={<Calendar3Day28Regular />}
    primaryText="Primary text"
    secondaryText="Secondary text"
    dismissable={true}
    {...props}
  />
);
