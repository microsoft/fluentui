The `Blur` component manages content presence with blur transitions. Radii are CSS lengths including units, such as `'10px'` or `'1rem'`.

> **⚠️ Preview components are considered unstable**

```tsx
import { Blur } from '@fluentui/react-motion-components-preview';

function Component({ visible }) {
  return (
    <Blur visible={visible} fromRadius="10px" inRadius="0px" toRadius="20px">
      <div>Content</div>
    </Blur>
  );
}
```

The root enters from `fromRadius` to `inRadius` and exits from `inRadius` to `toRadius`. By default, those radii are `'10px'`, `'0px'`, and `fromRadius`, so an omitted exit destination mirrors the entrance source.

`Blur.In` plays once on mount from `fromRadius` (default `'10px'`) to `'0px'`, and omits `inRadius`, `toRadius`, and exit timing. `Blur.Out` plays once from `'0px'` to `toRadius` (default `'10px'`), and omits `inRadius` and `fromRadius`:

```tsx
<Blur.Out toRadius="12px" duration={150} animateOpacity={false}>
  <div>Content</div>
</Blur.Out>
```

Blur includes a fade by default. Set `animateOpacity={false}` for blur-only playback. Both one-way components accept `duration`, `easing`, and `delay`; explicit exit-prefixed timing on `.Out` takes precedence. Finishing `.Out` does not unmount its child.
