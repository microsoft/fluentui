# @fluentui/react-link

**Link components for [Fluent UI](https://react.fluentui.dev/)**

Links reference data that a user can follow by clicking or tapping it.

## Usage

To import Link:

```js
import { Link } from '@fluentui/react-components';
```

### Examples

```jsx
<Link>This is a link</Link>
<Link href="https://www.bing.com">This is a link</Link>
<Link href="https://www.bing.com" appearance="subtle">This is a link</Link>
<Link href="https://www.bing.com" disabled>This is a link</Link>
<Link href="https://www.bing.com" target="_blank">This is a link</Link>
<Link as="button" appearance="subtle">This is a link</Link>
```

See [Fluent UI Storybook](https://react.fluentui.dev/) for more detailed usage examples.

Alternatively, run Storybook locally with:

1. `yarn start`
2. Select `react-link` from the list.

### Specification

See [SPEC.md](./SPEC.md).

### Migration Guide

If you're upgrading to Fluent UI v9 see [MIGRATION.md](./MIGRATION.md) for guidance on updating to the latest Link implementation.
