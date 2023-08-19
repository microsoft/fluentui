import * as React from 'react';
import {
  TagGroup,
  Tag,
  InteractionTag,
  TagGroupProps,
  InteractionTagPrimary,
  InteractionTagSecondary,
} from '@fluentui/react-tags-preview';

export const Dismiss = () => {
  const defaultItems = [
    {
      value: '1',
      tag: (
        <Tag dismissible value="1" key="1" aria-label="Tag1, remove">
          Tag 1
        </Tag>
      ),
    },
    {
      value: '2',
      tag: (
        <Tag dismissible value="2" key="2" aria-label="Tag2, remove">
          Tag 2
        </Tag>
      ),
    },
    {
      value: 'foo',
      tag: (
        <InteractionTag value="foo" key="foo">
          <InteractionTagPrimary hasSecondaryAction>Foo</InteractionTagPrimary>
          <InteractionTagSecondary aria-label="Foo, remove" />
        </InteractionTag>
      ),
    },
    {
      value: 'bar',
      tag: (
        <InteractionTag value="bar" key="bar">
          <InteractionTagPrimary hasSecondaryAction>Bar</InteractionTagPrimary>
          <InteractionTagSecondary aria-label="Bar, remove" />
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
