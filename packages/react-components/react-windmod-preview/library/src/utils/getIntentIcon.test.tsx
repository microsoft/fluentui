import * as React from 'react';
import { render } from '@testing-library/react';
import { CheckmarkCircleFilled } from '@fluentui/react-icons/headless/svg/checkmark-circle';
import { DiamondDismissFilled } from '@fluentui/react-icons/headless/svg/diamond-dismiss';
import { InfoFilled } from '@fluentui/react-icons/headless/svg/info';
import { WarningFilled } from '@fluentui/react-icons/headless/svg/warning';

import type { GlyphIntent } from './getIntentIcon';
import { getIntentIcon } from './getIntentIcon';

const pathOf = (element: React.ReactElement | undefined) =>
  element ? (render(element).container.querySelector('path')?.getAttribute('d') ?? null) : null;

describe('getIntentIcon', () => {
  it('returns the Fluent glyph that belongs to each intent', () => {
    const glyphs: Record<GlyphIntent, React.ComponentType> = {
      info: InfoFilled,
      success: CheckmarkCircleFilled,
      warning: WarningFilled,
      error: DiamondDismissFilled,
    };

    const paths = (Object.keys(glyphs) as GlyphIntent[]).map(intent => {
      const Glyph = glyphs[intent];

      // Pinning each intent to its own glyph, not merely to a distinct one: swapping two entries
      // in the lookup would still leave four distinct paths.
      expect(pathOf(getIntentIcon(intent))).toBe(pathOf(<Glyph />));

      return pathOf(getIntentIcon(intent));
    });

    expect(new Set(paths).size).toBe(4);
  });

  it('returns nothing for an absent intent', () => {
    // ToastTitle's intent is optional outside a Toaster, where Griffel paints no glyph either.
    expect(getIntentIcon(undefined)).toBeUndefined();
  });

  it('hands back an unadorned element — colour and glyph size belong to the consuming slot', () => {
    const { container } = render(getIntentIcon('warning')!);
    const svg = container.querySelector('svg')!;

    expect(svg.getAttribute('style')).toBeNull();
    expect(svg.getAttribute('fill')).toBe('currentColor');
    expect(svg.getAttribute('width')).toBe('1em');
  });
});
