# The Fabric component

Consumers using Fabric components should be wrapping their content within the Fabric component. 

```tsx
import { Fabric } from 'office-ui-fabric-react/lib/Fabric';
import * as React from 'react';
import * as ReactDOM from 'react-dom';


ReactDOM.render(
  <Fabric>
    <App/>
  </Fabric>,
  element);
```

* Note: The Fabric component will render a div, and will mix in div properties. You may use it as a replacement for a root div.

The Fabric component is a root wrapper component which solves 2 problems:

1. The default fontFamily css style is defined at this layer, allowing components within to inherit the default fontFamily. The class `ms-Fabric` defines this.

2. The focus rectangle visibility is managed through the `is-focusVisible` css class.

## Focus rectangle notes

Focus rectangles around components should only be shown when the user presses tab or directional keys. When they press mouse buttons, focus rectangles should not be shown. The `Fabric` component that will conditionally add/remove an `is-focusVisible` class, and components rendering focus rectangles should conditionalize their visibility based on the `.ms-Fabric.is-focusVisible` parent selector.

This is abstracted in the scss include `focus-border()`.

