import * as React from 'react';
import { Card, CardFooter, CardHeader, CardPreview } from '@fluentui/react-windmod-preview/card';
import { FluentProvider } from '@fluentui/react-windmod-preview/provider';

import { CardVrScene } from './CardVrScene';

export const CardWindmod = (): React.ReactNode => (
  <FluentProvider>
    <CardVrScene Card={Card} CardHeader={CardHeader} CardFooter={CardFooter} CardPreview={CardPreview} />
  </FluentProvider>
);
