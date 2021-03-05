### Fluent UI React (JavaScript variables)

```jsx
import { CommunicationColors } from '@fluentui/theme';

<div style={{ color: CommunicationColors.primary }} />;
```

### Fabric Core (SCSS variables)

The colors are available from either `office-ui-fabric-core` or `@fluentui/react` as SCSS variables and mixins.

```scss
// Import all mixins and variables.
// (These are also available from '@fluentui/react/dist/sass/References'.)
@import 'office-ui-fabric-core/dist/sass/References';

.myClass1 {
  background-color: $ms-color-communicationPrimary; // Using variables
}

.myClass2 {
  @include ms-bgColor-communicationPrimary; // Using mixins
}
```

### Fabric Core (CSS classes)

First, ensure that you've loaded the Fabric Core stylesheet following the [getting started instructions](#/get-started/web#fabric-core).

```html
<div class="ms-bgColor-communicationPrimary"></div>
```
