import * as React from 'react';
import { render } from '@testing-library/react';
import { TagPicker } from './TagPicker';
import { TagPickerControl } from './TagPickerControl';
import { TagPickerGroup } from './TagPickerGroup';
import { TagPickerInput } from './TagPickerInput';
import { TagPickerList } from './TagPickerList';
import { TagPickerOption } from './TagPickerOption';
import { optionClassNames } from '@fluentui/react-combobox';
import { Tag } from '../Tag';

const renderTagPicker = (props: { selectedOptions?: string[]; disabled?: boolean } = {}) => {
  const { selectedOptions = [], disabled } = props;
  return render(
    <TagPicker open disabled={disabled} selectedOptions={selectedOptions}>
      <TagPickerControl>
        <TagPickerGroup aria-label="Selected animals">
          {selectedOptions.map(option => (
            <Tag key={option} value={option}>
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
});
