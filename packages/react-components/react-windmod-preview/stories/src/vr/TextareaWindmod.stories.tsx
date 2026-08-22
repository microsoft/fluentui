import * as React from 'react';
import { Textarea, ThemeProvider } from '@fluentui/react-windmod-preview';

import { TextareaVrScene } from './TextareaVrScene';

export const TextareaWindmod = (): React.ReactNode => (
  <ThemeProvider>
    <TextareaVrScene Textarea={Textarea} />
  </ThemeProvider>
);
