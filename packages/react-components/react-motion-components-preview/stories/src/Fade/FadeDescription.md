The `Fade` component manages content presence, using fade in/out.

The root component enters from `fromOpacity` to `inOpacity` and exits from `inOpacity` to `toOpacity`. The defaults are `fromOpacity={0}`, `inOpacity={1}`, and `toOpacity={fromOpacity}`. Set `toOpacity` to give the exit a different destination.

`Fade.In` plays once on mount from `fromOpacity` (default `0`) to the default present opacity (`1`). `Fade.Out` plays once from `1` to `toOpacity` (default `0`). `inOpacity` and `visible` belong only to the root component; `.In` omits `toOpacity` and exit timing, and `.Out` omits `fromOpacity`.

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
