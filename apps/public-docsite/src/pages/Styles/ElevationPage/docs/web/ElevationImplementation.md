### Fluent UI React (JavaScript variables)

There are multiple ways to reference the depth variables in JavaScript.

The recommended way is via the theme:

```jsx
import { getTheme } from '@fluentui/react';

const theme = getTheme();

<div style={{ boxShadow: theme.effects.elevation8 }}>
```

You may also access the values from constants (`DefaultEffects.elevationN` and `Depths.depthN` have the same value):

```jsx
import { DefaultEffects } from '@fluentui/react';

<div style={{ boxShadow: DefaultEffects.elevation8 }} />;
```

```jsx
import { Depths } from '@fluentui/theme';

<div style={{ boxShadow: Depths.depth8 }} />;
```

### Fabric Core (SCSS)

The elevation styles are available from either `office-ui-fabric-core` or `@fluentui/react` as SCSS variables and mixins.

```scss
// Import all mixins and variables.
// (These are also available from '@fluentui/react/dist/sass/References'.)
@import 'office-ui-fabric-core/dist/sass/References';

.myClass1 {
  box-shadow: $ms-depth-shadow-8; // Using variables
}

.myClass2 {
  @include ms-depth-8; // Using mixins
}
```

### Fabric Core (CSS classes)

First, ensure that you've loaded the Fabric Core stylesheet following the [getting started instructions](#/get-started/web#fabric-core).

```html
<div class="ms-depth-8"></div>
```
