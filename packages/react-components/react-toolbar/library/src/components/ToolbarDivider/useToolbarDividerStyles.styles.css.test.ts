import { useToolbarDividerStyles_unstable } from './useToolbarDividerStyles.styles.css';
import type { ToolbarDividerState } from './ToolbarDivider.types';

jest.mock('./ToolbarDivider.module.css', () => ({ root: 'css-root', horizontal: 'css-horizontal' }));
jest.mock('@fluentui/react-divider', () => ({
  ['useDividerStyles_unstable']: (state: { root: { className?: string } }) => {
    state.root.className = `divider-root ${state.root.className ?? ''}`;
    return state;
  },
}));

describe('useToolbarDividerStyles_unstable (CSS Modules)', () => {
  it('adds its styles after the public Divider hook while keeping the caller class last', () => {
    const state = { vertical: false, root: { className: 'caller-root' } } as ToolbarDividerState;
    expect(useToolbarDividerStyles_unstable(state)).toBe(state);
    expect(state.root.className).toBe('css-root css-horizontal divider-root caller-root');
  });

  it('preserves the default vertical divider styles', () => {
    const state = { vertical: true, root: {} } as ToolbarDividerState;
    useToolbarDividerStyles_unstable(state);
    expect(state.root.className).toBe('css-root divider-root ');
  });
});
