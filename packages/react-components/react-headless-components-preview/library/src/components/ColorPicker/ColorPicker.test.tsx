import * as React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { ColorSlider } from './ColorSlider/ColorSlider';
import { isConformant } from '../../testing/isConformant';
import { ColorPicker } from './ColorPicker';

describe('ColorPicker', () => {
  isConformant({
    Component: ColorPicker,
    displayName: 'ColorPicker',
  });

  it('renders a semantic root and forwards native props', () => {
    render(<ColorPicker data-testid="picker" className="custom" />);

    expect(screen.getByTestId('picker')).toHaveClass('custom');
  });

  it('coordinates child controls through context', () => {
    const onColorChange = jest.fn();

    render(
      <ColorPicker color={{ h: 20, s: 0.4, v: 0.8 }} onColorChange={onColorChange}>
        <ColorSlider aria-label="Hue" />
      </ColorPicker>,
    );

    fireEvent.change(screen.getByRole('slider', { name: 'Hue' }), { target: { value: '120' } });

    expect(onColorChange).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({
        color: { h: 120, s: 0.4, v: 0.8, a: 1 },
      }),
    );
  });
});
