import * as React from 'react';
import { FluentProvider } from '@fluentui/react-windmod-preview/provider';
import { Textarea } from '@fluentui/react-windmod-preview/textarea';

import { TextareaVrScene } from './TextareaVrScene';

export const TextareaWindmod = (): React.ReactNode => (
  <FluentProvider>
    <TextareaVrScene Textarea={Textarea} />
  </FluentProvider>
);
