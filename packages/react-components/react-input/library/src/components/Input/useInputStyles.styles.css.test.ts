import { renderHook } from '@testing-library/react-hooks';
import { useInput_unstable } from './useInput';
import { useInputStyles_unstable as applyStyles } from './useInputStyles.styles.css';

jest.mock('./Input.module.css', () => ({
  contentAfter: 'css-contentAfter',
  contentBefore: 'css-contentBefore',
  disabled: 'css-disabled',
  filled: 'css-filled',
  'filled-darker': 'css-filled-darker',
  'filled-darker-shadow': 'css-filled-darker-shadow',
  'filled-lighter': 'css-filled-lighter',
  'filled-lighter-shadow': 'css-filled-lighter-shadow',
  input: 'css-input',
  invalid: 'css-invalid',
  large: 'css-large',
  medium: 'css-medium',
  outline: 'css-outline',
  root: 'css-root',
  small: 'css-small',
  underline: 'css-underline',
  withContentAfter: 'css-withContentAfter',
  withContentBefore: 'css-withContentBefore',
}));

describe('useInputStyles_unstable (CSS Modules)', () => {
  it('uses the default state without changing the state identity', () => {
    const { result } = renderHook(() => useInput_unstable({}, null));
    const state = result.current;

    expect(applyStyles(state)).toBe(state);
    expect(state.root.className).toBe('fui-Input css-root css-medium css-outline');
  });

  it('preserves caller classes last on every present slot', () => {
    const { result } = renderHook(() =>
      useInput_unstable(
        {
          className: 'caller-root',
          input: { className: 'caller-input' },
          contentBefore: { className: 'caller-contentBefore' },
          contentAfter: { className: 'caller-contentAfter' },
        },
        null,
      ),
    );
    const state = applyStyles(result.current);

    expect(state.root.className?.endsWith(' caller-root')).toBe(true);
    expect(state.input?.className?.endsWith(' caller-input')).toBe(true);
    expect(state.contentBefore?.className?.endsWith(' caller-contentBefore')).toBe(true);
    expect(state.contentAfter?.className?.endsWith(' caller-contentAfter')).toBe(true);
  });

  it('does not create absent optional slots', () => {
    const { result } = renderHook(() => useInput_unstable({ contentBefore: null, contentAfter: null }, null));
    const state = applyStyles(result.current);
    expect(state.contentBefore).toBeUndefined();
    expect(state.contentAfter).toBeUndefined();
  });

  it.each(['outline', 'underline', 'filled-darker', 'filled-lighter'] as const)(
    'maps %s appearance and content spacing states only on the root',
    appearance => {
      for (const size of ['small', 'medium', 'large'] as const) {
        for (const disabled of [false, true]) {
          const { result } = renderHook(() =>
            useInput_unstable(
              { appearance, size, disabled, 'aria-invalid': true, contentBefore: 'Before', contentAfter: 'After' },
              null,
            ),
          );
          const state = applyStyles(result.current);
          expect(state.root.className).toContain(`css-${size} css-${appearance}`);
          expect(state.root.className?.includes('css-filled ')).toBe(appearance.startsWith('filled'));
          expect(state.root.className?.includes('css-disabled')).toBe(disabled);
          expect(state.root.className).toContain('css-invalid css-withContentBefore css-withContentAfter');
          expect(state.input.className).toBe('fui-Input__input css-input');
          expect(state.contentBefore?.className).toBe('fui-Input__contentBefore css-contentBefore');
          expect(state.contentAfter?.className).toBe('fui-Input__contentAfter css-contentAfter');
        }
      }
    },
  );

  it.each([false, 'false', undefined] as const)('does not style aria-invalid=%s as invalid', invalid => {
    const { result } = renderHook(() => useInput_unstable({ 'aria-invalid': invalid }, null));
    expect(applyStyles(result.current).root.className).not.toContain('css-invalid');
  });

  it.each(['filled-darker-shadow', 'filled-lighter-shadow'] as const)(
    'preserves deprecated appearance %s',
    appearance => {
      const { result } = renderHook(() => useInput_unstable({}, null));
      const state = result.current;
      state.appearance = appearance;
      expect(applyStyles(state).root.className).toContain(`css-${appearance} css-filled`);
    },
  );
});
