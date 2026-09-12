import type { ApplyFloatingUIPositioningArgs } from './applyFloatingUIPositioning';

type ApplyFloatingFn = (args: ApplyFloatingUIPositioningArgs) => () => void;

let cachedFloating: ApplyFloatingFn | null = null;
let floatingPromise: Promise<ApplyFloatingFn> | null = null;

function loadFloating(): Promise<ApplyFloatingFn> {
  if (cachedFloating) {
    return Promise.resolve(cachedFloating);
  }
  if (!floatingPromise) {
    floatingPromise = import(
      /* webpackChunkName: "fluentui-floating-ui-positioning" */
      './applyFloatingUIPositioning'
    ).then(async m => {
      await m.preloadFloatingUI();
      cachedFloating = m.applyFloatingUIPositioning;
      return cachedFloating;
    });
  }
  return floatingPromise;
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
  cachedFloating = null;
  floatingPromise = null;
}

/**
 * Lazily loads and applies the floating-ui fallback. If the chunk is already
 * cached it runs synchronously. Returns a disposer that cancels any pending
 * load and tears down the helper if it had a chance to run.
 */
export function scheduleApply(args: ApplyFloatingUIPositioningArgs): () => void {
  if (cachedFloating) {
    return cachedFloating(args);
  }
  let cancelled = false;
  let detach: (() => void) | undefined;
  loadFloating()
    .then(fn => {
      if (cancelled) {
        return;
      }
      detach = fn(args);
    })
    .catch(err => logLoadFailure(err));
  return () => {
    cancelled = true;
    detach?.();
  };
}

function logLoadFailure(err: unknown): void {
  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line no-console
    console.error('[usePositioning]: Failed to load floating chunk', err);
  }
}
