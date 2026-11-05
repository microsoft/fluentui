import { expect, type Locator } from '@playwright/test';

export type IconRenderer = 'svg' | 'fonts';

export async function waitForIconFonts(root: Locator) {
  await root.evaluate(async canvas => {
    const targetDocument = canvas.ownerDocument;
    const targetWindow = targetDocument.defaultView;
    if (!targetWindow) {
      throw new Error('Icon assertions require a browser');
    }
    await targetDocument.fonts.ready;
    await Promise.all(
      Array.from(canvas.querySelectorAll<HTMLElement>('.fui-Icon-font')).map(async icon => {
        const style = targetWindow.getComputedStyle(icon);
        if (!icon.textContent) {
          throw new Error('Font icon has no glyph');
        }
        const faces = await targetDocument.fonts.load(`${style.fontSize} ${style.fontFamily}`, icon.textContent);
        if (!faces.some(face => face.status === 'loaded')) {
          throw new Error(`No loaded icon font for ${style.fontFamily}`);
        }
      }),
    );
  });
}

export async function assertFixedIconSizes(root: Locator, renderer: IconRenderer) {
  await expect
    .poll(() =>
      root.evaluate((canvas, variant) => {
        const targetWindow = canvas.ownerDocument.defaultView;
        if (!targetWindow) {
          throw new Error('Icon assertions require a browser');
        }
        const errors: string[] = [];
        const assertIcons = (selector: string, count: number, size: number) => {
          const icons = canvas.querySelectorAll(`${selector} svg, ${selector} .fui-Icon-font`);
          if (icons.length !== count) {
            errors.push(`${selector}: expected ${count} icons, found ${icons.length}`);
          }
          for (const icon of Array.from(icons)) {
            const rect = icon.getBoundingClientRect();
            if (icon.localName !== (variant === 'fonts' ? 'i' : 'svg')) {
              errors.push(`${selector}: wrong icon renderer: ${icon.localName}`);
            }
            if (Math.abs(rect.width - size) > 0.1 || Math.abs(rect.height - size) > 0.1) {
              errors.push(`${selector}: expected ${size}px, found ${rect.width}x${rect.height}`);
            }
          }
        };
        ['small', 'medium', 'large'].forEach((size, index) => {
          const row = `[data-testid="input-${size}"]`;
          assertIcons(`${row} .fui-Input:not(.fui-SearchBox)`, 2, [16, 20, 24][index]);
          assertIcons(`${row} .fui-SearchBox`, 2, [16, 20, 24][index]);
        });
        ['tiny', 'extra-small', 'small', 'medium', 'large', 'extra-large'].forEach((size, index) => {
          assertIcons(`[data-testid="presence-${size}"]`, 1, [6, 10, 12, 16, 20, 28][index]);
        });
        ['small', 'medium', 'large', 'extra-large'].forEach((size, index) => {
          assertIcons(`[data-testid="rating-${size}"]`, 6, [12, 16, 20, 28][index]);
        });
        return errors;
      }, renderer),
    )
    .toEqual([]);
}

