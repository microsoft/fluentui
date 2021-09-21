import * as React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { on } from './on';

describe('on', () => {
  it('adds an event listener to the specified element', () => {
    const elementRef = React.createRef<HTMLDivElement>();
    const onChange = jest.fn();

    const testCallback = () => on(elementRef.current!, 'keydown', () => onChange());

    render(<div ref={elementRef} onClick={testCallback} />);

    fireEvent.click(elementRef.current!);
    expect(onChange).toBeCalledTimes(0);

    fireEvent.keyDown(elementRef.current!, { key: 'ArrowDown' });
    expect(onChange).toBeCalledTimes(1);
  });

  it('removes an event listener from the specified element', () => {
    const elementRef = React.createRef<HTMLDivElement>();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let disposables: any[] = [];
    const onChange = jest.fn();

    const testCallback = () => {
      disposables.push(
        on(elementRef.current!, 'keydown', () => onChange()),
        on(elementRef.current!, 'pointerup', () => {
          disposables.forEach(dispose => dispose());
          disposables = [];
        }),
      );
    };

    render(<div ref={elementRef} onClick={testCallback} />);

    fireEvent.click(elementRef.current!);
    expect(onChange).toBeCalledTimes(0);

    fireEvent.keyDown(elementRef.current!, { key: 'ArrowDown' });
    expect(onChange).toBeCalledTimes(1);

    fireEvent.pointerUp(elementRef.current!);
    expect(onChange).toBeCalledTimes(1);

    fireEvent.keyDown(elementRef.current!, { key: 'ArrowDown' });
    expect(onChange).toBeCalledTimes(1);
  });
});
