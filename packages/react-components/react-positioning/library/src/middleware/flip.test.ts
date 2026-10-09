import { computePosition } from '@floating-ui/dom';
import { renderHook } from '@testing-library/react-hooks';
import { flip } from './flip';
import { usePositioningOptions } from '../usePositioningOptions';

const referenceRect = { x: 80, y: 55, width: 20, height: 10 };
const floatingRect = { x: 0, y: 0, width: 40, height: 50 };
const boundaryRect = { x: 0, y: 0, width: 200, height: 125 };

const platform = {
  getElementRects: async () => ({
    reference: referenceRect,
    floating: floatingRect,
  }),
  getClippingRect: async () => boundaryRect,
} as never;

describe('flip', () => {
  it.each([
    [undefined, 'top', 5],
    [0, 'top', 5],
    [10, 'bottom', 65],
  ])('uses flipBoundaryPadding %s to select the expected placement', async (flipBoundaryPadding, placement, y) => {
    const result = await computePosition(document.createElement('div'), document.createElement('div'), {
      placement: 'top',
      middleware: [
        flip({
          container: null,
          flipBoundaryPadding,
        }),
      ],
      platform,
    });

    expect(result).toMatchObject({ placement, x: 70, y });
  });

  it('passes flipBoundaryPadding from usePositioningOptions to flip', async () => {
    const { result: positioningOptions } = renderHook(() =>
      usePositioningOptions({ position: 'above', flipBoundaryPadding: 10 }),
    );
    const options = positioningOptions.current(document.createElement('div'), null);
    const flipMiddleware = options.middleware.find(middleware => middleware.name === 'flip');

    const result = await computePosition(document.createElement('div'), document.createElement('div'), {
      placement: 'top',
      middleware: [flipMiddleware!],
      platform,
    });

    expect(result).toMatchObject({ placement: 'bottom', x: 70, y: 65 });
  });

  it('does not use overflowBoundaryPadding for flipping', async () => {
    const { result: positioningOptions } = renderHook(() =>
      usePositioningOptions({ position: 'above', overflowBoundaryPadding: 10 }),
    );
    const options = positioningOptions.current(document.createElement('div'), null);
    const flipMiddleware = options.middleware.find(middleware => middleware.name === 'flip');

    const result = await computePosition(document.createElement('div'), document.createElement('div'), {
      placement: 'top',
      middleware: [flipMiddleware!],
      platform,
    });

    expect(result).toMatchObject({ placement: 'top', x: 70, y: 5 });
  });
});
