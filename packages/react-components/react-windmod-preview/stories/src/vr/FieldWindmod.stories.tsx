import * as React from 'react';
import { Field } from '@fluentui/react-windmod-preview/field';
import { Input } from '@fluentui/react-windmod-preview/input';
import { FluentProvider } from '@fluentui/react-windmod-preview/provider';

import { FieldVrScene } from './FieldVrScene';

export const FieldWindmod = (): React.ReactNode => (
  <FluentProvider>
    <FieldVrScene Field={Field} Input={Input} />
  </FluentProvider>
);
