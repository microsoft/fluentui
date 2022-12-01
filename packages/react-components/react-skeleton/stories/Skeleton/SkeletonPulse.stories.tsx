import * as React from 'react';
import { Skeleton, SkeletonProps } from '@fluentui/react-skeleton';

export const Pulse = (props: Partial<SkeletonProps>) => <Skeleton {...props} animation="pulse" />;
