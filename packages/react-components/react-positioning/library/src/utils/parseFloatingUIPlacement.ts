import type { Alignment, Placement, Side } from '@floating-ui/dom';

export function parseFloatingUIPlacement(placement: Placement): { side: Side; alignment: Alignment } {
  const [side, alignment] = placement.split('-');
  return { side: side as Side, alignment: alignment as Alignment };
}
