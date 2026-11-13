import * as React from 'react';
import { InfoButton } from '@fluentui/react-windmod-preview/info-label';
import { FluentProvider } from '@fluentui/react-windmod-preview/provider';

import { InfoLabelOpenVrScene } from './InfoLabelOpenVrScene';

// Four surfaces are pinned open at once, and hint popovers are mutually exclusive.
const surfaceProps = { popover: 'manual' };

export const InfoLabelOpenWindmod = (): React.ReactNode => (
  <FluentProvider>
    <InfoLabelOpenVrScene InfoButton={InfoButton as never} surfaceProps={surfaceProps} />
  </FluentProvider>
);
