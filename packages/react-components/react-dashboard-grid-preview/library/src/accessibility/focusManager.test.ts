import { findDashboardGridGeometricNeighbor, getDashboardGridDeepActiveElement } from './focusManager';

const setRect = (element: HTMLElement, left: number, top: number, width = 20, height = 20) => {
  jest.spyOn(element, 'getBoundingClientRect').mockReturnValue({
    x: left,
    y: top,
    left,
    top,
    right: left + width,
    bottom: top + height,
    width,
    height,
    toJSON: () => ({}),
  } as DOMRect);
};

describe('dashboard grid focus utilities', () => {
  it('selects the nearest geometric neighbor with cross-axis overlap', () => {
    const current = document.createElement('button');
    const nearRight = document.createElement('button');
    const diagonalRight = document.createElement('button');
    document.body.append(current, nearRight, diagonalRight);
    setRect(current, 0, 0);
    setRect(nearRight, 30, 0);
    setRect(diagonalRight, 25, 100);

    expect(findDashboardGridGeometricNeighbor(current, [diagonalRight, nearRight], 'right')).toBe(nearRight);
  });

  it('finds the deepest focused element inside open Shadow DOM', () => {
    const host = document.createElement('div');
    document.body.appendChild(host);
    const shadowRoot = host.attachShadow({ mode: 'open' });
    const button = document.createElement('button');
    shadowRoot.appendChild(button);
    button.focus();

    expect(getDashboardGridDeepActiveElement(document)).toBe(button);
  });
});
