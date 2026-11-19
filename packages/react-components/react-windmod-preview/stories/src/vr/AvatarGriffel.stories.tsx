import * as React from 'react';
import { Avatar, FluentProvider, webLightTheme } from '@fluentui/react-components';

import { AvatarVrScene, useAvatarImageDecoded } from './AvatarVrScene';

export const AvatarGriffel = (): React.ReactNode => {
  // See AvatarWindmod.stories — the gate must sit above the provider.
  const decoded = useAvatarImageDecoded();

  if (!decoded) {
    return null;
  }

  return (
    <FluentProvider theme={webLightTheme}>
      <AvatarVrScene Avatar={Avatar} />
    </FluentProvider>
  );
};
