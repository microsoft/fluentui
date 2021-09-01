import * as React from 'react';
import { FluentProvider } from '@fluentui/react-provider';
import { teamsLightTheme } from '@fluentui/react-theme';

const LayoutShift: React.FunctionComponent = ({ children }) => {
  // eslint-disable-next-line no-restricted-properties
  React.useLayoutEffect(() => {
    if (document.body) {
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
