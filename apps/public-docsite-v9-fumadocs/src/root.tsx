import * as React from 'react';
import { SSRProvider } from '@fluentui/react-utilities';
import { RootProvider } from 'fumadocs-ui/provider/react-router';
import { Links, Meta, Outlet, Scripts, ScrollRestoration } from 'react-router';
import { DocsSearch } from './components/DocsSearch';

import './app.css';

export const Layout = ({ children }: { children: React.ReactNode }): React.ReactElement => {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Fluent UI React v9</title>
        <Meta />
        <Links />
      </head>
      <body className="flex flex-col min-h-screen">
        <SSRProvider>
          <RootProvider search={{ SearchDialog: DocsSearch }}>{children}</RootProvider>
        </SSRProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
};

const Root = (): React.ReactElement => {
  return <Outlet />;
};

export default Root;
