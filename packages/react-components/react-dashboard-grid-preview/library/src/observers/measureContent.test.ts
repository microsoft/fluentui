import { getDashboardGridContentRowSpan, measureDashboardGridContent } from './measureContent';

describe('measureDashboardGridContent', () => {
  it('reports text-only content instead of unstable geometry', () => {
    const element = document.createElement('div');
    element.textContent = 'Text only';

    expect(measureDashboardGridContent(element)).toEqual({
      status: 'text-only',
      blockSize: 0,
    });
  });

  it('rounds content height up to rows and applies a maximum', () => {
    expect(getDashboardGridContentRowSpan(101, 50)).toBe(3);
    expect(getDashboardGridContentRowSpan(101, 50, 2)).toBe(2);
  });
});
