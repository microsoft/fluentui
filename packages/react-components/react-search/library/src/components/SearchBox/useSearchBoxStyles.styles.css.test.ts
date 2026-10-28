import { useSearchBoxStyles_unstable } from './useSearchBoxStyles.styles.css';
import type { SearchBoxState } from './SearchBox.types';

jest.mock('./SearchBox.module.css', () => ({
  root: 'css-root',
  small: 'css-small',
  medium: 'css-medium',
  large: 'css-large',
  input: 'css-input',
  unfocusedNoContentAfter: 'css-unfocused',
  dismiss: 'css-dismiss',
  disabled: 'css-disabled',
  contentAfter: 'css-content-after',
  rest: 'css-rest',
}));
jest.mock('@fluentui/react-input', () => ({
  ['useInputStyles_unstable']: (state: { root: { className?: string }; input: { className?: string } }) => {
    state.root.className = `input-root ${state.root.className ?? ''}`;
    state.input.className = `input-element ${state.input.className ?? ''}`;
    return state;
  },
}));

describe('useSearchBoxStyles_unstable (CSS Modules)', () => {
  it('applies size, focus, and slot classes while preserving caller classes last', () => {
    const state = {
      disabled: true,
      focused: false,
      size: 'small',
      root: { className: 'root-caller' },
      input: { className: 'input-caller' },
      dismiss: { className: 'dismiss-caller' },
      contentBefore: { className: 'before-caller' },
      contentAfter: { className: 'after-caller' },
    } as SearchBoxState;

    expect(useSearchBoxStyles_unstable(state)).toBe(state);
    expect(state.root.className).toBe('fui-SearchBox css-root css-small css-unfocused input-root root-caller');
    expect(state.input.className).toBe('fui-SearchBox__input css-input css-small input-element input-caller');
    expect(state.dismiss?.className).toBe('fui-SearchBox__dismiss css-dismiss css-small css-disabled dismiss-caller');
    expect(state.contentBefore?.className).toBe('fui-SearchBox__contentBefore before-caller');
    expect(state.contentAfter?.className).toBe('fui-SearchBox__contentAfter css-content-after css-rest after-caller');
  });

  it('handles focused slots without optional content or dismiss', () => {
    const state = { disabled: false, focused: true, size: 'large', root: {}, input: {} } as SearchBoxState;
    useSearchBoxStyles_unstable(state);
    expect(state.root.className).toBe('fui-SearchBox css-root css-large input-root ');
    expect(state.input.className).toBe('fui-SearchBox__input css-input input-element ');
    expect(state.dismiss).toBeUndefined();
    expect(state.contentAfter).toBeUndefined();
  });

  it('uses content-after styles on dismiss when no contentAfter slot exists', () => {
    const state = {
      disabled: false,
      focused: false,
      size: 'medium',
      root: {},
      input: {},
      dismiss: { className: 'dismiss-caller' },
    } as SearchBoxState;

    useSearchBoxStyles_unstable(state);

    expect(state.dismiss?.className).toBe(
      'fui-SearchBox__dismiss css-dismiss css-medium css-content-after dismiss-caller',
    );
  });
});
