import * as React from 'react';
import { render } from '@testing-library/react';
import { Listbox } from './Listbox';
import { Option } from '../Option';

describe('Listbox', () => {
  it('does not set the popover attribute when rendered standalone', () => {
    const { getByRole } = render(
      <Listbox>
        <Option>Cat</Option>
      </Listbox>,
    );

    expect(getByRole('listbox')).not.toHaveAttribute('popover');
  });
});
