import * as React from 'react';
import { FluentProvider, Skeleton, SkeletonItem, webLightTheme } from '@fluentui/react-components';

import { SkeletonVrScene } from './SkeletonVrScene';

export const SkeletonGriffel = (): React.ReactNode => (
  <FluentProvider theme={webLightTheme}>
    <SkeletonVrScene Skeleton={Skeleton} SkeletonItem={SkeletonItem} />
  </FluentProvider>
);
