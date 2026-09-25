import * as React from 'react';
import { AvatarGroup, AvatarGroupItem, AvatarGroupPopover } from '@fluentui/react-windmod-preview/avatar-group';
import { FluentProvider } from '@fluentui/react-windmod-preview/provider';

import { AvatarGroupVrScene } from './AvatarGroupVrScene';

export const AvatarGroupWindmod = (): React.ReactNode => (
  <FluentProvider>
    <AvatarGroupVrScene
      AvatarGroup={AvatarGroup}
      AvatarGroupItem={AvatarGroupItem}
      AvatarGroupPopover={AvatarGroupPopover}
    />
  </FluentProvider>
);
