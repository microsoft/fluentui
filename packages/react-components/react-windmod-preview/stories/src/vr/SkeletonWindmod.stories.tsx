import * as React from 'react';
import { FluentProvider } from '@fluentui/react-windmod-preview/provider';
import { Skeleton, SkeletonItem } from '@fluentui/react-windmod-preview/skeleton';

import { SkeletonVrScene } from './SkeletonVrScene';

export const SkeletonWindmod = (): React.ReactNode => (
  <FluentProvider>
    <SkeletonVrScene Skeleton={Skeleton} SkeletonItem={SkeletonItem} />
  </FluentProvider>
);
