import { useTagGroupStyles_unstable } from '@fluentui/react-tags';
import type { TagPickerGroupState } from './TagPickerGroup.types';
import { useTagPickerGroupStyles_unstable } from './useTagPickerGroupStyles.styles.css';

jest.mock('./TagPickerGroup.module.css', () => ({
  root: 'css-root',
  medium: 'css-medium',
  large: 'css-large',
  'extra-large': 'css-extra-large',
}));
jest.mock('@fluentui/react-tags', () => ({
  ['useTagGroupStyles_unstable']: jest.fn((state: TagPickerGroupState) => {
    state.root.className = `base-root ${state.root.className ?? ''}`.trim();
    return state;
  }),
}));

describe('useTagPickerGroupStyles_unstable (CSS Modules)', () => {
  it.each([
    ['extra-small', 'medium'],
    ['small', 'large'],
    ['medium', 'extra-large'],
  ] as const)('maps Tag size %s to picker size %s on the root', (size, pickerSize) => {
    const state = { root: { className: 'caller-root' }, size } as TagPickerGroupState;
    expect(useTagPickerGroupStyles_unstable(state)).toBe(state);
    expect(useTagGroupStyles_unstable).toHaveBeenLastCalledWith(state);
    expect(state.root.className).toBe(`fui-TagPickerGroup css-root css-${pickerSize} base-root caller-root`);
  });

  it('retains the size helper fallback without adding undefined caller classes', () => {
    const state = { root: {} } as TagPickerGroupState;
    useTagPickerGroupStyles_unstable(state);
    expect(state.root.className).toBe('fui-TagPickerGroup css-root css-medium base-root');
  });
});
