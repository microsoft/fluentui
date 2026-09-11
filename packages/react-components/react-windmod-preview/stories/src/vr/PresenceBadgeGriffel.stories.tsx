import * as React from 'react';
import { PresenceBadge, FluentProvider, webLightTheme } from '@fluentui/react-components';

import { PresenceBadgeVrScene } from './PresenceBadgeVrScene';

export const PresenceBadgeGriffel = (): React.ReactNode => (
  <FluentProvider theme={webLightTheme}>
    <PresenceBadgeVrScene PresenceBadge={PresenceBadge} />
  </FluentProvider>
);
