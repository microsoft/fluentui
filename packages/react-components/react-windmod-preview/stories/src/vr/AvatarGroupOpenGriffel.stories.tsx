import * as React from 'react';
import {
  AvatarGroup,
  AvatarGroupItem,
  AvatarGroupPopover,
  FluentProvider,
  webLightTheme,
} from '@fluentui/react-components';

import { AvatarGroupOpenVrScene } from './AvatarGroupVrScene';

export const AvatarGroupOpenGriffel = (): React.ReactNode => (
  <FluentProvider theme={webLightTheme}>
    <AvatarGroupOpenVrScene
      AvatarGroup={AvatarGroup}
      AvatarGroupItem={AvatarGroupItem}
      AvatarGroupPopover={AvatarGroupPopover}
    />
  </FluentProvider>
);
