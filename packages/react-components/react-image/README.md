# @fluentui/react-image

**Image components for [Fluent UI React](https://react.fluentui.dev/)**

Usage of Image component ensures consistent styling and behaviour of images in your application based on the Fluent UI Design System.

## Usage

To import Image:

```js
import { Image } from '@fluentui/react-components';
```

### Examples

```jsx
<Image src="example_image.png" />
<Image src="example_image.png" alt="Example image" />;
<Image src="example_image.png" bordered />;
<Image src="example_image.png" fit="contain" />;
<Image src="example_image.png" shadow />;
<Image src="example_image.png" shape="circular" />;
```

See [Fluent UI Storybook](https://react.fluentui.dev/) for more detailed usage examples.

Alternatively, run Storybook locally with:

1. `yarn start`
2. Select `react-image` from the list.

### Specification

See [SPEC.md](./SPEC.md).

## Migration

If you're upgrading to Fluent UI v9 see [MIGRATION.md](./MIGRATION.md) for guidance on updating to the latest Image implementation.
