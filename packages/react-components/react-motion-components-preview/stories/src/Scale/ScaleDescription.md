The `Scale` component manages content presence, using scale and opacity transitions.

The root component enters from `fromScale` to `inScale` and exits from `inScale` to `toScale`. The defaults are `fromScale={0.9}`, `inScale={1}`, and `toScale={fromScale}`. Set `toScale` to give the exit a different destination.

`Scale.In` plays once on mount from `fromScale` (default `0.9`) to the default present scale (`1`). `Scale.Out` plays once from `1` to `toScale` (default `0.9`). `inScale` and `visible` belong only to the root component; `.In` omits `toScale` and exit timing, and `.Out` omits `fromScale`.

By default, entering also fades from 0 to 1 opacity, and exiting fades from 1 to 0. Set `animateOpacity={false}` for scale-only animation, including on `.In` and `.Out`.

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
