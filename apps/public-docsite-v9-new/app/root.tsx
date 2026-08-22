import { RootProvider } from 'fumadocs-ui/provider/react-router';
import { Links, Meta, Outlet, Scripts, ScrollRestoration } from 'react-router';

import './app.css';

export function Layout({ children }: { children: React.ReactNode }) {
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
        <RootProvider
          /*
           * The site is served as static files, so there is no `api/search` route to query.
           * The dialog fetches a prebuilt index instead (see scripts/build-search-index.mjs).
           */
          search={{ options: { type: 'static', api: '/docs/search-index.json' } }}
        >
          {children}
        </RootProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function Root() {
  return <Outlet />;
}
