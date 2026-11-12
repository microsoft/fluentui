import { readFileSync } from 'fs';
import { join } from 'path';
import { createArrowHeightStyles } from './createArrowStyles';

const css = readFileSync(join(__dirname, 'Arrow.module.css'), 'utf8');

describe('shared positioning arrow CSS contract', () => {
  it.each([
    ['top', 'bottom', '-45deg'],
    ['right', 'left', '45deg'],
    ['bottom', 'top', '135deg'],
    ['left', 'right', '225deg'],
  ])('preserves physical %s placement in either text direction', (placement, edge, angle) => {
    expect(css).toContain(`[data-popper-placement^='${placement}']`);
    expect(css).toContain(`${edge}: var(--fui-positioning-arrow-offset)`);
    expect(css).toContain(`--fui-positioning-arrow-angle: ${angle}`);
  });

  it('uses the existing arrow sizing variables and configurable border defaults', () => {
    expect(Object.keys(createArrowHeightStyles(6))).toEqual([
      '--fui-positioning-arrow-height',
      '--fui-positioning-arrow-offset',
    ]);
    expect(css).toContain('height: var(--fui-positioning-arrow-height)');
    expect(css).toContain('var(--fui-positioning-arrow-border-width, var(--strokeWidthThin))');
    expect(css).toContain('var(--fui-positioning-arrow-border-style, solid)');
    expect(css).toContain('var(--fui-positioning-arrow-border-color, var(--colorTransparentStroke))');
  });
});
