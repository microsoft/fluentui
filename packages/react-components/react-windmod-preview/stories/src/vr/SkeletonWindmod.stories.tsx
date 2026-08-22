import * as React from 'react';
import { Skeleton, SkeletonItem, ThemeProvider } from '@fluentui/react-windmod-preview';

import { SkeletonVrScene } from './SkeletonVrScene';

export const SkeletonWindmod = (): React.ReactNode => (
  <ThemeProvider>
    <SkeletonVrScene Skeleton={Skeleton} SkeletonItem={SkeletonItem} />
  </ThemeProvider>
);
