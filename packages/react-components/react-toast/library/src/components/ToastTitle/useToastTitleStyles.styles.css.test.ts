import { slot } from '@fluentui/react-utilities';
import type { ToastTitleState } from './ToastTitle.types';
import { toastTitleClassNames, useToastTitleStyles_unstable } from './useToastTitleStyles.styles.css';

jest.mock('./ToastTitle.module.css', () => ({
  root: 'css-root',
  media: 'css-media',
  action: 'css-action',
  inverted: 'css-inverted',
  success: 'css-success',
  error: 'css-error',
  warning: 'css-warning',
  info: 'css-info',
}));

const createState = (): ToastTitleState => ({
  components: { root: 'div', media: 'div', action: 'div' },
  root: slot.always({ className: 'caller-root' }, { elementType: 'div' }),
  backgroundAppearance: undefined,
  intent: undefined,
});

describe('useToastTitleStyles_unstable (CSS Modules)', () => {
  it('preserves the default styling and caller class last', () => {
    const state = createState();
    expect(useToastTitleStyles_unstable(state)).toBe(state);
    expect(state.root.className).toBe(`${toastTitleClassNames.root} css-root caller-root`);
    expect(state.media).toBeUndefined();
    expect(state.action).toBeUndefined();
  });

  it('applies inverted appearance to each rendered sibling slot', () => {
    const state = createState();
    state.backgroundAppearance = 'inverted';
    state.media = slot.optional({ className: 'caller-media' }, { elementType: 'div' });
    state.action = slot.optional({ className: 'caller-action' }, { elementType: 'div' });
    useToastTitleStyles_unstable(state);
    expect(state.root.className).toBe(`${toastTitleClassNames.root} css-root css-inverted caller-root`);
    expect(state.media?.className).toBe(`${toastTitleClassNames.media} css-media css-inverted caller-media`);
    expect(state.action?.className).toBe(`${toastTitleClassNames.action} css-action css-inverted caller-action`);
  });

  describe.each([undefined, 'inverted'] as const)('appearance %s', backgroundAppearance => {
    it.each(['success', 'error', 'warning', 'info'] as const)('styles %s intent only on media', intent => {
      const state = createState();
      state.intent = intent;
      state.backgroundAppearance = backgroundAppearance;
      state.media = slot.optional({ className: 'caller-media' }, { elementType: 'div' });
      state.action = slot.optional({ className: 'caller-action' }, { elementType: 'div' });
      useToastTitleStyles_unstable(state);
      expect(state.media?.className).toBe(
        `${toastTitleClassNames.media} css-media${
          backgroundAppearance ? ' css-inverted' : ''
        } css-${intent} caller-media`,
      );
      expect(state.root.className).not.toContain(`css-${intent}`);
      expect(state.action?.className).not.toContain(`css-${intent}`);
    });
  });
});
