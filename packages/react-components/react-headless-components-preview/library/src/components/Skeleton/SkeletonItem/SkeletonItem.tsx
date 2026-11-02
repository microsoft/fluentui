'use client';

import { useSkeletonItem } from './useSkeletonItem';
import { renderSkeletonItem } from './renderSkeletonItem';
import { composeComponent } from '../../../utils/composeComponent';

/**
 * A SkeletonItem component for loading placeholders.
 */
export const SkeletonItem = /*#__PURE__*/ composeComponent('SkeletonItem', useSkeletonItem, renderSkeletonItem);
