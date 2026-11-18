import * as React from 'react';
import { act, fireEvent, render } from '@testing-library/react';
import { TagPicker } from './TagPicker';
import type { TagPickerProps } from './TagPicker.types';
import { TagPickerControl } from './TagPickerControl';
import type { TagPickerControlProps } from './TagPickerControl';
import { TagPickerGroup } from './TagPickerGroup';
import { useTagPickerGroupContextValues } from './TagPickerGroup';
import { TagPickerInput } from './TagPickerInput';
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

describe('TagPicker control gestures', () => {
  const ControlFixture = ({ disabled = false, ...props }: TagPickerControlProps & { disabled?: boolean }) => (
    <TagPicker disabled={disabled} selectedOptions={['Cat']}>
      <TagPickerControl data-testid="control" expandIcon={<span data-testid="expand">Expand</span>} {...props}>
        <TagPickerGroup aria-label="Selected animals">
          <Tag value="Cat">Cat</Tag>
        </TagPickerGroup>
        <TagPickerInput aria-label="Select animals" />
      </TagPickerControl>
      <TagPickerList>
        <TagPickerOption value="dog">Dog</TagPickerOption>
      </TagPickerList>
    </TagPicker>
  );
  const renderControl = (props: TagPickerControlProps = {}) => render(<ControlFixture {...props} />);

  it('clears stale intent before a consumer capture handler stops the next mousedown', () => {
    let cancel = false;
    const onMouseDownCapture = jest.fn((event: React.MouseEvent) => {
      if (cancel) {
        event.stopPropagation();
      }
    });
    const { getByTestId, getByRole } = renderControl({ onMouseDownCapture });
    const control = getByTestId('control');

    fireEvent.mouseDown(control);
    cancel = true;
    fireEvent.mouseDown(control);
    fireEvent.click(control);

    expect(onMouseDownCapture).toHaveBeenCalledTimes(2);
    expect(getByRole('combobox')).toHaveAttribute('aria-expanded', 'false');
  });

  it('does not focus or open when the parent picker is disabled', () => {
    const { getByTestId, getByRole } = render(<ControlFixture disabled />);
    const input = getByRole('combobox');
    const focus = jest.spyOn(input, 'focus');

    fireEvent.mouseDown(getByTestId('control'));
    fireEvent.click(getByTestId('control'));

    expect(input).toHaveAttribute('aria-expanded', 'false');
    expect(focus).not.toHaveBeenCalled();
  });

  it('discards pending opening when disabled between mousedown and click', () => {
    const { getByTestId, getByRole, rerender } = render(<ControlFixture />);
    fireEvent.mouseDown(getByTestId('control'));
    rerender(<ControlFixture disabled />);
    const focus = jest.spyOn(getByRole('combobox'), 'focus');
    fireEvent.click(getByTestId('control'));
    expect(getByRole('combobox')).toHaveAttribute('aria-expanded', 'false');
    expect(focus).not.toHaveBeenCalled();
    rerender(<ControlFixture />);
    fireEvent.click(getByTestId('control'));
    expect(getByRole('combobox')).toHaveAttribute('aria-expanded', 'false');
  });

  it.each(['control', 'expand', 'group', 'aside'])('opens on click, not mousedown, on the %s', target => {
    const { getByTestId, getByRole } = renderControl();
    const input = getByRole('combobox');
    const control =
      target === 'group'
        ? getByRole('toolbar', { name: 'Selected animals' })
        : target === 'aside'
        ? getByTestId('expand').parentElement!.parentElement!
        : getByTestId(target);

    fireEvent.mouseDown(control);
    expect(input).toHaveFocus();
    expect(input).toHaveAttribute('aria-expanded', 'false');
    fireEvent.click(control);
    expect(input).toHaveAttribute('aria-expanded', 'true');
  });

  it.each(['onMouseDown', 'onClick'] as const)('allows %s to cancel opening', handler => {
    const onEvent = jest.fn((event: React.MouseEvent) => event.preventDefault());
    const { getByTestId, getByRole } = renderControl({ [handler]: onEvent });
    const control = getByTestId('control');

    fireEvent.mouseDown(control);
    fireEvent.click(control);

    expect(onEvent).toHaveBeenCalledTimes(1);
    expect(getByRole('combobox')).toHaveAttribute('aria-expanded', 'false');
  });

  it.each(['mouseLeave', 'pointerCancel', 'blur'] as const)('discards the pending gesture on %s', event => {
    const { getByTestId, getByRole } = renderControl();
    const control = getByTestId('control');

    fireEvent.mouseDown(control);
    fireEvent[event](control);
    fireEvent.click(control);

    expect(getByRole('combobox')).toHaveAttribute('aria-expanded', 'false');
  });

  it('does not toggle when a gesture starts in the input and ends on the control', () => {
    const { getByTestId, getByRole } = renderControl();

    fireEvent.mouseDown(getByRole('combobox'));
    fireEvent.click(getByTestId('control'));

    expect(getByRole('combobox')).toHaveAttribute('aria-expanded', 'false');
  });

  it('leaves secondary actions independent of control toggling', () => {
    const onClick = jest.fn();
    const { getByTestId, getByRole } = renderControl({
      secondaryAction: <button onClick={onClick}>More</button>,
    });

    fireEvent.mouseDown(getByRole('button', { name: 'More' }));
    fireEvent.click(getByRole('button', { name: 'More' }));
    fireEvent.click(getByTestId('control'));

    expect(onClick).toHaveBeenCalledTimes(1);
    expect(getByRole('combobox')).toHaveAttribute('aria-expanded', 'false');
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
