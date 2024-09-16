import { Platform, computePosition } from '@floating-ui/dom';
import { resetMaxSize } from './maxSize';

const referenceRect: Partial<DOMRect> = { x: 0, y: 0, width: 100, height: 100 };
const floatingRect: Partial<DOMRect> = { x: 0, y: 0, width: 50, height: 50 };
const mockGetElementRects = jest.fn(() =>
  Promise.resolve({
    reference: referenceRect,
    floating: floatingRect,
  }),
);
const platform = {
  getElementRects: mockGetElementRects,
} as Partial<Platform> as Platform;

describe('maxSize', () => {
  it('resetMaxSize reset once per life cycle', async () => {
    expect.hasAssertions();
    const button = document.createElement('div');
    const tooltip = document.createElement('div');
    const autoSize = { applyMaxHeight: true, applyMaxWidth: true };

    await computePosition(button, tooltip, {
      placement: 'right',
      middleware: [resetMaxSize(autoSize)],
      platform,
    });
    expect(mockGetElementRects).toHaveBeenCalledTimes(2);
  });
});
