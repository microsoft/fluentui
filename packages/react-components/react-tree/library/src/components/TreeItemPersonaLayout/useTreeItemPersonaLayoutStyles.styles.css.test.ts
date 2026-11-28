import { renderHook } from '@testing-library/react-hooks';
import type { TreeItemPersonaLayoutState } from './TreeItemPersonaLayout.types';
import { useTreeItemPersonaLayoutStyles_unstable } from './useTreeItemPersonaLayoutStyles.styles.css';

let mockTreeContext = { size: 'medium', appearance: 'subtle' };
let mockItemContext = { itemType: 'leaf' };

jest.mock('./TreeItemPersonaLayout.module.css', () => ({
  root: 'css-root',
  leaf: 'css-leaf',
  branch: 'css-branch',
  medium: 'css-medium',
  small: 'css-small',
  subtle: 'css-subtle',
  'subtle-alpha': 'css-subtle-alpha',
  transparent: 'css-transparent',
  media: 'css-media',
  main: 'css-main',
  description: 'css-description',
  actions: 'css-actions',
  aside: 'css-aside',
  expandIcon: 'css-expandIcon',
  selector: 'css-selector',
  withDescription: 'css-withDescription',
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

describe('useTreeItemPersonaLayoutStyles_unstable (CSS Modules)', () => {
  it('preserves caller classes and returns the original state', () => {
    const state = {
      root: { className: 'caller' },
      media: { className: 'media-caller' },
      main: { className: 'main-caller' },
    } as TreeItemPersonaLayoutState;
    const { result } = renderHook(() => useTreeItemPersonaLayoutStyles_unstable(state));
    expect(result.current).toBe(state);
    expect(result.current.root.className).toContain('fui-TreeItemPersonaLayout');
    expect(result.current.root.className).toContain('css-root');
    expect(result.current.root.className?.endsWith('caller')).toBe(true);
  });
});

describe('TreeItemPersonaLayout state classes', () => {
  it.each(['small', 'medium'])('maps %s context state only on the owning root', size => {
    for (const appearance of ['subtle', 'subtle-alpha', 'transparent']) {
      for (const itemType of ['leaf', 'branch']) {
        mockTreeContext = { size, appearance };
        mockItemContext = { itemType };
        const state = {
          root: { className: 'caller' },
          media: { className: 'media-caller' },
          main: { className: 'main-caller' },
          description: { className: 'description-caller' },
          actions: { className: 'actions-caller' },
          aside: { className: 'aside-caller' },
          expandIcon: { className: 'expandIcon-caller' },
          selector: { className: 'selector-caller' },
        } as TreeItemPersonaLayoutState;
        renderHook(() => useTreeItemPersonaLayoutStyles_unstable(state));
        expect(state.root.className).toContain(`css-${size}`);
        expect(state.root.className).toContain(`css-${appearance}`);
        expect(state.root.className).toContain(`css-${itemType}`);
        for (const slot of ['media', 'main', 'description', 'actions', 'aside', 'expandIcon', 'selector'] as const) {
          expect(state[slot]?.className).not.toContain(`css-${size}`);
          expect(state[slot]?.className).not.toContain(`css-${appearance}`);
          expect(state[slot]?.className?.endsWith(`${slot}-caller`)).toBe(true);
        }
        expect(state.root.className).toContain('css-withDescription');
      }
    }
  });
});
