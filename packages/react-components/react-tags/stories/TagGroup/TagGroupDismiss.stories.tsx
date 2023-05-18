import * as React from 'react';
import { TagGroup, Tag, TagButton, TagButtonProps, TagProps, TagGroupProps } from '@fluentui/react-tags';

export const Dismiss = () => {
  const defaultItems = [
    { id: '1', children: 'Tag 1' },
    { id: '2', children: 'Tag 2' },
    { id: 'tagButton-foo', children: 'Foo' },
    { id: 'tagButton-bar', children: 'Bar' },
  ];

  const [items, setItems] = React.useState<Array<TagProps | TagButtonProps>>(defaultItems);

  const removeItem: TagGroupProps['onDismiss'] = (_e, { dismissedTagId }) => {
    setItems([...items].filter(item => item.id !== dismissedTagId));
  };

  const isTagButton = (item: TagProps | TagButtonProps): item is TagButtonProps => !!item.id?.startsWith('tagButton');

  return (
    <TagGroup onDismiss={removeItem}>
      {items.map(item =>
        isTagButton(item) ? (
          <TagButton key={item.id} dismissible {...item} />
        ) : (
          <Tag key={item.id} dismissible {...item} />
        ),
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
