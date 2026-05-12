import type { ApplyAnchorPositioningArgs } from './applyAnchorPositioning';
import type { ApplyFloatingUIPositioningArgs } from './applyFloatingUIPositioning';

type ApplyAnchorFn = (args: ApplyAnchorPositioningArgs) => () => void;
type ApplyFloatingFn = (args: ApplyFloatingUIPositioningArgs) => () => void;

let cachedAnchor: ApplyAnchorFn | null = null;
let anchorPromise: Promise<ApplyAnchorFn> | null = null;

let cachedFloating: ApplyFloatingFn | null = null;
let floatingPromise: Promise<ApplyFloatingFn> | null = null;

function loadAnchor(): Promise<ApplyAnchorFn> {
  if (cachedAnchor) {
    return Promise.resolve(cachedAnchor);
  }
  if (!anchorPromise) {
    anchorPromise = import(
      /* webpackChunkName: "fluentui-anchor-positioning" */
      './applyAnchorPositioning'
    ).then(m => {
      cachedAnchor = m.applyAnchorPositioning;
      return cachedAnchor;
    });
  }
  return anchorPromise;
}

function loadFloating(): Promise<ApplyFloatingFn> {
  if (cachedFloating) {
    return Promise.resolve(cachedFloating);
  }
  if (!floatingPromise) {
    floatingPromise = import(
      /* webpackChunkName: "fluentui-floating-ui-positioning" */
      './applyFloatingUIPositioning'
    ).then(m => {
      cachedFloating = m.applyFloatingUIPositioning;
      return cachedFloating;
    });
  }
  return floatingPromise;
}

/**
 * Eagerly fetch the CSS Anchor Positioning helper chunk.
 */
export function preloadAnchorImpl(): Promise<unknown> {
  return loadAnchor();
}

/**
 * Eagerly fetch the floating-ui-based fallback helper chunk (and, transitively,
 * `@floating-ui/dom`).
 */
export function preloadFloatingImpl(): Promise<unknown> {
  return loadFloating();
}

/**
 * For tests only.
 *
 * @internal
 */
export function resetLazyApplyForTests(): void {
  cachedAnchor = null;
  anchorPromise = null;
  cachedFloating = null;
  floatingPromise = null;
}

export type ApplyMode = 'anchor' | 'floating';

/**
 * Schedules the appropriate `apply…` helper, lazily loading its chunk on first
 * use. If the chunk is already cached it runs synchronously; otherwise it
 * defers until the import resolves. Returns a disposer that cancels any
 * pending load and tears down the helper if it had a chance to run.
 */
export function scheduleApply(
  mode: ApplyMode,
  args: ApplyAnchorPositioningArgs | ApplyFloatingUIPositioningArgs,
): () => void {
  if (mode === 'anchor') {
    if (cachedAnchor) {
      return cachedAnchor(args as ApplyAnchorPositioningArgs);
    }
    let cancelled = false;
    let detach: (() => void) | undefined;
    loadAnchor()
      .then(fn => {
        if (cancelled) {
          return;
        }
        detach = fn(args as ApplyAnchorPositioningArgs);
      })
      .catch(err => logLoadFailure('anchor', err));
    return () => {
      cancelled = true;
      detach?.();
    };
  }

  if (cachedFloating) {
    return cachedFloating(args as ApplyFloatingUIPositioningArgs);
  }
  let cancelled = false;
  let detach: (() => void) | undefined;
  loadFloating()
    .then(fn => {
      if (cancelled) {
        return;
      }
      detach = fn(args as ApplyFloatingUIPositioningArgs);
    })
    .catch(err => logLoadFailure('floating', err));
  return () => {
    cancelled = true;
    detach?.();
  };
}

function logLoadFailure(mode: ApplyMode, err: unknown): void {
  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line no-console
    console.error(`[usePositioning]: Failed to load ${mode} chunk`, err);
  }
}
