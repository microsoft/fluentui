import * as React from 'react';
import {
  AvatarGroup,
  AvatarGroupItem,
  AvatarGroupPopover,
  FluentProvider,
  webLightTheme,
} from '@fluentui/react-components';

import { AvatarGroupVrScene } from './AvatarGroupVrScene';

export const AvatarGroupGriffel = (): React.ReactNode => (
  <FluentProvider theme={webLightTheme}>
    <AvatarGroupVrScene
      AvatarGroup={AvatarGroup}
      AvatarGroupItem={AvatarGroupItem}
      AvatarGroupPopover={AvatarGroupPopover}
    />
  </FluentProvider>
);
