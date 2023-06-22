import * as React from 'react';
import { TagGroup, Tag, TagButton, TagButtonProps, TagProps, TagGroupProps } from '@fluentui/react-tags';

export const Dismiss = () => {
  const defaultItems = [
    { value: '1', children: 'Tag 1', 'aria-label': 'Tag1, remove' },
    { value: '2', children: 'Tag 2', 'aria-label': 'Tag2, remove' },
    { value: 'tagButton-foo', children: 'Foo', dismissButton: { 'aria-label': 'Foo, remove' } },
    { value: 'tagButton-bar', children: 'Bar', dismissButton: { 'aria-label': 'Bar, remove' } },
  ];

  const [items, setItems] = React.useState<Array<TagProps | TagButtonProps>>(defaultItems);

  const removeItem: TagGroupProps['onDismiss'] = (_e, { dismissedTagValue }) => {
    setItems([...items].filter(item => item.value !== dismissedTagValue));
  };

  const isTagButton = (item: TagProps | TagButtonProps): item is TagButtonProps =>
    !!item.value?.startsWith('tagButton');

  return (
    <TagGroup onDismiss={removeItem}>
      {items.map(item =>
        isTagButton(item) ? <TagButton key={item.value} {...item} /> : <Tag key={item.value} {...item} />,
      )}
    </TagGroup>
  );
};

Dismiss.storyName = 'Dismiss';
Dismiss.parameters = {
  docs: {
    description: {
      story: 'A TagGroup contains a collection of Tag/TagButton that can be dismissed',
    },
  },
};
