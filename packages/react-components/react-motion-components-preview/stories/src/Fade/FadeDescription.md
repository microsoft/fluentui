The `Fade` component manages content presence, using fade in/out.

The root component enters from `fromOpacity` to `inOpacity` and exits from `inOpacity` to `toOpacity`. The defaults are `fromOpacity={0}`, `inOpacity={1}`, and `toOpacity={fromOpacity}`. Set `toOpacity` to give the exit a different destination.

`Fade.In` and `Fade.Out` play once on mount, both from `fromOpacity` to `toOpacity`. Their defaults are 0 to 1 and 1 to 0, respectively. `inOpacity` and `visible` belong only to the root component.

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
