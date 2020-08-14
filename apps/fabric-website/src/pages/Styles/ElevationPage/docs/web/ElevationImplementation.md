### Fluent UI React (JavaScript variables)

```jsx
import { DefaultEffects } from '@fluentui/react';

<div style={{ boxShadow: DefaultEffects.elevation }} />;
```

### Fabric Core (SCSS variables)

```scss
@import '../src/sass/References.scss'; // Import all mixins and variables.

.myClass {
  box-shadow: $ms-depth-shadow-8;
}
```

### Fabric Core (SCSS mixins)

```scss
@import '../src/sass/References.scss'; // Import all mixins and variables.

.myClass {
  @include ms-depth-8;
}
```

### Fabric Core (CSS classes)

```html
<link rel="stylesheet" href="fabric.css" />

<div class="ms-depth-8"></div>
```
