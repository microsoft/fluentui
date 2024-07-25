- `duration` and `easing` can be customized for each transition separately using `createPresenceComponentVariant()`.
- The predefined fade transition can be disabled by setting `animateOpacity` to `false`.

```tsx
import { motionTokens, createPresenceComponentVariant } from '@fluentui/react-components';
import { Scale } from '@fluentui/react-motion-components-preview';

const CustomScaleVariant = createPresenceComponentVariant(Scale, {
  enter: { duration: motionTokens.durationSlow, easing: motionTokens.curveEasyEaseMax },
  exit: { duration: motionTokens.durationNormal, easing: motionTokens.curveEasyEaseMax },
});

const CustomScale = ({ visible }) => (
  <CustomScaleVariant animateOpacity={false} unmountOnExit visible={visible}>
    {/* Content */}
  </CustomScaleVariant>
);
```
