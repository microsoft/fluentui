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
    const { getByRole } = render(<Slider defaultValue={0.5} />);
    const slider = getByRole('slider');

    expect(slider).toBeInTheDocument();
    expect(slider).toHaveAttribute('type', 'range');
    expect(slider).toHaveValue('0.5');
  });

  it('renders with data-disabled when disabled', () => {
    const { container } = render(<Slider disabled defaultValue={0.5} />);
    const root = container.firstElementChild!;

    expect(root).toHaveAttribute('data-disabled');
  });

  it('renders with data-vertical when vertical', () => {
    const { container } = render(<Slider vertical defaultValue={0.5} />);
    const root = container.firstElementChild!;

    expect(root).toHaveAttribute('data-vertical');
  });
});
