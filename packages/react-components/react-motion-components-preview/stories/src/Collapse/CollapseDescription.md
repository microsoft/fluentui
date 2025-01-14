The `Collapse` component manages content [presence](?path=/docs/motion-apis-createpresencecomponent--docs), using a height or width expand/collapse motion.

> **⚠️ Preview components are considered unstable**

```tsx
import { Collapse } from '@fluentui/react-motion-components-preview';

function Component({ visible }) {
  return (
    <Collapse visible={visible}>
      <div>Content</div>
    </Collapse>
  );
}
```
