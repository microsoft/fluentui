import * as React from 'react';
import { createDOMRenderer, FluentProvider, RendererProvider } from '@fluentui/react-components';
import { webLightTheme } from '@fluentui/react-theme';

interface IFluentV9FrameProviderProps {
  targetDocument: Document;
  children: React.ReactNode;
}

export const FluentV9FrameProvider: React.FunctionComponent<IFluentV9FrameProviderProps> = props => {
  const { targetDocument, children } = props;
  const renderer = React.useMemo(() => createDOMRenderer(targetDocument), [targetDocument]);

  return (
    <RendererProvider renderer={renderer} targetDocument={targetDocument}>
      <FluentProvider theme={webLightTheme} targetDocument={targetDocument}>
        {children}
      </FluentProvider>
    </RendererProvider>
  );
};
