import * as React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Field } from '@fluentui/react-field';
import { isConformant } from '../../testing/isConformant';
import { Radio } from '../../Radio';
import { RadioGroup } from './RadioGroup';

describe('RadioGroup', () => {
  isConformant({
    Component: RadioGroup,
    displayName: 'RadioGroup',
    testOptions: {
      'consistent-callback-args': {
        legacyCallbacks: ['onChange'],
      },
    },
  });

  it('renders a default state', () => {
    const { getByRole } = render(<RadioGroup />);
    expect(getByRole('radiogroup')).toBeTruthy();
  });

  it('applies name to every radio item', () => {
    const { getAllByRole } = render(
      <RadioGroup name="test-name">
        <Radio />
        <Radio />
        <Radio />
      </RadioGroup>,
    );
    const items = getAllByRole('radio') as HTMLInputElement[];
    expect(items[0].name).toBe('test-name');
    expect(items[1].name).toBe('test-name');
    expect(items[2].name).toBe('test-name');
  });

  it('applies the same generated name to every radio item if a name is not given', () => {
    const { getAllByRole } = render(
      <RadioGroup>
        <Radio />
        <Radio />
        <Radio />
      </RadioGroup>,
    );
    const items = getAllByRole('radio') as HTMLInputElement[];
    expect(items[0].name).toBeTruthy();
    expect(items[1].name).toBe(items[0].name);
    expect(items[2].name).toBe(items[0].name);
  });

  it('respects radio item name', () => {
    const { getAllByRole } = render(
      <RadioGroup>
        <Radio name="test-radio-name" />
        <Radio name="test-radio-name" />
        <Radio name="test-radio-name" />
      </RadioGroup>,
    );
    const items = getAllByRole('radio') as HTMLInputElement[];
    expect(items[0].name).toBe('test-radio-name');
    expect(items[1].name).toBe('test-radio-name');
    expect(items[2].name).toBe('test-radio-name');
  });

  it('applies disabled to every radio item', () => {
    const { getAllByRole } = render(
      <RadioGroup disabled>
        <Radio />
        <Radio />
        <Radio />
      </RadioGroup>,
    );
    const items = getAllByRole('radio') as HTMLInputElement[];
    expect(items[0].disabled).toBe(true);
    expect(items[1].disabled).toBe(true);
    expect(items[2].disabled).toBe(true);
  });

  it('applies required to every radio item', () => {
    const { getAllByRole } = render(
      <RadioGroup required>
        <Radio />
        <Radio />
        <Radio />
      </RadioGroup>,
    );
    const items = getAllByRole('radio') as HTMLInputElement[];
    expect(items[0].required).toBe(true);
    expect(items[1].required).toBe(true);
    expect(items[2].required).toBe(true);
  });

  it('applies aria-describedby to every radio item, unless overridden locally', () => {
    const { getAllByRole } = render(
      <RadioGroup aria-describedby="test-describedby">
        <Radio />
        <Radio />
        <Radio aria-describedby="overridden-describedby" />
      </RadioGroup>,
    );

    const items = getAllByRole('radio') as HTMLInputElement[];
    expect(items[0].getAttribute('aria-describedby')).toEqual('test-describedby');
    expect(items[1].getAttribute('aria-describedby')).toEqual('test-describedby');
    expect(items[2].getAttribute('aria-describedby')).toEqual('overridden-describedby');
  });

  it('has no radio item selected by default', () => {
    const { getByDisplayValue } = render(
      <RadioGroup>
        <Radio value="a" />
        <Radio value="b" />
        <Radio value="c" />
      </RadioGroup>,
    );
    expect((getByDisplayValue('a') as HTMLInputElement).checked).toBe(false);
    expect((getByDisplayValue('b') as HTMLInputElement).checked).toBe(false);
    expect((getByDisplayValue('c') as HTMLInputElement).checked).toBe(false);
  });

  it('respects defaultValue', () => {
    const { getByDisplayValue } = render(
      <RadioGroup defaultValue="c">
        <Radio value="a" />
        <Radio value="b" />
        <Radio value="c" />
      </RadioGroup>,
    );
    expect((getByDisplayValue('a') as HTMLInputElement).checked).toBe(false);
    expect((getByDisplayValue('b') as HTMLInputElement).checked).toBe(false);
    expect((getByDisplayValue('c') as HTMLInputElement).checked).toBe(true);
  });

  it('ignores changes to defaultValue', () => {
    const { rerender, getByDisplayValue } = render(
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
    expect((getByDisplayValue('a') as HTMLInputElement).checked).toBe(false);
    expect((getByDisplayValue('b') as HTMLInputElement).checked).toBe(false);
    expect((getByDisplayValue('c') as HTMLInputElement).checked).toBe(true);
  });

  it('respects value', () => {
    const { getByDisplayValue } = render(
      <RadioGroup value="a">
        <Radio value="a" />
        <Radio value="b" />
        <Radio value="c" />
      </RadioGroup>,
    );
    expect((getByDisplayValue('a') as HTMLInputElement).checked).toBe(true);
    expect((getByDisplayValue('b') as HTMLInputElement).checked).toBe(false);
    expect((getByDisplayValue('c') as HTMLInputElement).checked).toBe(false);
  });

  it('respects changes to value', () => {
    const { rerender, getByDisplayValue } = render(
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
    expect((getByDisplayValue('a') as HTMLInputElement).checked).toBe(false);
    expect((getByDisplayValue('b') as HTMLInputElement).checked).toBe(true);
    expect((getByDisplayValue('c') as HTMLInputElement).checked).toBe(false);
  });

  it('respects Radio defaultChecked', () => {
    const { getByDisplayValue } = render(
      <RadioGroup>
        <Radio value="a" />
        <Radio value="b" defaultChecked />
        <Radio value="c" />
      </RadioGroup>,
    );
    expect((getByDisplayValue('a') as HTMLInputElement).checked).toBe(false);
    expect((getByDisplayValue('b') as HTMLInputElement).checked).toBe(true);
    expect((getByDisplayValue('c') as HTMLInputElement).checked).toBe(false);
  });

  it('respects Radio checked', () => {
    const { getByDisplayValue } = render(
      <RadioGroup>
        <Radio value="a" />
        <Radio value="b" checked onChange={() => undefined} />
        <Radio value="c" />
      </RadioGroup>,
    );
    expect((getByDisplayValue('a') as HTMLInputElement).checked).toBe(false);
    expect((getByDisplayValue('b') as HTMLInputElement).checked).toBe(true);
    expect((getByDisplayValue('c') as HTMLInputElement).checked).toBe(false);
  });

  it('calls onChange with the correct value', () => {
    const onChange = jest.fn();
    const { getByDisplayValue } = render(
      <RadioGroup onChange={onChange}>
        <Radio value="a" />
        <Radio value="b" />
        <Radio value="c" />
      </RadioGroup>,
    );

    expect(onChange).toBeCalledTimes(0);

    userEvent.click(getByDisplayValue('b'));
    userEvent.click(getByDisplayValue('a'));
    userEvent.click(getByDisplayValue('c'));

    expect(onChange).toBeCalledTimes(3);
    expect(onChange.mock.calls[0][1]).toEqual({ value: 'b' });
    expect(onChange.mock.calls[1][1]).toEqual({ value: 'a' });
    expect(onChange.mock.calls[2][1]).toEqual({ value: 'c' });
  });

  it('calls onChange even when Radio items specify their own name', () => {
    const onChange = jest.fn();
    const { getByDisplayValue } = render(
      <RadioGroup onChange={onChange}>
        <Radio name="test-radio-name" value="a" />
        <Radio name="test-radio-name" value="b" />
        <Radio name="test-radio-name" value="c" />
      </RadioGroup>,
    );

    userEvent.click(getByDisplayValue('b'));

    expect(onChange.mock.calls[0][1]).toEqual({ value: 'b' });
  });

  it('does not call onChange for non-radio inputs', () => {
    const onChange = jest.fn();
    const { getByRole } = render(
      <RadioGroup onChange={onChange}>
        <Radio value="a" />
        <Radio value="b" />
        <input type="checkbox" />
        <Radio value="c" />
      </RadioGroup>,
    );

    userEvent.click(getByRole('checkbox'));

    expect(onChange).not.toHaveBeenCalled();
  });

  it('gets props from a surrounding Field', () => {
    const result = render(
      <Field label="Test label" validationMessage="Test error message" required>
        <RadioGroup>
          <Radio value="a" />
          <Radio value="b" />
          <Radio value="c" />
        </RadioGroup>
      </Field>,
    );

    const radiogroup = result.getByRole('radiogroup');
    const label = result.getByText('Test label') as HTMLLabelElement;
    const message = result.getByText('Test error message');

    expect(radiogroup.getAttribute('aria-labelledby')).toEqual(label.id);
    expect(radiogroup.getAttribute('aria-describedby')).toEqual(message.id);
    expect(radiogroup.getAttribute('aria-required')).toEqual('true');
  });
});
