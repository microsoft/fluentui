import * as React from 'react';
import Screener from 'screener-storybook/src/screener';
import { AvatarGroup, AvatarGroupItem, AvatarGroupPopover, partitionAvatarGroupItems } from '@fluentui/react-avatar';
import { TestWrapperDecorator } from '../../utilities/TestWrapperDecorator';
import { ComponentMeta } from '@storybook/react';
import { getStoryVariant, DARK_MODE, HIGH_CONTRAST } from '../../utilities/index';
import { names } from './utils';

export default {
  title: 'AvatarGroup Converged',
  component: AvatarGroup,
  decorators: [
    TestWrapperDecorator,
    story => (
      <Screener steps={new Screener.Steps().click('#show-overflow').snapshot('popoverContentOpen').end()}>
        {story()}
      </Screener>
    ),
  ],
} as ComponentMeta<typeof AvatarGroup>;

export const OverflowContent = () => {
  const { inlineItems, overflowItems } = partitionAvatarGroupItems({ items: names });
  return (
    <div style={{ padding: '10px' }}>
      <AvatarGroup>
        {inlineItems.map(name => (
          <AvatarGroupItem key={name} name={name} />
        ))}
        <AvatarGroupPopover triggerButton={{ id: 'show-overflow' }}>
          {overflowItems.map(name => (
            <AvatarGroupItem key={name} name={name} />
          ))}
        </AvatarGroupPopover>
      </AvatarGroup>
    </div>
  );
};

OverflowContent.storyName = 'overflowContent';

export const OverflowContentHighContrast = getStoryVariant(OverflowContent, HIGH_CONTRAST);
export const OverflowContentDarkMode = getStoryVariant(OverflowContent, DARK_MODE);