export async function assertIconSlots(root: Locator, renderer: IconRenderer) {
  await expect
    .poll(() =>
      root.evaluate((canvas, variant) => {
        const targetDocument = canvas.ownerDocument;
        const targetWindow = targetDocument.defaultView;
        if (!targetWindow) {
          throw new Error('Icon assertions require a browser');
        }
        const kind = canvas.querySelector<HTMLElement>('[data-slot-content]')?.dataset.slotContent;
        const cases = canvas.querySelectorAll<HTMLElement>('[data-slot-case]');
        const errors: string[] = [];
        if (!kind || !cases.length) {
          return ['Missing icon slot fixtures'];
        }
        for (const example of Array.from(cases)) {
          const {
            slotCase,
            slotSelector = '',
            slotCount,
            slotIconCount,
            slotIconSize,
            slotIconBlock,
          } = example.dataset;
          const slots = example.querySelectorAll<HTMLElement>(slotSelector);
          if (slots.length !== Number(slotCount)) {
            errors.push(`${slotCase}: expected ${slotCount} slots, found ${slots.length}`);
          }
          for (const element of Array.from(slots)) {
            const icons = element.querySelectorAll<HTMLElement | SVGElement>('svg, .fui-Icon-font');
            if (icons.length !== Number(slotIconCount)) {
              errors.push(`${slotCase}: expected ${slotIconCount} icons, found ${icons.length}`);
            }
            for (const icon of Array.from(icons)) {
              const expectedTag = variant === 'fonts' && kind !== 'svg' ? 'i' : 'svg';
              if (icon.localName !== expectedTag) {
                errors.push(`${slotCase}: expected ${expectedTag}, found ${icon.localName}`);
              }
              const style = targetWindow.getComputedStyle(icon);
              const rect = icon.getBoundingClientRect();
              const hiddenAdornment =
                slotCase?.endsWith('.contentAfter') &&
                !element.closest('.fui-SearchBox')?.contains(targetDocument.activeElement);
              if (
                slotIconSize &&
                !(kind === 'mixed' && slotCase?.startsWith('Rating')) &&
                !hiddenAdornment &&
                (Math.abs(rect.width - Number(slotIconSize)) > 0.1 ||
                  Math.abs(rect.height - Number(slotIconSize)) > 0.1)
              ) {
                errors.push(`${slotCase}: expected ${slotIconSize}px, found ${rect.width}x${rect.height}`);
              }
              if (slotIconSize && icon.localName === 'i' && parseFloat(style.fontSize) !== Number(slotIconSize)) {
                errors.push(`${slotCase}: expected ${slotIconSize}px glyph, found ${style.fontSize}`);
              }
              if (slotIconBlock === 'true' && style.display !== 'block') {
                errors.push(`${slotCase}: expected block icon, found ${style.display}`);
              }
              if (
                kind === 'mixed' &&
                !slotIconSize &&
                (slotCase?.startsWith('Input.') || slotCase?.startsWith('SearchBox.')) &&
                icon.parentElement &&
                style.fontSize !== targetWindow.getComputedStyle(icon.parentElement).fontSize
              ) {
                errors.push(`${slotCase}: nested icon does not inherit its font size`);
              }
            }
            for (const text of Array.from(element.querySelectorAll<HTMLElement>('[data-plain-text]'))) {
              const reference = text.parentElement?.querySelector('[data-text-reference]');
              if (!reference) {
                errors.push(`${slotCase}: missing text reference`);
                continue;
              }
              const actual = targetWindow.getComputedStyle(text);
              const expected = targetWindow.getComputedStyle(reference);
              for (const property of ['fontSize', 'display', 'flexShrink', 'webkitTextStrokeWidth'] as const) {
                if (actual[property] !== expected[property]) {
                  errors.push(`${slotCase}: italic text ${property}: ${actual[property]} vs ${expected[property]}`);
                }
              }
            }
          }
          if (slotCase?.startsWith('Rating')) {
            const items = example.querySelectorAll('.fui-RatingItem');
            const halfItem = items[items.length === 1 ? 0 : 2];
            const selected = halfItem?.querySelector('.fui-RatingItem__selectedIcon');
            if (
              !selected ||
              Math.abs(selected.getBoundingClientRect().width * 2 - halfItem.getBoundingClientRect().width) > 0.1
            ) {
              errors.push(`${slotCase}: missing half-width rating container`);
            } else {
              for (const icon of Array.from(selected.querySelectorAll(':scope > svg, :scope > .fui-Icon-font'))) {
                if (targetWindow.getComputedStyle(icon).flexShrink !== '0') {
                  errors.push(`${slotCase}: half-filled icon shrinks inside its clipped container`);
                }
              }
            }
          }
        }
        for (const example of Array.from(canvas.querySelectorAll<HTMLElement>('[data-presence-size]'))) {
          const rect = example.querySelector('svg, .fui-Icon-font')?.getBoundingClientRect();
          const pixels = Number(example.dataset.presenceSize);
          if (!rect || Math.abs(rect.width - pixels) > 0.1 || Math.abs(rect.height - pixels) > 0.1) {
            errors.push(`Presence icon: expected ${pixels}px, found ${rect?.width}x${rect?.height}`);
          }
        }
        if (targetWindow.matchMedia('(forced-colors: active)').matches) {
          const outlines = canvas.querySelectorAll(
            '.fui-RatingDisplay .fui-RatingItem__unselectedIcon > .fui-Icon-font',
          );
          if (variant === 'fonts' && kind === 'icon' && !outlines.length) {
            errors.push('Missing forced-color font rating outlines');
          }
          for (const icon of Array.from(outlines)) {
            if (targetWindow.getComputedStyle(icon).webkitTextStrokeWidth !== '1px') {
              errors.push('Font rating outlines require a 1px forced-color text stroke');
            }
          }
        }
        return errors;
      }, renderer),
    )
    .toEqual([]);
}
