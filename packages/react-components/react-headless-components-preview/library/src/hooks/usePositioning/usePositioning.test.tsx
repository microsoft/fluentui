import * as React from 'react';
import { act, render } from '@testing-library/react';
import type { PositioningEngine, PositioningImperativeRef, PositionManager } from '@fluentui/react-positioning';
import { usePositioning } from './usePositioning';
import { PositioningEngineProvider } from './PositioningEngineContext';
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

  it('containerRef writes place-self: anchor-center for center alignment (crbug 438334710 workaround)', () => {
    const result = mountHook({ position: 'above', align: 'center' });
    const node = document.createElement('div');

    act(() => {
      result.current.containerRef(node);
    });

    expect(node).toHaveStyle({ placeSelf: 'anchor-center' });
  });

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

  describe('engine', () => {
    type FakeEngine = PositioningEngine & {
      create: jest.Mock<PositionManager, Parameters<PositioningEngine['create']>>;
      manager: { updatePosition: jest.Mock; dispose: jest.Mock };
    };

    const createFakeEngine = (): FakeEngine => {
      const manager = { updatePosition: jest.fn(), dispose: jest.fn() };
      const engine = { manager, create: jest.fn(() => manager) };
      return engine as unknown as FakeEngine;
    };

    const Surface = (props: {
      positioning: PositioningProps;
      withArrow?: boolean;
      onResult?: (result: PositioningReturn) => void;
    }) => {
      const result = usePositioning(props.positioning);
      props.onResult?.(result);

      return (
        <>
          <button ref={result.targetRef} data-testid="target" />
          <div ref={result.containerRef} data-testid="container">
            {props.withArrow && <div ref={result.arrowRef} data-testid="arrow" />}
          </div>
        </>
      );
    };

    it('invokes engine.create with the merged options, target, container and arrow', () => {
      const engine = createFakeEngine();
      const { getByTestId } = render(
        <Surface positioning={{ engine, position: 'below', align: 'start', autoSize: true }} withArrow />,
      );

      expect(engine.create).toHaveBeenCalledTimes(1);
      const params = engine.create.mock.calls[0][0];

      expect(params.target).toBe(getByTestId('target'));
      expect(params.container).toBe(getByTestId('container'));
      expect(params.arrow).toBe(getByTestId('arrow'));
      expect(params.options).toEqual(
        expect.objectContaining({ position: 'below', align: 'start', autoSize: true, strategy: 'fixed' }),
      );
      expect(params.options.onPositioningEnd).toEqual(expect.any(Function));
    });

    it('does not apply CSS anchor positioning when an engine owns placement', () => {
      const engine = createFakeEngine();
      const { getByTestId } = render(<Surface positioning={{ engine, position: 'below' }} />);

      expect(getByTestId('target').style.getPropertyValue('anchor-name')).toBe('');
      expect(getByTestId('container').style.getPropertyValue('position-anchor')).toBe('');
      expect(getByTestId('container').style.getPropertyValue('position-area')).toBe('');
    });

    it('seeds data-placement with the requested placement before the engine runs', () => {
      const engine = createFakeEngine();
      const { getByTestId } = render(<Surface positioning={{ engine, position: 'after', align: 'top' }} />);

      expect(getByTestId('container')).toHaveAttribute('data-placement', 'after-top');
    });

    it('forwards onPositioningEnd to the engine with a stable identity', () => {
      const engine = createFakeEngine();
      const first = jest.fn();
      const second = jest.fn();
      const { rerender } = render(<Surface positioning={{ engine, onPositioningEnd: first }} />);

      rerender(<Surface positioning={{ engine, onPositioningEnd: second }} />);
      expect(engine.create).toHaveBeenCalledTimes(1);

      const event = new CustomEvent('fui-positioningend', {
        detail: { placement: 'top-end', escaped: false, referenceHidden: false },
      });
      engine.create.mock.calls[0][0].options.onPositioningEnd?.(event as never);

      expect(first).not.toHaveBeenCalled();
      expect(second).toHaveBeenCalledWith(event);
    });

    it('disposes the manager on unmount', () => {
      const engine = createFakeEngine();
      const { unmount } = render(<Surface positioning={{ engine }} />);

      unmount();

      expect(engine.manager.dispose).toHaveBeenCalledTimes(1);
    });

    it('recreates the manager when an option changes and not when values are equal', () => {
      const engine = createFakeEngine();
      const { rerender } = render(<Surface positioning={{ engine, offset: 4 }} />);
      expect(engine.create).toHaveBeenCalledTimes(1);

      rerender(<Surface positioning={{ engine, offset: 4 }} />);
      expect(engine.create).toHaveBeenCalledTimes(1);

      rerender(<Surface positioning={{ engine, offset: 8 }} />);
      expect(engine.manager.dispose).toHaveBeenCalledTimes(1);
      expect(engine.create).toHaveBeenCalledTimes(2);
      expect(engine.create.mock.calls[1][0].options.offset).toBe(8);
    });

    it('delegates the imperative ref to the manager', () => {
      const engine = createFakeEngine();
      const positioningRef = React.createRef<PositioningImperativeRef>();
      render(<Surface positioning={{ engine, positioningRef }} />);

      act(() => {
        positioningRef.current?.updatePosition();
      });
      expect(engine.manager.updatePosition).toHaveBeenCalledTimes(1);

      const virtualTarget = { getBoundingClientRect: () => new DOMRect(0, 0, 10, 10) };
      act(() => {
        positioningRef.current?.setTarget(virtualTarget);
      });
      expect(engine.create).toHaveBeenCalledTimes(2);
      expect(engine.create.mock.calls[1][0].target).toBe(virtualTarget);
    });

    it('falls back to the engine supplied by PositioningEngineProvider', () => {
      const engine = createFakeEngine();
      render(
        <PositioningEngineProvider value={engine}>
          <Surface positioning={{ position: 'below' }} />
        </PositioningEngineProvider>,
      );

      expect(engine.create).toHaveBeenCalledTimes(1);
    });

    it('prefers an inline engine over the one from context', () => {
      const contextEngine = createFakeEngine();
      const inlineEngine = createFakeEngine();
      render(
        <PositioningEngineProvider value={contextEngine}>
          <Surface positioning={{ engine: inlineEngine }} />
        </PositioningEngineProvider>,
      );

      expect(inlineEngine.create).toHaveBeenCalledTimes(1);
      expect(contextEngine.create).not.toHaveBeenCalled();
    });

    it('switches from CSS anchor positioning to the engine when one is added later', () => {
      const engine = createFakeEngine();
      const { rerender, getByTestId } = render(<Surface positioning={{ position: 'below' }} />);

      expect(getByTestId('container').style.getPropertyValue('position-anchor')).toMatch(/^--popover-anchor-/);
      expect(engine.create).not.toHaveBeenCalled();

      rerender(<Surface positioning={{ position: 'below', engine }} />);

      expect(engine.create).toHaveBeenCalledTimes(1);
      expect(getByTestId('target').style.getPropertyValue('anchor-name')).toBe('');
    });

    it('warns in development when engine-only options are used without an engine', () => {
      const warn = jest.spyOn(console, 'warn').mockImplementation(() => undefined);

      render(<Surface positioning={{ autoSize: true, flipBoundary: 'window' }} />);

      expect(warn).toHaveBeenCalledTimes(1);
      expect(warn.mock.calls[0][0]).toContain('"autoSize", "flipBoundary"');
      warn.mockRestore();
    });

    it('does not warn when the same options are used with an engine', () => {
      const warn = jest.spyOn(console, 'warn').mockImplementation(() => undefined);

      render(<Surface positioning={{ engine: createFakeEngine(), autoSize: true }} />);

      expect(warn).not.toHaveBeenCalled();
      warn.mockRestore();
    });
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
