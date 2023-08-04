import * as React from 'react';
import { TagGroup, Tag, InteractionTag, Primary, Secondary } from '@fluentui/react-tags-preview';
import { ComponentMeta } from '@storybook/react';
import { Steps } from 'storywright';
import { withStoryWrightSteps } from '../../utilities';

const steps = new Steps().snapshot('default', { cropTo: '.testWrapper' }).end();

export default {
  title: 'TagGroup Converged',
  Component: TagGroup,
  decorators: [story => withStoryWrightSteps({ story, steps })],
} as ComponentMeta<typeof TagGroup>;

export const Default = () => (
  <TagGroup>
    <Tag>Tag 1</Tag>
    <Tag>Tag 2</Tag>
    <Tag>Tag 3</Tag>
  </TagGroup>
);

export const Dismissible = () => (
  <TagGroup>
    <Tag dismissible>Tag 1</Tag>
    <Tag dismissible>Tag 2</Tag>
    <Tag dismissible>Tag 3</Tag>
  </TagGroup>
);

export const DismissibleWithInteractionTag = () => (
  <TagGroup>
    <InteractionTag>
      <Primary>Tag 1</Primary>
      <Secondary />
    </InteractionTag>
    <InteractionTag>
      <Primary>Tag 2</Primary>
      <Secondary />
    </InteractionTag>
    <InteractionTag>
      <Primary>Tag 3</Primary>
      <Secondary />
    </InteractionTag>
  </TagGroup>
);

// size
export const SizeSmall = () => (
  <TagGroup size="small">
    <Tag>Tag 1</Tag>
    <Tag>Tag 2</Tag>
    <Tag>Tag 3</Tag>
  </TagGroup>
);

export const SizeExtraSmall = () => (
  <TagGroup size="extra-small">
    <Tag>Tag 1</Tag>
    <Tag>Tag 2</Tag>
    <Tag>Tag 3</Tag>
  </TagGroup>
);
