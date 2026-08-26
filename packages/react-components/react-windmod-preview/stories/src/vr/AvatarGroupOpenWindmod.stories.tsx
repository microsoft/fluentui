import * as React from 'react';
import { AvatarGroup, AvatarGroupItem, AvatarGroupPopover, FluentProvider } from '@fluentui/react-windmod-preview';

import { AvatarGroupOpenVrScene } from './AvatarGroupVrScene';

// surfaceProps={{ popover: 'manual' }} — a pinned-open popover cannot sit in the mutually
// exclusive hint stack.
export const AvatarGroupOpenWindmod = (): React.ReactNode => (
  <FluentProvider>
    <AvatarGroupOpenVrScene
      AvatarGroup={AvatarGroup}
      AvatarGroupItem={AvatarGroupItem}
      AvatarGroupPopover={AvatarGroupPopover}
      surfaceProps={{ popover: 'manual' }}
    />
  </FluentProvider>
);
