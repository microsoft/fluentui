The `Scale` component manages content presence, using scale in/out.

> **⚠️ Preview components are considered unstable**

```tsx
import { Scale } from '@fluentui/react-motion-components-preview';

function Component({ visible }) {
  return (
    <Scale visible={visible}>
      <div style={{ background: 'lightblue' }}>Content</div>
    </Scale>
  );
}
```
