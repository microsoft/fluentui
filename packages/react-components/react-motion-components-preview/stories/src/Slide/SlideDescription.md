The `Slide` component manages content presence, using slide in/out.

> **⚠️ Preview components are considered unstable**

```tsx
import { Slide } from '@fluentui/react-motion-components-preview';

function Component({ visible }) {
  return (
    <Slide visible={visible}>
      <div style={{ background: 'lightblue' }}>Content</div>
    </Slide>
  );
}
```
