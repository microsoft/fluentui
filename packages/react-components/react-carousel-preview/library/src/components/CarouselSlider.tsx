import * as React from 'react';
import { useDisposable } from 'use-disposable';
import { useCarouselStore_unstable } from './useCarouselStore';

export const CarouselSliderContext = React.createContext<HTMLDivElement[]>([]);

export function CarouselSlider(props: { children: React.ReactNode; peeking?: boolean; cards?: number }) {
  const { children, peeking, cards = 1 } = props;
  const bufferSize = 2; // TODO: customize the value

  const ref = React.useRef<HTMLDivElement>(null);
  const buffer = useDisposable<HTMLDivElement[]>(() => {
    const buffer = Array.from({ length: bufferSize * 2 }, () => document.createElement('div'));

    for (let i = 0; i < buffer.length; i++) {
      if (i >= bufferSize) {
        buffer[i].dataset.carouselSlider = 'right';
        buffer[i].style.border = '2px solid green';
      } else {
        buffer[i].dataset.carouselSlider = 'left';
        buffer[i].style.border = '2px solid red';
      }
    }

    return [
      buffer,
      () => {
        buffer.forEach(el => el.remove());
      },
    ];
  }, [bufferSize]);

  React.useLayoutEffect(() => {
    if (buffer) {
      for (let i = 0; i < buffer.length; i++) {
        if (i >= bufferSize) {
          ref.current?.append(buffer[i]);
        } else {
          ref.current?.prepend(buffer[i]);
        }
      }
    }
  }, [buffer, bufferSize]);

  return (
    <div
      className="CarouselSlider"
      ref={ref}
      style={{
        display: 'grid',
        overflow: 'hidden',

        gridAutoColumns: `${100 / cards}%`,
        gridAutoFlow: 'column',

        scrollSnapType: 'x mandatory',

        ...(peeking && {
          padding: '5%',
          // scrollPaddingInline: '5%',
        }),
      }}
    >
      <CarouselSliderContext.Provider value={buffer ?? []}>{children}</CarouselSliderContext.Provider>
    </div>
  );
}
