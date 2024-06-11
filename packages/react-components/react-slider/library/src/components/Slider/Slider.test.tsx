import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { Field } from '@fluentui/react-field';
import { resetIdsForTests } from '@fluentui/react-utilities';
import { Slider } from './Slider';
import { isConformant } from '../../testing/isConformant';

describe('Slider', () => {
  isConformant({
    Component: Slider,
    displayName: 'Slider',
    primarySlot: 'input',
    testOptions: {
      'consistent-callback-args': {
        legacyCallbacks: ['onChange'],
      },
    },
  });

  afterEach(() => {
    resetIdsForTests();
  });

  // Snapshot tests
  it('renders horizontal Slider correctly', () => {
    const { container } = render(<Slider defaultValue={5} min={0} max={10} />);
    expect(container).toMatchSnapshot();
  });

  it('renders vertical Slider correctly', () => {
    const { container } = render(<Slider defaultValue={5} vertical min={0} max={10} />);
    expect(container).toMatchSnapshot();
  });

  it('renders disabled Slider correctly', () => {
    const { container } = render(<Slider defaultValue={5} disabled min={0} max={10} />);
    expect(container).toMatchSnapshot();
  });

  // Unit tests
  it('handles id prop', () => {
    const testId = 'test-id';
    render(<Slider id={testId} />);
    expect(screen.getByRole('slider').getAttribute('id')).toEqual(testId);
  });

  it('applies the defaultValue prop', () => {
    render(<Slider defaultValue={10} />);
    expect(screen.getByRole('slider').getAttribute('value')).toEqual('10');
  });

  it('applies the value prop', () => {
    render(<Slider value={10} />);
    expect(screen.getByRole('slider').getAttribute('value')).toEqual('10');
  });

  it('applies the correct value prop when min is set', () => {
    render(<Slider value={0} min={20} />);
    expect(screen.getByRole('slider').getAttribute('value')).toEqual('20');
  });

  it('applies the correct value prop when max is set', () => {
    render(<Slider value={30} max={20} />);
    expect(screen.getByRole('slider').getAttribute('value')).toEqual('20');
  });

  it('applies the disabled prop', () => {
    render(<Slider disabled={true} />);
    expect(screen.getByRole('slider').getAttribute('disabled')).toBeDefined();
  });

  it('applies the min prop', () => {
    render(<Slider min={11} disabled={true} />);
    expect(screen.getByRole('slider').getAttribute('min')).toEqual('11');
  });

  it('applies the max prop', () => {
    render(<Slider max={11} disabled={true} />);
    expect(screen.getByRole('slider').getAttribute('max')).toEqual('11');
  });

  it('applies the step prop', () => {
    render(<Slider step={11} disabled={true} />);
    expect(screen.getByRole('slider').getAttribute('step')).toEqual('11');
  });

  it('clamps an initial defaultValue that is out of bounds', () => {
    render(<Slider defaultValue={-10} min={0} max={100} />);
    expect(screen.getByRole('slider').getAttribute('value')).toEqual('0');
  });

  it('applies focus to the hidden input', () => {
    render(<Slider defaultValue={3} />);
    const input = screen.getByRole('slider');

    input.focus();
    expect(document.activeElement).toEqual(input);
  });

  it('does not allow focus on disabled Slider', () => {
    render(<Slider disabled />);
    const slider = screen.getByRole('slider');
    expect(document.activeElement).toEqual(document.body);
    slider.focus();
    expect(document.activeElement).toEqual(document.body);
  });

  // Accessibility tests
  it('handles role prop', () => {
    render(<Slider role="test" />);
    const customRole = screen.getByRole('test');
    expect(customRole).toBeDefined();
  });

  it('provides the input slot with a type of range', () => {
    render(<Slider input={{ className: 'test' }} />);
    expect(screen.getByRole('slider').getAttribute('type')).toEqual('range');
  });

  it('applies aria-valuetext', () => {
    const testValue = 'test-value';

    render(<Slider aria-valuetext={testValue} />);

    expect(screen.getByRole('slider').getAttribute('aria-valuetext')).toEqual(testValue);
  });

  it('gets props from a surrounding Field', () => {
    const result = render(
      <Field label="Test label" validationMessage="Test error message">
        <Slider />
      </Field>,
    );

    const slider = result.getByRole('slider');
    const label = result.getByText('Test label') as HTMLLabelElement;
    const message = result.getByText('Test error message');

    expect(slider.id).toEqual(label.htmlFor);
    expect(slider.getAttribute('aria-describedby')).toEqual(message.id);
    expect(slider.getAttribute('aria-invalid')).toEqual('true');
  });
});
