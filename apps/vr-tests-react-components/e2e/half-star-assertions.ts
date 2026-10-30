import { expect, type Locator } from '@playwright/test';
import type { IconRenderer } from './icon-assertions';

type StarReference = 'empty' | 'half' | 'full';
type StarScreenshots = Record<StarReference, string>;
type TextDirection = 'ltr' | 'rtl';

async function captureStar(example: Locator, reference: StarReference, size: number, renderer: IconRenderer) {
  const item = example.locator(`[data-half-star-reference="${reference}"] .fui-RatingItem`).first();
  await expect(item).toHaveCSS('width', `${size}px`);
  await expect(item).toHaveCSS('height', `${size}px`);
  if (reference === 'half') {
    const clip = await item.locator('.fui-RatingItem__selectedIcon').boundingBox();
    expect(clip?.width, 'Clipping container must remain half-width').toBeCloseTo(size / 2, 1);
  }
  const icons = item.locator('svg, .fui-Icon-font');
  await expect(icons).toHaveCount(reference === 'half' ? 2 : 1);
  for (const icon of await icons.all()) {
    expect(await icon.evaluate(element => element.localName)).toBe(renderer === 'fonts' ? 'i' : 'svg');
  }
  return (await item.screenshot({ animations: 'disabled', scale: 'css' })).toString('base64');
}

async function captureReferenceStars(example: Locator, size: number, renderer: IconRenderer): Promise<StarScreenshots> {
  const empty = await captureStar(example, 'empty', size, renderer);
  const half = await captureStar(example, 'half', size, renderer);
  const full = await captureStar(example, 'full', size, renderer);
  return { empty, half, full };
}

// Playwright serializes this function into the browser; its pixel helpers must be self-contained.
async function compareStarPixels(
  canvas: HTMLElement | SVGElement,
  { screenshots, direction }: { screenshots: StarScreenshots; direction: TextDirection },
) {
  async function decodeScreenshot(png: string) {
    const targetDocument = canvas.ownerDocument;
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
  }

  function assertMatchingDimensions(images: ImageData[]) {
    const [reference] = images;
    if (images.some(image => image.width !== reference.width || image.height !== reference.height)) {
      throw new Error('Half-star reference screenshots have different dimensions');
    }
  }

  function pixelDifference(actual: ImageData, expected: ImageData, side: 'left' | 'right') {
    const start = side === 'left' ? 0 : actual.width / 2;
    const end = side === 'left' ? actual.width / 2 : actual.width;
    let difference = 0;
    for (let y = 0; y < actual.height; y++) {
      for (let x = start; x < end; x++) {
        const offset = (y * actual.width + x) * 4;
        for (let channel = 0; channel < 3; channel++) {
          difference += Math.abs(actual.data[offset + channel] - expected.data[offset + channel]);
        }
      }
    }
    return difference;
  }

  const [empty, half, full] = await Promise.all([
    decodeScreenshot(screenshots.empty),
    decodeScreenshot(screenshots.half),
    decodeScreenshot(screenshots.full),
  ]);
  assertMatchingDimensions([empty, half, full]);
  const halves = (['left', 'right'] as const).map(side => {
    const selected = side === (direction === 'rtl' ? 'right' : 'left');
    return {
      side,
      selected,
      error: pixelDifference(half, selected ? full : empty, side),
      oppositeError: pixelDifference(half, selected ? empty : full, side),
      referenceDifference: pixelDifference(full, empty, side),
    };
  });
  return { width: half.width, height: half.height, halves };
}

function assertPaintedHalves(
  name: string | null,
  size: number,
  comparison: Awaited<ReturnType<typeof compareStarPixels>>,
) {
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

async function assertHalfStarExample(example: Locator, renderer: IconRenderer) {
  const name = await example.getAttribute('data-half-star-case');
  const direction = await example.getAttribute('data-half-star-direction');
  if (direction !== 'ltr' && direction !== 'rtl') {
    throw new Error(`${name}: expected an LTR or RTL reference fixture`);
  }
  const size = Number(await example.getAttribute('data-half-star-size'));
  const screenshots = await captureReferenceStars(example, size, renderer);
  const input = { screenshots, direction } satisfies { screenshots: StarScreenshots; direction: TextDirection };
  const comparison = await example.evaluate(compareStarPixels, input);
  assertPaintedHalves(name, size, comparison);
}

export async function assertHalfStarClipping(root: Locator, renderer: IconRenderer) {
  const cases = root.locator('[data-half-star-case]');
  await expect(cases).toHaveCount(16);
  await root.page().mouse.move(0, 0);
  for (const example of await cases.all()) {
    await assertHalfStarExample(example, renderer);
  }
}
