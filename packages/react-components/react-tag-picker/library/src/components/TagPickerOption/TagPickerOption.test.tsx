import * as React from 'react';
import { fireEvent, render, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { isConformant } from '../../testing/isConformant';
import { TagPickerOption } from './TagPickerOption';
import type { TagPickerOptionProps } from './TagPickerOption.types';
import { TagPicker } from '../TagPicker/TagPicker';
import { TagPickerControl } from '../TagPickerControl/TagPickerControl';
import { TagPickerInput } from '../TagPickerInput/TagPickerInput';
import { TagPickerList } from '../TagPickerList/TagPickerList';
import { TagPickerOptionGroup } from '../TagPickerOptionGroup/TagPickerOptionGroup';

describe('TagPickerOption', () => {
  isConformant<TagPickerOptionProps>({
    Component: TagPickerOption,
    displayName: 'TagPickerOption',
    requiredProps: { value: 'value', media: <></>, secondaryContent: <></> },
  });

  it('renders a default state', () => {
    const result = render(<TagPickerOption value="value">Default TagPickerOption</TagPickerOption>);
    expect(result.container).toMatchSnapshot();
  });

  it('exposes selection state on grouped listbox options', () => {
    const { getByRole, rerender } = render(
      <TagPicker open inline selectedOptions={['john']}>
        <TagPickerControl>
          <TagPickerInput aria-label="Employees" />
        </TagPickerControl>
        <TagPickerList aria-label="Employees">
          <TagPickerOptionGroup label="Managers">
            <TagPickerOption value="john">John Doe</TagPickerOption>
            <TagPickerOption value="jane">Jane Doe</TagPickerOption>
          </TagPickerOptionGroup>
        </TagPickerList>
      </TagPicker>,
    );

    const group = within(getByRole('listbox')).getByRole('group', { name: 'Managers' });
    const john = within(group).getByRole('option', { name: 'John Doe' });
    const jane = within(group).getByRole('option', { name: 'Jane Doe' });
    expect(john.getAttribute('aria-selected')).toBe('true');
    expect(jane.getAttribute('aria-selected')).toBe('false');
    expect(john.hasAttribute('aria-checked')).toBe(false);
    expect(jane.hasAttribute('aria-checked')).toBe(false);

    rerender(
      <TagPicker open inline selectedOptions={['jane']}>
        <TagPickerControl>
          <TagPickerInput aria-label="Employees" />
        </TagPickerControl>
        <TagPickerList aria-label="Employees">
          <TagPickerOptionGroup label="Managers">
            <TagPickerOption value="john">John Doe</TagPickerOption>
            <TagPickerOption value="jane">Jane Doe</TagPickerOption>
          </TagPickerOptionGroup>
        </TagPickerList>
      </TagPicker>,
    );
    expect(john.getAttribute('aria-selected')).toBe('false');
    expect(jane.getAttribute('aria-selected')).toBe('true');
  });

  it.each([true, false] as const)('preserves explicit aria-selected=%s in a TagPicker', selected => {
    const { getByRole } = render(
      <TagPicker open inline selectedOptions={selected ? [] : ['john']}>
        <TagPickerControl>
          <TagPickerInput aria-label="Employees" />
        </TagPickerControl>
        <TagPickerList>
          <TagPickerOption value="john" aria-selected={selected}>
            John Doe
          </TagPickerOption>
        </TagPickerList>
      </TagPicker>,
    );

    expect(getByRole('option').getAttribute('aria-selected')).toBe(String(selected));
  });

  it.each(['click', 'keyboard'] as const)('selects a grouped option by %s while keeping input focus', method => {
    const onOptionSelect = jest.fn();
    const { getByRole } = render(
      <TagPicker defaultOpen inline onOptionSelect={onOptionSelect}>
        <TagPickerControl>
          <TagPickerInput aria-label="Employees" />
        </TagPickerControl>
        <TagPickerList>
          <TagPickerOptionGroup label="Managers">
            <TagPickerOption value="john">John Doe</TagPickerOption>
          </TagPickerOptionGroup>
          <TagPickerOptionGroup label="Devs">
            <TagPickerOption value="pierre">Pierre Dupont</TagPickerOption>
          </TagPickerOptionGroup>
        </TagPickerList>
      </TagPicker>,
    );

    const input = getByRole('combobox');
    const pierre = getByRole('option', { name: 'Pierre Dupont' });
    if (method === 'click') {
      userEvent.click(pierre);
    } else {
      userEvent.tab();
      fireEvent.keyDown(input, { key: 'ArrowDown' });
      fireEvent.keyDown(input, { key: 'ArrowDown' });
      expect(input.getAttribute('aria-activedescendant')).toBe(pierre.id);
      fireEvent.keyDown(input, { key: 'Enter' });
    }

    expect(onOptionSelect).toHaveBeenCalledTimes(1);
    expect(onOptionSelect).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({ value: 'pierre', selectedOptions: ['pierre'] }),
    );
    expect(input.ownerDocument.activeElement).toBe(input);
    expect(input.getAttribute('aria-expanded')).toBe('false');
  });
});
