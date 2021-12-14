import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { resetIdsForTests } from '@fluentui/react-utilities';
import { Slider } from './Slider';
import { isConformant } from '../../common/isConformant';

describe('Slider', () => {
  isConformant({
    Component: Slider,
    displayName: 'Slider',
    primarySlot: 'input',
    disabledTests: ['kebab-aria-attributes'],
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

  it('renders horizontal origin Slider correctly', () => {
    const { container } = render(<Slider defaultValue={5} origin={2} min={0} max={10} />);
    expect(container).toMatchSnapshot();
  });

  it('renders vertical origin Slider correctly', () => {
    const { container } = render(<Slider defaultValue={5} origin={2} vertical min={0} max={10} />);
    expect(container).toMatchSnapshot();
  });

  // Unit tests
  it('handles id prop', () => {
    const testId = "test_id";
    render(<Slider id={testId} />);
    const sliderRoot = screen.getByRole('slider');
    expect(sliderRoot.getAttribute('id')).toEqual(testId);
  });

  it('applies the defaultValue prop', () => {
    const inputRef = React.createRef<HTMLInputElement>();
    render(<Slider defaultValue={10} ref={inputRef} />);
    expect(inputRef.current?.value).toEqual('10');
  });

  it('applies the value prop', () => {
    const inputRef = React.createRef<HTMLInputElement>();
    render(<Slider value={10} ref={inputRef} />);
    expect(inputRef.current?.value).toEqual('10');
  });

  it('applies the disabled prop', () => {
    const inputRef = React.createRef<HTMLInputElement>();
    render(<Slider disabled={true} ref={inputRef} />);
    expect(inputRef.current?.disabled).toEqual(true);
  });

  it('applies the min prop', () => {
    const inputRef = React.createRef<HTMLInputElement>();
    render(<Slider min={11} disabled={true} ref={inputRef} />);
    expect(inputRef.current?.min).toEqual('11');
  });

  it('applies the max prop', () => {
    const inputRef = React.createRef<HTMLInputElement>();
    render(<Slider max={11} disabled={true} ref={inputRef} />);
    expect(inputRef.current?.max).toEqual('11');
  });

  it('applies the step prop', () => {
    const inputRef = React.createRef<HTMLInputElement>();
    render(<Slider step={11} disabled={true} ref={inputRef} />);
    expect(inputRef.current?.step).toEqual('11');
  });

  it('clamps an initial defaultValue that is out of bounds', () => {
    const inputRef = React.createRef<HTMLInputElement>();
    render(<Slider defaultValue={-10} min={0} max={100} ref={inputRef} />);
    expect(inputRef.current?.value).toEqual('0');
  });

  it('applies focus to the hidden input', () => {
    const inputRef = React.createRef<HTMLInputElement>();
    render(<Slider defaultValue={3} ref={inputRef} />);
    inputRef?.current?.focus();
    expect(document.activeElement).toEqual(inputRef.current);
  });

  it('does not allow focus on disabled Slider', () => {
    const sliderRef = React.createRef<HTMLInputElement>();

    render(<Slider ref={sliderRef} disabled />);

    expect(document.activeElement).toEqual(document.body);
    sliderRef?.current?.focus();
    expect(document.activeElement).toEqual(document.body);
  });

  // Accessibility tests
  it('handles role prop', () => {
    render(<Slider role="test" data-testid="test" />);
    const sliderInput = screen.getByTestId('test');
    expect(sliderInput.getAttribute('role')).toEqual('test');
  });

  it('renders the input slot as input', () => {
    const { container } = render(<Slider input={{ className: 'test' }} />);
    const inputElement = container.querySelector('.test');
    expect(inputElement?.tagName).toEqual('INPUT');
  });

  it('provides the input slot with a type of range', () => {
    const { container } = render(<Slider input={{ className: 'test' }} />);
    const inputElement = container.querySelector('.test');
    expect(inputElement?.getAttribute('type')).toEqual('range');
  });

  it('applies ariaValueText', () => {
    const values = ['small', 'medium', 'large'];
    const defaultValue = 1;
    const getTextValue = (value: number) => values[value];

    render(<Slider defaultValue={defaultValue} getAriaValueText={getTextValue} />);
    const sliderInput = screen.getByRole('slider');

    expect(sliderInput.getAttribute('aria-valuetext')).toEqual(values[defaultValue]);
  });
});
