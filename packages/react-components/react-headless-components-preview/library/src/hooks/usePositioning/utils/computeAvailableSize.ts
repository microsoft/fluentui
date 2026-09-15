import type { OffsetObject, Position, PositioningRect } from '@fluentui/react-positioning';
import type { PositioningProps } from '../types';
import { POSITIONS } from '../constants';

export type EdgeRect = Pick<DOMRect, 'top' | 'right' | 'bottom' | 'left'>;
export type BoundarySize = Pick<PositioningRect, 'width' | 'height'>;
export type AvailableSizeOptions = Required<Pick<PositioningProps, 'position' | 'coverTarget' | 'pinned'>> & {
  offset: Required<OffsetObject>;
};

export interface AvailableSize {
  blockSize: number;
  inlineSize: number;
}

const OPPOSITE_POSITION: Record<Position, Position> = {
  above: POSITIONS.below,
  below: POSITIONS.above,
  before: POSITIONS.after,
  after: POSITIONS.before,
};

const isBlockAxisMain = (position: Position): boolean => position === POSITIONS.above || position === POSITIONS.below;

const withoutOffset = (space: number, offset: number, extent: number) =>
  Math.max(0, Math.min(space - 2 * offset, extent));

export function getBoundarySize(targetDocument: Document | undefined): BoundarySize | undefined {
  const documentElement = targetDocument?.documentElement;

  if (!documentElement) {
    return undefined;
  }

  return { width: documentElement.clientWidth, height: documentElement.clientHeight };
}

export function computeAvailableSize(
  anchorRect: EdgeRect,
  boundary: BoundarySize,
  options: AvailableSizeOptions,
): AvailableSize {
  const { position, pinned, coverTarget, offset } = options;

  const beside: Record<Position, number> = {
    above: anchorRect.top,
    below: boundary.height - anchorRect.bottom,
    before: anchorRect.left,
    after: boundary.width - anchorRect.right,
  };

  const overlapping: Record<Position, number> = {
    above: anchorRect.bottom,
    below: boundary.height - anchorRect.top,
    before: anchorRect.right,
    after: boundary.width - anchorRect.left,
  };

  const space = coverTarget ? overlapping : beside;

  const main = pinned || coverTarget ? space[position] : Math.max(space[position], space[OPPOSITE_POSITION[position]]);

  const isBlockMain = isBlockAxisMain(position);
  const mainSize = withoutOffset(main, offset.mainAxis, isBlockMain ? boundary.height : boundary.width);
  const crossSize = withoutOffset(
    isBlockMain ? boundary.width : boundary.height,
    offset.crossAxis,
    isBlockMain ? boundary.width : boundary.height,
  );

  return isBlockMain ? { blockSize: mainSize, inlineSize: crossSize } : { blockSize: crossSize, inlineSize: mainSize };
}
