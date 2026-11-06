import { renderHook } from '@testing-library/react-hooks';
import type { TreeItemLayoutState } from './TreeItemLayout.types';
import { useTreeItemLayoutStyles_unstable } from './useTreeItemLayoutStyles.styles.css';

let mockTreeContext = { size: 'medium', appearance: 'subtle' };
let mockItemContext = { itemType: 'leaf' };

jest.mock('./TreeItemLayout.module.css', () => ({
  root: 'css-root',
  leaf: 'css-leaf',
  branch: 'css-branch',
  medium: 'css-medium',
  small: 'css-small',
  subtle: 'css-subtle',
  'subtle-alpha': 'css-subtle-alpha',
  transparent: 'css-transparent',
  main: 'css-main',
  expandIcon: 'css-expandIcon',
  iconBefore: 'css-iconBefore',
  iconAfter: 'css-iconAfter',
  actions: 'css-actions',
  aside: 'css-aside',
  selector: 'css-selector',
}));

jest.mock('../../contexts/treeContext', () => ({
  // eslint-disable-next-line @typescript-eslint/naming-convention
  useTreeContext_unstable: jest.fn((selector: (value: { size: string; appearance: string }) => unknown) =>
    selector(mockTreeContext),
  ),
}));
jest.mock('../../contexts/treeItemContext', () => ({
  // eslint-disable-next-line @typescript-eslint/naming-convention
  useTreeItemContext_unstable: jest.fn((selector: (value: { itemType: string }) => unknown) =>
    selector(mockItemContext),
  ),
}));

describe('useTreeItemLayoutStyles_unstable (CSS Modules)', () => {
  it('preserves caller classes and returns the original state', () => {
    const state = { root: { className: 'caller' }, main: { className: 'main-caller' } } as TreeItemLayoutState;
    const { result } = renderHook(() => useTreeItemLayoutStyles_unstable(state));
    expect(result.current).toBe(state);
    expect(result.current.root.className).toContain('fui-TreeItemLayout');
    expect(result.current.root.className).toContain('css-root');
    expect(result.current.root.className?.endsWith('caller')).toBe(true);
  });
});

describe('TreeItemLayout state classes', () => {
  it.each(['small', 'medium'])('maps %s context state only on the owning root', size => {
    for (const appearance of ['subtle', 'subtle-alpha', 'transparent']) {
      for (const itemType of ['leaf', 'branch']) {
        mockTreeContext = { size, appearance };
        mockItemContext = { itemType };
        const state = {
          root: { className: 'caller' },
          main: { className: 'main-caller' },
          expandIcon: { className: 'expandIcon-caller' },
          iconBefore: { className: 'iconBefore-caller' },
          iconAfter: { className: 'iconAfter-caller' },
          actions: { className: 'actions-caller' },
          aside: { className: 'aside-caller' },
          selector: { className: 'selector-caller' },
        } as TreeItemLayoutState;
        renderHook(() => useTreeItemLayoutStyles_unstable(state));
        expect(state.root.className).toContain(`css-${size}`);
        expect(state.root.className).toContain(`css-${appearance}`);
        expect(state.root.className).toContain(`css-${itemType}`);
        for (const slot of ['main', 'expandIcon', 'iconBefore', 'iconAfter', 'actions', 'aside', 'selector'] as const) {
          expect(state[slot]?.className).not.toContain(`css-${size}`);
          expect(state[slot]?.className).not.toContain(`css-${appearance}`);
          expect(state[slot]?.className?.endsWith(`${slot}-caller`)).toBe(true);
        }
      }
    }
  });
});
