import * as React from 'react';
import { render } from '@testing-library/react';
import { isConformant } from '../../../testing/isConformant';
import { SwatchPickerRow } from './SwatchPickerRow';

describe('SwatchPickerRow', () => {
  isConformant({
    Component: SwatchPickerRow,
    displayName: 'SwatchPickerRow',
    disabledTests: ['has-top-level-file-extra'],
  });

  it('renders a row', () => {
    expect(render(<SwatchPickerRow>Colors</SwatchPickerRow>).getByRole('row')).toHaveTextContent('Colors');
  });
});
