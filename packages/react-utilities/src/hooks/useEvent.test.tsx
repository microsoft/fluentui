import * as React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { useEvent } from './useEvent';

describe('useEvent', () => {
  it('adds an event listener to the specified element', () => {
    const elementRef = React.createRef<HTMLDivElement>();
    const onPointerMoveChange = jest.fn();

    const TestComponent = () => {
      const [activeElement, setActiveElement] = React.useState<HTMLElement | undefined>(undefined);

      const onPointerMove = (ev: React.PointerEvent<HTMLElement>) => {
        onPointerMoveChange();
      };

      const onPointerDown = (ev: React.PointerEvent<HTMLElement>) => {
        setActiveElement(ev.currentTarget);
      };

      useEvent(activeElement, 'pointermove', onPointerMove);

      return <div ref={elementRef} onPointerDown={onPointerDown} />;
    };

    render(<TestComponent />);

    fireEvent.pointerDown(elementRef.current!);
    expect(onPointerMoveChange).toBeCalledTimes(0);

    fireEvent.pointerMove(elementRef.current!);
    expect(onPointerMoveChange).toBeCalledTimes(1);
  });

  it('adds and removes an event listener to the specified element', () => {
    const elementRef = React.createRef<HTMLDivElement>();
    const onPointerUpChange = jest.fn();
    const onPointerMoveChange = jest.fn();

    const TestComponent = () => {
      const [activeElement, setActiveElement] = React.useState<HTMLElement | undefined>(undefined);

      const onPointerMove = (ev: React.PointerEvent<HTMLElement>) => {
        onPointerMoveChange();
      };

      const onPointerUp = (ev: React.PointerEvent<HTMLElement>) => {
        setActiveElement(undefined);
        onPointerUpChange();
      };

      const onPointerDown = (ev: React.PointerEvent<HTMLElement>) => {
        setActiveElement(ev.currentTarget);
      };

      useEvent(activeElement, 'pointermove', onPointerMove);
      useEvent(activeElement, 'pointerup', onPointerUp);

      return <div ref={elementRef} onPointerDown={onPointerDown} />;
    };

    render(<TestComponent />);

    fireEvent.pointerDown(elementRef.current!);
    expect(onPointerMoveChange).toBeCalledTimes(0);
    expect(onPointerUpChange).toBeCalledTimes(0);

    fireEvent.pointerMove(elementRef.current!);
    expect(onPointerMoveChange).toBeCalledTimes(1);
    expect(onPointerUpChange).toBeCalledTimes(0);

    fireEvent.pointerUp(elementRef.current!);
    expect(onPointerMoveChange).toBeCalledTimes(1);
    expect(onPointerUpChange).toBeCalledTimes(1);

    fireEvent.pointerMove(elementRef.current!);
    expect(onPointerMoveChange).toBeCalledTimes(1);
    expect(onPointerUpChange).toBeCalledTimes(1);
  });

  it('unmounts an event listener on a specified element', () => {
    const onPointerMoveChange = jest.fn();

    const TestComponent = () => {
      const [activeElement, setActiveElement] = React.useState<HTMLElement | undefined>(undefined);

      const onPointerMove = (ev: React.PointerEvent<HTMLElement>) => {
        onPointerMoveChange();
      };

      const onPointerDown = (ev: React.PointerEvent<HTMLElement>) => {
        setActiveElement(ev.currentTarget);
      };

      useEvent(activeElement, 'pointermove', onPointerMove);

      return <div data-testid="root" onPointerDown={onPointerDown} />;
    };

    const { unmount } = render(<TestComponent />);
    const componentRoot = screen.getByTestId('root');

    fireEvent.pointerDown(componentRoot);
    expect(onPointerMoveChange).toBeCalledTimes(0);

    fireEvent.pointerMove(componentRoot);
    expect(onPointerMoveChange).toBeCalledTimes(1);

    unmount();

    fireEvent.pointerMove(componentRoot);
    expect(onPointerMoveChange).toBeCalledTimes(1);
  });
});
