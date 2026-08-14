import * as React from 'react';
import { render } from '@testing-library/react';
import { isConformant } from '../../../testing/isConformant';
import { SwatchPickerRow } from './SwatchPickerRow';

describe('SwatchPickerRow', () => {
  isConformant({
    Component: SwatchPickerRow,
    displayName: 'SwatchPickerRow',
    requiredProps: { children: <div role="gridcell">Color</div> },
    renderOptions: {
      wrapper: ({ children }) => <div role="grid">{children}</div>,
    },
    getTargetElement: result => result.getByRole('row'),
    disabledTests: ['has-top-level-file-extra'],
  });

  it('renders a row', () => {
    const row = render(<SwatchPickerRow>Colors</SwatchPickerRow>).getByRole('row');

    expect(row).toHaveTextContent('Colors');
    expect(row).toHaveAttribute('focusgrouprow');
  });
});
