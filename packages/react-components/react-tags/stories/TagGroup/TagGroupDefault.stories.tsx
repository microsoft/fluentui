import * as React from 'react';
import { TagGroup, Tag, TagButton, TagGroupProps } from '@fluentui/react-tags';
import { Calendar3Day20Regular, Calendar3Day20Filled, bundleIcon } from '@fluentui/react-icons';

const Calendar3Day20Icon = bundleIcon(Calendar3Day20Filled, Calendar3Day20Regular);

export const Default = (props: Partial<TagGroupProps>) => (
  <TagGroup {...props}>
    <Tag shape="circular" icon={<Calendar3Day20Icon />}>
      Tag 1
    </Tag>
    <TagButton shape="circular" icon={<Calendar3Day20Icon />}>
      Tag 2
    </TagButton>
    <TagButton shape="circular" icon={<Calendar3Day20Icon />}>
      Tag 3
    </TagButton>
    <TagButton shape="circular">Tag 4</TagButton>
  </TagGroup>
);
