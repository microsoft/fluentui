'use client';

// eslint-disable-next-line import/no-extraneous-dependencies -- story-only helper outside the *.stories.tsx devDependencies exemption
import * as React from 'react';

export type ToastPositionName = 'top-start' | 'top' | 'top-end' | 'bottom-start' | 'bottom' | 'bottom-end';
export type ToastIntentName = 'info' | 'success' | 'warning' | 'error';

export type ToastCell = {
  key: string;
  position: ToastPositionName;
  intent?: ToastIntentName;
  appearance?: 'inverted';
  title: string;
  action?: string;
  body: string;
  subtitle?: string;
  footer?: boolean;
};

export type ToastParts = {
  Toaster: React.ComponentType<Record<string, unknown>>;
  Toast: React.ComponentType<Record<string, unknown>>;
  ToastTitle: React.ComponentType<Record<string, unknown>>;
  ToastBody: React.ComponentType<Record<string, unknown>>;
  ToastFooter: React.ComponentType<Record<string, unknown>>;
  Link: React.ComponentType<Record<string, unknown>>;
  useToastController: (toasterId: string) => {
    dispatchToast: (content: React.ReactNode, options?: Record<string, unknown>) => void;
  };
};

export type ToastVrSceneProps = ToastParts & {
  cells: ToastCell[];
  offset?: { horizontal?: number; vertical?: number };
};

/* Griffel's default timeout is 3000 ms and the timer only starts once the 600 ms enter finishes, so
   an unpinned toast is gone by 4.2 s — inside the window the runner's own font and image awaits
   occupy. Every dispatch pins a timeout long enough that no cell can ever be captured mid-exit. */
const PINNED_TIMEOUT = 3_600_000;

/* The runner settles BEFORE any toast exists: its only wait is `#storybook-root` having a child,
   which the Storybook decorator satisfies on frame 1. Griffel's three CollapseDelayed atoms are
   therefore created during the post-settle awaits, so the finish pass has to be bounded by the
   wall clock rather than by a frame count.

   CSSAnimation is SKIPPED. Griffel's <Timer> is a declarative CSS animation whose `animationend`
   handler closes the toast, so finishing it fires the timeout by hand — measured to dismiss the
   toast within 600 ms. The constructor is the discriminator, not target-lessness and not the
   name: the Timer animates a real span. From the settle onward the runner's own
   `animation: none !important` removes the Timer outright (an `animationcancel`, which closes
   nothing), so the skip guards the window before the settle and the stylesheet the one after.

   The pass is a measured no-op on the windmod side, which renders zero animations. */
const FINISH_WINDOW_MS = 2500;

const finishScriptedMotion = (): void => {
  // Document.getAnimations() already spans every descendant; `subtree` is an Element-level option.
  // eslint-disable-next-line @nx/workspace-no-restricted-globals, compat/compat -- capture-browser-only fixture; no provider in scope, and the capture browser is the only engine that runs it
  for (const animation of document.getAnimations()) {
    if (typeof CSSAnimation !== 'undefined' && animation instanceof CSSAnimation) {
      continue;
    }

    try {
      animation.finish();
    } catch {
      // A zero-duration or already-finished effect throws; nothing to settle either way.
    }
  }
};

/**
 * The dispatcher is a LATER SIBLING of the Toaster, never a descendant, and its effect is PASSIVE.
 * Both halves are required: the Toaster registers its unbuffered document listener in a passive
 * effect of its own, and React flushes layout effects before every passive one and passive effects
 * children-before-parents — so a layout-effect dispatch and a nested passive dispatch are each
 * dropped in silence.
 */
