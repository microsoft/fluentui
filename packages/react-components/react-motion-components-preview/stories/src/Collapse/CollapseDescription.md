The `Collapse` component manages content presence, using a height expand/collapse motion.

> **⚠️ Preview components are considered unstable**

```tsx
import { Collapse } from '@fluentui/react-motion-components-preview';

function Component({ visible }) {
  return (
    <Collapse visible={visible}>
      <div style={{ background: 'lightblue' }}>Content</div>
    </Collapse>
  );
}
```
