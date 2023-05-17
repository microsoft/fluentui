import * as React from 'react';
import { TagGroup, Tag, TagButton, TagButtonProps, TagProps } from '@fluentui/react-tags';

export const Dismiss = () => {
  const defaultItems = [
    { id: '1', children: 'Tag 1' },
    { id: '2', children: 'Tag 2' },
    { id: 'tagButton-foo', children: 'Foo' },
    { id: 'tagButton-bar', children: 'Bar' },
  ];

  const [items, setItems] = React.useState(defaultItems);

  const removeItem = (_e: React.MouseEvent | React.KeyboardEvent, ids: string[]) => {
    setItems(prevItems => prevItems.filter(item => ids[0] !== item.id));
  };

  const isTagButton = (item: TagProps | TagButtonProps): item is TagButtonProps => !!item.id?.startsWith('tagButton');

  return (
    <TagGroup<TagProps | TagButtonProps> items={items} onDismiss={removeItem}>
      {item => (isTagButton(item) ? <TagButton dismissible {...item} /> : <Tag dismissible {...item} />)}
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
