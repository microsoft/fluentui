- `duration` and `easing` can be customized for each transition separately using `createPresenceComponentVariant()`.
- The predefined fade transition can be disabled by setting `animateOpacity` to `false`.

```tsx
import { motionTokens, createPresenceComponent } from '@fluentui/react-components';
import { createCollapsePresence } from '@fluentui/react-motion-components-preview';

const CustomCollapseVariant = createPresenceComponent(
  createCollapsePresence({
    enterSizeDuration: motionTokens.durationSlow,
    enterEasing: motionTokens.curveEasyEaseMax,
    exitSizeDuration: motionTokens.durationNormal,
    exitEasing: motionTokens.curveEasyEaseMax,
  }),
);

const CustomCollapse = ({ visible }) => (
  <CustomCollapseVariant animateOpacity={false} unmountOnExit visible={visible}>
    {/* Content */}
  </CustomCollapseVariant>
);
```
