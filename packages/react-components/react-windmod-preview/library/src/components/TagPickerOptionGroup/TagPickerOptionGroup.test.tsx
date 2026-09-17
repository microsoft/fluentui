import * as React from 'react';
import { render } from '@testing-library/react';

import { isConformant } from '../../testing/isConformant';
import { TagPicker } from '../TagPicker';
import { TagPickerControl } from '../TagPickerControl';
import { TagPickerInput } from '../TagPickerInput';
import { TagPickerList } from '../TagPickerList';
import { TagPickerOption } from '../TagPickerOption';
import { TagPickerOptionGroup } from './TagPickerOptionGroup';
import type { TagPickerOptionGroupProps, TagPickerOptionGroupState } from './TagPickerOptionGroup.types';
import { tagPickerOptionGroupClassNames, useTagPickerOptionGroupStyles } from './useTagPickerOptionGroupStyles';

import optionGroupStyles from '../OptionGroup/OptionGroup.module.css';

const renderGroup = (props: TagPickerOptionGroupProps = { label: 'Pets' }) => {
  const { container } = render(
    <TagPicker open>
      <TagPickerControl>
        <TagPickerInput aria-label="Pick" />
      </TagPickerControl>
      <TagPickerList>
        <TagPickerOptionGroup {...props}>
          <TagPickerOption value="cat">Cat</TagPickerOption>
        </TagPickerOptionGroup>
      </TagPickerList>
    </TagPicker>,
  );

  return { group: container.querySelector<HTMLElement>('.fui-tag-picker-option-group')! };
};

describe('TagPickerOptionGroup', () => {
  isConformant({
    Component: TagPickerOptionGroup,
    displayName: 'TagPickerOptionGroup',
  });

  // T-1. This component owns no module: Griffel's style hook adds two class-name strings and zero
  // declarations over the shared OptionGroup look, so windmod adds a marker pair and nothing else.
  it('carries both marker pairs, its own first, over the shared OptionGroup look', () => {
    const { group } = renderGroup();

    expect(group.classList[0]).toBe('fui-tag-picker-option-group');
    expect(group).toHaveClass('group/fui-tag-picker-option-group');
    expect(group).toHaveClass('fui-option-group');
    expect(group).toHaveClass('group/fui-option-group');
    expect(group).toHaveClass(optionGroupStyles.root);
    expect(tagPickerOptionGroupClassNames.root).toBe('fui-tag-picker-option-group group/fui-tag-picker-option-group');
  });

  it('styles the label through the shared OptionGroup bucket', () => {
    const { group } = renderGroup();

    expect(group.querySelector(`.${optionGroupStyles.label}`)).not.toBeNull();
  });

  it('does not mutate the state it is given', () => {
    const state = {
      label: { className: 'label' },
      root: { className: 'consumer' },
    } as unknown as TagPickerOptionGroupState;

    const styled = useTagPickerOptionGroupStyles(state);

    expect(styled).not.toBe(state);
    expect(styled.root).not.toBe(state.root);
    expect(state.root.className).toBe('consumer');
    expect(styled.root.className).toContain('consumer');
    expect(styled.label!.className).toContain('label');
  });
});
