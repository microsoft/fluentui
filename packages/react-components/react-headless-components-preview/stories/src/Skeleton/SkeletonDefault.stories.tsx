import * as React from 'react';
import { Skeleton, SkeletonItem } from '@fluentui/react-headless-components-preview';

export const Default = (): React.ReactNode => (
  <Skeleton className="flex flex-col gap-3 w-full max-w-sm rounded-lg border bg-white border-gray-200 p-4">
    <div className="flex items-center gap-3">
      <SkeletonItem className="size-10 shrink-0 rounded-full bg-gray-200 animate-pulse" />
      <div className="flex flex-1 flex-col gap-1.5">
        <SkeletonItem className="h-3 w-3/5 rounded bg-gray-200 animate-pulse" />
        <SkeletonItem className="h-3 w-2/5 rounded bg-gray-200 animate-pulse" />
      </div>
    </div>
    <SkeletonItem className="h-3 w-full rounded bg-gray-200 animate-pulse" />
    <SkeletonItem className="h-3 w-full rounded bg-gray-200 animate-pulse" />
    <SkeletonItem className="h-3 w-4/5 rounded bg-gray-200 animate-pulse" />
  </Skeleton>
);
