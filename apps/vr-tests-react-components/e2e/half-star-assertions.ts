import { expect, type Locator } from '@playwright/test';
import type { IconRenderer } from './icon-assertions';

export async function assertHalfStarClipping(root: Locator, renderer: IconRenderer) {
  const cases = root.locator('[data-half-star-case]');
  await expect(cases).toHaveCount(16);
  await root.page().mouse.move(0, 0);
  for (const example of await cases.all()) {
    const name = await example.getAttribute('data-half-star-case');
    const direction = await example.getAttribute('data-half-star-direction');
    const size = Number(await example.getAttribute('data-half-star-size'));
    expect(['ltr', 'rtl']).toContain(direction);
    const images: Record<string, string> = {};
    for (const reference of ['empty', 'half', 'full']) {
      const item = example.locator(`[data-half-star-reference="${reference}"] .fui-RatingItem`).first();
      await expect(item).toHaveCSS('width', `${size}px`);
      await expect(item).toHaveCSS('height', `${size}px`);
      if (reference === 'half') {
        const clip = await item.locator('.fui-RatingItem__selectedIcon').boundingBox();
        expect(clip?.width, `${name}: clipping container must remain half-width`).toBeCloseTo(size / 2, 1);
      }
      const icons = item.locator('svg, .fui-Icon-font');
      await expect(icons).toHaveCount(reference === 'half' ? 2 : 1);
      for (const icon of await icons.all()) {
        expect(await icon.evaluate(element => element.localName)).toBe(renderer === 'fonts' ? 'i' : 'svg');
      }
      images[reference] = (await item.screenshot({ animations: 'disabled', scale: 'css' })).toString('base64');
    }
    const comparison = await root.evaluate(
      async (canvas, { screenshots, dir }) => {
        const targetDocument = canvas.ownerDocument;
        const decode = async (png: string) => {
          const image = targetDocument.createElement('img');
          image.src = `data:image/png;base64,${png}`;
          await image.decode();
          const surface = targetDocument.createElement('canvas');
          surface.width = image.naturalWidth;
          surface.height = image.naturalHeight;
          const context = surface.getContext('2d');
          if (!context) {
            throw new Error('Pixel comparisons require a 2D canvas');
          }
          context.drawImage(image, 0, 0);
          return context.getImageData(0, 0, surface.width, surface.height);
        };
        const [empty, half, full] = await Promise.all([
          decode(screenshots.empty),
          decode(screenshots.half),
          decode(screenshots.full),
        ]);
        if (
          empty.width !== half.width ||
          empty.height !== half.height ||
          full.width !== half.width ||
          full.height !== half.height
        ) {
          throw new Error('Half-star reference screenshots have different dimensions');
        }
        const halves = [];
        for (const side of ['left', 'right']) {
          const selected = side === (dir === 'rtl' ? 'right' : 'left');
          const expected = selected ? full : empty;
          const opposite = selected ? empty : full;
          let error = 0;
          let oppositeError = 0;
          let referenceDifference = 0;
          for (let y = 0; y < half.height; y++) {
            for (
              let x = side === 'left' ? 0 : half.width / 2;
              x < (side === 'left' ? half.width / 2 : half.width);
              x++
            ) {
              const offset = (y * half.width + x) * 4;
              for (let channel = 0; channel < 3; channel++) {
                error += Math.abs(half.data[offset + channel] - expected.data[offset + channel]);
                oppositeError += Math.abs(half.data[offset + channel] - opposite.data[offset + channel]);
                referenceDifference += Math.abs(full.data[offset + channel] - empty.data[offset + channel]);
              }
            }
          }
          halves.push({ side, selected, error, oppositeError, referenceDifference });
        }
        return { width: half.width, height: half.height, halves };
      },
      { screenshots: images, dir: direction },
    );
    expect(comparison.width, `${name}: screenshot width`).toBe(size);
    expect(comparison.height, `${name}: screenshot height`).toBe(size);
    for (const half of comparison.halves) {
      const label = `${name}: ${half.side} must match the ${half.selected ? 'filled' : 'empty'} reference`;
      expect(half.referenceDifference, `${name}: reference stars must be visibly different`).toBeGreaterThan(0);
      // Allow antialiasing differences while requiring a close match to the correctly painted half.
      expect(half.error, label).toBeLessThan(half.referenceDifference * 0.2);
      expect(half.error, label).toBeLessThan(half.oppositeError);
    }
  }
}
