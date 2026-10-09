import { computePosition } from '../floating';
import { getElementRects } from '../floating/platform';
import { resetMaxSize } from './maxSize';

jest.mock('../floating/platform', () => ({
  ...jest.requireActual('../floating/platform'),
  getElementRects: jest.fn(() => ({
    reference: { x: 0, y: 0, width: 100, height: 100 },
    floating: { x: 0, y: 0, width: 50, height: 50 },
  })),
}));

describe('maxSize', () => {
  it('resetMaxSize reset once per life cycle', () => {
    const button = document.createElement('div');
    const tooltip = document.createElement('div');
    const autoSize = { applyMaxHeight: true, applyMaxWidth: true };

    computePosition(button, tooltip, {
      placement: 'right',
      middleware: [resetMaxSize(autoSize)],
    });

    expect(getElementRects).toHaveBeenCalledTimes(2);
  });
});
