## Server-Side Rendering

Fluent UI React v9 supports Server-Side Rendering.

### Basic setup

Add `@fluentui/react-components` dependency:

For any setup using SSR, you need to provide a `RendererProvider`, `SSRProvider` and `FluentProvider` in the root of your app. If these providers are not added, there will be issues when hydrating. See the following example:
