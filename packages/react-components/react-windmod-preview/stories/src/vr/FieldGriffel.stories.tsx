import * as React from 'react';
import { Field, FluentProvider, Input, webLightTheme } from '@fluentui/react-components';

import { FieldVrScene } from './FieldVrScene';

export const FieldGriffel = (): React.ReactNode => (
  <FluentProvider theme={webLightTheme}>
    <FieldVrScene Field={Field} Input={Input} />
  </FluentProvider>
);
