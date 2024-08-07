import * as React from 'react';
import { StoryWright, Steps } from 'storywright';
import { Meta } from '@storybook/react';
import { Popup, buttonClassName } from '@fluentui/react-northstar';
import PopupExampleRtl from '../../examples/components/Popup/Rtl/PopupExample.rtl';

export default {
  component: Popup,
  title: 'Popup',
  decorators: [
    story => (
      <StoryWright steps={new Steps().click(`.${buttonClassName}`).snapshot('RTL: Shows popup').end()}>
        {story()}
      </StoryWright>
    ),
  ],
} as Meta<typeof Popup>;

export { PopupExampleRtl };
