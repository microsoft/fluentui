import * as React from 'react';
import { render } from '@testing-library/react';
import { isConformant } from '../../../testing/isConformant';
import { SwatchPickerRow } from './SwatchPickerRow';
import { ColorSwatch } from '../ColorSwatch/ColorSwatch';
import { SwatchPicker } from '../SwatchPicker';

describe('SwatchPickerRow', () => {
  isConformant({
    Component: SwatchPickerRow,
    displayName: 'SwatchPickerRow',
    requiredProps: {
      children: (
        <>
          <ColorSwatch color="#f09" value="pink" aria-label="Pink" />
          <ColorSwatch color="#09f" value="blue" aria-label="Blue" />
        </>
      ),
    },
    renderOptions: {
      wrapper: ({ children }) => (
        <SwatchPicker layout="grid" aria-label="Color Picker">
          {children}
        </SwatchPicker>
      ),
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
