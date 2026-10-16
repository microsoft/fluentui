/**
 * A trimmed-down, synchronous port of the parts of Floating UI that `@fluentui/react-positioning` uses.
 *
 * Based on `@floating-ui/core@1.6.8`, `@floating-ui/dom@1.6.12` and `@floating-ui/utils@0.2.8`.
 * Copyright (c) 2021-present Floating UI contributors. Licensed under the MIT License.
 * https://github.com/floating-ui/floating-ui/blob/master/LICENSE
 *
 * Differences from upstream:
 * - everything is synchronous (there is no pluggable async platform)
 * - `autoUpdate`, `autoPlacement`, `inline`, custom platforms and `rootBoundary` are not included
 * - middleware options are plain objects (only `offset` accepts a function)
 */
export { computePosition } from './computePosition';
export { detectOverflow } from './detectOverflow';
export type { DetectOverflowOptions } from './detectOverflow';
export { arrow, flip, hide, limitShift, offset, shift, size } from './middleware';
export type {
  ArrowOptions,
  FlipOptions,
  HideOptions,
  LimitShiftOptions,
  OffsetOptions,
  ShiftOptions,
  SizeOptions,
} from './middleware';
export type {
  Alignment,
  Boundary,
  ComputePositionConfig,
  ComputePositionReturn,
  Coords,
  Middleware,
  MiddlewareData,
  MiddlewareState,
  Padding,
  Placement,
  ReferenceElement,
  Side,
  SideObject,
  Strategy,
  VirtualElement,
} from './types';
