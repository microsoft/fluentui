import { readFileSync } from 'fs';
import { join } from 'path';
import type { RatingItemState } from './RatingItem.types';
import { ratingItemClassNames, useRatingItemStyles_unstable } from './useRatingItemStyles.styles.css';

jest.mock('./RatingItem.module.css', () => ({
  brand: 'css-brand',
  'extra-large': 'css-extra-large',
  filled: 'css-filled',
  fullValueInput: 'css-fullValueInput',
  half: 'css-half',
  halfIcon: 'css-halfIcon',
  halfValueInput: 'css-halfValueInput',
  indicator: 'css-indicator',
  input: 'css-input',
  large: 'css-large',
  marigold: 'css-marigold',
  medium: 'css-medium',
  root: 'css-root',
  selectedIcon: 'css-selectedIcon',
  small: 'css-small',
  unselectedIcon: 'css-unselectedIcon',
}));

const createState = () =>
  ({
    components: {
      root: 'div',
      selectedIcon: 'div',
      unselectedIcon: 'div',
      halfValueInput: 'input',
      fullValueInput: 'input',
    },
    size: 'medium',
    appearance: 'filled',
    color: 'neutral',
    iconFillWidth: 1,
    root: { className: 'caller-root' },
    selectedIcon: { className: 'caller-selectedIcon' },
    unselectedIcon: { className: 'caller-unselectedIcon' },
    halfValueInput: { className: 'caller-halfValueInput' },
    fullValueInput: { className: 'caller-fullValueInput' },
  } as RatingItemState);

describe('useRatingItemStyles_unstable (CSS Modules)', () => {
  it('prevents both font icon implementations from shrinking in a half-filled indicator', () => {
    const css = readFileSync(join(__dirname, 'RatingItem.module.css'), 'utf8');
    const rule = css.slice(css.indexOf(':where(.halfIcon) > .selectedIcon')).split('}')[0];

    expect(rule).toContain("& > :is(:global(.fui-Icon-font), [data-fui-icon='font'])");
    expect(rule).toContain('flex: 0 0 auto;');
  });
  it('preserves the fixed font outline stroke in forced colors', () => {
    const css = readFileSync(join(__dirname, 'RatingItem.module.css'), 'utf8');
    const rule = css.slice(css.indexOf(':where(.filled) > .unselectedIcon')).split('}')[0];

    expect(rule).toContain('@media (forced-colors: active)');
    expect(rule).toContain("& > :is(:global(.fui-Icon-font), [data-fui-icon='font'])");
    expect(rule).toContain('-webkit-text-stroke-color: CanvasText;');
    expect(rule).toContain('-webkit-text-stroke-width: 1px;');
  });
  it('preserves state identity, stable slot names and caller classes last', () => {
    const state = createState();
    expect(useRatingItemStyles_unstable(state)).toBe(state);
    expect(state.root?.className?.split(' ').slice(-1)[0]).toBe('caller-root');
    expect(state.root?.className).toContain(ratingItemClassNames.root);
    expect(state.selectedIcon?.className?.split(' ').slice(-1)[0]).toBe('caller-selectedIcon');
    expect(state.selectedIcon?.className).toContain(ratingItemClassNames.selectedIcon);
    expect(state.unselectedIcon?.className?.split(' ').slice(-1)[0]).toBe('caller-unselectedIcon');
    expect(state.unselectedIcon?.className).toContain(ratingItemClassNames.unselectedIcon);
    expect(state.halfValueInput?.className?.split(' ').slice(-1)[0]).toBe('caller-halfValueInput');
    expect(state.halfValueInput?.className).toContain(ratingItemClassNames.halfValueInput);
    expect(state.fullValueInput?.className?.split(' ').slice(-1)[0]).toBe('caller-fullValueInput');
    expect(state.fullValueInput?.className).toContain(ratingItemClassNames.fullValueInput);
  });
  it('guards absent optional slots', () => {
    const state = createState();
    state.selectedIcon = undefined;
    state.unselectedIcon = undefined;
    state.halfValueInput = undefined;
    state.fullValueInput = undefined;
    useRatingItemStyles_unstable(state);
    expect(state.selectedIcon).toBeUndefined();
    expect(state.unselectedIcon).toBeUndefined();
    expect(state.halfValueInput).toBeUndefined();
    expect(state.fullValueInput).toBeUndefined();
  });
  it('places size state on its owner', () => {
    const state = createState();
    state.size = 'small';
    useRatingItemStyles_unstable(state);
    expect(state.root.className).toContain('css-small');
    expect(state.selectedIcon?.className?.split(' ')).not.toContain('css-small');
    expect(state.unselectedIcon?.className?.split(' ')).not.toContain('css-small');
    expect(state.halfValueInput?.className?.split(' ')).not.toContain('css-small');
    expect(state.fullValueInput?.className?.split(' ')).not.toContain('css-small');
  });
});
