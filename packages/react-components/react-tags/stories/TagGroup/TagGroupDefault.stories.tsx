import * as React from 'react';
import { TagGroup, Tag, InteractionTag, TagGroupProps } from '@fluentui/react-tags';
import { Calendar3Day20Regular, Calendar3Day20Filled, bundleIcon } from '@fluentui/react-icons';

const Calendar3Day20Icon = bundleIcon(Calendar3Day20Filled, Calendar3Day20Regular);

export const Default = (props: Partial<TagGroupProps>) => (
  <TagGroup {...props}>
    <Tag shape="circular" icon={<Calendar3Day20Icon />}>
      Tag 1
    </Tag>
    <InteractionTag shape="circular" icon={<Calendar3Day20Icon />}>
      Tag 2
    </InteractionTag>
    <InteractionTag shape="circular" icon={<Calendar3Day20Icon />}>
      Tag 3
    </InteractionTag>
    <InteractionTag shape="circular">Tag 4</InteractionTag>
  </TagGroup>
);
