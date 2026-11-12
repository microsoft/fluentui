import * as React from 'react';
import { render } from '@testing-library/react';
import { usePositioning as useFloatingUIPositioning } from '@fluentui/react-positioning';

import { usePositioning } from './usePositioning';
import type { PositioningEngine, PositioningShorthand } from './types';

/**
 * The premise of this design: `@fluentui/react-positioning` satisfies the engine contract as-is.
 *
 * If this stops compiling, an adapter has become necessary and the "no wrapper" decision in
 * design.md needs revisiting.
 */
const floatingUIEngine: PositioningEngine = useFloatingUIPositioning;

describe('PositioningEngine contract', () => {
  it('is satisfied by usePositioning from @fluentui/react-positioning with no adapter', () => {
    expect(typeof floatingUIEngine).toBe('function');
  });
});

/**
 * Type-level assertions, checked by the `type-check` target. A `@ts-expect-error` that stops being
 * an error is itself reported, so these fail in both directions.
 */
describe('positioning option typing', () => {
  it('rejects a JS-only option without an engine, as a fresh literal', () => {
    // @ts-expect-error - `autoSize` cannot be expressed by CSS anchor positioning
    const invalid: PositioningShorthand = { autoSize: 'height' };
    expect(invalid).toBeDefined();
  });

  it('rejects a JS-only option without an engine, through a variable', () => {
    // Excess property checking does not apply to a non-fresh object. This case is rejected by
    // TypeScript's weak-type rule instead: `PositioningProps` has only optional properties, so an
    // object sharing none of them is not assignable.
    const options = { autoSize: 'height' as const };

    // @ts-expect-error - still rejected when passed through a variable
    const invalid: PositioningShorthand = options;
    expect(invalid).toBeDefined();
  });

  it('rejects a JS-only option alongside engine: "default"', () => {
    // @ts-expect-error - the default engine cannot honour `autoSize`
    const invalid: PositioningShorthand = { autoSize: 'height', engine: 'default' };
    expect(invalid).toBeDefined();
  });

  it('accepts a JS-only option alongside an injected engine', () => {
    const valid: PositioningShorthand = { autoSize: 'height', engine: floatingUIEngine };
    expect(valid).toBeDefined();
  });

  it('accepts supported options with no engine, and with the default sentinel', () => {
    const bare: PositioningShorthand = { position: 'below', align: 'start', offset: 4 };
    const explicit: PositioningShorthand = { position: 'below', engine: 'default' };
    const shorthand: PositioningShorthand = 'below-start';

    expect([bare, explicit, shorthand]).toHaveLength(3);
  });
});

const NoopEngine: PositioningEngine = () => ({ targetRef: () => undefined, containerRef: () => undefined });

describe('usePositioning engine dispatch', () => {
  it('returns callable refs under the default engine', () => {
    let captured: { targetRef: unknown; containerRef: unknown } | undefined;
    const Capture = () => {
      captured = usePositioning({});
      return null;
    };

    render(<Capture />);

    expect(typeof captured?.targetRef).toBe('function');
    expect(typeof captured?.containerRef).toBe('function');
  });

  it('delegates to an injected engine instead of writing anchor declarations', () => {
    const node = document.createElement('div');
    let captured: ReturnType<typeof usePositioning> | undefined;
    const Capture = () => {
      captured = usePositioning({ engine: NoopEngine, position: 'below', align: 'start' });
      return null;
    };

    render(<Capture />);
    captured?.containerRef(node);

    // The engine owns placement, so none of the CSS anchor declarations are written.
    expect(node.style.getPropertyValue('position-anchor')).toBe('');
    expect(node.style.getPropertyValue('position-area')).toBe('');
    expect(node.style.getPropertyValue('position-try-fallbacks')).toBe('');
  });

  it('still applies the top-layer reset when delegating, because it belongs to the surface', () => {
    const node = document.createElement('div');
    let captured: ReturnType<typeof usePositioning> | undefined;
    const Capture = () => {
      captured = usePositioning({ engine: NoopEngine });
      return null;
    };

    render(<Capture />);
    captured?.containerRef(node);

    expect(node.style.getPropertyValue('inset')).toBe('auto');
    expect(node.style.getPropertyValue('margin')).toBe('0px');
  });

  it('treats engine: "default" as the built-in engine', () => {
    const node = document.createElement('div');
    let captured: ReturnType<typeof usePositioning> | undefined;
    const Capture = () => {
      captured = usePositioning({ engine: 'default', position: 'below', align: 'start' });
      return null;
    };

    render(<Capture />);
    captured?.containerRef(node);

    expect(node.style.getPropertyValue('position-area')).toBe('block-end span-inline-end');
  });
});
