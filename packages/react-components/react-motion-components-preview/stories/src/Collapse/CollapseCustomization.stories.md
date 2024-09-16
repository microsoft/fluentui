- `duration` and `easing` can be customized for each transition separately using `createPresenceComponentVariant()`.
- The predefined fade transition can be disabled by setting `animateOpacity` to `false`.

```tsx
import { motionTokens, createPresenceComponentVariant } from '@fluentui/react-components';
import { Collapse } from '@fluentui/react-motion-components-preview';

const CustomCollapseVariant = createPresenceComponentVariant(Collapse, {
  enter: { duration: motionTokens.durationSlow, easing: motionTokens.curveEasyEaseMax },
  exit: { duration: motionTokens.durationNormal, easing: motionTokens.curveEasyEaseMax },
});

const CustomCollapse = ({ visible }) => (
  <CustomCollapseVariant animateOpacity={false} unmountOnExit visible={visible}>
    {/* Content */}
  </CustomCollapseVariant>
);
```
