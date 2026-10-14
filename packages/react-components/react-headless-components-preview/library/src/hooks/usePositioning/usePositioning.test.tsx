import * as React from 'react';
import { act, render } from '@testing-library/react';
import { usePositioning } from './usePositioning';
import { getPlacementString } from './utils/placement';
import type { PositioningProps, PositioningReturn } from './types';

function mountHook(options: PositioningProps = {}) {
  const resultRef = React.createRef<{ current: PositioningReturn }>();
  const Capture = () => {
    const result = usePositioning(options);
    (resultRef as unknown as { current: PositioningReturn }).current = result;
    return null;
  };
  render(<Capture />);
  return resultRef as unknown as { current: PositioningReturn };
}

describe('usePositioning', () => {
  it('returns targetRef and containerRef callbacks', () => {
    const result = mountHook();

    expect(typeof result.current.targetRef).toBe('function');
    expect(typeof result.current.containerRef).toBe('function');
  });

  it('targetRef writes anchor-name onto the trigger element', () => {
    const result = mountHook();
    const node = document.createElement('div');

    act(() => {
      result.current.targetRef(node);
    });

    expect(node.style.getPropertyValue('anchor-name')).toMatch(/^--popover-anchor-/);
  });

  it('appends to anchor-name so multiple instances can share one trigger', () => {
    // Two popovers (e.g. a Tooltip and a Menu) attached to the same trigger.
    const first = mountHook();
    const second = mountHook();
    const node = document.createElement('div');

    act(() => {
      first.current.targetRef(node);
      second.current.targetRef(node);
    });

    const names = node.style
      .getPropertyValue('anchor-name')
      .split(',')
      .map(name => name.trim())
      .filter(Boolean);

    // Both instances contribute their own anchor name; neither clobbers the other.
    expect(names).toHaveLength(2);
    expect(names[0]).not.toBe(names[1]);
    names.forEach(name => expect(name).toMatch(/^--popover-anchor-/));
  });

  it('preserves a pre-existing author-set anchor-name', () => {
    const result = mountHook();
    const node = document.createElement('div');
    node.style.setProperty('anchor-name', '--app-anchor');

    act(() => {
      result.current.targetRef(node);
    });

    const names = node.style
      .getPropertyValue('anchor-name')
      .split(',')
      .map(name => name.trim());

    expect(names).toContain('--app-anchor');
    expect(names.some(name => /^--popover-anchor-/.test(name))).toBe(true);
  });

  it('containerRef writes position-anchor and position-area matching the props', () => {
    const result = mountHook({ position: 'below', align: 'start' });
    const node = document.createElement('div');

    act(() => {
      result.current.containerRef(node);
    });

    expect(node.style.getPropertyValue('position-anchor')).toMatch(/^--popover-anchor-/);
    expect(node).toHaveStyle({ positionArea: 'block-end span-inline-end' });
  });

  it('containerRef writes position: absolute by default and clears the UA inset/margin defaults', () => {
    const result = mountHook();
    const node = document.createElement('div');

    act(() => {
      result.current.containerRef(node);
    });

    expect(node).toHaveStyle({ position: 'fixed', inset: 'auto', margin: '0px' });
  });

  it('containerRef honors strategy: "absolute"', () => {
    const result = mountHook({ strategy: 'absolute' });
    const node = document.createElement('div');

    act(() => {
      result.current.containerRef(node);
    });

    expect(node).toHaveStyle({ position: 'absolute' });
  });

  it('containerRef writes data-placement matching (position, align)', () => {
    const result = mountHook({ position: 'below', align: 'start' });
    const node = document.createElement('div');

    act(() => {
      result.current.containerRef(node);
    });

    expect(node).toHaveAttribute('data-placement', 'below-start');
  });

  it('containerRef sets position-try-fallbacks to the default flip chain', () => {
    const result = mountHook();
    const node = document.createElement('div');

    act(() => {
      result.current.containerRef(node);
    });

    expect(node).toHaveStyle({ positionTryFallbacks: 'flip-block, flip-inline, flip-block flip-inline' });
  });

  it('containerRef uses custom fallbackPositions verbatim when provided', () => {
    const result = mountHook({ fallbackPositions: ['below-start', 'after'] });
    const node = document.createElement('div');

    act(() => {
      result.current.containerRef(node);
    });

    expect(node).toHaveStyle({ positionTryFallbacks: 'block-end span-inline-end, inline-end' });
  });

  it('containerRef removes position-try-fallbacks when pinned', () => {
    const result = mountHook({ pinned: true });
    const node = document.createElement('div');
    node.style.setProperty('position-try-fallbacks', 'flip-block');

    act(() => {
      result.current.containerRef(node);
    });

    expect(node.style.getPropertyValue('position-try-fallbacks')).toBe('');
  });

  it('containerRef writes cover self-alignment when coverTarget is true', () => {
    const result = mountHook({ coverTarget: true, position: 'above', align: 'start' });
    const node = document.createElement('div');

    act(() => {
      result.current.containerRef(node);
    });

    expect(node).toHaveStyle({ positionArea: 'center', alignSelf: 'end', justifySelf: 'start' });
  });

  it.each`
    position    | centred           | untouched
    ${'above'}  | ${'justify-self'} | ${'align-self'}
    ${'below'}  | ${'justify-self'} | ${'align-self'}
    ${'before'} | ${'align-self'}   | ${'justify-self'}
    ${'after'}  | ${'align-self'}   | ${'justify-self'}
  `(
    'containerRef centres $position only on the cross axis via $centred (crbug 438334710 workaround)',
    ({ position, centred, untouched }) => {
      const result = mountHook({ position, align: 'center' });
      const node = document.createElement('div');

      act(() => {
        result.current.containerRef(node);
      });

      expect(node.style.getPropertyValue('place-self')).toBe('');
      expect(node.style.getPropertyValue(centred)).toBe('anchor-center');
      expect(node.style.getPropertyValue(untouched)).toBe('');
    },
  );

  it('containerRef does not write place-self for non-center alignments', () => {
    const result = mountHook({ position: 'above', align: 'start' });
    const node = document.createElement('div');

    act(() => {
      result.current.containerRef(node);
    });

    expect(node.style.getPropertyValue('place-self')).toBe('');
    expect(node.style.getPropertyValue('justify-self')).toBe('');
    expect(node.style.getPropertyValue('align-self')).toBe('');
  });

  it('containerRef writes matchTargetSize width via anchor-size()', () => {
    const result = mountHook({ matchTargetSize: 'width' });
    const node = document.createElement('div');

    act(() => {
      result.current.containerRef(node);
    });

    expect(node).toHaveStyle({ width: 'anchor-size(width)' });
  });

  it('containerRef applies offset as symmetric logical margins so flips keep their gap', () => {
    const result = mountHook({ position: 'below', offset: { mainAxis: 8, crossAxis: 4 } });
    const node = document.createElement('div');

    act(() => {
      result.current.containerRef(node);
    });

    expect(node).toHaveStyle({
      marginBlockStart: '8px',
      marginBlockEnd: '8px',
      marginInlineStart: '4px',
      marginInlineEnd: '4px',
    });
  });

  describe('imperative ref', () => {
    it('exposes a callable updatePosition()', () => {
      const positioningRef = React.createRef<{
        updatePosition: () => void;
        setTarget: (el: HTMLElement | null) => void;
      }>();
      mountHook({
        positioningRef: positioningRef as unknown as PositioningProps['positioningRef'],
      });

      expect(positioningRef.current).not.toBeNull();
      expect(() => positioningRef.current?.updatePosition()).not.toThrow();
    });
  });
});

