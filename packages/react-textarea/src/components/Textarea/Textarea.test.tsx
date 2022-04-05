import * as React from 'react';
import { fireEvent, render, RenderResult, screen } from '@testing-library/react';
import { Textarea } from './Textarea';
import { isConformant } from '../../common/isConformant';

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
    disabledTests: ['component-has-static-classname', 'component-has-static-classname-exported'],
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
});
