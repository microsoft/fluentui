# React Router 7/Remix setup

## Installation

1.  Create a new React Router 7/Remix project or skip this step if you already have one:

2.  Install dependencies:

## Configuration

1.  Update `vite.config.ts`:

2.  Modify `app/root.tsx` to add Fluent UI providers:

3.  Set up SSR:

- Reveal `app/entry.client.tsx` and `app/entry.server.tsx` files if not already present:

- Update the `entry.client.tsx` to wrap the router with both `<RendererProvider>` and `<SSRProvider>`:

- and then update the `entry.server.tsx`:

## Usage Example

Create or update `app/routes/_index.tsx`:

## Troubleshooting

### Common Issues

1.  **SSR Hydration Mismatch**

Fix: Check style injection in `entry.server.tsx`.

2.  **Icons Not Rendering in SSR**

Fix: Add to `vite.config.ts`:

3.  **Module Resolution Errors**

Fix: Add to `vite.config.ts`:

4.  **Development Mode Warning**

This warning occurs in development due to [React's StrictMode double rendering](https://react.dev/reference/react/StrictMode#fixing-bugs-found-by-double-rendering-in-development). It can be safely ignored as it doesn't affect production builds.

### Production Build Optimization

For production builds, install and configure [`@griffel/vite-plugin`](https://griffel.js.org/react/ahead-of-time-compilation/with-vite) to enable build time pre-computing and transforming styles.
