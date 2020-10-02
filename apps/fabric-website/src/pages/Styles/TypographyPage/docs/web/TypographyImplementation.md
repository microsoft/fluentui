### Fluent UI React (JavaScript variables)

```tsx
import { FontSizes } from '@fluentui/theme';

<div style={{ fontSize: FontSizes.size42 }} />;
```

### Fabric Core (SCSS)

The typography styles are available from either `office-ui-fabric-core` or `@fluentui/react` as SCSS variables and mixins.

```scss
// Import all mixins and variables.
// (These are also available from '@fluentui/react/dist/sass/References'.)
@import 'office-ui-fabric-core/dist/sass/References';

.myClass1 {
  font-size: $ms-font-size-42; // Using variables
}

.myClass2 {
  @include ms-fontSize-42; // Using mixins
}
```

### Fabric Core (CSS classes)

First, ensure that you've loaded the Fabric Core stylesheet following the [getting started instructions](#/get-started/web#fabric-core).

```html
<div class="ms-fontSize-42"></div>
```
