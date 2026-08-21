import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { isConformant } from '../../../testing/isConformant';
import { ColorSlider } from './ColorSlider';

describe('ColorSlider', () => {
  isConformant({
    Component: ColorSlider,
    displayName: 'ColorSlider',
    disabledTests: ['has-top-level-file-extra'],
    primarySlot: 'input',
  });

  it('renders a native range input with channel semantics', () => {
    const { container } = render(
      <ColorSlider aria-label="Saturation" channel="saturation" color={{ h: 20, s: 0.4, v: 0.8 }} />,
    );

    expect(screen.getByRole('slider', { name: 'Saturation' })).toHaveValue('40');
    expect(container.firstElementChild).toHaveAttribute('data-channel', 'saturation');
    expect(container.firstElementChild).toHaveAttribute('data-orientation', 'horizontal');
  });
});
