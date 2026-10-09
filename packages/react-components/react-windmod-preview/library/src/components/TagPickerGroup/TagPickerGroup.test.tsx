import * as React from 'react';
import { render } from '@testing-library/react';
import type { JSXElement } from '@fluentui/react-utilities';

import { isConformant } from '../../testing/isConformant';
import { Tag } from '../Tag';
import { TagPicker } from '../TagPicker';
import type { TagPickerProps } from '../TagPicker/TagPicker.types';
import { TagPickerControl } from '../TagPickerControl';
import { TagPickerInput } from '../TagPickerInput';
import { TagPickerList } from '../TagPickerList';
import { TagPickerGroup } from './TagPickerGroup';
import type { TagPickerGroupState } from './TagPickerGroup.types';
import { tagPickerGroupClassNames, useTagPickerGroupStyles } from './useTagPickerGroupStyles';

import tagStyles from '../Tag/Tag.module.css';
import styles from './TagPickerGroup.module.css';

/** The end-to-end derivation this cycle owns: picker scale in, tag scale out. */
const DERIVED = [
  ['medium', 'extra-small'],
  ['large', 'small'],
  ['extra-large', 'medium'],
] as const;

/** The group renders nothing while the picker has no selection, and a picker with one child
 *  treats that child as its popover — so conformance needs a selection and a second child, with
 *  the group itself in the trigger position so it stays the rendered root. */
const Selected: React.FC<{ children?: React.ReactNode }> = ({ children }) => (
  <TagPicker selectedOptions={['cat']}>
    {children as JSXElement}
    <TagPickerList />
  </TagPicker>
);

const renderGroup = (picker: Partial<TagPickerProps> = {}, values: string[] = ['cat']) => {
  const { container } = render(
    <TagPicker selectedOptions={values} {...(picker as TagPickerProps)}>
      <TagPickerControl>
        <TagPickerGroup aria-label="Selected">
          {values.map(value => (
            <Tag data-testid={`tag-${value}`} key={value} value={value}>
              {value}
            </Tag>
          ))}
        </TagPickerGroup>
        <TagPickerInput aria-label="Pick" />
      </TagPickerControl>
      <TagPickerList />
    </TagPicker>,
  );

  return {
    container,
    group: container.querySelector<HTMLElement>('.fui-tag-picker-group'),
    // Structural, never by class-name equality: the jest css-module proxy collapses every module's
    // `root` local to one string, and this cycle alone adds six of them.
    tags: Array.from(container.querySelectorAll<HTMLElement>('.fui-tag')),
  };
};

describe('TagPickerGroup', () => {
  isConformant({
    Component: TagPickerGroup,
    displayName: 'TagPickerGroup',
    renderOptions: { wrapper: Selected },
  });

  // T-1
  it('stamps the marker pair on the root', () => {
    const { group } = renderGroup();

    expect(group!.classList[0]).toBe('fui-tag-picker-group');
    expect(group).toHaveClass('group/fui-tag-picker-group');
    expect(group).toHaveClass(styles.root);
    expect(tagPickerGroupClassNames.root).toBe('fui-tag-picker-group group/fui-tag-picker-group');
  });

  // T-11 / M20 — an accessibility-tree row no pixel can see. The headless hook leaves the TagGroup
  // base default of `toolbar` standing; Griffel passes listbox.
  it('restores role="listbox" and keeps the native focusgroup', () => {
    const { group } = renderGroup();

    expect(group!.getAttribute('role')).toBe('listbox');
    expect(group!.getAttribute('focusgroup')).toBe('toolbar inline wrap');
  });

  it('lets a consumer override the restored role', () => {
    const { container } = render(
      <TagPicker selectedOptions={['cat']}>
        <TagPickerControl>
          <TagPickerGroup aria-label="Selected" role="group">
            <Tag value="cat">cat</Tag>
          </TagPickerGroup>
        </TagPickerControl>
        <TagPickerList />
      </TagPicker>,
    );

    expect(container.querySelector('.fui-tag-picker-group')!.getAttribute('role')).toBe('group');
  });

  // M3, and the correction the plan's own §1.4 needed: this element carries a SECOND data-size and
  // it is the PICKER scale, because the gap and padding steps it selects are picker-scale steps.
  it.each(DERIVED)('stamps the picker scale %s while its Tags resolve to %s', (pickerSize, tagSize) => {
    const { group, tags } = renderGroup({ size: pickerSize });

    expect(group!.getAttribute('data-size')).toBe(pickerSize);
    expect(tags[0].getAttribute('data-size')).toBe(tagSize);
  });

  // T-5, T-6 / M5, M8, M8b. The look reaches a windmod Tag only through windmod's own TagGroup
  // context, which only a windmod provider ever fills — composing the headless TagPickerGroup
  // component instead of its hook and renderer would nest a provider publishing the neutral
  // constants inside this one and pin every tag at `medium`.
  it('derives the tag scale rather than inheriting the headless neutral constants', () => {
    expect(renderGroup({ size: 'large' }).tags[0].getAttribute('data-size')).toBe('small');
    expect(renderGroup({ size: 'extra-large' }).tags[0].getAttribute('data-size')).toBe('medium');
    // The neutral constant is `medium`; only `extra-large` derives to it, so `large` is the cell
    // that separates a derivation from an inheritance.
    expect(renderGroup({ size: 'large' }).tags[0].getAttribute('data-size')).not.toBe('medium');
  });

  // T-5, the appearance half / M6. Only filled-darker maps to outline; everything else maps to
  // filled, which is the Tag's base look and carries no class of its own.
  it.each([
    ['outline', false],
    ['underline', false],
    ['filled-lighter', false],
    ['filled-darker', true],
  ] as const)('maps the %s picker appearance onto outline tags: %s', (appearance, outlined) => {
    const { tags } = renderGroup({ appearance });

    expect(tags[0].classList.contains(tagStyles.outline)).toBe(outlined);
  });

  // T-8 — the renderer returns null at zero selections, so band C's zero column is a control cell.
  it('renders nothing at zero selections and something from one up', () => {
    expect(renderGroup({}, []).group).toBeNull();
    expect(renderGroup({}, ['cat']).group).not.toBeNull();
    expect(renderGroup({}, ['cat', 'dog']).tags).toHaveLength(2);
  });

  it('does not mutate the state it is given', () => {
    const state = {
      appearance: 'outline',
      pickerSize: 'extra-large',
      root: { className: 'consumer' },
      size: 'medium',
    } as unknown as TagPickerGroupState;

    const styled = useTagPickerGroupStyles(state);

    expect(styled).not.toBe(state);
    expect(styled.root).not.toBe(state.root);
    expect(state.root.className).toBe('consumer');
    expect('data-size' in state.root).toBe(false);
    expect(styled.root).toHaveProperty('data-size', 'extra-large');
    expect(styled.root.className).toContain('consumer');
  });
});
