- Customize `duration` and `easing` for each transition separately, using `entry` and `exit` overrides.
- The automatic fade transition can be disabled by setting `animateOpacity` to `false`.

The motion customizer below provides a live preview and motion override code.

```tsx
import { motionTokens, createPresenceComponentVariant } from '@fluentui/react-motion';
import { Collapse } from '@fluentui/react-motion-components-preview';

const { curveEasyEaseMax, durationSlow, durationNormal } = motionTokens;

const CustomCollapseVariant = createPresenceComponentVariant(Collapse, {
  enter: { duration: durationSlow, easing: curveEasyEaseMax },
  exit: { duration: durationNormal, easing: curveEasyEaseMax },
});

const CustomCollapse = () => (
  <CustomCollapseVariant visible animateOpacity unmountOnExit>
    <div style={{ padding: 8 }}>{loremIpsum(10)}</div>
  </CustomCollapseVariant>
);
```
