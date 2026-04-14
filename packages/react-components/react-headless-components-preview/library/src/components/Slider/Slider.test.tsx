import * as React from 'react';
import { render } from '@testing-library/react';
import { isConformant } from '../../testing/isConformant';
import { Slider } from './Slider';

describe('Slider', () => {
  isConformant({
    Component: Slider,
    displayName: 'Slider',
    primarySlot: 'input',
  });

  it('renders a default state', () => {
    const result = render(<Slider defaultValue={0.5} />);
    expect(result.container).toMatchSnapshot();
  });
});
