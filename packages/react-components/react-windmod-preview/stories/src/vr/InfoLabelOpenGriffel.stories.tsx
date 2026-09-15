import * as React from 'react';
import { FluentProvider, InfoButton, webLightTheme } from '@fluentui/react-components';

import { InfoLabelOpenVrScene } from './InfoLabelOpenVrScene';

// Griffel renders its surface inline (`useInfoButton_unstable` defaults `inline` to true) and it is
// not a native `popover` element, so the top-layer hint mutual-exclusion never applies and there is
// nothing to pin.
const surfaceProps = {};

export const InfoLabelOpenGriffel = (): React.ReactNode => (
  <FluentProvider theme={webLightTheme}>
    <InfoLabelOpenVrScene InfoButton={InfoButton as never} surfaceProps={surfaceProps} />
  </FluentProvider>
);
