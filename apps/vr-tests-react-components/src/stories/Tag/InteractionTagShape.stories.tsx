import * as React from 'react';
import { InteractionTag, Primary, Secondary } from '@fluentui/react-tags-preview';
import { ComponentMeta } from '@storybook/react';
import { getStoryVariant, withStoryWrightSteps, RTL } from '../../utilities';
import { Avatar } from '@fluentui/react-avatar';
import { Steps } from 'storywright';

const contentId = 'content-id';
const dismissButtonId = 'dismiss-button-id';
const steps = new Steps()
  .snapshot('default', { cropTo: '.testWrapper' })

  // This needs to be added so that the focus outline is shown correctly
  .executeScript(`document.querySelector('#${contentId}').setAttribute('data-fui-focus-visible', '')`)
  .focus(`#${contentId}`)
  .snapshot('focus content', { cropTo: '.testWrapper' })
  .executeScript(`document.querySelector('#${contentId}').removeAttribute('data-fui-focus-visible')`)

  // This needs to be added so that the focus outline is shown correctly
  .executeScript(`document.querySelector('#${dismissButtonId}').setAttribute('data-fui-focus-visible', '')`)
  .focus(`#${dismissButtonId}`)
  .snapshot('focus dismiss', { cropTo: '.testWrapper' })
  .executeScript(`document.querySelector('#${dismissButtonId}').removeAttribute('data-fui-focus-visible')`)

  .end();

export default {
  title: 'InteractionTag Converged',
  Component: InteractionTag,
  decorators: [story => withStoryWrightSteps({ story, steps })],
} as ComponentMeta<typeof InteractionTag>;

export const Rounded = () => (
  <InteractionTag>
    <Primary id={contentId}>Primary Text</Primary>
  </InteractionTag>
);

export const RoundedWithSecondaryText = () => (
  <InteractionTag>
    <Primary id={contentId} secondaryText="Secondary Text">
      Primary Text
    </Primary>
  </InteractionTag>
);

export const RoundedWithMedia = () => (
  <InteractionTag>
    <Primary id={contentId} media={<Avatar name="Lydia Bauer" badge={{ status: 'available' }} />}>
      Primary Text
    </Primary>
  </InteractionTag>
);
export const RoundedWithMediaRTL = getStoryVariant(RoundedWithMedia, RTL);

export const RoundedDismissible = () => (
  <InteractionTag>
    <Primary id={contentId} hasSecondaryAction>
      Primary Text
    </Primary>
    <Secondary id={dismissButtonId} />
  </InteractionTag>
);
export const RoundedDismissibleRTL = getStoryVariant(RoundedDismissible, RTL);

export const Circular = () => (
  <InteractionTag shape="circular">
    <Primary id={contentId}>Primary Text</Primary>
  </InteractionTag>
);

export const CircularWithSecondaryText = () => (
  <InteractionTag shape="circular">
    <Primary id={contentId} secondaryText="Secondary Text">
      Primary Text
    </Primary>
  </InteractionTag>
);

export const CircularWithMedia = () => (
  <InteractionTag shape="circular">
    <Primary id={contentId} media={<Avatar name="Lydia Bauer" badge={{ status: 'available' }} />}>
      Primary Text
    </Primary>
  </InteractionTag>
);
export const CircularWithMediaRTL = getStoryVariant(CircularWithMedia, RTL);

export const CircularDismissible = () => (
  <InteractionTag shape="circular">
    <Primary id={contentId} hasSecondaryAction>
      Primary Text
    </Primary>
    <Secondary id={dismissButtonId} />
  </InteractionTag>
);
export const CircularDismissibleRTL = getStoryVariant(CircularDismissible, RTL);
