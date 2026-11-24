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

  it.each([
    // Only bottom-end fits on its side; it misses the flip boundary by one pixel on its alignment axis.
    { height: 100, placement: 'bottom-end', lastOffset: 'below-end', x: 2, y: 24 },
    // No side fits. The initial left-end has the least total overflow.
    { height: 21, placement: 'left-end', lastOffset: 'before-bottom', x: -9, y: 5 },
  ])('retries duplicate candidates and restores $placement with its RTL geometry', async testCase => {
    const target = {
      getBoundingClientRect: () => ({ x: 5, y: 12, left: 5, top: 12, right: 35, bottom: 22, width: 30, height: 10 }),
    };
    const container = document.createElement('div');
    document.body.append(container);
    container.style.direction = 'rtl';
    jest.spyOn(container, 'offsetWidth', 'get').mockReturnValue(12);
    jest.spyOn(container, 'offsetHeight', 'get').mockReturnValue(20);
    jest.spyOn(document.documentElement, 'clientWidth', 'get').mockReturnValue(100);
    jest.spyOn(document.documentElement, 'clientHeight', 'get').mockReturnValue(100);

    const attempts: string[] = [];
    const result = await computePosition(target, container, {
      placement: 'left-end',
      strategy: 'fixed',
      isRtl: true,
      options: {
        // In RTL after-bottom repeats left-end. The offset must still run for both attempts.
        fallbackPositions: ['after-bottom', 'below-end', 'after-top'],
        flipBoundary: { x: 3, y: 0, width: 97, height: testCase.height },
        offset: ({ position, alignment }) => {
          attempts.push(`${position}-${alignment}`);
          return { mainAxis: 2, crossAxis: 3 };
        },
      },
    });

    expect(attempts).toEqual(['before-bottom', 'before-bottom', 'below-end', 'before-top', testCase.lastOffset]);
    expect(result).toMatchObject({ placement: testCase.placement, x: testCase.x, y: testCase.y });
  });

  it.each([
    { height: 100, autoSize: false, duplicates: 50 },
    { height: 23, autoSize: false, duplicates: 50 },
    // The initial auto-size style reset consumes one reset before flipping starts.
    { height: 23, autoSize: true, duplicates: 49 },
  ])('finishes the last accepted flip at the reset cap (height $height, autoSize $autoSize)', async testCase => {
    const { height, autoSize, duplicates } = testCase;
    const target = {
      getBoundingClientRect: () => ({ x: 10, y: 4, left: 10, top: 4, right: 18, bottom: 12, width: 8, height: 8 }),
    };
    const container = document.createElement('div');
    const arrow = container.appendChild(document.createElement('div'));
    document.body.append(container);
    jest.spyOn(document.documentElement, 'clientWidth', 'get').mockReturnValue(100);
    jest.spyOn(document.documentElement, 'clientHeight', 'get').mockReturnValue(height);
    jest.spyOn(container, 'offsetWidth', 'get').mockReturnValue(20);
    jest.spyOn(container, 'offsetHeight', 'get').mockImplementation(() => parseFloat(container.style.height) || 16);
    jest.spyOn(arrow, 'offsetWidth', 'get').mockReturnValue(4);

    const calls: string[] = [];
    const result = await computePosition(target, container, {
      strategy: 'fixed',
      placement: 'top',
      arrow,
      options: {
        fallbackPositions: [...Array<'above'>(duplicates).fill('above'), 'below', 'after'],
        autoSize: autoSize && 'height',
        offset: ({ position }) => {
          calls.push(position);
          return 2;
        },
        overflowBoundaryPadding: { start: 9 },
      },
    });

    // Floating UI core 1.6.8 accepts reset #51, then finishes offset, shift and arrow on bottom.
    // At height 23 bottom still overflows; the request to try "after" must not change the reported placement.
    expect(result).toMatchObject({ placement: 'bottom', x: 9, y: 14, arrow: { x: 3 }, intersecting: height === 23 });
    expect(calls).toEqual([...Array(duplicates + 1).fill('above'), 'below']);
    if (autoSize) {
      // Size still writes its constraint, but its remeasurement request is ignored and arrow runs on this pass.
      expect(container.style.height).toBe('9px');
    }
  });

  it.each([
    // Top fit before wrapping; that successful check is not part of flip history.
    { natural: 20, wrapped: 80, before: ['above'], after: ['above', 'below'], placement: 'bottom', y: 40 },
    // Advancing from top retains its 40px overflow. Bottom's transient 10px best fit does not survive wrapping.
    { natural: 70, wrapped: 120, before: ['above', 'below'], after: ['below', 'above'], placement: 'top', y: -90 },
  ])('retains only flip advances when auto-size wraps a $natural px tall surface', async testCase => {
    const target = {
      getBoundingClientRect: () => ({ x: 45, y: 30, left: 45, top: 30, right: 55, bottom: 40, width: 10, height: 10 }),
    };
    const container = document.body.appendChild(document.createElement('div'));
    jest.spyOn(document.documentElement, 'clientWidth', 'get').mockReturnValue(100);
    jest.spyOn(document.documentElement, 'clientHeight', 'get').mockReturnValue(100);
    jest.spyOn(container, 'offsetWidth', 'get').mockImplementation(() => parseFloat(container.style.width) || 60);
    jest
      .spyOn(container, 'offsetHeight', 'get')
      .mockImplementation(() => (container.style.width ? testCase.wrapped : testCase.natural));

    const attempts: [string, number, number][] = [];
    const result = await computePosition(target, container, {
      strategy: 'fixed',
      placement: 'top',
      options: {
        autoSize: 'width',
        overflowBoundary: { x: 30, y: 0, width: 40, height: 100 },
        offset: ({ position, positionedRect }) => {
          attempts.push([position, positionedRect.width, positionedRect.height]);
          return 0;
        },
      },
    });

    expect(result).toMatchObject({ placement: testCase.placement, x: 30, y: testCase.y });
    expect(attempts).toEqual([
      ...testCase.before.map(position => [position, 60, testCase.natural]),
      ...testCase.after.map(position => [position, 40, testCase.wrapped]),
    ]);
  });

  it.each([0, -16])('checks intersection before the final arrow adjustment and hide after it (y=%i)', async y => {
    const target = {
      getBoundingClientRect: () => ({ x: 40, y, left: 40, top: y, right: 48, bottom: y + 2, width: 8, height: 2 }),
    };
    const container = document.body.appendChild(document.createElement('div'));
    const arrow = container.appendChild(document.createElement('div'));
    jest.spyOn(document.documentElement, 'clientWidth', 'get').mockReturnValue(100);
    jest.spyOn(document.documentElement, 'clientHeight', 'get').mockReturnValue(100);
    jest.spyOn(container, 'offsetWidth', 'get').mockReturnValue(20);
    jest.spyOn(container, 'offsetHeight', 'get').mockReturnValue(20);
    jest.spyOn(arrow, 'offsetHeight', 'get').mockReturnValue(8);

    const result = await computePosition(target, container, {
      strategy: 'fixed',
      placement: 'top',
      arrow,
      options: { arrowPadding: 2, fallbackPositions: [...Array<'above'>(50).fill('above'), 'after-top'] },
    });

    // Shift places the surface at y=0. Arrow then moves it without another pass at the reset cap.
    expect(result).toMatchObject({
      placement: 'right-start',
      x: 48,
      y: y - 5,
      arrow: { y: 2 },
      intersecting: false,
      escaped: y === -16,
      referenceHidden: y === -16,
    });
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
