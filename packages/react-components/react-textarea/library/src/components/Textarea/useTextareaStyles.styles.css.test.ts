import { readFileSync } from 'fs';
import { join } from 'path';
import { renderHook } from '@testing-library/react';
import { useTextarea_unstable } from './useTextarea';
import type { TextareaProps } from './Textarea.types';
import { useTextareaStyles_unstable } from './useTextareaStyles.styles.css';

jest.mock('./Textarea.module.css', () => ({
  root: 'css-root',
  disabled: 'css-disabled',
  filled: 'css-filled',
  'filled-darker': 'css-filled-darker',
  'filled-lighter': 'css-filled-lighter',
  'filled-darker-shadow': 'css-filled-darker-shadow',
  'filled-lighter-shadow': 'css-filled-lighter-shadow',
  outline: 'css-outline',
  invalid: 'css-invalid',
  textarea: 'css-textarea',
  small: 'css-small',
  medium: 'css-medium',
  large: 'css-large',
  none: 'css-none',
  both: 'css-both',
  horizontal: 'css-horizontal',
  vertical: 'css-vertical',
}));

const renderStyles = (props: TextareaProps = {}) =>
  renderHook(() => useTextareaStyles_unstable(useTextarea_unstable(props, null))).result.current;

describe('useTextareaStyles_unstable (CSS Modules)', () => {
  it('preserves Griffel focus, hover, and active rule precedence', () => {
    const css = readFileSync(join(__dirname, 'Textarea.module.css'), 'utf8');
    const focus = css.indexOf('.outline:where(:not(.disabled)):focus-within {');
    const hover = css.indexOf('.outline:where(:not(.disabled)):hover {');
    const active = css.indexOf('.outline:where(:not(.disabled)):active {');

    expect(focus).toBeGreaterThanOrEqual(0);
    expect(hover).toBeGreaterThan(focus);
    expect(active).toBeGreaterThan(hover);
  });

  it('uses default size, appearance and resize', () => {
    const state = renderStyles();
    expect(state.root.className).toBe('fui-Textarea css-root css-medium css-outline css-none');
    expect(state.textarea.className).toBe('fui-Textarea__textarea css-textarea');
  });
  it.each(['outline', 'filled-darker', 'filled-lighter', 'filled-darker-shadow', 'filled-lighter-shadow'] as const)(
    'maps independent %s, size, resize, disabled and invalid state to root',
    appearance => {
      const state = renderStyles({ appearance, size: 'large', resize: 'both', disabled: true, 'aria-invalid': true });
      expect(state.root.className).toContain('css-' + appearance);
      expect(state.root.className).toContain('css-large');
      expect(state.root.className).toContain('css-both');
      expect(state.root.className).toContain('css-disabled css-invalid');
      expect(state.textarea.className).toBe('fui-Textarea__textarea css-textarea');
    },
  );
  it('preserves all caller class names last and returns the same state', () => {
    const { result } = renderHook(() => {
      const state = useTextarea_unstable(
        { className: 'caller-root', textarea: { className: 'caller-textarea' } },
        null,
      );
      expect(useTextareaStyles_unstable(state)).toBe(state);
      return state;
    });
    expect(result.current.root.className?.split(' ').pop()).toBe('caller-root');
    expect(result.current.textarea.className?.split(' ').pop()).toBe('caller-textarea');
  });
});
