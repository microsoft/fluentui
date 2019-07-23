### Fabric React (JavaScript variables)

```tsx
import { FontSizes } from '@uifabric/fluent-theme/lib/fluent/FluentType';

<div style={{ fontSize: FontSizes.size42 }} />;
```

### Fabric Core (SCSS variables)

```scss
@import '../src/sass/References.scss'; // Import all mixins and variables.

.myClass {
  font-size: $ms-font-size-42;
}
```

### Fabric Core (SCSS mixins)

```scss
@import '../src/sass/References.scss'; // Import all mixins and variables.

.myClass {
  @include ms-fontSize-42;
}
```

### Fabric Core (CSS classes)

```html
<link rel="stylesheet" href="fabric.css" />

<div class="ms-fontSize-42"></div>
```
