import { useListItemStyles_unstable } from './useListItemStyles.styles.css';
import type { ListItemState } from './ListItem.types';

jest.mock('./ListItem.module.css', () => ({
  root: 'root',
  clickable: 'clickable',
  selected: 'selected',
  contentWrapper: 'content-wrapper',
  contentWrapperWithoutMedia: 'without-media',
  truncate: 'truncate',
}));

const makeState = (overrides: Record<string, unknown> = {}) =>
  ({
    root: { className: 'caller-root' },
    header: { className: 'caller-header' },
    contentWrapper: { className: 'caller-content' },
    ...overrides,
  } as unknown as ListItemState);

describe('useListItemStyles_unstable (CSS Modules)', () => {
  it('applies base and without-media classes', () => {
    const state = makeState();
    useListItemStyles_unstable(state);

    expect(state.root.className).toBe('fui-ListItem root caller-root');
    expect(state.header?.className).toBe('caller-header');
    expect(state.contentWrapper?.className).toBe('content-wrapper without-media caller-content');
  });

  it('applies clickable, selected and truncate classes', () => {
    const state = makeState({
      selectable: true,
      selected: true,
      truncateHeader: true,
      truncateContent: true,
      contentMedia: {},
    });
    useListItemStyles_unstable(state);

    expect(state.root.className).toBe('fui-ListItem root clickable selected caller-root');
    expect(state.header?.className).toBe('truncate caller-header');
    expect(state.contentWrapper?.className).toBe('content-wrapper truncate caller-content');
  });
});
