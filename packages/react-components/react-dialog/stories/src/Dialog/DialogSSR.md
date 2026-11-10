## Server-Side Rendering

Dialogs will work fine by default in a server-side rendering environment, but keep in mind the following scenario to avoid SSR hydration issues:

When `unmountOnClose` is set to `false` (default value is `true`), Dialog will keep the element rendered at all times, but since it uses React Portal underneath, and portals do not support SSR, it'll result in a hydration error. For SSR environments, it's advised to always set this property to `true`.
