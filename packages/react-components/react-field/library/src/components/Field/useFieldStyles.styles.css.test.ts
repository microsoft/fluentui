import { renderHook } from '@testing-library/react-hooks';
import { useField_unstable } from './useField';
import { useFieldStyles_unstable as applyStyles } from './useFieldStyles.styles.css';

jest.mock('./Field.module.css', () => ({
  error: 'css-error',
  hint: 'css-hint',
  horizontal: 'css-horizontal',
  label: 'css-label',
  large: 'css-large',
  root: 'css-root',
  small: 'css-small',
  success: 'css-success',
  validationMessage: 'css-validationMessage',
  validationMessageIcon: 'css-validationMessageIcon',
  vertical: 'css-vertical',
  warning: 'css-warning',
  withIcon: 'css-withIcon',
  withLabel: 'css-withLabel',
}));

describe('useFieldStyles_unstable (CSS Modules)', () => {
  it('uses the default state without changing the state identity', () => {
    const { result } = renderHook(() => useField_unstable({}, null));
    const state = result.current;

    expect(applyStyles(state)).toBe(state);
    expect(state.root.className).toBe('fui-Field css-root css-vertical');
  });

  it('preserves caller classes last on every present slot', () => {
    const { result } = renderHook(() =>
      useField_unstable(
        {
          className: 'caller-root',
          label: { className: 'caller-label' },
          validationMessage: { className: 'caller-validationMessage' },
          validationMessageIcon: { className: 'caller-validationMessageIcon' },
          hint: { className: 'caller-hint' },
        },
        null,
      ),
    );
    const state = applyStyles(result.current);

    expect(state.root.className?.endsWith(' caller-root')).toBe(true);
    expect(state.label?.className?.endsWith(' caller-label')).toBe(true);
    expect(state.validationMessage?.className?.endsWith(' caller-validationMessage')).toBe(true);
    expect(state.validationMessageIcon?.className?.endsWith(' caller-validationMessageIcon')).toBe(true);
    expect(state.hint?.className?.endsWith(' caller-hint')).toBe(true);
  });

  it('does not create absent optional slots', () => {
    const { result } = renderHook(() =>
      useField_unstable({ label: null, validationMessage: null, validationMessageIcon: null, hint: null }, null),
    );
    const state = applyStyles(result.current);
    expect(state.label).toBeUndefined();
    expect(state.validationMessage).toBeUndefined();
    expect(state.validationMessageIcon).toBeUndefined();
    expect(state.hint).toBeUndefined();
  });

  it.each(['none', 'error', 'warning', 'success'] as const)(
    'owns validation state %s on the root, not on the message or icon',
    validationState => {
      for (const size of ['small', 'medium', 'large'] as const) {
        for (const orientation of ['horizontal', 'vertical'] as const) {
          const { result } = renderHook(() =>
            useField_unstable(
              {
                size,
                orientation,
                validationState,
                label: 'Label',
                validationMessage: 'Message',
                validationMessageIcon: 'Icon',
                hint: 'Hint',
              },
              null,
            ),
          );
          const state = applyStyles(result.current);
          expect(state.root.className).toContain(`css-${orientation}`);
          if (size !== 'medium') {
            expect(state.root.className).toContain(`css-${size}`);
          }
          if (validationState !== 'none') {
            expect(state.root.className).toContain(`css-${validationState}`);
          }
          expect(state.root.className).toContain('css-withLabel css-withIcon');
          expect(state.label?.className).toBe('fui-Field__label css-label');
          expect(state.validationMessage?.className).toBe('fui-Field__validationMessage css-validationMessage');
          expect(state.validationMessageIcon?.className).toBe(
            'fui-Field__validationMessageIcon css-validationMessageIcon',
          );
          expect(state.hint?.className).toBe('fui-Field__hint css-hint');
        }
      }
    },
  );
});
