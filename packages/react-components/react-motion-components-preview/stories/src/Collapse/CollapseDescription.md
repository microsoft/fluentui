The `Collapse` component manages content [presence](?path=/docs/motion-apis-createpresencecomponent--docs), using a height or width expand/collapse motion.

The root component expands from `fromSize` (default `'0px'`) to the element's measured size on enter, and collapses from its measured size to `toSize` (default `fromSize`) on exit. `Collapse.In` expands once on mount from `fromSize`, omitting `toSize` and exit timing; `Collapse.Out` collapses once to `toSize`, omitting `fromSize`.

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
