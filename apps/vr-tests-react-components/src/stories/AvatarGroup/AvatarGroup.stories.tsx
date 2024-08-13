import * as React from 'react';
import type { Meta } from '@storybook/react';
import { Steps, StoryWright } from 'storywright';
import { AvatarGroup, AvatarGroupItem, AvatarGroupPopover } from '@fluentui/react-avatar';

import { DARK_MODE, HIGH_CONTRAST, RTL, getStoryVariant } from '../../utilities';
import { names, AvatarGroupList } from './utils';

export default {
  title: 'AvatarGroup Converged',
  component: AvatarGroup,
  decorators: [
    story => (
      <StoryWright steps={new Steps().snapshot('default', { cropTo: '.testWrapper' }).end()}>
        <div style={{ display: 'flex' }}>
          <div className="testWrapper" style={{ overflow: 'hidden' }}>
            {story()}
          </div>
        </div>
      </StoryWright>
    ),
  ],
} satisfies Meta<typeof AvatarGroup>;

export const Basic = () => <AvatarGroupList />;
Basic.storyName = 'basic';

export const BasicDarkMode = getStoryVariant(Basic, DARK_MODE);

export const BasicHighContrast = getStoryVariant(Basic, HIGH_CONTRAST);

export const LayoutStack = () => <AvatarGroupList layout="stack" />;

export const LayoutStackDarkMode = getStoryVariant(LayoutStack, DARK_MODE);

export const LayoutStackHighContrast = getStoryVariant(LayoutStack, HIGH_CONTRAST);

export const LayoutPie1 = () => (
  <div style={{ padding: '10px' }}>
    <AvatarGroupList layout="pie">
      <AvatarGroupItem name={names[0]} />
      <AvatarGroupPopover>
        <AvatarGroupItem name={names[0]} />
      </AvatarGroupPopover>
    </AvatarGroupList>
  </div>
);
LayoutPie1.storyName = 'layoutPie-1';

export const LayoutPie1DarkMode = getStoryVariant(LayoutPie1, DARK_MODE);

export const LayoutPie1HighContrast = getStoryVariant(LayoutPie1, HIGH_CONTRAST);

export const LayoutPie1RTL = getStoryVariant(LayoutPie1, RTL);

export const LayoutPie2 = () => (
  <div style={{ padding: '10px' }}>
    <AvatarGroupList layout="pie">
      <AvatarGroupItem name={names[0]} />
      <AvatarGroupItem name={names[1]} />
      <AvatarGroupPopover>
        <AvatarGroupItem name={names[0]} />
        <AvatarGroupItem name={names[1]} />
      </AvatarGroupPopover>
    </AvatarGroupList>
  </div>
);
LayoutPie1.storyName = 'layoutPie-2';

export const LayoutPie2DarkMode = getStoryVariant(LayoutPie2, DARK_MODE);

export const LayoutPie2HighContrast = getStoryVariant(LayoutPie2, HIGH_CONTRAST);

export const LayoutPie2RTL = getStoryVariant(LayoutPie2, RTL);

export const LayoutPie = () => <AvatarGroupList layout="pie" />;
LayoutPie.storyName = 'layoutPie';

export const LayoutPieDarkMode = getStoryVariant(LayoutPie, DARK_MODE);

export const LayoutPieHighContrast = getStoryVariant(LayoutPie, HIGH_CONTRAST);

export const LayoutPieRTL = getStoryVariant(LayoutPie, RTL);

export const OverflowIndicator = () => <AvatarGroupList overflowIndicator="icon" />;
OverflowIndicator.storyName = 'overflowIndicator';

export const OverflowIndicatorDarkMode = getStoryVariant(OverflowIndicator, DARK_MODE);

export const OverflowIndicatorHighContrast = getStoryVariant(OverflowIndicator, HIGH_CONTRAST);

export const OverflowIndicatorRTL = getStoryVariant(OverflowIndicator, RTL);
