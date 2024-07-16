import * as React from 'react';
import type { Meta } from '@storybook/react';
import { Steps, StoryWright } from 'storywright';
import { AvatarGroup, AvatarGroupItem, AvatarGroupPopover, partitionAvatarGroupItems } from '@fluentui/react-avatar';

import { names } from './utils';
import { DARK_MODE, HIGH_CONTRAST, getStoryVariant } from '../../utilities';

export default {
  title: 'AvatarGroup Converged',
  component: AvatarGroup,
  decorators: [
    story => (
      <StoryWright steps={new Steps().click('#show-overflow').snapshot('popoverContentOpen').end()}>
        <div style={{ display: 'flex' }}>
          <div className="testWrapper" style={{ width: '100%', overflow: 'hidden' }}>
            {story()}
          </div>
        </div>
      </StoryWright>
    ),
  ],
} satisfies Meta<typeof AvatarGroup>;

export const OverflowContent = () => {
  const { inlineItems, overflowItems } = partitionAvatarGroupItems({ items: names });

  return (
    <div style={{ padding: '20px' }}>
      <AvatarGroup>
        {inlineItems.map(name => (
          <AvatarGroupItem key={name} name={name} />
        ))}
        {overflowItems && (
          <AvatarGroupPopover triggerButton={{ id: 'show-overflow' }}>
            {overflowItems.map(name => (
              <AvatarGroupItem key={name} name={name} />
            ))}
          </AvatarGroupPopover>
        )}
      </AvatarGroup>
    </div>
  );
};
OverflowContent.storyName = 'overflowContent';

export const OverflowContentHighContrast = getStoryVariant(OverflowContent, HIGH_CONTRAST);

export const OverflowContentDarkMode = getStoryVariant(OverflowContent, DARK_MODE);
