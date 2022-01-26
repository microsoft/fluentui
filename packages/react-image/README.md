# @fluentui/react-image

**React Image component for [Fluent UI React](https://developer.microsoft.com/en-us/fluentui)**

> WIP 🚧 - These are not production-ready components as we are still in a Beta phase.

Usage of Image component ensures consistent styling and behaviour of images in your application based on the Fluent UI Design System.

## Usage

To use the Image component, it is required to install the main package of Fluent UI components:

```sh
npm install @fluentui/react-components
```

```js
import { Image } from '@fluentui/react-components';

const App = () => {
  return <Image src="example_image.png" />;
};
```

Or, installing only the `react-image` package:

```sh
npm install @fluentui/react-image
npm install @fluentui/react-provider
```

```js
import { Image } from '@fluentui/react-image';
import { FluentProvider } from '@fluentui/react-provider';

const App = () => (
  <FluentProvider>
    <Image src="example_image.png" alt="Example image" />;
  </FluentProvider>
);
```

The DOM structure will result into:

```jsx
<img src="example_image.png" alt="Example image" />
```

## API

Image component is build upon the `<img/>` tag, which does support all the native attributes. Additionaly, the following properties are available: `bordered`, `fit`, `block`, `shape` and `shadow`.

For more information on the component, please refer to the [API documentation](https://aka.ms/fluentui-storybook).

## Migration

For migrating from older versions of FluentUI, please check out the [migration guide](./MIGRATION.md)
