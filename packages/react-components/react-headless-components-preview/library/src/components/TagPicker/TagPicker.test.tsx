import * as React from 'react';
import { act, fireEvent, render } from '@testing-library/react';
import { TagPicker } from './TagPicker';
import type { TagPickerProps } from './TagPicker.types';
import { TagPickerControl } from './TagPickerControl';
import { TagPickerGroup } from './TagPickerGroup';
import { useTagPickerGroupContextValues } from './TagPickerGroup';
import { TagPickerInput } from './TagPickerInput';
import { TagPickerButton } from './TagPickerButton';
import { TagPickerList } from './TagPickerList';
import { TagPickerOption } from './TagPickerOption';
import { Tag } from '../Tag';

const renderTagPicker = (props: Partial<Pick<TagPickerProps, 'disabled' | 'positioning' | 'selectedOptions'>> = {}) => {
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
        <TagPickerOption value="cat">Cat</TagPickerOption>
        <TagPickerOption disabled value="ferret">
          Ferret
        </TagPickerOption>
        <TagPickerOption value="dog">Dog</TagPickerOption>
      </TagPickerList>
    </TagPicker>,
  );
};

describe('TagPicker', () => {
  it('exposes the multiselect listbox default', () => {
    const { getByRole } = renderTagPicker();

    expect(getByRole('listbox')).toHaveAttribute('aria-multiselectable', 'true');
  });

  it('exposes multiselection and updates option selection semantics', () => {
    const picker = (selectedOptions: string[]) => (
      <TagPicker open selectedOptions={selectedOptions}>
        <TagPickerInput aria-label="Select animals" />
        <TagPickerList>
          <TagPickerOption value="cat">Cat</TagPickerOption>
          <TagPickerOption value="dog">Dog</TagPickerOption>
        </TagPickerList>
      </TagPicker>
    );
    const { getByRole, getAllByRole, rerender } = render(picker(['cat']));

    expect(getByRole('option', { name: 'Cat' })).toHaveAttribute('aria-selected', 'true');
    expect(getByRole('option', { name: 'Dog' })).toHaveAttribute('aria-selected', 'false');
    expect(getByRole('option', { name: 'Cat' })).toHaveAttribute('data-selected', '');
    expect(getByRole('option', { name: 'Dog' })).not.toHaveAttribute('data-selected');
    getAllByRole('option').forEach(option => expect(option).not.toHaveAttribute('aria-checked'));
    getAllByRole('option').forEach(option => expect(option).not.toHaveAttribute('data-checked'));

    rerender(picker(['dog']));

    expect(getByRole('option', { name: 'Cat' })).toHaveAttribute('aria-selected', 'false');
    expect(getByRole('option', { name: 'Dog' })).toHaveAttribute('aria-selected', 'true');
    expect(getByRole('option', { name: 'Cat' })).not.toHaveAttribute('data-selected');
    expect(getByRole('option', { name: 'Dog' })).toHaveAttribute('data-selected', '');
  });

  it('preserves checked-only selection for selected and unselected options', () => {
    const picker = (selectedOptions: string[]) => (
      <TagPicker open selectedOptions={selectedOptions}>
        <TagPickerInput aria-label="Select animals" />
        <TagPickerList>
          <TagPickerOption value="cat" aria-checked={selectedOptions.includes('cat')}>
            Cat
          </TagPickerOption>
          <TagPickerOption value="dog" aria-checked={selectedOptions.includes('dog')}>
            Dog
          </TagPickerOption>
        </TagPickerList>
      </TagPicker>
    );
    const { getByRole, getAllByRole, rerender } = render(picker(['cat']));

    expect(getByRole('option', { name: 'Cat' })).toHaveAttribute('aria-checked', 'true');
    expect(getByRole('option', { name: 'Dog' })).toHaveAttribute('aria-checked', 'false');
    expect(getByRole('option', { name: 'Cat' })).toHaveAttribute('data-checked', '');
    expect(getByRole('option', { name: 'Cat' })).toHaveAttribute('data-selected', '');
    expect(getByRole('option', { name: 'Dog' })).not.toHaveAttribute('data-checked');
    expect(getByRole('option', { name: 'Dog' })).not.toHaveAttribute('data-selected');
    getAllByRole('option').forEach(option => expect(option).not.toHaveAttribute('aria-selected'));

    rerender(picker(['dog']));

    expect(getByRole('option', { name: 'Cat' })).toHaveAttribute('aria-checked', 'false');
    expect(getByRole('option', { name: 'Dog' })).toHaveAttribute('aria-checked', 'true');
    expect(getByRole('option', { name: 'Cat' })).not.toHaveAttribute('data-checked');
    expect(getByRole('option', { name: 'Cat' })).not.toHaveAttribute('data-selected');
    expect(getByRole('option', { name: 'Dog' })).toHaveAttribute('data-checked', '');
    expect(getByRole('option', { name: 'Dog' })).toHaveAttribute('data-selected', '');
    getAllByRole('option').forEach(option => expect(option).not.toHaveAttribute('aria-selected'));
  });

  it('preserves explicitly supplied selected and checked states', () => {
    const { getByRole } = render(
      <TagPicker open selectedOptions={['cat']}>
        <TagPickerInput aria-label="Select animals" />
        <TagPickerList>
          <TagPickerOption value="cat" aria-selected={false} aria-checked>
            Cat
          </TagPickerOption>
          <TagPickerOption value="dog" aria-selected aria-checked={false}>
            Dog
          </TagPickerOption>
        </TagPickerList>
      </TagPicker>,
    );

    expect(getByRole('option', { name: 'Cat' })).toHaveAttribute('aria-selected', 'false');
    expect(getByRole('option', { name: 'Cat' })).toHaveAttribute('aria-checked', 'true');
    expect(getByRole('option', { name: 'Dog' })).toHaveAttribute('aria-selected', 'true');
    expect(getByRole('option', { name: 'Dog' })).toHaveAttribute('aria-checked', 'false');
    expect(getByRole('option', { name: 'Cat' })).toHaveAttribute('data-selected', '');
    expect(getByRole('option', { name: 'Cat' })).toHaveAttribute('data-checked', '');
    expect(getByRole('option', { name: 'Dog' })).not.toHaveAttribute('data-selected');
    expect(getByRole('option', { name: 'Dog' })).not.toHaveAttribute('data-checked');
  });

  it.each(['true', 'false', 'mixed'] as const)('exposes aria-checked="%s" for styling', checked => {
    const { getByRole } = render(
      <TagPicker open>
        <TagPickerInput aria-label="Select animals" />
        <TagPickerList>
          <TagPickerOption value="cat" aria-checked={checked}>
            Cat
          </TagPickerOption>
        </TagPickerList>
      </TagPicker>,
    );
    const option = getByRole('option', { name: 'Cat' });

    expect(option).toHaveAttribute('aria-checked', checked);
    expect(option).not.toHaveAttribute('aria-selected');
    expect(option).not.toHaveAttribute('data-selected');
    if (checked === 'false') {
      expect(option).not.toHaveAttribute('data-checked');
    } else {
      expect(option).toHaveAttribute('data-checked', checked === 'mixed' ? 'mixed' : '');
    }
  });

  it('preserves consumer ARIA props, refs and option click handlers', () => {
    const listRef = React.createRef<HTMLDivElement>();
    const optionRef = React.createRef<HTMLDivElement>();
    const onClick = jest.fn();
    const onOptionSelect = jest.fn();
    const { getByRole } = render(
      <TagPicker open selectedOptions={['cat']} onOptionSelect={onOptionSelect}>
        <TagPickerInput aria-label="Select animals" />
        <TagPickerList ref={listRef} aria-multiselectable={false} aria-label="Animals">
          <TagPickerOption ref={optionRef} value="cat" aria-selected={false} onClick={onClick}>
            Cat
          </TagPickerOption>
          <TagPickerOption value="dog" aria-selected>
            Dog
          </TagPickerOption>
        </TagPickerList>
      </TagPicker>,
    );

    expect(listRef.current).toBe(getByRole('listbox', { name: 'Animals' }));
    expect(listRef.current).toHaveAttribute('aria-multiselectable', 'false');
    expect(optionRef.current).toBe(getByRole('option', { name: 'Cat' }));
    expect(optionRef.current).toHaveAttribute('aria-selected', 'false');
    expect(getByRole('option', { name: 'Dog' })).toHaveAttribute('aria-selected', 'true');

    fireEvent.click(optionRef.current!);

    expect(onClick).toHaveBeenCalledTimes(1);
    expect(onOptionSelect).toHaveBeenCalledTimes(1);
  });

  it.each([
    [true, undefined, true],
    [true, false, true],
    [false, true, true],
    [false, false, false],
  ])('inherits button disabled state (picker=%s, button=%s)', (pickerDisabled, buttonDisabled, expected) => {
    const ref = React.createRef<HTMLButtonElement>();
    const onClick = jest.fn();
    const { getByRole } = render(
      <TagPicker disabled={pickerDisabled}>
        <TagPickerButton ref={ref} disabled={buttonDisabled} onClick={onClick}>
          Select animals
        </TagPickerButton>
        <TagPickerList>
          <TagPickerOption value="cat">Cat</TagPickerOption>
        </TagPickerList>
      </TagPicker>,
    );
    const button = getByRole('combobox');

    expect(ref.current).toBe(button);
    if (expected) {
      expect(button).toBeDisabled();
      expect(button).toHaveAttribute('data-disabled');
    } else {
      expect(button).not.toBeDisabled();
      expect(button).not.toHaveAttribute('data-disabled');
    }
    fireEvent.click(button);
    expect(onClick).toHaveBeenCalledTimes(expected ? 0 : 1);
  });

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

  it('ArrowDown navigation sets aria-activedescendant to a rendered option', () => {
    const { getByRole, getAllByRole } = renderTagPicker();
    const combobox = getByRole('combobox');

    act(() => combobox.focus());
    fireEvent.keyDown(combobox, { key: 'ArrowDown' });

    const activeId = combobox.getAttribute('aria-activedescendant');
    expect(activeId).toBeTruthy();

    const activeOption = getAllByRole('option').find(o => o.id === activeId);
    expect(activeOption).toBeDefined();
  });

  it('renders selected options as tags and applies the focusgroup attribute on the group', () => {
    const { getByRole } = renderTagPicker({ selectedOptions: ['Dog'] });

    const group = getByRole('toolbar', { name: 'Selected animals' });
    expect(group).toHaveAttribute('focusgroup', 'toolbar inline wrap');
    expect(group).not.toHaveAttribute('data-tabster');
    expect(group).toHaveTextContent('Dog');
  });

  it('does not render the group when nothing is selected', () => {
    const { queryByRole } = renderTagPicker({ selectedOptions: [] });

    expect(queryByRole('toolbar', { name: 'Selected animals' })).not.toBeInTheDocument();
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

  it('uses only the consumer positioning configuration', () => {
    const { getByRole } = renderTagPicker({
      positioning: { position: 'above', align: 'end', fallbackPositions: ['below'] },
    });
    const listbox = getByRole('listbox');

    expect(listbox).toHaveAttribute('data-placement', 'above-end');
    expect(listbox).toHaveStyle({ positionArea: 'block-start span-inline-start' });
    expect(listbox).toHaveStyle({ positionTryFallbacks: 'block-end' });
    expect(listbox).not.toHaveStyle({ width: 'anchor-size(width)' });
  });

  it('does not apply a TagPicker-specific offset when positioning is omitted', () => {
    const { getByRole } = renderTagPicker();

    expect(getByRole('listbox')).toHaveStyle({ margin: '0px' });
  });
});

describe('TagPickerGroup composition', () => {
  it('defaults to role="toolbar" (the TagGroup base default) so consumers can override if needed', () => {
    const { getByRole } = renderTagPicker({ selectedOptions: ['Cat'] });

    expect(getByRole('toolbar', { name: 'Selected animals' })).toBeInTheDocument();
  });

  it('allows consumers to override the default role via props', () => {
    const { getByRole, queryByRole } = render(
      <TagPicker open selectedOptions={['Cat']}>
        <TagPickerControl>
          <TagPickerGroup aria-label="Selected animals" role="group">
            <Tag value="Cat">Cat</Tag>
          </TagPickerGroup>
          <TagPickerInput aria-label="Select animals" />
        </TagPickerControl>
        <TagPickerList>
          <TagPickerOption value="cat">Cat</TagPickerOption>
        </TagPickerList>
      </TagPicker>,
    );

    expect(getByRole('group', { name: 'Selected animals' })).toBeInTheDocument();
    expect(queryByRole('toolbar', { name: 'Selected animals' })).not.toBeInTheDocument();
  });

  it('makes tags dismissible by default via group context', () => {
    const { getByTestId } = renderTagPicker({ selectedOptions: ['Cat', 'Dog'] });

    // data-testid values come from renderTagPicker's `tag-${option}` pattern.
    // data-dismissible is set on the Tag root by useTag when dismissible=true (the default).
    expect(getByTestId('tag-Cat')).toHaveAttribute('data-dismissible');
    expect(getByTestId('tag-Dog')).toHaveAttribute('data-dismissible');
  });

  it('allows consumers to suppress dismissal by passing dismissible={false}', () => {
    const { getByTestId } = render(
      <TagPicker open selectedOptions={['Cat', 'Dog']}>
        <TagPickerControl>
          <TagPickerGroup aria-label="Selected animals" dismissible={false}>
            <Tag data-testid="tag-Cat" value="Cat">
              Cat
            </Tag>
            <Tag data-testid="tag-Dog" value="Dog">
              Dog
            </Tag>
          </TagPickerGroup>
          <TagPickerInput aria-label="Select animals" />
        </TagPickerControl>
        <TagPickerList>
          <TagPickerOption value="cat">Cat</TagPickerOption>
          <TagPickerOption value="dog">Dog</TagPickerOption>
        </TagPickerList>
      </TagPicker>,
    );

    // When dismissible={false} the group context sets dismissible=false, so useTag omits data-dismissible.
    expect(getByTestId('tag-Cat')).not.toHaveAttribute('data-dismissible');
    expect(getByTestId('tag-Dog')).not.toHaveAttribute('data-dismissible');
  });

  it('exports useTagPickerGroupContextValues as a composable hook', () => {
    expect(typeof useTagPickerGroupContextValues).toBe('function');
  });
});
