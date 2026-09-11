import * as React from 'react';
import { PresenceBadge } from '@fluentui/react-windmod-preview/badge';
import { FluentProvider } from '@fluentui/react-windmod-preview/provider';

import { PresenceBadgeVrScene } from './PresenceBadgeVrScene';

export const PresenceBadgeWindmod = (): React.ReactNode => (
  <FluentProvider>
    <PresenceBadgeVrScene PresenceBadge={PresenceBadge} />
  </FluentProvider>
);
