import * as React from 'react';
import { render } from '@testing-library/react';
import { SLOT_ELEMENT_TYPE_SYMBOL } from '@fluentui/react-utilities';
import { useTagPickerList } from '@fluentui/react-headless-components-preview/tag-picker';

import { isConformant } from '../../testing/isConformant';
import { Listbox } from '../Listbox';
import { TagPicker } from '../TagPicker';
import type { TagPickerProps } from '../TagPicker/TagPicker.types';
import { TagPickerControl } from '../TagPickerControl';
import { TagPickerInput } from '../TagPickerInput';
import { TagPickerOption } from '../TagPickerOption';
import { TagPickerList } from './TagPickerList';
import type { TagPickerListProps, TagPickerListState } from './TagPickerList.types';
import { tagPickerListClassNames, useTagPickerListStyles } from './useTagPickerListStyles';

import styles from './TagPickerList.module.css';

jest.mock('@fluentui/react-headless-components-preview/tag-picker', () => {
  const actual = jest.requireActual('@fluentui/react-headless-components-preview/tag-picker');

  return { ...actual, useTagPickerList: jest.fn(actual.useTagPickerList) };
});

const useTagPickerListSpy = useTagPickerList as unknown as jest.Mock;

const renderList = (picker: Partial<TagPickerProps> = { open: true }, list: TagPickerListProps = {}) => {
  const { container } = render(
    <TagPicker {...(picker as TagPickerProps)}>
      <TagPickerControl>
        <TagPickerInput aria-label="Pick" />
      </TagPickerControl>
      <TagPickerList {...list}>
        <TagPickerOption value="cat">Cat</TagPickerOption>
        <TagPickerOption value="dog">Dog</TagPickerOption>
      </TagPickerList>
    </TagPicker>,
  );

  // `fui-listbox` is windmod Listbox's own marker pair and nothing else emits it, which is the only
  // structural discriminator jest has — the css-module proxy makes every module's `root` one string.
  return { container, listbox: container.querySelector<HTMLElement>('.fui-listbox') };
};

describe('TagPickerList', () => {
  beforeEach(() => useTagPickerListSpy.mockClear());

  isConformant({
    Component: TagPickerList,
    displayName: 'TagPickerList',
  });

  // T-1. The surface element IS the windmod Listbox, which prepends its own marker pair as it does
  // under Combobox and Dropdown, so classList[0] is Listbox's — still slash-free, which is the
  // constraint the ordering exists for.
  it('stamps the marker pair on the root', () => {
    const { listbox } = renderList();

    expect(listbox!.classList[0]).toBe('fui-listbox');
    expect(listbox).toHaveClass('fui-tag-picker-list');
    expect(listbox).toHaveClass('group/fui-tag-picker-list');
    expect(listbox).toHaveClass(styles.root);
    expect(tagPickerListClassNames.root).toBe('fui-tag-picker-list group/fui-tag-picker-list');
  });

  // The element-type re-stamp lands on the slot as well as the components map: the map alone is
  // read only by the development-mode renderer, so a components-only swap is inert in production.
  it('renders windmod Listbox as the surface, with the resolved slot intact', () => {
    const warn = jest.spyOn(console, 'warn').mockImplementation(() => undefined);
    const { listbox } = renderList();

    expect(listbox).not.toBeNull();
    expect(listbox).toHaveClass('fui-listbox');
    expect(listbox!.getAttribute('role')).toBe('listbox');
    expect(warn).not.toHaveBeenCalled();
    warn.mockRestore();

    const base = useTagPickerListSpy.mock.results.at(-1)!.value as TagPickerListState;

    // eslint-disable-next-line @typescript-eslint/no-deprecated -- the components map is what the swap edits
    expect(base.components.root).not.toBe(Listbox);

    // Everything useListboxSlot merged in — the id, the merged ref and every handler — has to
    // survive the element-type re-stamp; only the className may change.
    const slot = base.root as unknown as Record<string, unknown>;

    expect(slot.id).toBe(listbox!.id);
    expect(slot.ref).toBeDefined();
  });

  it('re-stamps the element type on the slot itself', () => {
    const { container } = renderList();
    const styled = useTagPickerListStyles({
      ...(useTagPickerListSpy.mock.results.at(-1)!.value as TagPickerListState),
    });

    expect((styled.root as unknown as Record<symbol, unknown>)[SLOT_ELEMENT_TYPE_SYMBOL]).toBeDefined();
    expect(container.querySelector('.fui-listbox')).not.toBeNull();
  });

  // The promotion attribute lives on the Listbox's own root, so a consumer's override travels
  // through the list's root shorthand — which is what lets a VR scene hold six open surfaces at
  // once, `popover: 'auto'` being mutually exclusive.
  it('lets a consumer override the surface popover mode', () => {
    expect(renderList().listbox!.getAttribute('popover')).toBe('auto');
    expect(renderList({ open: true }, { popover: 'manual' }).listbox!.getAttribute('popover')).toBe('manual');
  });

  // M19, and the check that the module's "no collapsed class" verdict is sound: the surface is
  // absent from the tree while closed rather than present and display:none.
  it('is absent from the tree while the picker is closed', () => {
    expect(renderList({}).listbox).toBeNull();
    expect(renderList({ open: true }).listbox).not.toBeNull();
  });

  it('does not mutate the state it is given', () => {
    const state = { open: true, root: { className: 'consumer' } } as unknown as TagPickerListState;
    const styled = useTagPickerListStyles(state);

    expect(styled).not.toBe(state);
    expect(styled.root).not.toBe(state.root);
    expect(state.root.className).toBe('consumer');
    expect(styled.root.className).toContain('consumer');
  });
});
