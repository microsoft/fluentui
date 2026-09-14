import {
  findNearestDashboardGridScrollAncestor,
  getDashboardGridAutoScrollDelta,
  getDashboardGridAutoScrollSpeed,
} from './autoScroll';

describe('dashboard grid auto scroll', () => {
  it('uses the source-backed speed and viewport cap', () => {
    expect(getDashboardGridAutoScrollSpeed(20, 300)).toBe(4);
    expect(getDashboardGridAutoScrollSpeed(30, 1500)).toBe(10);
    expect(getDashboardGridAutoScrollSpeed(4, 300)).toBe(2);
  });

  it('scrolls only while a preview partially clips the viewport', () => {
    const viewport = { top: 100, bottom: 300, height: 200 };
    expect(getDashboardGridAutoScrollDelta({ top: 80, bottom: 140 }, viewport)).toBe(-4);
    expect(getDashboardGridAutoScrollDelta({ top: 260, bottom: 340 }, viewport)).toBe(4);
    expect(getDashboardGridAutoScrollDelta({ top: 120, bottom: 220 }, viewport)).toBe(0);
    expect(getDashboardGridAutoScrollDelta({ top: 320, bottom: 360 }, viewport)).toBe(0);
  });

  it('finds the nearest composed-tree scroll container', () => {
    const scroller = document.createElement('div');
    scroller.style.overflowY = 'auto';
    Object.defineProperties(scroller, {
      scrollHeight: { configurable: true, value: 500 },
      clientHeight: { configurable: true, value: 100 },
    });
    const host = document.createElement('div');
    scroller.appendChild(host);
    document.body.appendChild(scroller);
    const shadowRoot = host.attachShadow({ mode: 'open' });
    const grid = document.createElement('div');
    shadowRoot.appendChild(grid);

    expect(findNearestDashboardGridScrollAncestor(grid, document)).toBe(scroller);
  });
});
