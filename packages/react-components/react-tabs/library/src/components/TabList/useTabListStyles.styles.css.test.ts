import type { TabListState } from './TabList.types';
import { tabListClassNames, useTabListStyles_unstable } from './useTabListStyles.styles.css';

jest.mock('./TabList.module.css', () => ({
  root: 'css-root',
  horizontal: 'css-horizontal',
  vertical: 'css-vertical',
  small: 'css-small',
  'subtle-circular': 'css-subtle-circular',
  'filled-circular': 'css-filled-circular',
}));

const createState = (overrides: Partial<TabListState>): TabListState =>
  ({
    appearance: 'transparent',
    size: 'medium',
    vertical: false,
    root: { className: undefined },
    ...overrides,
  } as unknown as TabListState);

describe('useTabListStyles_unstable (CSS Modules)', () => {
  it('applies horizontal root classes and preserves caller classes last', () => {
    const state = createState({ root: { className: 'caller' } } as Partial<TabListState>);

    expect(useTabListStyles_unstable(state)).toBe(state);
    expect(state.root.className).toBe(`${tabListClassNames.root} css-root css-horizontal caller`);
  });

  it('applies vertical, appearance, and size classes', () => {
    const state = createState({
      vertical: true,
      appearance: 'filled-circular',
      size: 'small',
      root: { className: 'caller' },
    } as Partial<TabListState>);

    useTabListStyles_unstable(state);

    expect(state.root.className).toBe(
      `${tabListClassNames.root} css-root css-vertical css-filled-circular css-small caller`,
    );
  });
});
