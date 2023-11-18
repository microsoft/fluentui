import * as React from 'react';
import { FluentProvider } from '@fluentui/react-provider';
import { teamsLightTheme } from '@fluentui/react-theme';

const LayoutShift: React.FunctionComponent = ({ children }) => {
  // eslint-disable-next-line no-restricted-properties
  React.useLayoutEffect(() => {
    if (document.body) {
      // Accessing the offsetWidth forces reflow (browser synchronously calculates style and layout.
      // This allows us to measure theme impact on the rendering performance.
      document.body.offsetWidth;
    }
  });

  return <div>{children}</div>;
};

const FluentProviderWithTheme = () => (
  <LayoutShift>
    {Array.from({ length: 20 }, (n, i) => (
      <FluentProvider key={i} theme={teamsLightTheme}>
        FluentProvider
      </FluentProvider>
    ))}
  </LayoutShift>
);

export default FluentProviderWithTheme;