describe('usePositioning autoSize', () => {
  const VIEWPORT_HEIGHT = 700;
  const VIEWPORT_WIDTH = 1000;

  function stubViewport(width = VIEWPORT_WIDTH, height = VIEWPORT_HEIGHT) {
    Object.defineProperty(document.documentElement, 'clientWidth', { configurable: true, value: width });
    Object.defineProperty(document.documentElement, 'clientHeight', { configurable: true, value: height });
  }

  function stubAnchorSupport(supported: boolean) {
    jest.spyOn(CSS, 'supports').mockReturnValue(supported);
  }

  function makeAnchor(rect: Partial<DOMRect> = {}) {
    const { top = 560, left = 100, width = 200, height = 40 } = rect;
    const node = document.createElement('div');
    let current = { top, left, width, height };

    node.getBoundingClientRect = () =>
      ({
        top: current.top,
        left: current.left,
        right: current.left + current.width,
        bottom: current.top + current.height,
        width: current.width,
        height: current.height,
        x: current.left,
        y: current.top,
        toJSON: () => ({}),
      } as DOMRect);

    return {
      node,
      moveTo(next: Partial<typeof current>) {
        current = { ...current, ...next };
      },
    };
  }

  function mount(options: PositioningProps) {
    const captured = { current: null as PositioningReturn | null };
    const Capture = (props: { options: PositioningProps }) => {
      captured.current = usePositioning(props.options);
      return null;
    };
    const view = render(<Capture options={options} />);

    return {
      attach(anchor: HTMLElement, surface: HTMLElement) {
        act(() => {
          captured.current?.targetRef(anchor);
          captured.current?.containerRef(surface);
        });
      },
      rerender(next: PositioningProps) {
        act(() => {
          view.rerender(<Capture options={next} />);
        });
      },
      unmount: view.unmount,
    };
  }

  beforeEach(() => {
    stubViewport();
    stubAnchorSupport(true);
  });

  afterEach(() => {
    jest.restoreAllMocks();
    const documentElement = document.documentElement as unknown as Record<string, unknown>;
    delete documentElement.clientWidth;
    delete documentElement.clientHeight;
  });

  it('constrains both axes when enabled', () => {
    const anchor = makeAnchor();
    const surface = document.createElement('div');

    mount({ autoSize: true, position: 'below' }).attach(anchor.node, surface);

    expect(surface.style.getPropertyValue('max-block-size')).toBe('560px');
    expect(surface.style.getPropertyValue('max-inline-size')).toBe(`${VIEWPORT_WIDTH}px`);
    expect(surface.style.getPropertyValue('overflow-block')).toBe('auto');
    expect(surface.style.getPropertyValue('overflow-inline')).toBe('auto');
  });

  it.each`
    autoSize    | blockSize  | inlineSize
    ${'height'} | ${'560px'} | ${''}
    ${'width'}  | ${''}      | ${'1000px'}
  `('constrains only the requested axis for autoSize: $autoSize', ({ autoSize, blockSize, inlineSize }) => {
    const anchor = makeAnchor();
    const surface = document.createElement('div');

    mount({ autoSize, position: 'below' }).attach(anchor.node, surface);

    expect(surface.style.getPropertyValue('max-block-size')).toBe(blockSize);
    expect(surface.style.getPropertyValue('max-inline-size')).toBe(inlineSize);
  });

  it('writes nothing when autoSize is absent', () => {
    const anchor = makeAnchor();
    const surface = document.createElement('div');

    mount({ position: 'below' }).attach(anchor.node, surface);

    expect(surface.style.getPropertyValue('max-block-size')).toBe('');
    expect(surface.style.getPropertyValue('max-inline-size')).toBe('');
    expect(surface.style.getPropertyValue('overflow-block')).toBe('');
    expect(surface.style.getPropertyValue('overflow-inline')).toBe('');
  });

  it('writes nothing when the engine lacks CSS anchor positioning', () => {
    stubAnchorSupport(false);
    const anchor = makeAnchor();
    const surface = document.createElement('div');

    expect(() => mount({ autoSize: true }).attach(anchor.node, surface)).not.toThrow();

    expect(surface.style.getPropertyValue('max-block-size')).toBe('');
    expect(surface.style.getPropertyValue('overflow-block')).toBe('');
  });

  it('removes what it wrote when autoSize is turned off', () => {
    const anchor = makeAnchor();
    const surface = document.createElement('div');
    const view = mount({ autoSize: true, position: 'below' });

    view.attach(anchor.node, surface);
    expect(surface.style.getPropertyValue('max-block-size')).toBe('560px');

    view.rerender({ autoSize: false, position: 'below' });

    expect(surface.style.getPropertyValue('max-block-size')).toBe('');
    expect(surface.style.getPropertyValue('max-inline-size')).toBe('');
    expect(surface.style.getPropertyValue('overflow-block')).toBe('');
    expect(surface.style.getPropertyValue('overflow-inline')).toBe('');
  });

  it('leaves no residue on the surface after unmount', () => {
    const anchor = makeAnchor();
    const surface = document.createElement('div');
    const view = mount({ autoSize: true, position: 'below' });

    view.attach(anchor.node, surface);
    view.unmount();

    expect(surface.style.getPropertyValue('max-block-size')).toBe('');
    expect(surface.style.getPropertyValue('max-inline-size')).toBe('');
    expect(surface.style.getPropertyValue('overflow-block')).toBe('');
    expect(surface.style.getPropertyValue('overflow-inline')).toBe('');
  });

  it('never overwrites or removes a consumer-set overflow', () => {
    const anchor = makeAnchor();
    const surface = document.createElement('div');
    surface.style.setProperty('overflow-block', 'hidden');
    const view = mount({ autoSize: true, position: 'below' });

    view.attach(anchor.node, surface);
    expect(surface.style.getPropertyValue('overflow-block')).toBe('hidden');

    view.unmount();
    expect(surface.style.getPropertyValue('overflow-block')).toBe('hidden');
  });

  it('is still driven by the observer tick when covering the target hides the resolved placement', async () => {
    const anchor = makeAnchor();
    const surface = document.createElement('div');

    // Covering overlaps the surface and its anchor, so the placement read-back resolves nothing and
    // bails. The tick has to reach autoSize before that bail, or the constraint freezes. Recalculation
    // on scroll in general is covered in the browser; this pins the ordering the bail depends on.
    mount({ autoSize: true, position: 'below', coverTarget: true }).attach(anchor.node, surface);
    expect(surface.getAttribute('data-placement')).toBe('below');
    expect(surface.style.getPropertyValue('max-block-size')).toBe('140px');

    anchor.moveTo({ top: 650 });
    await act(async () => {
      window.dispatchEvent(new Event('scroll'));
    });

    expect(surface.style.getPropertyValue('max-block-size')).toBe('50px');
  });

  it('leaves every pre-existing positioning write untouched when autoSize is absent', () => {
    const anchor = makeAnchor();
    const surface = document.createElement('div');
    const options: PositioningProps = {
      position: 'below',
      align: 'start',
      offset: { mainAxis: 8, crossAxis: 4 },
      fallbackPositions: ['above', 'after'],
    };

    mount(options).attach(anchor.node, surface);

    const written = Object.fromEntries(
      [
        'position',
        'inset',
        'margin',
        'margin-block-start',
        'margin-block-end',
        'margin-inline-start',
        'margin-inline-end',
        'position-area',
        'position-try-fallbacks',
      ].map(property => [property, surface.style.getPropertyValue(property)]),
    );

    expect(written).toEqual({
      position: 'fixed',
      inset: 'auto',
      margin: '0px',
      'margin-block-start': '8px',
      'margin-block-end': '8px',
      'margin-inline-start': '4px',
      'margin-inline-end': '4px',
      'position-area': 'block-end span-inline-end',
      'position-try-fallbacks': 'block-start, inline-end',
    });
    expect(surface.style.getPropertyValue('position-anchor')).toMatch(/^--popover-anchor-/);
    expect(surface).toHaveAttribute('data-placement', 'below-start');
  });

  it('registers no listeners beyond those the placement observer already uses', () => {
    const anchor = makeAnchor();
    const countListeners = (options: PositioningProps) => {
      const spy = jest.spyOn(window, 'addEventListener');
      mount(options).attach(anchor.node, document.createElement('div'));
      const count = spy.mock.calls.filter(([type]) => type === 'scroll' || type === 'resize').length;
      spy.mockRestore();
      return count;
    };

    expect(countListeners({ autoSize: true, position: 'below' })).toBe(countListeners({ position: 'below' }));
  });
});

describe('getPlacementString', () => {
  it('returns the bare position for center alignment', () => {
    expect(getPlacementString('above', 'center')).toBe('above');
    expect(getPlacementString('below', 'center')).toBe('below');
  });

  it('returns position-align for non-center alignments', () => {
    expect(getPlacementString('above', 'start')).toBe('above-start');
    expect(getPlacementString('below', 'end')).toBe('below-end');
    expect(getPlacementString('before', 'start')).toBe('before-top');
    expect(getPlacementString('after', 'end')).toBe('after-bottom');
  });
});
