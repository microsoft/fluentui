// @ts-check

import React from 'react';

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
    await Promise.race([document.fonts?.ready, timeout]);
  } catch {
    // Best-effort readiness only; continue quickly on failures.
  }

  await new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)));
};

const VrtReadyObserver = ({ Story, storyId }) => {
  const [isReady, setIsReady] = React.useState(false);

  React.useEffect(() => {
    let cancelled = false;

    setVrtReady(false);
    setIsReady(false);

    void waitForVrtAssets().then(() => {
      if (!cancelled) {
        setVrtReady(true);
        setIsReady(true);
      }
    });

    return () => {
      cancelled = true;
      setVrtReady(false);
    };
  }, [storyId]);

  if (!isReady) {
    return React.createElement(React.Fragment, null);
  }

  return React.createElement(React.Fragment, null, Story());
};

setVrtReady(false);

export const decorators = [(Story, context) => React.createElement(VrtReadyObserver, { Story, storyId: context.id })];

/** @type {import("@fluentui/react-storybook-addon").FluentParameters} */
export const parameters = {
  layout: 'none',
  mode: 'vr-test',
  reactStorybookAddon: {
    disabledDecorators: ['AriaLive'],
  },
};
