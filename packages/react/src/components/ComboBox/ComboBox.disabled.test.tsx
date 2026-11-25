import * as React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { ComboBox } from './ComboBox';

it('blocks option clicks after an open ComboBox becomes disabled', () => {
  const onChange = jest.fn();
  const props = { options: [{ key: 'bravo', text: 'Bravo' }], onChange };
  const { rerender } = render(<ComboBox {...props} />);

  fireEvent.click(screen.getByRole('combobox'));
  expect(screen.getByRole('option', { name: 'Bravo' })).toBeTruthy();

  rerender(<ComboBox {...props} disabled />);
  fireEvent.click(screen.getByRole('option', { name: 'Bravo' }));
  expect(onChange).not.toHaveBeenCalled();

  rerender(<ComboBox {...props} />);
  fireEvent.click(screen.getByRole('option', { name: 'Bravo' }));
  expect(onChange).toHaveBeenCalledTimes(1);
});
