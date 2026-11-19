import * as React from 'react';
import { Field, FluentProvider, InfoLabel, Input, webLightTheme } from '@fluentui/react-components';

import { InfoLabelVrScene } from './InfoLabelVrScene';

export const InfoLabelRtlGriffel = (): React.ReactNode => (
  <FluentProvider theme={webLightTheme} dir="rtl">
    <InfoLabelVrScene InfoLabel={InfoLabel as never} Field={Field as never} Input={Input as never} reduced />
  </FluentProvider>
);
