import * as React from 'react';
import { TagGroup, Tag, InteractionTag, InteractionTagProps, TagProps, TagGroupProps } from '@fluentui/react-tags';

export const Dismiss = () => {
  const defaultItems = [
    { value: '1', children: 'Tag 1', 'aria-label': 'Tag1, remove' },
    { value: '2', children: 'Tag 2', 'aria-label': 'Tag2, remove' },
    { value: 'interactionTag-foo', children: 'Foo', dismissButton: { 'aria-label': 'Foo, remove' } },
    { value: 'interactionTag-bar', children: 'Bar', dismissButton: { 'aria-label': 'Bar, remove' } },
  ];

  const [items, setItems] = React.useState<Array<TagProps | InteractionTagProps>>(defaultItems);

  const removeItem: TagGroupProps['onDismiss'] = (_e, { dismissedTagValue }) => {
    setItems([...items].filter(item => item.value !== dismissedTagValue));
  };

  const isInteractionTag = (item: TagProps | InteractionTagProps): item is InteractionTagProps =>
    !!item.value?.startsWith('interactionTag');

  return (
    <TagGroup onDismiss={removeItem}>
      {items.map(item =>
        isInteractionTag(item) ? <InteractionTag key={item.value} {...item} /> : <Tag key={item.value} {...item} />,
      )}
    </TagGroup>
  );
};

Dismiss.storyName = 'Dismiss';
Dismiss.parameters = {
  docs: {
    description: {
      story: 'A TagGroup contains a collection of Tag/InteractionTag that can be dismissed',
    },
  },
};
