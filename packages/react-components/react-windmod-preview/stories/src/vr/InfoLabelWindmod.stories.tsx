import * as React from 'react';
import { Field, FluentProvider, InfoLabel, Input } from '@fluentui/react-windmod-preview';

import { InfoLabelVrScene } from './InfoLabelVrScene';

export const InfoLabelWindmod = (): React.ReactNode => (
  <FluentProvider>
    <InfoLabelVrScene InfoLabel={InfoLabel as never} Field={Field as never} Input={Input as never} />
  </FluentProvider>
);
