import type { InteractionTagSecondaryState } from './InteractionTagSecondary.types';
import {
  interactionTagSecondaryClassNames,
  useInteractionTagSecondaryStyles_unstable,
} from './useInteractionTagSecondaryStyles.styles.css';

jest.mock('./InteractionTagSecondary.module.css', () => ({
  brand: 'css-brand',
  circular: 'css-circular',
  disabled: 'css-disabled',
  'extra-small': 'css-extra-small',
  filled: 'css-filled',
  medium: 'css-medium',
  outline: 'css-outline',
  root: 'css-root',
  rounded: 'css-rounded',
  selected: 'css-selected',
  small: 'css-small',
}));

const createState = () =>
  ({
    components: { root: 'div' },
    size: 'medium',
    shape: 'rounded',
    appearance: 'filled',
    disabled: false,
    selected: false,
    root: { className: 'caller-root' },
  } as InteractionTagSecondaryState);

describe('useInteractionTagSecondaryStyles_unstable (CSS Modules)', () => {
  it('preserves state identity, stable slot names and caller classes last', () => {
    const state = createState();
    expect(useInteractionTagSecondaryStyles_unstable(state)).toBe(state);
    expect(state.root?.className?.split(' ').slice(-1)[0]).toBe('caller-root');
    expect(state.root?.className).toContain(interactionTagSecondaryClassNames.root);
  });
  it('places disabled state on its owner', () => {
    const state = createState();
    state.disabled = true;
    useInteractionTagSecondaryStyles_unstable(state);
    expect(state.root.className).toContain('css-disabled');
  });
  it('places selected state on its owner', () => {
    const state = createState();
    state.selected = true;
    useInteractionTagSecondaryStyles_unstable(state);
    expect(state.root.className).toContain('css-selected');
  });
  it('places size state on its owner', () => {
    const state = createState();
    state.size = 'small';
    useInteractionTagSecondaryStyles_unstable(state);
    expect(state.root.className).toContain('css-small');
  });
});
