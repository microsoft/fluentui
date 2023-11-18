import * as React from 'react';
import { Tag } from '@fluentui/react-tags';
import { ComponentMeta } from '@storybook/react';
import { getStoryVariant, withStoryWrightSteps, RTL } from '../../utilities';
import { Avatar } from '@fluentui/react-avatar';
import { Steps } from 'storywright';

const tagId = 'tag-id';
const steps = new Steps()
  .snapshot('default', { cropTo: '.testWrapper' })
  // This needs to be added so that the focus outline is shown correctly
  .executeScript(`document.querySelector('#${tagId}').setAttribute('data-fui-focus-visible', '')`)
  .focus(`#${tagId}`)
  .snapshot('focused', { cropTo: '.testWrapper' })
  .executeScript(`document.querySelector('#${tagId}').removeAttribute('data-fui-focus-visible')`)
  .end();

export default {
  title: 'Tag Converged',
  Component: Tag,
  decorators: [story => withStoryWrightSteps({ story, steps })],
} as ComponentMeta<typeof Tag>;

export const Rounded = () => <Tag>Primary Text</Tag>;

export const RoundedWithSecondaryText = () => <Tag secondaryText="Secondary Text">Primary Text</Tag>;

export const RoundedWithMedia = () => (
  <Tag media={<Avatar name="Lydia Bauer" badge={{ status: 'available' }} />}>Primary Text</Tag>
);
export const RoundedWithMediaRTL = getStoryVariant(RoundedWithMedia, RTL);

export const RoundedDismissible = () => (
  <Tag id={tagId} dismissible>
    Primary Text
  </Tag>
);
export const RoundedDismissibleRTL = getStoryVariant(RoundedDismissible, RTL);

export const Circular = () => <Tag shape="circular">Primary Text</Tag>;

export const CircularWithSecondaryText = () => <Tag secondaryText="Secondary Text">Primary Text</Tag>;

export const CircularWithMedia = () => (
  <Tag shape="circular" media={<Avatar name="Lydia Bauer" badge={{ status: 'available' }} />}>
    Primary Text
  </Tag>
);
export const CircularWithMediaRTL = getStoryVariant(CircularWithMedia, RTL);

export const CircularDismissible = () => (
  <Tag id={tagId} shape="circular" dismissible>
    Primary Text
  </Tag>
);
export const CircularDismissibleRTL = getStoryVariant(CircularDismissible, RTL);
