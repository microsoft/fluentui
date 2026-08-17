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
        <RootProvider>{children}</RootProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function Root() {
  return <Outlet />;
}
