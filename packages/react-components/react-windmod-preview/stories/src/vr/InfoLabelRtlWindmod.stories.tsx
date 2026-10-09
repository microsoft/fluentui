import * as React from 'react';
import { Field } from '@fluentui/react-windmod-preview/field';
import { InfoLabel } from '@fluentui/react-windmod-preview/info-label';
import { Input } from '@fluentui/react-windmod-preview/input';
import { FluentProvider } from '@fluentui/react-windmod-preview/provider';

import { InfoLabelVrScene } from './InfoLabelVrScene';

export const InfoLabelRtlWindmod = (): React.ReactNode => (
  <FluentProvider dir="rtl">
    <InfoLabelVrScene InfoLabel={InfoLabel as never} Field={Field as never} Input={Input as never} reduced />
  </FluentProvider>
);
