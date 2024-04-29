import * as React from 'react';
import { StoryWright, Steps } from 'storywright';
import { ComponentMeta } from '@storybook/react';
import { Popup } from '@fluentui/react-northstar';
import PopperExampleVisibilityModifiers from '../../examples/components/Popup/Visual/PopperExampleVisibilityModifiers';

export default {
  component: Popup,
  title: 'Popup',
  decorators: [
    story => (
      <StoryWright
        steps={new Steps()
          .click('#message-1')
          .snapshot('Opened a popup on second message')
          .executeScript('document.querySelector("#scrollable-area").scrollTop = 50')
          .snapshot('has "[data-popper-is-intersecting]" when the popover intersects boundaries')
          .executeScript('document.querySelector("#scrollable-area").scrollTop = 80')
          .snapshot(`has "[data-popper-escaped]" when the popper escapes the reference element's boundary`)
          .executeScript('document.querySelector("#scrollable-area").scrollTop = 150')
          .snapshot('has "[data-popper-reference-hidden]" when the reference is hidden')
          .end()}
      >
        {story()}
      </StoryWright>
    ),
  ],
} as ComponentMeta<typeof Popup>;

export { PopperExampleVisibilityModifiers };
