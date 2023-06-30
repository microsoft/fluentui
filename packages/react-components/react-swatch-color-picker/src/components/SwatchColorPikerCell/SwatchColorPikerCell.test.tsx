import * as React from 'react';
import { render } from '@testing-library/react';
import { SwatchColorPikerCell } from './SwatchColorPikerCell';
import { isConformant } from '../../testing/isConformant';

describe('SwatchColorPikerCell', () => {
  isConformant({
    Component: SwatchColorPikerCell,
    displayName: 'SwatchColorPikerCell',
  });

  // TODO add more tests here, and create visual regression tests in /apps/vr-tests

  it('renders a default state', () => {
    const result = render(<SwatchColorPikerCell>Default SwatchColorPikerCell</SwatchColorPikerCell>);
    expect(result.container).toMatchSnapshot();
  });
});
