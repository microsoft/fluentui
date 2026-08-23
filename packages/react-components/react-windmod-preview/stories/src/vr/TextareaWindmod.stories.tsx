import * as React from 'react';
import { FluentProvider, Textarea } from '@fluentui/react-windmod-preview';

import { TextareaVrScene } from './TextareaVrScene';

export const TextareaWindmod = (): React.ReactNode => (
  <FluentProvider>
    <TextareaVrScene Textarea={Textarea} />
  </FluentProvider>
);
