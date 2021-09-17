import * as React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { on } from './on';

describe('on', () => {
  it('adds an event listener to the specified element', () => {
    const elementRef = React.createRef<HTMLDivElement>();
    let calls = 0;

    const testCallback = () => on(elementRef.current!, 'keydown', () => calls++);

    render(<div ref={elementRef} onClick={testCallback} />);

    fireEvent.click(elementRef.current!);
    expect(calls).toEqual(0);

    fireEvent.keyDown(elementRef.current!, { key: 'ArrowDown' });
    expect(calls).toEqual(1);
  });

  it('removes an event listener from the specified element', () => {
    const elementRef = React.createRef<HTMLDivElement>();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let disposables: any[] = [];
    let calls = 0;

    const testCallback = () => {
      disposables.push(
        on(elementRef.current!, 'keydown', () => calls++),
        on(elementRef.current!, 'pointerup', () => {
          disposables.forEach(dispose => dispose());
          disposables = [];
        }),
      );
    };

    render(<div ref={elementRef} onClick={testCallback} />);

    fireEvent.click(elementRef.current!);
    expect(calls).toEqual(0);

    fireEvent.keyDown(elementRef.current!, { key: 'ArrowDown' });
    expect(calls).toEqual(1);

    fireEvent.pointerUp(elementRef.current!);
    expect(calls).toEqual(1);

    fireEvent.keyDown(elementRef.current!, { key: 'ArrowDown' });
    expect(calls).toEqual(1);
  });
});
