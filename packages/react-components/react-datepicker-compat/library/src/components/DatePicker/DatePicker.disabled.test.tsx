import * as React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { DatePicker } from './DatePicker';

it('closes the calendar when disabled while open', () => {
  const onSelectDate = jest.fn();
  const initialPickerDate = new Date(2026, 10, 12);
  const props = { initialPickerDate, onSelectDate };
  const { rerender } = render(<DatePicker {...props} />);
  const name = '16, November, 2026';

  fireEvent.click(screen.getByRole('combobox'));
  expect(screen.getByRole('button', { name })).toBeTruthy();

  rerender(<DatePicker {...props} disabled />);
  expect(screen.queryByRole('button', { name })).toBeNull();
  expect(onSelectDate).not.toHaveBeenCalled();

  rerender(<DatePicker {...props} />);
  expect(screen.queryByRole('button', { name })).toBeNull();
  fireEvent.click(screen.getByRole('combobox'));
  fireEvent.click(screen.getByRole('button', { name }));
  expect(onSelectDate).toHaveBeenCalledTimes(1);
});
