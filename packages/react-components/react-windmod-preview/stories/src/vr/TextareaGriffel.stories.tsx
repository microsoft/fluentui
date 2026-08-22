import * as React from 'react';
import { FluentProvider, Textarea, webLightTheme } from '@fluentui/react-components';

import { TextareaVrScene } from './TextareaVrScene';

export const TextareaGriffel = (): React.ReactNode => (
  <FluentProvider theme={webLightTheme}>
    <TextareaVrScene Textarea={Textarea} />
  </FluentProvider>
);
