import * as React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { useCapture } from './useCapture';

type EventData = {
  element?: HTMLElement;
  disabled: boolean;
  pointerId: number;
};

describe('useCapture', () => {
  it('captures a given pointer id', () => {
    const elementRef = React.createRef<HTMLDivElement>();
    const imperativeRef = React.createRef();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const TestComponent = React.forwardRef((props, ref: any) => {
      const [eventData, setEventData] = React.useState<EventData>({
        element: undefined,
        disabled: true,
        pointerId: 0,
      });

      const onPointerDown = (ev: React.PointerEvent<HTMLElement>) => {
        setEventData({
          element: ev.currentTarget,
          disabled: false,
          pointerId: ev.pointerId,
        });
      };

      React.useImperativeHandle(ref, () => ({
        activeElement: eventData.element,
        pointerId: eventData.pointerId,
      }));

      useCapture({
        element: eventData.element,
        disabled: eventData.disabled,
        pointerId: eventData.pointerId,
      });

      return <div ref={elementRef} onPointerDown={onPointerDown} />;
    });

    render(<TestComponent ref={imperativeRef} />);

    fireEvent.pointerDown(elementRef.current!);
    imperativeRef.current.element.hasPointerCapture(imperativeRef.current.pointerId);

    fireEvent.pointerMove(elementRef.current!);
  });
});
