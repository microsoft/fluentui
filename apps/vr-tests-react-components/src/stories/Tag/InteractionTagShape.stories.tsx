import * as React from 'react';
import { InteractionTag } from '@fluentui/react-tags-preview';
import { ComponentMeta } from '@storybook/react';
import { getStoryVariant, withStoryWrightSteps, RTL } from '../../utilities';
import { Avatar } from '@fluentui/react-avatar';
import { Steps } from 'storywright';

const contentId = 'content-id';
const dismissButtonId = 'dismiss-button-id';
const steps = new Steps()
  .snapshot('default', { cropTo: '.testWrapper' })
  .focus(`#${contentId}`)
  .snapshot('focus content', { cropTo: '.testWrapper' })
  .focus(`#${dismissButtonId}`)
  .snapshot('focus dismiss', { cropTo: '.testWrapper' })
  .end();

export default {
  title: 'InteractionTag Converged',
  Component: InteractionTag,
  decorators: [story => withStoryWrightSteps({ story, steps })],
} as ComponentMeta<typeof InteractionTag>;

export const Rounded = () => <InteractionTag content={{ id: contentId }}>Primary Text</InteractionTag>;

export const RoundedWithSecondaryText = () => (
  <InteractionTag content={{ id: contentId }} secondaryText="Secondary Text">
    Primary Text
  </InteractionTag>
);

export const RoundedWithMedia = () => (
  <InteractionTag content={{ id: contentId }} media={<Avatar name="Lydia Bauer" badge={{ status: 'available' }} />}>
    Primary Text
  </InteractionTag>
);
export const RoundedWithMediaRTL = getStoryVariant(RoundedWithMedia, RTL);

export const RoundedDismissible = () => (
  <InteractionTag content={{ id: contentId }} dismissible dismissButton={{ id: dismissButtonId }}>
    Primary Text
  </InteractionTag>
);
export const RoundedDismissibleRTL = getStoryVariant(RoundedDismissible, RTL);

export const Circular = () => (
  <InteractionTag content={{ id: contentId }} shape="circular">
    Primary Text
  </InteractionTag>
);

export const CircularWithSecondaryText = () => (
  <InteractionTag content={{ id: contentId }} shape="circular" secondaryText="Secondary Text">
    Primary Text
  </InteractionTag>
);

export const CircularWithMedia = () => (
  <InteractionTag
    content={{ id: contentId }}
    shape="circular"
    media={<Avatar name="Lydia Bauer" badge={{ status: 'available' }} />}
  >
    Primary Text
  </InteractionTag>
);
export const CircularWithMediaRTL = getStoryVariant(CircularWithMedia, RTL);

export const CircularDismissible = () => (
  <InteractionTag content={{ id: contentId }} shape="circular" dismissible dismissButton={{ id: dismissButtonId }}>
    Primary Text
  </InteractionTag>
);
export const CircularDismissibleRTL = getStoryVariant(CircularDismissible, RTL);
