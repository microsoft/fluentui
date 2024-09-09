import * as React from 'react';
import type { Meta, StoryFn } from '@storybook/react';
import { Steps } from 'storywright';
import { Breadcrumb } from '@fluentui/react';

import { TestWrapperDecoratorTall, StoryWrightDecorator } from '../../utilities';

const noOp = () => undefined;

export default {
  title: 'Breadcrumb',

  decorators: [
    TestWrapperDecoratorTall,
    StoryWrightDecorator(
      new Steps()
        .hover('.ms-Breadcrumb-list li:nth-child(2)')
        .snapshot('actionable hover', { cropTo: '.testWrapper' })
        .hover('.ms-Breadcrumb-list li:nth-child(3)')
        .snapshot('non-actionable hover', { cropTo: '.testWrapper' })
        .hover('.ms-Breadcrumb-overflowButton')
        .click('.ms-Breadcrumb-overflowButton') // opening the dropdown
        .hover('.ms-Breadcrumb-overflowButton') // moving the mouse a bit to let dropdown open.
        .hover('.ms-ContextualMenu-list li:nth-child(2)')
        .snapshot('actionable overflow hover', { cropTo: '.testWrapper' })
        .hover('.ms-ContextualMenu-list li:nth-child(3)')
        .snapshot('non-actionable overflow hover', { cropTo: '.testWrapper' })
        .end(),
    ),
  ],
} satisfies Meta<typeof Breadcrumb>;

type Story = StoryFn<typeof Breadcrumb>;

export const HoveringItems: Story = () => (
  <Breadcrumb
    items={[
      // overflow
      { text: 'Files', key: 'Files' },
      { text: 'Folder 1', key: 'l1', onClick: noOp },
      { text: 'Folder 2 no action', key: 'l2' },
      // displayed
      { text: 'Folder 3', key: 'l3', onClick: noOp },
      { text: 'Folder 4 no action', key: 'l4' },
      { text: 'Folder 5', key: 'l5', onClick: noOp, isCurrentItem: true },
    ]}
    maxDisplayedItems={3}
  />
);
HoveringItems.storyName = 'Hovering items';
