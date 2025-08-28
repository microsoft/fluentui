The Rotate component provides 3D rotation animations with independent X, Y, and Z axis control.

> **⚠️ Preview components are considered unstable**

```tsx
import { Rotate } from '@fluentui/react-motion-components-preview';

function Component({ visible }) {
  return (
    <Rotate visible={visible} axis="x" angle={45}>
      <div>Content</div>
    </Rotate>
  );
}
```
