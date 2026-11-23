'use client';

import type { ForwardRefComponent, RefAttributes } from '@fluentui/react-utilities';
import type { SkeletonItemProps } from './SkeletonItem.types';
import { useSkeletonItem } from './useSkeletonItem';
import { renderSkeletonItem } from './renderSkeletonItem';
import { composeComponent } from '../../../utils/composeComponent';

/**
 * A SkeletonItem component for loading placeholders.
 */
export const SkeletonItem: ForwardRefComponent<SkeletonItemProps & RefAttributes<HTMLDivElement>> =
  /*#__PURE__*/ composeComponent('SkeletonItem', useSkeletonItem, renderSkeletonItem);
