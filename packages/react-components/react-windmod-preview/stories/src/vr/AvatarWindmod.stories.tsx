import * as React from 'react';
import { Avatar, FluentProvider } from '@fluentui/react-windmod-preview';

import { AvatarVrScene, useAvatarImageDecoded } from './AvatarVrScene';

export const AvatarWindmod = (): React.ReactNode => {
  // FluentProvider renders a real element, so the gate must sit above it: the runner starts
  // capturing as soon as #storybook-root has any child.
  const decoded = useAvatarImageDecoded();

  if (!decoded) {
    return null;
  }

  return (
    <FluentProvider>
      <AvatarVrScene Avatar={Avatar} />
    </FluentProvider>
  );
};
