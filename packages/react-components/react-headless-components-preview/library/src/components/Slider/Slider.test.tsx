import * as React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { isConformant } from '../../testing/isConformant';
import { Slider } from './Slider';

describe('Slider', () => {
  isConformant({
    Component: Slider,
    displayName: 'Slider',
    primarySlot: 'input',
    requiredProps: { 'aria-label': 'Value' },
  });

  it('renders a default state', () => {
    const { getByRole } = render(<Slider defaultValue={0.5} />);
    const slider = getByRole('slider');

    expect(slider).toBeInTheDocument();
    expect(slider).toHaveAttribute('type', 'range');
    expect(slider).toHaveValue('0.5');
  });

  it.each([undefined, false, true])('defaults aria-orientation when vertical is %s', vertical => {
    const { getByRole } = render(<Slider vertical={vertical} />);

    expect(getByRole('slider')).toHaveAttribute('aria-orientation', vertical ? 'vertical' : 'horizontal');
  });

  it('updates the default aria-orientation when vertical changes in either direction', () => {
    const { getByRole, rerender } = render(<Slider />);
    const slider = getByRole('slider');

    expect(slider).toHaveAttribute('aria-orientation', 'horizontal');

    rerender(<Slider vertical />);
    expect(slider).toHaveAttribute('aria-orientation', 'vertical');

    rerender(<Slider vertical={false} />);
    expect(slider).toHaveAttribute('aria-orientation', 'horizontal');
  });

  it.each(['horizontal', 'vertical'] as const)('preserves native aria-orientation=%s on rerender', orientation => {
    const { getByRole, rerender } = render(<Slider aria-orientation={orientation} />);
    const slider = getByRole('slider');

    expect(slider).toHaveAttribute('aria-orientation', orientation);

    rerender(<Slider vertical aria-orientation={orientation} />);
    expect(slider).toHaveAttribute('aria-orientation', orientation);

    rerender(<Slider vertical={false} aria-orientation={orientation} />);
    expect(slider).toHaveAttribute('aria-orientation', orientation);
  });

  it.each(['horizontal', 'vertical'] as const)('preserves input-slot aria-orientation=%s on rerender', orientation => {
    const { getByRole, rerender } = render(<Slider input={{ 'aria-orientation': orientation }} />);
    const slider = getByRole('slider');

    expect(slider).toHaveAttribute('aria-orientation', orientation);

    rerender(<Slider vertical input={{ 'aria-orientation': orientation }} />);
    expect(slider).toHaveAttribute('aria-orientation', orientation);

    rerender(<Slider vertical={false} input={{ 'aria-orientation': orientation }} />);
    expect(slider).toHaveAttribute('aria-orientation', orientation);
  });

  it('preserves input-slot aria-orientation precedence over the native prop', () => {
    const { getByRole } = render(<Slider aria-orientation="vertical" input={{ 'aria-orientation': 'horizontal' }} />);

    expect(getByRole('slider')).toHaveAttribute('aria-orientation', 'horizontal');
  });

  it('defaults aria-orientation when the resolved input-slot attribute is undefined', () => {
    const { getByRole } = render(
      <Slider vertical aria-orientation="horizontal" input={{ 'aria-orientation': undefined }} />,
    );

    expect(getByRole('slider')).toHaveAttribute('aria-orientation', 'vertical');
  });

  it('restores the default aria-orientation when an override is removed', () => {
    const { getByRole, rerender } = render(<Slider vertical aria-orientation="horizontal" />);

    rerender(<Slider vertical />);

    expect(getByRole('slider')).toHaveAttribute('aria-orientation', 'vertical');
  });

  it('preserves value and onChange behavior when orientation changes', () => {
    const onChange = jest.fn();
    const { getByRole, rerender } = render(<Slider defaultValue={25} onChange={onChange} />);
    const slider = getByRole('slider');

    rerender(<Slider vertical defaultValue={25} onChange={onChange} />);
    expect(slider).toHaveValue('25');
    expect(onChange).not.toHaveBeenCalled();

    fireEvent.change(slider, { target: { value: '75' } });
    expect(slider).toHaveValue('75');
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith(expect.anything(), { value: 75 });

    rerender(<Slider defaultValue={25} onChange={onChange} />);
    expect(slider).toHaveValue('75');
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it('renders with data-disabled when disabled', () => {
    const { container, getByRole } = render(<Slider disabled defaultValue={0.5} />);
    const root = container.firstElementChild!;

    expect(root).toHaveAttribute('data-disabled');
    expect(getByRole('slider')).toBeDisabled();
  });

  it('renders with data-vertical when vertical', () => {
    const { container } = render(<Slider vertical defaultValue={0.5} />);
    const root = container.firstElementChild!;

    expect(root).toHaveAttribute('data-vertical');
  });
});
