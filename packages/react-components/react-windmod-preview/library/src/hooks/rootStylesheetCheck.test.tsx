import * as React from 'react';
import { render } from '@testing-library/react';

import { clearRootStylesheetWarnings, diagnoseRootStylesheet, useRootStylesheetCheck } from './rootStylesheetCheck';

/**
 * ── Why the DOM-level cases are not tested here ────────────────────────────────────────────
 * They cannot be. Measured against the shipped artifacts under this project's jsdom:
 *
 *  - `getComputedStyle(el).borderTopStyle` returns `''` for `border-style: var(--tw-border-style)`
 *    even with the real `@property` rule loaded — jsdom implements neither `@property` nor
 *    `CSS.registerProperty`;
 *  - the rule walk returns `null` for EVERY arrangement of the real `base.css`, theme sheet and a
 *    real chunk, because jsdom's CSS parser predates cascade layers;
 *  - jsdom never fetches `@import`, so a real `CSSImportRule.styleSheet` — the exact thing the
 *    Mode-2 path has to see through — cannot exist here at all.
 *
 * So the browser behaviour is verified where it is real: `.scratch/css-splitting/detector-matrix.mjs`
 * serves eight documents over HTTP built from the shipped `base.css`, `styles.css`, theme sheet and
 * component chunks, loaded through genuine `<link>` and `@import`, and asserts the detector is
 * silent exactly on the three correct setups and warns on all five broken ones — cross-checked
 * against computed-style differences so "correct" is measured, not assumed.
 *
 * What IS meaningfully testable here is the decision itself, and the guard that keeps the check
 * from emitting verdicts in an environment that cannot support them.
 */
describe('diagnoseRootStylesheet', () => {
  /** The row every correct setup lands on — Mode 1, Mode 2 and the monolith alike. */
  it('is silent when registrations are active and no chunk defined the order first', () => {
    expect(diagnoseRootStylesheet(true, 'statement')).toBeNull();
    expect(diagnoseRootStylesheet(true, null)).toBeNull();
  });

  /**
   * THE CONTRACT-VIOLATION CASE. Registrations are active — the root sheet did arrive — but a
   * chunk's layer block got there first, so it defined the order. The message has to name that,
   * because "stylesheet missing" would send the consumer looking for the wrong thing.
   */
  it('reports chunk-first when a layer block precedes the order statement', () => {
    const message = diagnoseRootStylesheet(true, 'block');

    expect(message).toContain('BEFORE the root stylesheet');
    expect(message).toContain('first-use order');
    expect(message).toContain('ToggleButton loses to the Button');
    expect(message).not.toContain('has not been loaded');
  });

  /**
   * The root sheet is absent, but the theme sheet — a hard prerequisite carrying a byte-identical
   * order statement — still supplies a statement. This is the row the old presence-based check got
   * wrong: it saw the theme's statement and stayed silent.
   */
  it('reports a missing root stylesheet when registrations are inactive despite a statement', () => {
    const message = diagnoseRootStylesheet(false, 'statement');

    expect(message).toContain('has not been loaded');
    expect(message).not.toContain('BEFORE the root stylesheet');
  });

  it('reports both faults when nothing of ours preceded the chunks', () => {
    const message = diagnoseRootStylesheet(false, 'block');

    expect(message).toContain('BEFORE the root stylesheet');
    expect(message).toContain('missing entirely');
  });

  it('always names both supported fixes and the self-contained fallback', () => {
    for (const message of [
      diagnoseRootStylesheet(true, 'block'),
      diagnoseRootStylesheet(false, 'statement'),
      diagnoseRootStylesheet(false, 'block'),
    ]) {
      expect(message).toContain("import '@fluentui/react-windmod-preview/base.css'");
      expect(message).toContain("@import '@fluentui/react-windmod-preview/base.css'");
      expect(message).toContain("'@fluentui/react-windmod-preview/styles.css'");
    }
  });
});

describe('useRootStylesheetCheck', () => {
  let warn: jest.SpyInstance;

  const Probe = () => {
    const ref = React.useRef<HTMLDivElement>(null);

    useRootStylesheetCheck(ref, undefined);

    return <div ref={ref} />;
  };

  beforeEach(() => {
    warn = jest.spyOn(console, 'warn').mockImplementation(() => undefined);
    clearRootStylesheetWarnings(document);
  });

  afterEach(() => {
    warn.mockRestore();
  });

  /**
   * The capability gate, and the reason it exists: jsdom supports neither signal, so without this
   * every one of the package's ~3.5k unit tests that renders a provider would emit a warning.
   * `CSS.registerProperty` is absent here, which is exactly the condition being asserted.
   */
  it('stays silent in an environment that cannot support the measurement', () => {
    // jsdom ships a `CSS` namespace carrying only `escape`, so the gate has to test the specific
    // capability rather than the namespace's existence.
    expect(window.CSS).toBeDefined();
    expect((window.CSS as { registerProperty?: unknown }).registerProperty).toBeUndefined();

    render(<Probe />);

    expect(warn).not.toHaveBeenCalled();
  });

  it('warns once per document when the environment can measure and the setup is broken', () => {
    // Minimal stand-in for a browser: registerProperty present (gate opens) and a computed style
    // that reports the unregistered `none`, which is what a document missing base.css produces.
    const win = document.defaultView as unknown as Record<string, unknown>;
    win.CSS = { registerProperty: () => undefined };
    const getComputedStyle = win.getComputedStyle as (...args: unknown[]) => CSSStyleDeclaration;
    win.getComputedStyle = (...args: unknown[]) =>
      ({ ...getComputedStyle(...args), borderTopStyle: 'none' }) as CSSStyleDeclaration;

    try {
      render(<Probe />);
      render(<Probe />);

      expect(warn).toHaveBeenCalledTimes(1);
      expect(warn.mock.calls[0][0]).toContain('has not been loaded');
    } finally {
      win.getComputedStyle = getComputedStyle;
      delete win.CSS;
    }
  });
});
