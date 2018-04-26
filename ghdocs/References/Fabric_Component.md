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

The Fabric component is a root wrapper component which defines the default fontFamily for elements within to use.

