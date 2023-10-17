import * as React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { isConformant } from '../../testing/isConformant';
import { TimePicker } from './TimePicker';

const dateAnchor = new Date('November 25, 2021 01:00:00');

describe('TimePicker', () => {
  isConformant({
    Component: TimePicker,
    displayName: 'TimePicker',
    primarySlot: 'input',
    testOptions: {
      'has-static-classnames': [
        {
          props: {
            open: true,
            // Portal messes with the classNames test, so rendering the listbox inline here
            inlinePopup: true,
          },
        },
      ],
    },
  });

  it('when freeform, trigger onTimeSelect only when value change', () => {
    const handleTimeSelect = jest.fn();
    const { getByRole, getAllByRole } = render(
      <TimePicker freeform dateAnchor={dateAnchor} onTimeSelect={handleTimeSelect} startHour={10} />,
    );

    const input = getByRole('combobox');

    // Call onTimeSelect when select an option
    userEvent.click(input);
    userEvent.click(getAllByRole('option')[1]);
    expect(handleTimeSelect).toHaveBeenCalledTimes(1);
    expect(handleTimeSelect).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({ selectedTimeText: '10:30' }),
    );
    handleTimeSelect.mockClear();

    // Do not call onTimeSelect when Tab out but the value remains the same
    userEvent.tab();
    expect(handleTimeSelect).toHaveBeenCalledTimes(0);

    // Call onTimeSelect when Tab out and the value changes
    userEvent.type(input, '111');
    userEvent.tab();
    expect(handleTimeSelect).toHaveBeenCalledTimes(1);
    expect(handleTimeSelect).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({ selectedTimeText: '10:30111', error: 'invalid-input' }),
    );
  });
});
