import * as React from 'react';
import type { Meta } from '@storybook/react';
import { Steps } from 'storywright';
import type { StoryParameters } from 'storywright';
import { TestWrapperDecorator } from '../../utilities';
import { IContextualMenuItem } from '@fluentui/react';
import { DefaultButton } from '@fluentui/react/lib/Button';

const itemsWithSubmenuHrefs: IContextualMenuItem[] = [
  {
    key: 'parent',
    id: 'parent',
    name: 'Parent',
    subMenuProps: {
      items: [
        {
          key: 'item1',
          id: 'item1',
          name: 'Item 1',
          href: 'http://bing.com',
          subMenuProps: {
            items: [
              {
                key: 'sub1',
                name: 'Sub-item 1',
                href: 'http://bing.com',
              },
            ],
          },
        },
        {
          key: 'item2',
          id: 'item2',
          name: 'Item 2',
          href: 'http://bing.com',
          subMenuProps: {
            items: [
              {
                key: 'sub2',
                name: 'Sub-item 2',
                href: 'http://bing.com',
              },
            ],
          },
        },
      ],
    },
  },
];

export default {
  title: 'ContextualMenu',

  decorators: [TestWrapperDecorator],
  parameters: {
    storyWright: {
      steps: new Steps()
        .click('#button')
        .snapshot('menu opened')
        .hover('#parent')
        .snapshot('parent hovered')
        .hover('#item1')
        .snapshot('item1 hovered')
        .hover('#item2')
        .snapshot('item2 hovered')
        .end(),
    },
  } satisfies StoryParameters,
} satisfies Meta<typeof DefaultButton>;

export const WithSubmenusWithHrefs = () => (
  <DefaultButton
    id="button"
    text="Click for ContextualMenu"
    menuProps={{ items: itemsWithSubmenuHrefs }}
  />
);

WithSubmenusWithHrefs.storyName = 'With submenus with hrefs';
