import '@testing-library/jest-dom';
import * as React from 'react';
import * as renderer from 'react-test-renderer';
import { render, screen, fireEvent } from '@testing-library/react';

import { ColorSlider } from './ColorSlider';
import { ColorSliderBase } from './ColorSlider.base';
import { KeyCodes } from '../../../Utilities';
import { MAX_COLOR_HUE, MAX_COLOR_ALPHA } from '../../../utilities/color';
import type { IColorSliderProps } from './ColorSlider.types';

describe('ColorSlider', () => {
  let colorSlider: ColorSliderBase | null = null;
  const colorSliderRef = (ref: ColorSliderBase | null) => {
    colorSlider = ref;
  };

  // Use a width of 100 in the fake bounding rect to simplify math
  const width = 100;
  const getBoundingClientRect = () =>
    ({
      left: 0,
      top: 0,
      right: width,
      bottom: 18,
      width,
      height: 18,
    } as DOMRect);

  /** Verify stored value and thumb position */
  function verifyValue(type: IColorSliderProps['type'], value: number) {
    expect(colorSlider!.value).toBeCloseTo(value);

    const thumbEl = screen.getByRole('slider').querySelector('.ms-ColorPicker-thumb') as HTMLDivElement;
    const thumbStyle = thumbEl.style;

    const max = type === 'hue' ? MAX_COLOR_HUE : MAX_COLOR_ALPHA;
    expect(Number((thumbStyle.left as string).replace('%', ''))).toBeCloseTo((100 * value) / max);
  }

  it('renders hue slider correctly', () => {
    const component = renderer.create(<ColorSlider type="hue" value={30} ariaLabel="Hue" />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders alpha slider correctly', () => {
    const component = renderer.create(<ColorSlider type="alpha" value={30} overlayColor="ff0000" ariaLabel="Alpha" />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders transparency slider correctly', () => {
    const component = renderer.create(
      <ColorSlider type="transparency" value={30} overlayColor="ff0000" ariaLabel="Transparency" />,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('defaults to hue slider', () => {
    render(<ColorSlider />);
    // hue slider doesn't have an overlay
    expect(screen.queryByRole('slider')).not.toHaveClass('ms-ColorPicker-sliderOverlay');
  });

  it('handles alpha slider overlay', () => {
    render(<ColorSlider type="alpha" value={0} overlayColor="ff0000" />);

    const overlay = screen.getByRole('slider').querySelector('.ms-ColorPicker-sliderOverlay') as HTMLDivElement;

    const _reactProps = Object.keys(overlay).find(val => val.startsWith('__reactProps$')) as string;
    // @ts-expect-error - accessing internals
    const styles = overlay[_reactProps].style;

    expect(styles).toEqual({ background: 'linear-gradient(to right, transparent, #ff0000)' });
  });

  it('handles transparency slider overlay', () => {
    render(<ColorSlider type="transparency" value={0} overlayColor="ff0000" />);

    const overlay = screen.getByRole('slider').querySelector('.ms-ColorPicker-sliderOverlay') as HTMLDivElement;

    const _reactProps = Object.keys(overlay).find(val => val.startsWith('__reactProps$')) as string;
    // @ts-expect-error - accessing internals
    const styles = overlay[_reactProps].style;
    expect(styles).toEqual({ background: 'linear-gradient(to right, #ff0000, transparent)' });
  });

  it('defaults to 0', () => {
    render(<ColorSlider componentRef={colorSliderRef} />);
    verifyValue('hue', 0);
  });

  it('respects value prop', () => {
    render(<ColorSlider type="alpha" value={15} overlayColor="ff0000" componentRef={colorSliderRef} />);
    verifyValue('alpha', 15);
  });

  it('respects updates to value prop', () => {
    const onChange = jest.fn();
    const { rerender } = render(
      <ColorSlider type="alpha" value={15} overlayColor="ff0000" onChange={onChange} componentRef={colorSliderRef} />,
    );

    rerender(
      <ColorSlider type="alpha" value={30} overlayColor="ff0000" onChange={onChange} componentRef={colorSliderRef} />,
    );

    verifyValue('alpha', 30);
    expect(onChange).toHaveBeenCalledTimes(0);
  });

  it('respects value prop for transparency', () => {
    // The slider is meant to take in actual transparency values, rather than taking in alpha
    // and displaying transparency.
    render(<ColorSlider type="transparency" value={15} overlayColor="ff0000" componentRef={colorSliderRef} />);
    verifyValue('transparency', 15);
  });

  it('uses appropriate default aria label', () => {
    const { rerender } = render(<ColorSlider type="hue" />);
    expect(screen.getByRole('slider').getAttribute('aria-label')).toBe('hue');

    rerender(<ColorSlider type="alpha" />);
    expect(screen.getByRole('slider').getAttribute('aria-label')).toBe('alpha');

    rerender(<ColorSlider ariaLabel="custom" />);
    expect(screen.getByRole('slider').getAttribute('aria-label')).toBe('custom');
  });

  it('respects custom aria label', () => {
    render(<ColorSlider type="hue" ariaLabel="custom" />);
    expect(screen.getByRole('slider').getAttribute('aria-label')).toBe('custom');
  });

  it('handles key events', () => {
    let value: number | undefined;
    const onChange = jest.fn((ev: any, newValue?: number) => {
      value = newValue;
    });
    render(<ColorSlider type="hue" value={100} onChange={onChange} componentRef={colorSliderRef} />);

    fireEvent.keyDown(screen.getByRole('slider'), { key: 'ArrowLeft', keyCode: KeyCodes.left });
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(value).toBe(99);
    verifyValue('hue', 99);

    fireEvent.keyDown(screen.getByRole('slider'), { key: 'ArrowRight', shiftKey: true, keyCode: KeyCodes.right });
    expect(onChange).toHaveBeenCalledTimes(2);
    expect(value).toBe(109);
    verifyValue('hue', 109);

    fireEvent.keyDown(screen.getByRole('slider'), { key: 'Home', keyCode: KeyCodes.home });
    expect(onChange).toHaveBeenCalledTimes(3);
    expect(value).toBe(0);
    verifyValue('hue', 0);

    fireEvent.keyDown(screen.getByRole('slider'), { key: 'End', keyCode: KeyCodes.end });
    expect(onChange).toHaveBeenCalledTimes(4);
    expect(value).toBe(359);
    verifyValue('hue', 359);
  });

  it('does not modify value if event default prevented', () => {
    let value: number | undefined;
    const onChange = jest.fn((ev: React.SyntheticEvent, newValue?: number) => {
      value = newValue;
      ev.preventDefault();
    });
    render(<ColorSlider type="hue" value={100} onChange={onChange} componentRef={colorSliderRef} />);

    fireEvent.keyDown(screen.getByRole('slider'), { key: 'ArrowLeft', keyCode: KeyCodes.left });
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(value).toBe(99);
    verifyValue('hue', 100);
  });

  it('handles mouse events in range', () => {
    const onChange = jest.fn();
    render(
      <ColorSlider type="alpha" overlayColor="ff0000" value={0} onChange={onChange} componentRef={colorSliderRef} />,
    );
    screen.getByRole('slider').getBoundingClientRect = getBoundingClientRect;

    fireEvent.mouseDown(screen.getByRole('slider'), { clientX: 5, clientY: 0 });
    expect(onChange).toHaveBeenCalledTimes(1);
    verifyValue('alpha', 5);

    fireEvent.mouseDown(screen.getByRole('slider'), { clientX: 10, clientY: 0 });
    expect(onChange).toHaveBeenCalledTimes(2);
    verifyValue('alpha', 10);

    // mouse up => keep setting
    fireEvent.mouseUp(screen.getByRole('slider'));
    expect(onChange).toHaveBeenCalledTimes(2);
    verifyValue('alpha', 10);
  });

  it('handles mouse events out of range', () => {
    const onChange = jest.fn();
    render(<ColorSlider type="hue" value={0} onChange={onChange} componentRef={colorSliderRef} />);
    screen.getByRole('slider').getBoundingClientRect = getBoundingClientRect;

    fireEvent.mouseDown(screen.getByRole('slider'), { clientX: 100, clientY: 0 });
    expect(onChange).toHaveBeenCalledTimes(1);
    verifyValue('hue', 359);

    // ignore movement out of range
    fireEvent.mouseMove(screen.getByRole('slider'), { clientX: 200, clientY: 0 });
    expect(onChange).toHaveBeenCalledTimes(1);
    verifyValue('hue', 359);

    // mouse up => keep setting
    fireEvent.mouseUp(screen.getByRole('slider'));
    expect(onChange).toHaveBeenCalledTimes(1);
    verifyValue('hue', 359);
  });
});
