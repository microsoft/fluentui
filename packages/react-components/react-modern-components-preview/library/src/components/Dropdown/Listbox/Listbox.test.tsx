import * as React from 'react';
import { render } from '@testing-library/react';
import { isConformant } from '../../../testing/isConformant';
import { Listbox } from './Listbox';

describe('Listbox', () => {
  isConformant({
    Component: Listbox,
    displayName: 'Listbox',
    disableTypeTests: true,
    disabledTests: ['exported-top-level', 'has-top-level-file', 'has-top-level-file-extra'],
    requiredProps: {
      'aria-label': 'Options',
      children: <div role="option">Option</div>,
    },
  });

  it('applies the stable class name and preserves a custom class name', () => {
    const { getByRole } = render(<Listbox aria-label="Options" className="custom-class" />);

    expect(getByRole('listbox')).toHaveClass('fui-Listbox', 'custom-class');
  });
});
