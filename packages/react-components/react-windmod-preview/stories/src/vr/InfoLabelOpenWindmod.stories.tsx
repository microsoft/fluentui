import * as React from 'react';
import { FluentProvider, InfoButton } from '@fluentui/react-windmod-preview';

import { InfoLabelOpenVrScene } from './InfoLabelOpenVrScene';

// Four surfaces are pinned open at once, and hint popovers are mutually exclusive.
const surfaceProps = { popover: 'manual' };

export const InfoLabelOpenWindmod = (): React.ReactNode => (
  <FluentProvider>
    <InfoLabelOpenVrScene InfoButton={InfoButton as never} surfaceProps={surfaceProps} />
  </FluentProvider>
);
