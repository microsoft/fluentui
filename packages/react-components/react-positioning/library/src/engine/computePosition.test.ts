import { computePosition, limit } from './computePosition';

describe('computePosition', () => {
  afterEach(() => {
    jest.restoreAllMocks();
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

  it('reports the result to the Floating UI devtools outside of production', async () => {
    const target = document.createElement('button');
    const container = document.createElement('div');
    const boundary = document.createElement('div');
    document.body.append(target, container, boundary);

    await computePosition(target, container, {
      placement: 'top-start',
      strategy: 'fixed',
      options: { flipBoundary: boundary },
    });

    const metadata = (container as unknown as Record<string, { serializedData: Record<string, unknown>[] }>)
      .__FUIDT_ELEMENT_METADATA__;
    expect(metadata.serializedData).toHaveLength(1);
    expect(metadata.serializedData[0]).toMatchObject({
      type: 'FluentUIMiddleware',
      initialPlacement: { position: 'above', alignment: 'start' },
      placement: { position: 'above', alignment: 'start' },
      middlewareState: {
        strategy: 'fixed',
        rects: { floating: { x: 0, y: 0, width: 0, height: 0 } },
        middlewareData: { hide: { escaped: false, referenceHidden: false }, intersectionObserver: {} },
      },
    });
    expect(metadata.serializedData[0].flipBoundaries).toHaveLength(1);
  });
});

describe('limit', () => {
  it('limits a value to ordered bounds', () => {
    expect(limit(10, 5, 20)).toBe(10);
    expect(limit(10, 15, 20)).toBe(15);
    expect(limit(10, 25, 20)).toBe(20);
  });

  it('prefers the upper bound when the bounds are inverted, unless the value is below the lower one', () => {
    expect(limit(380, 380, 280)).toBe(280);
    expect(limit(380, 400, 280)).toBe(280);
    expect(limit(380, 300, 280)).toBe(380);
  });
});
