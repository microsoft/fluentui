import * as React from 'react';
import { Field, FluentProvider, Input } from '@fluentui/react-windmod-preview';

import { FieldVrScene } from './FieldVrScene';

export const FieldWindmod = (): React.ReactNode => (
  <FluentProvider>
    <FieldVrScene Field={Field} Input={Input} />
  </FluentProvider>
);
