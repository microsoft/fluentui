import * as React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { resetIdsForTests } from '@fluentui/react-utilities';
import { isConformant } from '../../testing/isConformant';
import { RangeSlider } from './RangeSlider';

describe('RangeSlider', () => {
  isConformant({
    Component: RangeSlider,
    displayName: 'RangeSlider',
    // RangeSlider has two primary input slots (startInput/endInput), so the standard
    // primary-slot conformance test does not apply. The ref goes to the root <div>.
    disabledTests: ['primary-slot-gets-native-props'],
  });

  afterEach(() => {
    resetIdsForTests();
  });

  // Snapshot tests
  it('renders horizontal RangeSlider correctly', () => {
    const { container } = render(<RangeSlider defaultValue={{ start: 20, end: 80 }} min={0} max={100} />);
    expect(container).toMatchSnapshot();
  });

  it('renders vertical RangeSlider correctly', () => {
    const { container } = render(<RangeSlider defaultValue={{ start: 20, end: 80 }} vertical min={0} max={100} />);
    expect(container).toMatchSnapshot();
  });

  it('renders disabled RangeSlider correctly', () => {
    const { container } = render(<RangeSlider defaultValue={{ start: 20, end: 80 }} disabled min={0} max={100} />);
    expect(container).toMatchSnapshot();
  });

  // Unit tests
  it('renders two slider inputs', () => {
    render(<RangeSlider defaultValue={{ start: 20, end: 80 }} />);
    const sliders = screen.getAllByRole('slider');
    expect(sliders).toHaveLength(2);
  });

  it('applies the defaultValue prop', () => {
    render(<RangeSlider defaultValue={{ start: 20, end: 80 }} />);
    const sliders = screen.getAllByRole('slider');
    expect(sliders[0].getAttribute('value')).toEqual('20');
    expect(sliders[1].getAttribute('value')).toEqual('80');
  });

  it('applies the value prop', () => {
    render(<RangeSlider value={{ start: 30, end: 70 }} />);
    const sliders = screen.getAllByRole('slider');
    expect(sliders[0].getAttribute('value')).toEqual('30');
    expect(sliders[1].getAttribute('value')).toEqual('70');
  });

  it('clamps values when start is below min', () => {
    render(<RangeSlider defaultValue={{ start: -10, end: 50 }} min={0} max={100} />);
    const sliders = screen.getAllByRole('slider');
    expect(sliders[0].getAttribute('value')).toEqual('0');
  });

  it('clamps values when end is above max', () => {
    render(<RangeSlider defaultValue={{ start: 20, end: 200 }} min={0} max={100} />);
    const sliders = screen.getAllByRole('slider');
    expect(sliders[1].getAttribute('value')).toEqual('100');
  });

  it('applies the disabled prop', () => {
    render(<RangeSlider disabled defaultValue={{ start: 20, end: 80 }} />);
    const sliders = screen.getAllByRole('slider');
    expect(sliders[0].getAttribute('disabled')).toBeDefined();
    expect(sliders[1].getAttribute('disabled')).toBeDefined();
  });

  it('applies the min prop', () => {
    render(<RangeSlider min={10} defaultValue={{ start: 20, end: 80 }} />);
    const sliders = screen.getAllByRole('slider');
    expect(sliders[0].getAttribute('min')).toEqual('10');
  });

  it('applies the max prop', () => {
    render(<RangeSlider max={90} defaultValue={{ start: 20, end: 80 }} />);
    const sliders = screen.getAllByRole('slider');
    expect(sliders[1].getAttribute('max')).toEqual('90');
  });

  it('applies the step prop', () => {
    render(<RangeSlider step={5} defaultValue={{ start: 20, end: 80 }} />);
    const sliders = screen.getAllByRole('slider');
    expect(sliders[0].getAttribute('step')).toEqual('5');
    expect(sliders[1].getAttribute('step')).toEqual('5');
  });

  it('constrains startInput max to the upper value', () => {
    render(<RangeSlider defaultValue={{ start: 20, end: 60 }} min={0} max={100} />);
    const sliders = screen.getAllByRole('slider');
    expect(sliders[0].getAttribute('max')).toEqual('60');
  });

  it('constrains endInput min to the lower value', () => {
    render(<RangeSlider defaultValue={{ start: 20, end: 60 }} min={0} max={100} />);
    const sliders = screen.getAllByRole('slider');
    expect(sliders[1].getAttribute('min')).toEqual('20');
  });

  it('orders values correctly when start > end', () => {
    render(<RangeSlider defaultValue={{ start: 80, end: 20 }} min={0} max={100} />);
    const sliders = screen.getAllByRole('slider');
    // Values should be sorted: lower=20, upper=80
    expect(sliders[0].getAttribute('value')).toEqual('20');
    expect(sliders[1].getAttribute('value')).toEqual('80');
  });

  // Focus tests
  it('applies focus to the start input', () => {
    render(<RangeSlider defaultValue={{ start: 20, end: 80 }} />);
    const sliders = screen.getAllByRole('slider');
    sliders[0].focus();
    expect(document.activeElement).toEqual(sliders[0]);
  });

  it('applies focus to the end input', () => {
    render(<RangeSlider defaultValue={{ start: 20, end: 80 }} />);
    const sliders = screen.getAllByRole('slider');
    sliders[1].focus();
    expect(document.activeElement).toEqual(sliders[1]);
  });

  it('does not allow focus on disabled RangeSlider', () => {
    render(<RangeSlider disabled defaultValue={{ start: 20, end: 80 }} />);
    const sliders = screen.getAllByRole('slider');
    expect(document.activeElement).toEqual(document.body);
    sliders[0].focus();
    expect(document.activeElement).toEqual(document.body);
  });

  // Accessibility tests
  it('allows aria-label to be set on each input via slots', () => {
    render(
      <RangeSlider
        defaultValue={{ start: 20, end: 80 }}
        startInput={{ 'aria-label': 'Minimum value' }}
        endInput={{ 'aria-label': 'Maximum value' }}
      />,
    );
    const sliders = screen.getAllByRole('slider');
    expect(sliders[0].getAttribute('aria-label')).toEqual('Minimum value');
    expect(sliders[1].getAttribute('aria-label')).toEqual('Maximum value');
  });

  it('applies aria-labelledby to both inputs', () => {
    render(<RangeSlider aria-labelledby="test-label" defaultValue={{ start: 20, end: 80 }} />);
    const sliders = screen.getAllByRole('slider');
    expect(sliders[0].getAttribute('aria-labelledby')).toEqual('test-label');
    expect(sliders[1].getAttribute('aria-labelledby')).toEqual('test-label');
  });

  it('applies aria-valuetext to both inputs', () => {
    render(<RangeSlider aria-valuetext="test-value" defaultValue={{ start: 20, end: 80 }} />);
    const sliders = screen.getAllByRole('slider');
    expect(sliders[0].getAttribute('aria-valuetext')).toEqual('test-value');
    expect(sliders[1].getAttribute('aria-valuetext')).toEqual('test-value');
  });

  it('provides each input with type range', () => {
    render(<RangeSlider defaultValue={{ start: 20, end: 80 }} />);
    const sliders = screen.getAllByRole('slider');
    expect(sliders[0].getAttribute('type')).toEqual('range');
    expect(sliders[1].getAttribute('type')).toEqual('range');
  });

  it('generates unique ids for each input', () => {
    render(<RangeSlider defaultValue={{ start: 20, end: 80 }} />);
    const sliders = screen.getAllByRole('slider');
    expect(sliders[0].id).not.toEqual(sliders[1].id);
    expect(sliders[0].id).toContain('rangeslider-start-');
    expect(sliders[1].id).toContain('rangeslider-end-');
  });

  // Overlapping thumbs – last-used thumb tracking
  describe('overlapping thumbs', () => {
    it('elevates the end thumb when it receives focus while overlapping', () => {
      const { container } = render(<RangeSlider defaultValue={{ start: 50, end: 50 }} min={0} max={100} />);
      const sliders = screen.getAllByRole('slider');

      // Capture baseline classes before any interaction
      const endThumb = container.querySelectorAll('[class*="RangeSlider__endThumb"]')[0] as HTMLElement;
      const baselineClasses = endThumb.className;

      // Focus the end input so it becomes the last-active thumb
      fireEvent.focus(sliders[1]);

      // The end thumb should gain an additional elevated class
      expect(endThumb.className).not.toBe(baselineClasses);
      expect(endThumb.className.split(' ').length).toBeGreaterThan(baselineClasses.split(' ').length);
    });

    it('elevates the start thumb when it receives focus while overlapping', () => {
      const { container } = render(<RangeSlider defaultValue={{ start: 50, end: 50 }} min={0} max={100} />);
      const sliders = screen.getAllByRole('slider');

      // Focus end then start so start is the last-active thumb
      fireEvent.focus(sliders[1]);
      fireEvent.focus(sliders[0]);

      const startThumb = container.querySelectorAll('[class*="RangeSlider__startThumb"]')[0] as HTMLElement;
      const endThumb = container.querySelectorAll('[class*="RangeSlider__endThumb"]')[0] as HTMLElement;

      // Only start thumb should have the extra elevated class
      expect(startThumb.className.split(' ').length).toBeGreaterThan(endThumb.className.split(' ').length);
    });

    it('does not add elevated class when thumbs do not overlap', () => {
      const { container } = render(<RangeSlider defaultValue={{ start: 20, end: 80 }} min={0} max={100} />);

      const startThumb = container.querySelectorAll('[class*="RangeSlider__startThumb"]')[0] as HTMLElement;
      const endThumb = container.querySelectorAll('[class*="RangeSlider__endThumb"]')[0] as HTMLElement;

      // Both thumbs should have the same number of classes (no elevation applied)
      expect(startThumb.className.split(' ').length).toBe(endThumb.className.split(' ').length);
    });
  });
});
