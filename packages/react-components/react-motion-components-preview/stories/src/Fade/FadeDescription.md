The `Fade` component manages content presence, using fade in/out.

> **⚠️ Preview components are considered unstable**

```tsx
import { Fade } from '@fluentui/react-motion-components-preview';

function Component({ visible }) {
  return (
    <Fade visible={visible}>
      <div style={{ background: 'lightblue' }}>Content</div>
    </Fade>
  );
}
```
