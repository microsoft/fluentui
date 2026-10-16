import * as React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { isConformant } from '../../../testing/isConformant';
import { ColorSlider } from './ColorSlider';

describe('ColorSlider', () => {
  isConformant({
    Component: ColorSlider,
    displayName: 'ColorSlider',
    disabledTests: ['has-top-level-file-extra'],
    primarySlot: 'input',
    requiredProps: { 'aria-label': 'Color' },
  });

  it('renders a native range input with channel semantics', () => {
    const { container } = render(
      <ColorSlider aria-label="Saturation" channel="saturation" color={{ h: 20, s: 0.4, v: 0.8 }} />,
    );

    expect(screen.getByRole('slider', { name: 'Saturation' })).toHaveValue('40');
    expect(container.firstElementChild).toHaveAttribute('data-channel', 'saturation');
    expect(container.firstElementChild).toHaveAttribute('data-orientation', 'horizontal');
  });

  it('inherits uncontrolled color preservation and runtime ramp endpoints from the base', () => {
    const onChange = jest.fn();
    const { container } = render(
      <ColorSlider
        aria-label="Saturation"
        channel="saturation"
        defaultColor={{ h: 240, s: 0.4, v: 0.8, a: 0.6 }}
        onChange={onChange}
      />,
    );
    fireEvent.change(screen.getByRole('slider'), { target: { value: '70' } });
    expect(screen.getByRole('slider')).toHaveValue('70');
    expect(onChange.mock.lastCall[1].color).toEqual({ h: 240, s: 0.7, v: 0.8, a: 0.6 });
    const root = container.firstElementChild as HTMLElement;
    expect(root.style.getPropertyValue('--fui-Slider__rail--color-low')).not.toBe('');
    expect(root.style.getPropertyValue('--fui-Slider__rail--color')).not.toBe('');
  });
});
