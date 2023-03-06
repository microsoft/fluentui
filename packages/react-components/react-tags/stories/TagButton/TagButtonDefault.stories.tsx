import * as React from 'react';
import { TagButton, TagButtonProps } from '@fluentui/react-tags';
import { Calendar3Day28Regular } from '@fluentui/react-icons';

export const Default = (props: Partial<TagButtonProps>) => (
  <TagButton
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
