### Fabric React (JavaScript variables)

```jsx
import { Depths } from '@uifabric/fluent-theme/lib/fluent/FluentDepths';

<div style={{ boxShadow: Depths.depth8 }} />;
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
