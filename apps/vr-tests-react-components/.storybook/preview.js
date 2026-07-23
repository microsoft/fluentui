// @ts-check

const React = require('react');

/**
 * @param {boolean} ready
 */
const setVrtReady = ready => {
  if (typeof window !== 'undefined') {
    window.__fluentVrtReady__ = ready;
  }

  if (typeof document !== 'undefined') {
    document.documentElement.dataset.vrtReady = ready ? 'true' : 'false';
  }
};

const waitForVrtAssets = async () => {
  if (typeof document === 'undefined') {
    return;
  }

  // Keep readiness checks lightweight to avoid inflating total VRT runtime.
  const timeout = new Promise(resolve => setTimeout(resolve, 300));

  try {
    const fontsReady = document.fonts?.ready;
    if (fontsReady) {
      await Promise.race([fontsReady, timeout]);
    } else {
      await timeout;
    }
  } catch {
    // Best-effort readiness only; continue quickly on failures.
  }

  await new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)));
};

/**
 * VRT readiness observer component
 * @param {{ Story: Function; storyId: string }} props
 */
const VrtReadyObserver = ({ Story, storyId }) => {
  React.useEffect(() => {
    let cancelled = false;

    setVrtReady(false);

    void waitForVrtAssets().then(() => {
      if (!cancelled) {
        setVrtReady(true);
      }
    });

    return () => {
      cancelled = true;
      setVrtReady(false);
    };
  }, [storyId]);

  return React.createElement(React.Fragment, null, Story());
};

setVrtReady(false);

/**
 * @type {Array<Function>}
 */
export const decorators = [
  /**
   * @param {Function} Story
   * @param {{ id: string }} context
   */
  (Story, context) => React.createElement(VrtReadyObserver, { Story, storyId: context.id }),
];

/** @type {import("@fluentui/react-storybook-addon").FluentParameters} */
export const parameters = {
  layout: 'none',
  mode: 'vr-test',
  reactStorybookAddon: {
    disabledDecorators: ['AriaLive'],
  },
};
