### Fabric React (JavaScript variables)

```jsx
import { CommunicationColors } from '@uifabric/fluent-theme/lib/fluent/FluentColors';

<div style={{ color: CommunicationColors.primary }} />;
```

### Fabric Core (SCSS variables)

```scss
@import '../src/sass/References.scss'; // Import all mixins and variables.

.myClass {
  background-color: $ms-color-communicationPrimary;
}
```

### Fabric Core (SCSS mixins)

```scss
@import '../src/sass/References.scss'; // Import all mixins and variables.

.myClass {
  @include ms-bgColor-communicationPrimary;
}
```

### Fabric Core (CSS classes)

```html
<link rel="stylesheet" href="fabric.css" />

<div class="ms-bgColor-communicationPrimary"></div>
```
