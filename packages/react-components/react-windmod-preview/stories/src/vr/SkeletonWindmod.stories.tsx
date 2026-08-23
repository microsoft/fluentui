import * as React from 'react';
import { FluentProvider, Skeleton, SkeletonItem } from '@fluentui/react-windmod-preview';

import { SkeletonVrScene } from './SkeletonVrScene';

export const SkeletonWindmod = (): React.ReactNode => (
  <FluentProvider>
    <SkeletonVrScene Skeleton={Skeleton} SkeletonItem={SkeletonItem} />
  </FluentProvider>
);
