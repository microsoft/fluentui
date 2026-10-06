import type { Position } from '@fluentui/react-positioning';
import { computeFallbackPosition } from './computeFallbackPosition';
import type { FallbackPlacement } from './computeFallbackPosition';
import type { LogicalAlignment } from '../types';

interface Scenario {
  pos: Position;
  align: LogicalAlignment;
  anchor: { left: number; top: number; width: number; height: number };
  popup: { width: number; height: number };
  offset?: { main: number; cross: number };
  rtl?: boolean;
  fallbacks?: string[];
  pinned?: boolean;
  matchWidth?: boolean;
  cover?: boolean;
  expected: { left: number; top: number };
}

const VIEWPORT = { left: 0, top: 0, width: 1000, height: 700 };

const toPlacement = (shorthand: string): FallbackPlacement => {
  const [position, align = 'center'] = shorthand.split('-');
  return {
    position: position as Position,
    align: (align === 'top' ? 'start' : align === 'bottom' ? 'end' : align) as LogicalAlignment,
  };
};

/**
 * `expected` values were recorded from Chrome 154 resolving the equivalent CSS (`position-area`, `position-try-fallbacks`, margins,
 * `place-self: anchor-center` for centered placements) in a 1000x700 viewport.
 */
const scenarios: Array<[string, Scenario]> = [
  [
    'above-start with room',
    {
      pos: 'above',
      align: 'start',
      anchor: { left: 450, top: 300, width: 100, height: 40 },
      popup: { width: 200, height: 100 },
      expected: { left: 450, top: 200 },
    },
  ],
  [
    'above-center with room',
    {
      pos: 'above',
      align: 'center',
      anchor: { left: 450, top: 300, width: 100, height: 40 },
      popup: { width: 200, height: 100 },
      expected: { left: 400, top: 200 },
    },
  ],
  [
    'above-end with room',
    {
      pos: 'above',
      align: 'end',
      anchor: { left: 450, top: 300, width: 100, height: 40 },
      popup: { width: 200, height: 100 },
      expected: { left: 350, top: 200 },
    },
  ],
  [
    'below-start with room',
    {
      pos: 'below',
      align: 'start',
      anchor: { left: 450, top: 300, width: 100, height: 40 },
      popup: { width: 200, height: 100 },
      expected: { left: 450, top: 340 },
    },
  ],
  [
    'below-center with room',
    {
      pos: 'below',
      align: 'center',
      anchor: { left: 450, top: 300, width: 100, height: 40 },
      popup: { width: 200, height: 100 },
      expected: { left: 400, top: 340 },
    },
  ],
  [
    'below-end with room',
    {
      pos: 'below',
      align: 'end',
      anchor: { left: 450, top: 300, width: 100, height: 40 },
      popup: { width: 200, height: 100 },
      expected: { left: 350, top: 340 },
    },
  ],
  [
    'before-start with room',
    {
      pos: 'before',
      align: 'start',
      anchor: { left: 450, top: 300, width: 100, height: 40 },
      popup: { width: 200, height: 100 },
      expected: { left: 250, top: 300 },
    },
  ],
  [
    'before-center with room',
    {
      pos: 'before',
      align: 'center',
      anchor: { left: 450, top: 300, width: 100, height: 40 },
      popup: { width: 200, height: 100 },
      expected: { left: 250, top: 270 },
    },
  ],
  [
    'before-end with room',
    {
      pos: 'before',
      align: 'end',
      anchor: { left: 450, top: 300, width: 100, height: 40 },
      popup: { width: 200, height: 100 },
      expected: { left: 250, top: 240 },
    },
  ],
  [
    'after-start with room',
    {
      pos: 'after',
      align: 'start',
      anchor: { left: 450, top: 300, width: 100, height: 40 },
      popup: { width: 200, height: 100 },
      expected: { left: 550, top: 300 },
    },
  ],
  [
    'after-center with room',
    {
      pos: 'after',
      align: 'center',
      anchor: { left: 450, top: 300, width: 100, height: 40 },
      popup: { width: 200, height: 100 },
      expected: { left: 550, top: 270 },
    },
  ],
  [
    'after-end with room',
    {
      pos: 'after',
      align: 'end',
      anchor: { left: 450, top: 300, width: 100, height: 40 },
      popup: { width: 200, height: 100 },
      expected: { left: 550, top: 240 },
    },
  ],
  [
    'flips below when there is no room above',
    {
      pos: 'above',
      align: 'center',
      anchor: { left: 450, top: 60, width: 100, height: 40 },
      popup: { width: 200, height: 100 },
      expected: { left: 400, top: 100 },
    },
  ],
  [
    'flips above when there is no room below',
    {
      pos: 'below',
      align: 'center',
      anchor: { left: 450, top: 620, width: 100, height: 40 },
      popup: { width: 200, height: 100 },
      expected: { left: 400, top: 520 },
    },
  ],
  [
    'flips after when there is no room before',
    {
      pos: 'before',
      align: 'center',
      anchor: { left: 100, top: 300, width: 100, height: 40 },
      popup: { width: 200, height: 100 },
      expected: { left: 200, top: 270 },
    },
  ],
  [
    'flips before when there is no room after',
    {
      pos: 'after',
      align: 'center',
      anchor: { left: 800, top: 300, width: 100, height: 40 },
      popup: { width: 200, height: 100 },
      expected: { left: 600, top: 270 },
    },
  ],
  [
    'flips the alignment when it overflows the inline end',
    {
      pos: 'above',
      align: 'start',
      anchor: { left: 900, top: 300, width: 60, height: 40 },
      popup: { width: 200, height: 100 },
      expected: { left: 760, top: 200 },
    },
  ],
  [
    'flips both axes in a corner',
    {
      pos: 'above',
      align: 'start',
      anchor: { left: 900, top: 40, width: 60, height: 40 },
      popup: { width: 200, height: 100 },
      expected: { left: 760, top: 80 },
    },
  ],
  [
    'flips the block alignment of an inline position',
    {
      pos: 'after',
      align: 'start',
      anchor: { left: 300, top: 640, width: 60, height: 40 },
      popup: { width: 100, height: 200 },
      expected: { left: 360, top: 480 },
    },
  ],
  [
    'keeps a centered popup inside the viewport (right)',
    {
      pos: 'below',
      align: 'center',
      anchor: { left: 940, top: 300, width: 40, height: 40 },
      popup: { width: 300, height: 100 },
      expected: { left: 700, top: 340 },
    },
  ],
  [
    'keeps a centered popup inside the viewport (left)',
    {
      pos: 'above',
      align: 'center',
      anchor: { left: 10, top: 300, width: 40, height: 40 },
      popup: { width: 300, height: 100 },
      expected: { left: 0, top: 200 },
    },
  ],
  [
    'keeps a centered popup inside the viewport (block axis)',
    {
      pos: 'after',
      align: 'center',
      anchor: { left: 300, top: 10, width: 40, height: 40 },
      popup: { width: 100, height: 300 },
      expected: { left: 340, top: 0 },
    },
  ],
  [
    'offset',
    {
      pos: 'below',
      align: 'start',
      anchor: { left: 450, top: 300, width: 100, height: 40 },
      popup: { width: 200, height: 100 },
      offset: { main: 8, cross: 4 },
      expected: { left: 454, top: 348 },
    },
  ],
  [
    'offset keeps the gap when flipping',
    {
      pos: 'below',
      align: 'center',
      anchor: { left: 450, top: 620, width: 100, height: 40 },
      popup: { width: 200, height: 100 },
      offset: { main: 8, cross: 0 },
      expected: { left: 400, top: 512 },
    },
  ],
  [
    'offset of an inline position',
    {
      pos: 'after',
      align: 'end',
      anchor: { left: 450, top: 300, width: 100, height: 40 },
      popup: { width: 200, height: 100 },
      offset: { main: 6, cross: 3 },
      expected: { left: 556, top: 237 },
    },
  ],
  [
    'rtl before',
    {
      pos: 'before',
      align: 'center',
      anchor: { left: 450, top: 300, width: 100, height: 40 },
      popup: { width: 200, height: 100 },
      rtl: true,
      expected: { left: 550, top: 270 },
    },
  ],
  [
    'rtl above start',
    {
      pos: 'above',
      align: 'start',
      anchor: { left: 450, top: 300, width: 100, height: 40 },
      popup: { width: 200, height: 100 },
      rtl: true,
      expected: { left: 350, top: 200 },
    },
  ],
  [
    'rtl flips the inline alignment',
    {
      pos: 'above',
      align: 'start',
      anchor: { left: 10, top: 300, width: 60, height: 40 },
      popup: { width: 200, height: 100 },
      rtl: true,
      expected: { left: 10, top: 200 },
    },
  ],
  [
    'custom fallbacks',
    {
      pos: 'above',
      align: 'center',
      anchor: { left: 450, top: 60, width: 100, height: 40 },
      popup: { width: 200, height: 100 },
      fallbacks: ['after', 'below'],
      expected: { left: 550, top: 30 },
    },
  ],
  [
    'custom fallbacks of other axis',
    {
      pos: 'below',
      align: 'start',
      anchor: { left: 450, top: 640, width: 100, height: 40 },
      popup: { width: 200, height: 100 },
      fallbacks: ['before-top', 'above'],
      expected: { left: 400, top: 540 },
    },
  ],
  [
    'pinned does not flip',
    {
      pos: 'above',
      align: 'center',
      anchor: { left: 450, top: 60, width: 100, height: 40 },
      popup: { width: 200, height: 100 },
      pinned: true,
      expected: { left: 400, top: 30 },
    },
  ],
  [
    'match target width',
    {
      pos: 'below',
      align: 'start',
      anchor: { left: 450, top: 300, width: 100, height: 40 },
      popup: { width: 200, height: 100 },
      matchWidth: true,
      expected: { left: 450, top: 340 },
    },
  ],
  [
    'anchor sticks out of the viewport',
    {
      pos: 'above',
      align: 'center',
      anchor: { left: 944, top: 260, width: 119, height: 57 },
      popup: { width: 448, height: 150 },
      offset: { main: 0, cross: 4 },
      expected: { left: 611, top: 110 },
    },
  ],
  [
    'cover above-center',
    {
      pos: 'above',
      align: 'center',
      anchor: { left: 450, top: 300, width: 100, height: 40 },
      popup: { width: 60, height: 20 },
      cover: true,
      expected: { left: 470, top: 320 },
    },
  ],
  [
    'cover below-start',
    {
      pos: 'below',
      align: 'start',
      anchor: { left: 450, top: 300, width: 100, height: 40 },
      popup: { width: 60, height: 20 },
      cover: true,
      expected: { left: 450, top: 300 },
    },
  ],
  [
    'cover before-end',
    {
      pos: 'before',
      align: 'end',
      anchor: { left: 450, top: 300, width: 100, height: 40 },
      popup: { width: 60, height: 20 },
      cover: true,
      expected: { left: 490, top: 320 },
    },
  ],
  [
    'cover after-center',
    {
      pos: 'after',
      align: 'center',
      anchor: { left: 450, top: 300, width: 100, height: 40 },
      popup: { width: 60, height: 20 },
      cover: true,
      expected: { left: 450, top: 310 },
    },
  ],
  [
    'cover larger than the anchor',
    {
      pos: 'above',
      align: 'start',
      anchor: { left: 730, top: 97, width: 118, height: 80 },
      popup: { width: 404, height: 149 },
      cover: true,
      expected: { left: 596, top: 28 },
    },
  ],
  [
    'cover with offset',
    {
      pos: 'below',
      align: 'center',
      anchor: { left: 450, top: 300, width: 100, height: 40 },
      popup: { width: 60, height: 20 },
      offset: { main: 4, cross: 2 },
      cover: true,
      expected: { left: 470, top: 304 },
    },
  ],
  [
    'a centered base also centers aligned fallbacks',
    {
      pos: 'below',
      align: 'center',
      anchor: { left: 80, top: 457, width: 187, height: 72 },
      popup: { width: 168, height: 215 },
      offset: { main: 8, cross: 4 },
      fallbacks: ['above-end', 'above'],
      expected: { left: 89.5, top: 234 },
    },
  ],
  [
    'a popup that overflows the start of the viewport is moved inside',
    {
      pos: 'above',
      align: 'center',
      anchor: { left: 450, top: 20, width: 100, height: 40 },
      popup: { width: 200, height: 100 },
      pinned: true,
      expected: { left: 400, top: 0 },
    },
  ],
  [
    'a popup that overflows the end of the viewport is moved inside',
    {
      pos: 'below',
      align: 'center',
      anchor: { left: 450, top: 640, width: 100, height: 40 },
      popup: { width: 200, height: 100 },
      pinned: true,
      expected: { left: 400, top: 600 },
    },
  ],
];

describe('computeFallbackPosition', () => {
  it.each(scenarios)('%s', (_name, scenario) => {
    const { pos, align, anchor, popup, offset, rtl, fallbacks, pinned, matchWidth, cover, expected } = scenario;
    const isBlockMain = pos === 'above' || pos === 'below';

    const { left, top } = computeFallbackPosition([
      anchor,
      VIEWPORT,
      matchWidth ? anchor.width : popup.width,
      popup.height,
      !!rtl,
      { position: pos, align },
      (isBlockMain ? offset?.main : offset?.cross) ?? 0,
      (isBlockMain ? offset?.cross : offset?.main) ?? 0,
      undefined,
      fallbacks?.map(toPlacement),
      pinned,
      cover,
    ]);

    expect(left).toBeCloseTo(expected.left, 1);
    expect(top).toBeCloseTo(expected.top, 1);
  });

  it('returns the resolved placement', () => {
    const result = computeFallbackPosition([
      { left: 450, top: 60, width: 100, height: 40 },
      VIEWPORT,
      200,
      100,
      false,
      { position: 'above', align: 'center' },
      0,
      0,
    ]);

    expect(result).toMatchObject({ position: 'below', align: 'center' });
  });
});
