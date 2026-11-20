import type { InteractionTagState } from './InteractionTag.types';
import { interactionTagClassNames, useInteractionTagStyles_unstable } from './useInteractionTagStyles.styles.css';

jest.mock('./InteractionTag.module.css', () => ({
  circular: 'css-circular',
  'extra-small': 'css-extra-small',
  medium: 'css-medium',
  root: 'css-root',
  rounded: 'css-rounded',
  small: 'css-small',
}));

const createState = () =>
  ({
    components: { root: 'div' },
    size: 'medium',
    shape: 'rounded',
    root: { className: 'caller-root' },
  } as InteractionTagState);

describe('useInteractionTagStyles_unstable (CSS Modules)', () => {
  it('preserves state identity, stable slot names and caller classes last', () => {
    const state = createState();
    expect(useInteractionTagStyles_unstable(state)).toBe(state);
    expect(state.root?.className?.split(' ').slice(-1)[0]).toBe('caller-root');
    expect(state.root?.className).toContain(interactionTagClassNames.root);
  });
  it('places size state on its owner', () => {
    const state = createState();
    state.size = 'small';
    useInteractionTagStyles_unstable(state);
    expect(state.root.className).toContain('css-small');
  });
});
