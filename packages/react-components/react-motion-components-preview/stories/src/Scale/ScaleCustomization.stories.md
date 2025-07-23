- The predefined fade transition can be disabled by setting `animateOpacity` to `false`.
- A scale variant can be created using `createPresenceComponentVariant()`, passing an object of variant parameters to override the `Scale` defaults:

```tsx
import { motionTokens, createPresenceComponentVariant } from '@fluentui/react-components';

// Overshoots the end point, then settles back to it.
const curveOvershootFirmOut = 'linear(0, 0.806 16.2%, 1.05 25%, 1.194 34.4%, 1.244 42.4%, 1.242 51.6%, 1.038 84.8%, 1)';

// Overshoots the start and end points.
const curveOvershootFirmInOut =
  'linear(0, -0.036 8.4%, -0.216 25.4%, -0.209 33.2%, 0.041 42.8%, 0.881 55.6%, 1.17 64%, 1.222 68.6%, 1.222 73.6%, 1.034 91.8%, 1)';

const CustomScaleVariant = createPresenceComponentVariant(Scale, {
  exitDuration: motionTokens.durationSlow,
  easing: curveOvershootFirmOut,
  exitEasing: curveOvershootFirmInOut,
  fromScale: 0.5, // increase the range of the scale transition
});
```
