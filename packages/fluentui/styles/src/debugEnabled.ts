const isDebugEnabled = () => {
  let enabled = false;
  if (process.env.NODE_ENV !== 'production') {
    try {
      // eslint-disable-next-line no-undef
      const fluentUIDebugEnabled = !!window.localStorage.fluentUIDebug;

      if (process.env.NODE_ENV !== 'test') {
        if (fluentUIDebugEnabled) {
          /* eslint-disable-next-line no-console */
          console.warn(
            [
              '@fluentui/react-northstar:',
              `CSSinJS Debug data collection is enabled.`,
              'To remove this override paste `delete window.localStorage.fluentUIDebug` to your browser console and reload the page.',
            ].join(' '),
          );
        } else {
          /* eslint-disable-next-line no-console */
          console.warn(
            [
              '@fluentui/react-northstar:',
              `CSSinJS Debug data collection is disabled.`,
              'To enable data collection paste `window.localStorage.fluentUIDebug = true` to your browser console and reload the page.',
            ].join(' '),
          );
        }
      }

      enabled = fluentUIDebugEnabled;
    } catch {}
  }

  return enabled;
};

export const isEnabled = isDebugEnabled();
