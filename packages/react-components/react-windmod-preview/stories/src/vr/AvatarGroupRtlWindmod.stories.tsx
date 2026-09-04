import * as React from 'react';
import { AvatarGroup, AvatarGroupItem, AvatarGroupPopover } from '@fluentui/react-windmod-preview/avatar-group';
import { FluentProvider } from '@fluentui/react-windmod-preview/provider';

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
