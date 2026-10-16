import * as React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { isConformant } from '../../testing/isConformant';
import { SwatchPicker } from './SwatchPicker';
import { ColorSwatch } from './ColorSwatch/ColorSwatch';
import { SwatchPickerRow } from './SwatchPickerRow/SwatchPickerRow';

describe('SwatchPicker', () => {
  isConformant({ Component: SwatchPicker, displayName: 'SwatchPicker' });

  it('renders semantic state attributes and forwards selection', async () => {
    const onSelectionChange = jest.fn();
    const { getByRole } = render(
      <SwatchPicker aria-label="Colors" layout="grid" focusMode="tab" onSelectionChange={onSelectionChange}>
        <ColorSwatch color="#f09" value="pink" aria-label="Pink" />
      </SwatchPicker>,
    );

    expect(getByRole('grid')).toHaveAttribute('data-layout', 'grid');

    await userEvent.click(getByRole('gridcell'));
    expect(onSelectionChange).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({ selectedValue: 'pink', selectedSwatch: '#f09' }),
    );
  });

  it.each([
    ['row', 'radiogroup', 'radiogroup'],
    ['grid', 'grid', 'grid manual rowflow'],
  ] as const)('uses focusgroup for arrow navigation in a %s', (layout, role, focusgroup) => {
    const { getByRole } = render(
      <SwatchPicker aria-label="Colors" layout={layout}>
        <ColorSwatch color="#f09" value="pink" aria-label="Pink" />
      </SwatchPicker>,
    );

    expect(getByRole(role)).toHaveAttribute('focusgroup', focusgroup);
  });

  it.each([
    ['row', 'radiogroup', 'radiogroup nomemory'],
    ['grid', 'grid', 'grid manual rowflow nomemory'],
  ] as const)('disables focus memory in a %s while a value is selected', (layout, role, focusgroup) => {
    const { getByRole } = render(
      <SwatchPicker aria-label="Colors" layout={layout} defaultSelectedValue="pink">
        <ColorSwatch color="#f09" value="pink" aria-label="Pink" />
      </SwatchPicker>,
    );

    expect(getByRole(role)).toHaveAttribute('focusgroup', focusgroup);
  });

  it('moves the focusgroup entry point to the newly selected swatch', async () => {
    const { getByRole, getByLabelText } = render(
      <SwatchPicker aria-label="Colors">
        <ColorSwatch color="#f00" value="red" aria-label="Red" />
        <ColorSwatch color="#0f0" value="green" aria-label="Green" />
      </SwatchPicker>,
    );

    expect(getByRole('radiogroup')).toHaveAttribute('focusgroup', 'radiogroup');
    expect(getByLabelText('Red')).not.toHaveAttribute('focusgroupstart');
    expect(getByLabelText('Green')).not.toHaveAttribute('focusgroupstart');

    await userEvent.click(getByLabelText('Green'));

    expect(getByRole('radiogroup')).toHaveAttribute('focusgroup', 'radiogroup nomemory');
    expect(getByLabelText('Green')).toHaveAttribute('focusgroupstart');
    expect(getByLabelText('Red')).not.toHaveAttribute('focusgroupstart');

    await userEvent.click(getByLabelText('Red'));

    expect(getByLabelText('Red')).toHaveAttribute('focusgroupstart');
    expect(getByLabelText('Green')).not.toHaveAttribute('focusgroupstart');
  });

  it('does not add grid arrow navigation in tab mode', async () => {
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
    await userEvent.keyboard('{ArrowRight}');

    expect(onKeyDown).toHaveBeenCalledTimes(1);
    expect(red).toHaveFocus();
    expect(green).not.toHaveAttribute('tabindex', '-1');
  });
});
