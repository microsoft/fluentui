import { useCardPreviewStyles_unstable, cardPreviewClassNames } from './useCardPreviewStyles.styles.css';
import type { CardPreviewState } from './CardPreview.types';

jest.mock('./CardPreview.module.css', () => ({ __esModule: true, default: { root: 'root', logo: 'logo' } }));

describe('useCardPreviewStyles_unstable (CSS modules)', () => {
  it('applies static, module and caller classes with caller last', () => {
    const state = {
      root: { className: 'caller-root' },
      logo: { className: 'caller-logo' },
    } as unknown as CardPreviewState;

    useCardPreviewStyles_unstable(state);

    expect(state.root.className!.split(' ')).toEqual([cardPreviewClassNames.root, 'root', 'caller-root']);
    expect(state.logo!.className!.split(' ')).toEqual([cardPreviewClassNames.logo, 'logo', 'caller-logo']);
  });

  it('does not require a logo slot', () => {
    const state = { root: {} } as unknown as CardPreviewState;
    expect(() => useCardPreviewStyles_unstable(state)).not.toThrow();
  });
});
