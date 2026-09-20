import * as React from 'react';

import { Skeleton, SkeletonItem } from '@fluentui/react-modern-components-preview/skeleton';
import type { SkeletonProps } from '@fluentui/react-modern-components-preview/skeleton';

export const Default = (props: Partial<SkeletonProps>): React.ReactNode => (
  <Skeleton {...props} aria-label="Loading Content">
    <SkeletonItem />
  </Skeleton>
);
