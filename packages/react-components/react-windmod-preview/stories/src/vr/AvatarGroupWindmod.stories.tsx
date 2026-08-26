import * as React from 'react';
import { AvatarGroup, AvatarGroupItem, AvatarGroupPopover, FluentProvider } from '@fluentui/react-windmod-preview';

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
