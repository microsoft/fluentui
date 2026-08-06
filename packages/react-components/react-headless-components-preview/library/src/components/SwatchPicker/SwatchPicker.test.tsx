import * as React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { isConformant } from '../../testing/isConformant';
import { SwatchPicker } from './SwatchPicker';
import { ColorSwatch } from './ColorSwatch/ColorSwatch';
import { SwatchPickerRow } from './SwatchPickerRow/SwatchPickerRow';

describe('SwatchPicker', () => {
  isConformant({ Component: SwatchPicker, displayName: 'SwatchPicker' });

  it('renders semantic state attributes and forwards selection', () => {
    const onSelectionChange = jest.fn();
    const { getByRole } = render(
      <SwatchPicker aria-label="Colors" layout="grid" focusMode="tab" onSelectionChange={onSelectionChange}>
        <ColorSwatch color="#f09" value="pink" aria-label="Pink" />
      </SwatchPicker>,
    );

    expect(getByRole('grid')).toBeInTheDocument();

    fireEvent.click(getByRole('gridcell'));
    expect(onSelectionChange).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({ selectedValue: 'pink', selectedSwatch: '#f09' }),
    );
  });

  it('uses focusgroup for arrow navigation in a row', () => {
    const { getByRole } = render(
      <SwatchPicker aria-label="Colors" layout="row">
        <ColorSwatch color="#f09" value="pink" aria-label="Pink" />
      </SwatchPicker>,
    );

    expect(getByRole('radiogroup')).toHaveAttribute('focusgroup', 'radiogroup');
  });

  it('moves focus through a grid with arrow keys and wraps', () => {
    const { getByLabelText } = render(
      <SwatchPicker aria-label="Colors" layout="grid" focusMode="arrow">
        <SwatchPickerRow>
          <ColorSwatch color="#f00" value="red" aria-label="Red" />
          <ColorSwatch color="#fa0" value="orange" aria-label="Orange" disabled />
          <ColorSwatch color="#ff0" value="yellow" aria-label="Yellow" />
        </SwatchPickerRow>
        <SwatchPickerRow>
          <ColorSwatch color="#0f0" value="green" aria-label="Green" />
          <ColorSwatch color="#00f" value="blue" aria-label="Blue" />
          <ColorSwatch color="#70f" value="violet" aria-label="Violet" />
        </SwatchPickerRow>
      </SwatchPicker>,
    );
    const red = getByLabelText('Red');
    const yellow = getByLabelText('Yellow');
    const green = getByLabelText('Green');
    const violet = getByLabelText('Violet');

    red.focus();
    expect(yellow).toHaveAttribute('tabindex', '-1');

    fireEvent.keyDown(red, { key: 'ArrowRight' });
    expect(yellow).toHaveFocus();

    fireEvent.keyDown(yellow, { key: 'ArrowDown' });
    expect(violet).toHaveFocus();

    fireEvent.keyDown(violet, { key: 'ArrowRight' });
    expect(red).toHaveFocus();

    fireEvent.keyDown(red, { key: 'ArrowUp' });
    expect(green).toHaveFocus();
  });

  it('does not add grid arrow navigation in tab mode', () => {
    const onKeyDown = jest.fn((event: React.KeyboardEvent) => event.preventDefault());
    const { getByLabelText } = render(
      <SwatchPicker aria-label="Colors" layout="grid" focusMode="tab" onKeyDown={onKeyDown}>
        <SwatchPickerRow>
          <ColorSwatch color="#f00" value="red" aria-label="Red" />
          <ColorSwatch color="#0f0" value="green" aria-label="Green" />
        </SwatchPickerRow>
      </SwatchPicker>,
    );
    const red = getByLabelText('Red');
    const green = getByLabelText('Green');

    red.focus();
    fireEvent.keyDown(red, { key: 'ArrowRight' });

    expect(onKeyDown).toHaveBeenCalledTimes(1);
    expect(red).toHaveFocus();
    expect(green).not.toHaveAttribute('tabindex', '-1');
  });
});
