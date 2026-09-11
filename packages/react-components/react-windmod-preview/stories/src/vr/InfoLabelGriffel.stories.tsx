import * as React from 'react';
import { Field, FluentProvider, InfoLabel, Input, webLightTheme } from '@fluentui/react-components';

import { InfoLabelVrScene } from './InfoLabelVrScene';

export const InfoLabelGriffel = (): React.ReactNode => (
  <FluentProvider theme={webLightTheme}>
    <InfoLabelVrScene InfoLabel={InfoLabel as never} Field={Field as never} Input={Input as never} />
  </FluentProvider>
);
