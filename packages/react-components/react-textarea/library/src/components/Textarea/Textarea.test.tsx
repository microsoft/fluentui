import * as React from 'react';
import type { RenderResult } from '@testing-library/react';
import { fireEvent, render, screen } from '@testing-library/react';
import { Field } from '@fluentui/react-field';
import { renderHook } from '@testing-library/react-hooks';
import { Textarea } from './Textarea';
import { useTextareaBase_unstable } from './useTextarea';
import { isConformant } from '../../testing/isConformant';

function getTextarea(): HTMLTextAreaElement {
  return screen.getByRole('textbox') as HTMLTextAreaElement;
}

describe('Textarea', () => {
  let renderedComponent: RenderResult | undefined;

  afterEach(() => {
    if (renderedComponent) {
      renderedComponent.unmount();
      renderedComponent = undefined;
    }
  });

  isConformant({
    Component: Textarea,
    displayName: 'Textarea',
    primarySlot: 'textarea',
    testOptions: {
      'consistent-callback-args': {
        legacyCallbacks: ['onChange'],
      },
    },
  });

  // TODO create visual regression tests in /apps/vr-tests

  it('renders a default state', () => {
    const result = render(<Textarea />);
    expect(result.container).toMatchSnapshot();
  });

  it('respects value', () => {
    renderedComponent = render(<Textarea value="foo" />);
    expect(getTextarea().value).toEqual('foo');
  });

  it('respects updates to value', () => {
    renderedComponent = render(<Textarea value="foo" />);
    expect(getTextarea().value).toEqual('foo');

    renderedComponent.rerender(<Textarea value="bar" />);
    expect(getTextarea().value).toEqual('bar');
  });

  it('respects updated to value', () => {
    renderedComponent = render(<Textarea defaultValue="foo" />);
    expect(getTextarea().value).toEqual('foo');
  });

  it('ignores updated to defaultValue', () => {
    renderedComponent = render(<Textarea defaultValue="foo" />);
    expect(getTextarea().value).toEqual('foo');

    renderedComponent.rerender(<Textarea defaultValue="bar" />);
    expect(getTextarea().value).toEqual('foo');
  });

  it('prefers value over defaultValue', () => {
    renderedComponent = render(<Textarea value="bar" defaultValue="foo" />);
    expect(getTextarea().value).toEqual('bar');
  });

  it('with value, calls onChange but does not update on text entry', () => {
    const onChange = jest.fn();
    renderedComponent = render(<Textarea value="foo" onChange={onChange} />);
    const textarea = getTextarea();
    fireEvent.change(textarea, { target: { value: 'bar' } });
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange.mock.calls[0][1]).toEqual({ value: 'bar' });
    expect(textarea.value).toBe('foo');
  });

  it('with defaultValue, calls onChange and updates value on text entry', () => {
    const onChange = jest.fn();
    renderedComponent = render(<Textarea defaultValue="foo" onChange={onChange} />);
    const textarea = getTextarea();
    fireEvent.change(textarea, { target: { value: 'bar' } });
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange.mock.calls[0][1]).toEqual({ value: 'bar' });
    expect(textarea.value).toBe('bar');
  });

  it('does not call onChange when value prop updates', () => {
    const onChange = jest.fn();
    renderedComponent = render(<Textarea value="foo" onChange={onChange} />);
    renderedComponent.rerender(<Textarea value="bar" onChange={onChange} />);
    expect(onChange).toHaveBeenCalledTimes(0);
  });

  it('gets props from a surrounding Field', () => {
    const result = render(
      <Field label="Test label" validationMessage="Test error message" required>
        <Textarea />
      </Field>,
    );

    const textarea = result.getByRole('textbox') as HTMLTextAreaElement;
    const label = result.getByText('Test label') as HTMLLabelElement;
    const message = result.getByText('Test error message');

    expect(textarea.id).toEqual(label.htmlFor);
    expect(textarea.getAttribute('aria-describedby')).toEqual(message.id);
    expect(textarea.getAttribute('aria-invalid')).toEqual('true');
    expect(textarea.required).toBe(true);
  });
});

describe('Textarea DOM attributes', () => {
  it('does not render component props as DOM attributes', () => {
    const consoleError = jest.spyOn(console, 'error').mockImplementation(() => undefined);
    const { container } = render(
      <Textarea
        appearance="filled-darker"
        className="custom"
        defaultValue="value"
        onChange={jest.fn()}
        placeholder="placeholder"
        resize="both"
        size="large"
        style={{ color: 'red' }}
      />,
    );

    expect(consoleError).not.toHaveBeenCalled();
    consoleError.mockRestore();
    expect((container.firstElementChild as HTMLElement).getAttributeNames().sort()).toEqual(['class', 'style']);
    expect(screen.getByRole('textbox').getAttributeNames().sort()).toEqual(['class', 'placeholder']);
  });

  it('does not forward slot or state props from the base hook to the textarea slot', () => {
    const { result } = renderHook(() =>
      useTextareaBase_unstable({ className: 'custom', defaultValue: 'value', placeholder: 'p', resize: 'both' }),
    );

    expect(result.current.root.className).toBe('custom');
    expect(result.current.textarea.placeholder).toBe('p');
    expect(result.current.textarea).not.toHaveProperty('className');
    expect(result.current.textarea).not.toHaveProperty('defaultValue');
    expect(result.current.textarea).not.toHaveProperty('resize');
  });
});
