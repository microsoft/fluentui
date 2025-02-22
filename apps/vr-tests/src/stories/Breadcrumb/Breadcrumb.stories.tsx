import * as React from 'react';
import type { Meta, StoryFn } from '@storybook/react';
import { Steps } from 'storywright';
import { Breadcrumb } from '@fluentui/react';
import {
  TestWrapperDecoratorTall,
  StoryWrightDecorator,
  getStoryVariant,
  RTL,
} from '../../utilities';

const noOp = () => undefined;

export default {
  title: 'Breadcrumb',

  decorators: [
    TestWrapperDecoratorTall,
    StoryWrightDecorator(
      new Steps()
        .snapshot('default', { cropTo: '.testWrapper' })
        .executeScript(
          "document.getElementsByClassName('testWrapper')[0].classList.add('ms-Fabric--isFocusVisible')",
        )
        .executeScript("document.getElementsByClassName('ms-Breadcrumb-overflowButton')[0].focus()")
        .snapshot('overflowButtonFocus', { cropTo: '.testWrapper' })
        .executeScript("document.getElementsByClassName('ms-Breadcrumb-itemLink')[0].focus()")
        .snapshot('itemLinkFocus', { cropTo: '.testWrapper' })
        .executeScript(
          "document.getElementsByClassName('testWrapper')[0].classList.remove('ms-Fabric--isFocusVisible')",
        )
        .hover('.ms-Breadcrumb-overflowButton')
        .snapshot('hover', { cropTo: '.testWrapper' })
        .click('.ms-Breadcrumb-overflowButton') // opening the dropdown
        .hover('.ms-Breadcrumb-overflowButton') // moving the mouse a bit to let dropdown open.
        .snapshot('click', { cropTo: '.testWrapper' })
        .click('.ms-Breadcrumb-overflowButton') // closing the dropdown
        .hover('.ms-Breadcrumb-list li:nth-child(2)')
        .snapshot('longTitleHover', { cropTo: '.testWrapper' })
        .hover('.ms-Breadcrumb-list li:nth-child(3)')
        .snapshot('shortTitleHover', { cropTo: '.testWrapper' })
        .end(),
    ),
  ],
} satisfies Meta<typeof Breadcrumb>;

type Story = StoryFn<typeof Breadcrumb>;

export const Root: Story = () => (
  <Breadcrumb
    items={[
      { text: 'Files', key: 'Files', href: '#/examples/breadcrumb' },
      { text: 'This is link 1', key: 'l1', href: '#/examples/breadcrumb' },
      { text: 'This is link 2', key: 'l2', href: '#/examples/breadcrumb' },
      { text: 'This is link 3 with a long name', key: 'l3', href: '#/examples/breadcrumb' },
      { text: 'This is link 4', key: 'l4', href: '#/examples/breadcrumb' },
      { text: 'This is link 5', key: 'l5', href: '#/examples/breadcrumb', isCurrentItem: true },
    ]}
    maxDisplayedItems={3}
  />
);

export const RootRTL = getStoryVariant(Root, RTL);

export const Button: Story = () => (
  <Breadcrumb
    items={[
      { text: 'Files', key: 'Files', onClick: noOp },
      { text: 'This is folder 1', key: 'l1', onClick: noOp },
      { text: 'This is folder 2', key: 'l2', onClick: noOp },
      { text: 'This is folder 3', key: 'l3', onClick: noOp },
      { text: 'This is folder 4', key: 'l4', onClick: noOp },
      { text: 'This is folder 5', key: 'l5', onClick: noOp, isCurrentItem: true },
    ]}
    maxDisplayedItems={3}
  />
);

export const ButtonRTL = getStoryVariant(Button, RTL);
