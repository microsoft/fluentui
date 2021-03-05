import { FluentDesignSystemProvider } from '../design-system-provider';
import SkeletonTemplate from './fixtures/base.html';
import { FluentSkeleton } from './';

FluentSkeleton;
FluentDesignSystemProvider;

export default {
  title: 'Skeleton',
};

export const Skeleton = (): string => SkeletonTemplate;
