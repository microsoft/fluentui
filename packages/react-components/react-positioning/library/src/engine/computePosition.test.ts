import { computePosition } from './computePosition';

describe('computePosition', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('does not report hidden elements without a layout viewport', async () => {
    const target = document.createElement('button');
    const container = document.createElement('div');
    document.body.append(target, container);

    // jsdom has no layout: the root element and both elements measure 0 by 0
    expect(document.documentElement.clientWidth).toBe(0);
    const result = await computePosition(target, container, { placement: 'bottom', strategy: 'absolute' });

    expect(result).toMatchObject({ escaped: false, referenceHidden: false });
  });

  it('reports hidden elements outside of the layout viewport', async () => {
    const target = document.createElement('button');
    const container = document.createElement('div');
    document.body.append(target, container);
    jest.spyOn(document.documentElement, 'clientWidth', 'get').mockReturnValue(10);
    jest.spyOn(document.documentElement, 'clientHeight', 'get').mockReturnValue(10);
    jest.spyOn(target, 'getBoundingClientRect').mockReturnValue({
      x: 100,
      y: 100,
      left: 100,
      top: 100,
      right: 110,
      bottom: 110,
      width: 10,
      height: 10,
    } as DOMRect);

    const result = await computePosition(target, container, { placement: 'bottom', strategy: 'absolute' });

    expect(result).toMatchObject({ escaped: true, referenceHidden: true });
  });
});
