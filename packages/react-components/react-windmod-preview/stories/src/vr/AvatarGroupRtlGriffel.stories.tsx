import * as React from 'react';
import {
  AvatarGroup,
  AvatarGroupItem,
  AvatarGroupPopover,
  FluentProvider,
  webLightTheme,
} from '@fluentui/react-components';

import { AvatarGroupRtlVrScene } from './AvatarGroupVrScene';

export const AvatarGroupRtlGriffel = (): React.ReactNode => (
  <FluentProvider theme={webLightTheme} dir="rtl">
    <AvatarGroupRtlVrScene
      AvatarGroup={AvatarGroup}
      AvatarGroupItem={AvatarGroupItem}
      AvatarGroupPopover={AvatarGroupPopover}
    />
  </FluentProvider>
);
