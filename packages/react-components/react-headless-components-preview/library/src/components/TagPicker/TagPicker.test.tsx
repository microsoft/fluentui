import * as React from 'react';
import { act, fireEvent, render } from '@testing-library/react';
import { TagPicker } from './TagPicker';
import type { TagPickerProps } from './TagPicker.types';
import { TagPickerControl } from './TagPickerControl';
import { TagPickerGroup } from './TagPickerGroup';
import { TagPickerInput } from './TagPickerInput';
import { TagPickerList } from './TagPickerList';
import { TagPickerOption } from './TagPickerOption';
import { optionClassNames } from '@fluentui/react-combobox';
import { Tag } from '../Tag';

const renderTagPicker = (props: Pick<TagPickerProps, 'disabled' | 'positioning' | 'selectedOptions'> = {}) => {
  const { selectedOptions = [], ...tagPickerProps } = props;
  return render(
    <TagPicker open selectedOptions={selectedOptions} {...tagPickerProps}>
      <TagPickerControl>
        <TagPickerGroup aria-label="Selected animals">
          {selectedOptions.map(option => (
            <Tag data-testid={`tag-${option}`} key={option} value={option}>
              {option}
            </Tag>
          ))}
        </TagPickerGroup>
        <TagPickerInput aria-label="Select animals" />
      </TagPickerControl>
      <TagPickerList>
        <TagPickerOption>Cat</TagPickerOption>
        <TagPickerOption disabled>Ferret</TagPickerOption>
        <TagPickerOption>Dog</TagPickerOption>
      </TagPickerList>
    </TagPicker>,
  );
};

describe('TagPicker', () => {
  it('renders the input trigger and the options list when open', () => {
    const { getByRole, getAllByRole } = renderTagPicker();

    expect(getByRole('combobox')).toBeInTheDocument();
    expect(getByRole('listbox')).toBeInTheDocument();
    expect(getAllByRole('option')).toHaveLength(3);
  });

  it('sets data-disabled on disabled options', () => {
    const { getAllByRole } = renderTagPicker();
    const options = getAllByRole('option');

    expect(options[0]).not.toHaveAttribute('data-disabled');
    expect(options[1]).toHaveAttribute('data-disabled');
    expect(options[2]).not.toHaveAttribute('data-disabled');
  });

  it('marks options with the option class so active-descendant arrow navigation can find them', () => {
    const { getAllByRole } = renderTagPicker();

    getAllByRole('option').forEach(option => {
      expect(option).toHaveClass(optionClassNames.root);
    });
  });

  it('renders selected options as tags and applies the focusgroup attribute on the group', () => {
    const { getByRole } = renderTagPicker({ selectedOptions: ['Dog'] });

    const group = getByRole('listbox', { name: 'Selected animals' });
    expect(group).toHaveAttribute('focusgroup', 'toolbar inline wrap');
    expect(group).not.toHaveAttribute('data-tabster');
    expect(group).toHaveTextContent('Dog');
  });

  it('does not render the group when nothing is selected', () => {
    const { queryByRole } = renderTagPicker({ selectedOptions: [] });

    expect(queryByRole('listbox', { name: 'Selected animals' })).not.toBeInTheDocument();
  });

  it('sets data-disabled on the control when disabled', () => {
    const { getByRole } = renderTagPicker({ disabled: true });

    expect(getByRole('combobox')).toBeDisabled();
  });

  it.each(['ArrowLeft', 'Backspace'])('moves focus to the last tag on %s at the start of the input', key => {
    const { getByRole, getByTestId } = renderTagPicker({ selectedOptions: ['Cat', 'Dog'] });
    const input = getByRole('combobox') as HTMLInputElement;

    act(() => input.focus());
    input.setSelectionRange(0, 0);
    fireEvent.keyDown(input, { key });

    expect(getByTestId('tag-Dog')).toHaveFocus();
  });

  it('keeps focus in the input when Backspace is pressed away from the start', () => {
    const { getByRole, getByTestId } = renderTagPicker({ selectedOptions: ['Dog'] });
    const input = getByRole('combobox') as HTMLInputElement;

    act(() => input.focus());
    fireEvent.change(input, { target: { value: 'Cat' } });
    input.setSelectionRange(2, 2);
    fireEvent.keyDown(input, { key: 'Backspace' });

    expect(input).toHaveFocus();
    expect(getByTestId('tag-Dog')).not.toHaveFocus();
  });

  it('allows consumer positioning to override the default placement and fallback positions', () => {
    const { getByRole } = renderTagPicker({
      positioning: { position: 'above', align: 'end', fallbackPositions: ['below'] },
    });
    const listbox = getByRole('listbox');

    expect(listbox).toHaveAttribute('data-placement', 'above-end');
    expect(listbox).toHaveStyle({ positionArea: 'block-start span-inline-start' });
    expect(listbox).toHaveStyle({ positionTryFallbacks: 'block-end' });
  });
});
