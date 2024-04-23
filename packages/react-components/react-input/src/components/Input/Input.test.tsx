import * as React from 'react';
import { render, RenderResult, fireEvent, screen } from '@testing-library/react';
import { Field } from '@fluentui/react-field';
import { Input } from './Input';
import { isConformant } from '../../testing/isConformant';

function getInput(): HTMLInputElement {
  return screen.getByRole('textbox') as HTMLInputElement;
}

describe('Input', () => {
  let renderedComponent: RenderResult | undefined;

  afterEach(() => {
    jest.clearAllMocks();
    if (renderedComponent) {
      renderedComponent.unmount();
      renderedComponent = undefined;
    }
  });

  isConformant({
    Component: Input,
    displayName: 'Input',
    primarySlot: 'input',
    testOptions: {
      'has-static-classnames': [
        {
          props: {
            contentBefore: 'Test Content Before',
            contentAfter: 'Test Content After',
          },
        },
      ],
      'consistent-callback-args': {
        legacyCallbacks: ['onChange'],
      },
    },
  });

  it('renders a default state', () => {
    const result = render(<Input />);
    expect(result.container).toMatchSnapshot();
  });

  it('respects value', () => {
    renderedComponent = render(<Input value="hello" />);
    expect(getInput().value).toEqual('hello');
  });

  it('respects updates to value', () => {
    renderedComponent = render(<Input value="hello" />);
    expect(getInput().value).toEqual('hello');

    renderedComponent.rerender(<Input value="world" />);
    expect(getInput().value).toEqual('world');
  });

  it('respects defaultValue', () => {
    renderedComponent = render(<Input defaultValue="hello" />);
    expect(getInput().value).toEqual('hello');
  });

  it('ignores updates to defaultValue', () => {
    renderedComponent = render(<Input defaultValue="hello" />);
    expect(getInput().value).toEqual('hello');

    renderedComponent.rerender(<Input defaultValue="world" />);
    expect(getInput().value).toEqual('hello');
  });

  it('prefers value over defaultValue', () => {
    renderedComponent = render(<Input value="hello" defaultValue="world" />);
    expect(getInput().value).toEqual('hello');
  });

  it('with value, calls onChange but does not update on text entry', () => {
    const onChange = jest.fn();
    renderedComponent = render(<Input value="hello" onChange={onChange} />);
    const input = getInput();
    fireEvent.change(input, { target: { value: 'world' } });
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange.mock.calls[0][1]).toEqual({ value: 'world' });
    expect(input.value).toBe('hello');
  });

  it('with defaultValue, calls onChange and updates value on text entry', () => {
    const onChange = jest.fn();
    renderedComponent = render(<Input defaultValue="hello" onChange={onChange} />);
    const input = getInput();
    fireEvent.change(input, { target: { value: 'world' } });
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange.mock.calls[0][1]).toEqual({ value: 'world' });
    expect(input.value).toBe('world');
  });

  it('does not call onChange when value prop updates', () => {
    const onChange = jest.fn();
    renderedComponent = render(<Input value="hello" onChange={onChange} />);
    renderedComponent.rerender(<Input value="world" onChange={onChange} />);
    expect(onChange).toHaveBeenCalledTimes(0);
  });

  it('gets props from a surrounding Field', () => {
    renderedComponent = render(
      <Field label="Test label" validationMessage="Test error message" required>
        <Input />
      </Field>,
    );

    const input = renderedComponent.getByRole('textbox') as HTMLInputElement;
    const label = renderedComponent.getByText('Test label') as HTMLLabelElement;
    const message = renderedComponent.getByText('Test error message');

    expect(input.id).toEqual(label.htmlFor);
    expect(input.getAttribute('aria-describedby')).toEqual(message.id);
    expect(input.getAttribute('aria-invalid')).toEqual('true');
    expect(input.required).toBe(true);
  });

  it('does not emit error when uncontrolled', () => {
    const spy = jest.spyOn(console, 'error');
    renderedComponent = render(<Input />);

    const input = renderedComponent.getByRole('textbox') as HTMLInputElement;

    fireEvent.change(input, { target: { value: 'foo' } });
    expect(input.value).toBe('foo');
    expect(spy).not.toHaveBeenCalled();
  });
});
