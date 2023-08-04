import * as React from 'react';
import { TagGroup, Tag, InteractionTag, TagGroupProps, Primary, Secondary } from '@fluentui/react-tags-preview';

export const Dismiss = () => {
  const defaultItems = [
    {
      value: '1',
      tag: (
        <Tag dismissible key="1" aria-label="Tag1, remove">
          Tag 1
        </Tag>
      ),
    },
    {
      value: '2',
      tag: (
        <Tag dismissible key="2" aria-label="Tag2, remove">
          Tag 2
        </Tag>
      ),
    },
    {
      value: 'foo',
      tag: (
        <InteractionTag key="foo">
          <Primary>Foo</Primary>
          <Secondary aria-label="Foo, remove" />
        </InteractionTag>
      ),
    },
    {
      value: 'bar',
      tag: (
        <InteractionTag key="bar">
          <Primary>Bar</Primary>
          <Secondary aria-label="Bar, remove" />
        </InteractionTag>
      ),
    },
  ];

  const [items, setItems] = React.useState(defaultItems);

  const removeItem: TagGroupProps['onDismiss'] = (_e, { dismissedTagValue }) => {
    setItems([...items].filter(item => item.value !== dismissedTagValue));
  };

  return <TagGroup onDismiss={removeItem}>{items.map(item => item.tag)}</TagGroup>;
};

Dismiss.storyName = 'Dismiss';
Dismiss.parameters = {
  docs: {
    description: {
      story: 'A TagGroup contains a collection of Tag/InteractionTag that can be dismissed',
    },
  },
};