const ToastDispatcher = (
  props: Omit<ToastVrSceneProps, 'offset' | 'Toaster'> & { toasterId: string },
): React.ReactNode => {
  const { Toast, ToastTitle, ToastBody, ToastFooter, Link, useToastController, cells, toasterId } = props;
  const { dispatchToast } = useToastController(toasterId);

  React.useEffect(() => {
    cells.forEach(cell => {
      dispatchToast(
        <Toast appearance={cell.appearance}>
          <ToastTitle action={cell.action}>{cell.title}</ToastTitle>
          <ToastBody subtitle={cell.subtitle}>{cell.body}</ToastBody>
          {cell.footer ? (
            <ToastFooter>
              <Link href="#">Action</Link>
              <Link href="#">Action</Link>
            </ToastFooter>
          ) : null}
        </Toast>,
        { position: cell.position, intent: cell.intent, timeout: PINNED_TIMEOUT, toastId: cell.key },
      );
    });

    // eslint-disable-next-line @nx/workspace-no-restricted-globals -- capture-browser-only fixture; no provider in scope
    const deadline = performance.now() + FINISH_WINDOW_MS;
    let handle = 0;
    const pass = () => {
      finishScriptedMotion();

      // eslint-disable-next-line @nx/workspace-no-restricted-globals -- capture-browser-only fixture; no provider in scope
      if (performance.now() < deadline) {
        // eslint-disable-next-line @nx/workspace-no-restricted-globals -- capture-browser-only fixture; no provider in scope
        handle = requestAnimationFrame(pass);
      }
    };

    pass();

    // eslint-disable-next-line @nx/workspace-no-restricted-globals -- capture-browser-only fixture; no provider in scope
    return () => cancelAnimationFrame(handle);
  }, [Toast, ToastTitle, ToastBody, ToastFooter, Link, cells, dispatchToast]);

  return null;
};

/** The shared scene: one Toaster, then the dispatcher that fills it. */
export const ToastVrScene = (props: ToastVrSceneProps): React.ReactNode => {
  const { Toaster, offset, ...rest } = props;
  const toasterId = 'vr-toaster';

  return (
    <>
      <Toaster toasterId={toasterId} offset={offset} />
      <ToastDispatcher {...rest} toasterId={toasterId} />
    </>
  );
};

/** The anatomy band: all three grid columns, both optional slots, the footer, all four intents. */
export const ANATOMY_CELLS: ToastCell[] = [
  {
    key: 'info',
    position: 'bottom-end',
    intent: 'info',
    title: 'Info toast',
    action: 'Undo',
    body: 'An informational message.',
    subtitle: 'Subtitle',
  },
  {
    key: 'success',
    position: 'bottom-end',
    intent: 'success',
    title: 'Success toast',
    action: 'Undo',
    body: 'The operation completed.',
    subtitle: 'Subtitle',
  },
  {
    key: 'warning',
    position: 'bottom-end',
    intent: 'warning',
    title: 'Warning toast',
    action: 'Undo',
    body: 'Something needs attention.',
    subtitle: 'Subtitle',
  },
  {
    key: 'error',
    position: 'bottom-end',
    intent: 'error',
    title: 'Error toast',
    action: 'Undo',
    body: 'The operation failed.',
    subtitle: 'Subtitle',
  },
  { key: 'footer', position: 'bottom-end', intent: 'info', title: 'Footer toast', body: 'With actions.', footer: true },
  { key: 'plain', position: 'bottom-end', intent: 'info', title: 'Plain toast', body: 'Title and body only.' },
];

const POSITIONS: ToastPositionName[] = ['top-start', 'top', 'top-end', 'bottom-start', 'bottom', 'bottom-end'];

/** One info toast in each of the six positions — the position arithmetic in a single capture. */
export const POSITION_CELLS: ToastCell[] = POSITIONS.map(position => ({
  key: position,
  position,
  intent: 'info',
  title: position,
  body: 'Positioned toast.',
}));

/** The restored look prop: the inverted surface, its four glyph colours and the action colour. */
export const INVERTED_CELLS: ToastCell[] = (['info', 'success', 'warning', 'error'] as ToastIntentName[]).map(
  intent => ({
    key: intent,
    position: 'bottom-end',
    intent,
    appearance: 'inverted' as const,
    title: `${intent} toast`,
    action: 'Undo',
    body: 'An inverted surface.',
    subtitle: 'Subtitle',
  }),
);
