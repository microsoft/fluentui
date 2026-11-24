The `Rotate` component manages content presence with rotation around a single `x`, `y`, or `z` axis (default `z`). Angles are in degrees.

> **⚠️ Preview components are considered unstable**

```tsx
import { Rotate } from '@fluentui/react-motion-components-preview';

function Component({ visible }) {
  return (
    <Rotate visible={visible} axis="x" fromAngle={-90} inAngle={0} toAngle={90}>
      <div>Content</div>
    </Rotate>
  );
}
```

The root enters from `fromAngle` to `inAngle` and exits from `inAngle` to `toAngle`. By default, those angles are `-90`, `0`, and `fromAngle`, so an omitted exit destination mirrors the entrance source.

`Rotate.In` plays once on mount from `fromAngle` (default `-90`) to `0` degrees, and omits `inAngle`, `toAngle`, and exit timing. `Rotate.Out` plays once from `0` degrees to `toAngle` (default `-90`), and omits `inAngle` and `fromAngle`:

```tsx
<Rotate.Out toAngle={120} axis="y" duration={150} animateOpacity={false}>
  <div>Content</div>
</Rotate.Out>
```

Rotation includes a fade by default. Set `animateOpacity={false}` for rotation-only playback. Both one-way components accept `duration`, `easing`, and `delay`; explicit exit-prefixed timing on `.Out` takes precedence. Finishing `.Out` does not unmount its child.
