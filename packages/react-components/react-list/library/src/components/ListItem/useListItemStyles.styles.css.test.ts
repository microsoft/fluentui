import type { ListItemState } from './ListItem.types';
import { listItemClassNames, useListItemStyles_unstable } from './useListItemStyles.styles.css';

jest.mock('./ListItem.module.css', () => ({
  checkmark: 'css-checkmark',
  disabled: 'css-disabled',
  'fui-Checkbox__indicator': 'css-fui-Checkbox__indicator',
  interactive: 'css-interactive',
  root: 'css-root',
}));

const createState = () =>
  ({
    components: { root: 'div', checkmark: 'div' },
    disabled: false,
    selectable: false,
    navigable: false,
    root: { className: 'caller-root' },
    checkmark: { className: 'caller-checkmark' },
  } as ListItemState);

describe('useListItemStyles_unstable (CSS Modules)', () => {
  it('preserves state identity, stable slot names and caller classes last', () => {
    const state = createState();
    expect(useListItemStyles_unstable(state)).toBe(state);
    expect(state.root?.className?.split(' ').slice(-1)[0]).toBe('caller-root');
    expect(state.root?.className).toContain(listItemClassNames.root);
    expect(state.checkmark?.className?.split(' ').slice(-1)[0]).toBe('caller-checkmark');
    expect(state.checkmark?.className).toContain(listItemClassNames.checkmark);
  });
  it('guards absent optional slots', () => {
    const state = createState();
    state.checkmark = undefined;
    useListItemStyles_unstable(state);
    expect(state.checkmark).toBeUndefined();
  });
  it('places disabled state on its owner', () => {
    const state = createState();
    state.disabled = true;
    useListItemStyles_unstable(state);
    expect(state.root.className).toContain('css-disabled');
    expect(state.checkmark?.className?.split(' ')).not.toContain('css-disabled');
  });
});
