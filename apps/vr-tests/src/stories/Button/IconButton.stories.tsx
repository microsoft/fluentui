import * as React from 'react';
import { Steps } from 'storywright';
import { StoryWrightDecorator, TestWrapperDecorator } from '../../utilities';
import { IconButton } from '@fluentui/react/lib/Button';

export default {
  title: 'IconButton Scenarios (compat)',

  decorators: [
    TestWrapperDecorator,
    StoryWrightDecorator(
      new Steps()
        .snapshot('icon', { cropTo: '.testWrapper' })
        .hover('.ms-Button')
        .snapshot('hover icon', { cropTo: '.testWrapper' })
        .end(),
    ),
  ],
};

export const NormalIconButton = () => (
  <div>
    <IconButton iconProps={{ iconName: 'Globe' }} primary={true} />
  </div>
);

NormalIconButton.storyName = 'normal icon button';

export const IconButtonWithMenu = () => (
  <div>
    <IconButton
      iconProps={{ iconName: 'Globe' }}
      primary={true}
      menuProps={{
        items: [
          { key: 'a', text: 'Item 1' },
          { key: 'b', text: 'Item 2' },
        ],
      }}
    />
  </div>
);

IconButtonWithMenu.storyName = 'icon button with menu';
