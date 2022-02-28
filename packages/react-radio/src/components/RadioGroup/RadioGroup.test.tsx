import * as React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { isConformant } from '../../common/isConformant';
import { Radio } from '../../Radio';
import { RadioGroup } from './RadioGroup';

describe('RadioGroup', () => {
  isConformant({
    Component: RadioGroup,
    displayName: 'RadioGroup',
  });

  it('renders a default state', () => {
    render(<RadioGroup />);
    expect(screen.getByRole('radiogroup')).toBeTruthy();
  });

  it('applies name to every radio item', () => {
    render(
      <RadioGroup name="test-name">
        <Radio />
        <Radio />
        <Radio />
      </RadioGroup>,
    );
    const items = screen.getAllByRole<HTMLInputElement>('radio');
    expect(items[0].name).toBe('test-name');
    expect(items[1].name).toBe('test-name');
    expect(items[2].name).toBe('test-name');
  });

  it('applies the same generated name to every radio item if a name is not given', () => {
    render(
      <RadioGroup>
        <Radio />
        <Radio />
        <Radio />
      </RadioGroup>,
    );
    const items = screen.getAllByRole<HTMLInputElement>('radio');
    expect(items[0].name).toBeTruthy();
    expect(items[1].name).toBe(items[0].name);
    expect(items[2].name).toBe(items[0].name);
  });

  it('respects radio item name', () => {
    render(
      <RadioGroup>
        <Radio name="test-radio-name" />
        <Radio name="test-radio-name" />
        <Radio name="test-radio-name" />
      </RadioGroup>,
    );
    const items = screen.getAllByRole<HTMLInputElement>('radio');
    expect(items[0].name).toBe('test-radio-name');
    expect(items[1].name).toBe('test-radio-name');
    expect(items[2].name).toBe('test-radio-name');
  });

  it('applies disabled to every radio item', () => {
    render(
      <RadioGroup disabled>
        <Radio />
        <Radio />
        <Radio />
      </RadioGroup>,
    );
    const items = screen.getAllByRole<HTMLInputElement>('radio');
    expect(items[0].disabled).toBe(true);
    expect(items[1].disabled).toBe(true);
    expect(items[2].disabled).toBe(true);
  });

  it('has no radio item selected by default', () => {
    render(
      <RadioGroup>
        <Radio value="a" />
        <Radio value="b" />
        <Radio value="c" />
      </RadioGroup>,
    );
    expect(screen.getByDisplayValue<HTMLInputElement>('a').checked).toBe(false);
    expect(screen.getByDisplayValue<HTMLInputElement>('b').checked).toBe(false);
    expect(screen.getByDisplayValue<HTMLInputElement>('c').checked).toBe(false);
  });

  it('respects defaultValue', () => {
    render(
      <RadioGroup defaultValue="c">
        <Radio value="a" />
        <Radio value="b" />
        <Radio value="c" />
      </RadioGroup>,
    );
    expect(screen.getByDisplayValue<HTMLInputElement>('a').checked).toBe(false);
    expect(screen.getByDisplayValue<HTMLInputElement>('b').checked).toBe(false);
    expect(screen.getByDisplayValue<HTMLInputElement>('c').checked).toBe(true);
  });

  it('ignores changes to defaultValue', () => {
    const { rerender } = render(
      <RadioGroup defaultValue="c">
        <Radio value="a" />
        <Radio value="b" />
        <Radio value="c" />
      </RadioGroup>,
    );
    rerender(
      <RadioGroup defaultValue="b">
        <Radio value="a" />
        <Radio value="b" />
        <Radio value="c" />
      </RadioGroup>,
    );
    expect(screen.getByDisplayValue<HTMLInputElement>('a').checked).toBe(false);
    expect(screen.getByDisplayValue<HTMLInputElement>('b').checked).toBe(false);
    expect(screen.getByDisplayValue<HTMLInputElement>('c').checked).toBe(true);
  });

  it('respects value', () => {
    render(
      <RadioGroup value="a">
        <Radio value="a" />
        <Radio value="b" />
        <Radio value="c" />
      </RadioGroup>,
    );
    expect(screen.getByDisplayValue<HTMLInputElement>('a').checked).toBe(true);
    expect(screen.getByDisplayValue<HTMLInputElement>('b').checked).toBe(false);
    expect(screen.getByDisplayValue<HTMLInputElement>('c').checked).toBe(false);
  });

  it('respects changes to value', () => {
    const { rerender } = render(
      <RadioGroup value="a">
        <Radio value="a" />
        <Radio value="b" />
        <Radio value="c" />
      </RadioGroup>,
    );
    rerender(
      <RadioGroup value="b">
        <Radio value="a" />
        <Radio value="b" />
        <Radio value="c" />
      </RadioGroup>,
    );
    expect(screen.getByDisplayValue<HTMLInputElement>('a').checked).toBe(false);
    expect(screen.getByDisplayValue<HTMLInputElement>('b').checked).toBe(true);
    expect(screen.getByDisplayValue<HTMLInputElement>('c').checked).toBe(false);
  });

  it('respects Radio defaultChecked', () => {
    render(
      <RadioGroup>
        <Radio value="a" />
        <Radio value="b" defaultChecked />
        <Radio value="c" />
      </RadioGroup>,
    );
    expect(screen.getByDisplayValue<HTMLInputElement>('a').checked).toBe(false);
    expect(screen.getByDisplayValue<HTMLInputElement>('b').checked).toBe(true);
    expect(screen.getByDisplayValue<HTMLInputElement>('c').checked).toBe(false);
  });

  it('respects Radio checked', () => {
    render(
      <RadioGroup>
        <Radio value="a" />
        <Radio value="b" checked />
        <Radio value="c" />
      </RadioGroup>,
    );
    expect(screen.getByDisplayValue<HTMLInputElement>('a').checked).toBe(false);
    expect(screen.getByDisplayValue<HTMLInputElement>('b').checked).toBe(true);
    expect(screen.getByDisplayValue<HTMLInputElement>('c').checked).toBe(false);
  });

  it('calls onChange with the correct value', () => {
    const onChange = jest.fn();
    render(
      <RadioGroup onChange={onChange}>
        <Radio value="a" />
        <Radio value="b" />
        <Radio value="c" />
      </RadioGroup>,
    );

    expect(onChange).toBeCalledTimes(0);

    fireEvent.click(screen.getByDisplayValue('b'));
    fireEvent.click(screen.getByDisplayValue('a'));
    fireEvent.click(screen.getByDisplayValue('c'));

    expect(onChange).toBeCalledTimes(3);
    expect(onChange.mock.calls[0][1]).toEqual({ value: 'b' });
    expect(onChange.mock.calls[1][1]).toEqual({ value: 'a' });
    expect(onChange.mock.calls[2][1]).toEqual({ value: 'c' });
  });

  it('calls onChange even when Radio items specify their own name', () => {
    const onChange = jest.fn();
    render(
      <RadioGroup onChange={onChange}>
        <Radio name="test-radio-name" value="a" />
        <Radio name="test-radio-name" value="b" />
        <Radio name="test-radio-name" value="c" />
      </RadioGroup>,
    );

    fireEvent.click(screen.getByDisplayValue('b'));

    expect(onChange.mock.calls[0][1]).toEqual({ value: 'b' });
  });

  it('does not call onChange for non-radio inputs', () => {
    const onChange = jest.fn();
    render(
      <RadioGroup onChange={onChange}>
        <Radio value="a" />
        <Radio value="b" />
        <input type="checkbox" />
        <Radio value="c" />
      </RadioGroup>,
    );

    fireEvent.click(screen.getByRole('checkbox'));

    expect(onChange).not.toHaveBeenCalled();
  });
});
