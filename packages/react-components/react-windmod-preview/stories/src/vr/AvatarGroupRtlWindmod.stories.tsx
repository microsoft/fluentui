import * as React from 'react';
import { AvatarGroup, AvatarGroupItem, AvatarGroupPopover, FluentProvider } from '@fluentui/react-windmod-preview';

import { AvatarGroupRtlVrScene } from './AvatarGroupVrScene';

export const AvatarGroupRtlWindmod = (): React.ReactNode => (
  <FluentProvider dir="rtl">
    <AvatarGroupRtlVrScene
      AvatarGroup={AvatarGroup}
      AvatarGroupItem={AvatarGroupItem}
      AvatarGroupPopover={AvatarGroupPopover}
    />
  </FluentProvider>
);
