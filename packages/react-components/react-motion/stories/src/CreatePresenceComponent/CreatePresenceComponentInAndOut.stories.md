Every presence component has two halves, the `enter` and `exit` motions, which can be played in isolation using the `.In` and `.Out` components. The root component remains visible-controlled presence; the directional components play once on mount and do not take a `visible` prop.

For example, a presence called `MyFade` will contain `<MyFade.In>` and `<MyFade.Out>` motion components, which play the `enter` and `exit` as one-off motions:

```tsx
// Create the presence component

const MyFade = createPresenceComponent({
  enter: {
    keyframes: [{ opacity: 0 }, { opacity: 1 }],
    duration: 4000,
  },

  exit: {
    keyframes: [{ opacity: 1 }, { opacity: 0 }],
    duration: 2000,
  },
});
```

In the render, each of the 2 motions can be played separately:

```tsx
// plays the enter animation (4000 ms fade-in)
<MyFade.In>
  {/* Content */}
</MyFade.In>

// plays the exit animation (2000 ms fade-out)
<MyFade.Out>
  {/* Content */}
</MyFade.Out>
```

This can be useful when choreographing a series of motions, or mixing and matching the enter and exit animations from different presence components.

## Authored Endpoints

The preview `Fade`, `Scale`, and `Slide` components accept temporal endpoints on both `.In` and `.Out`: `from*` is the playback source and `to*` is the playback destination. Their present-pose `in*` props are only available on the root presence component.

```tsx
import { Fade, Scale, Slide } from '@fluentui/react-motion-components-preview';

<Fade.In fromOpacity={0.2} toOpacity={0.7}>
  <Content />
</Fade.In>

<Scale.Out fromScale={1.2} toScale={0.8} animateOpacity={false}>
  <Content />
</Scale.Out>

<Slide.Out fromX="4px" toY="-8px">
  <Content />
</Slide.Out>
```

The Slide example moves from `(4px, 0px)` to `(0px, -8px)`. Omitted axes in an authored endpoint default to `0px`. Scale and Slide include a fade-in on `.In` or a fade-out on `.Out` unless `animateOpacity={false}`.

For custom motion functions, `createPresenceComponent`'s optional `poseProps` mapping enables this endpoint normalization. Each entry names the `from`, `in`, and `to` properties for one pose value. Those properties must share a value type, and an optional `neutral` value must have that type. Without a mapping, `.In` and `.Out` forward endpoint parameters unchanged and select the function's enter or exit definition. A fixed definition such as `MyFade` above has no configurable motion parameters.

## Timing and Replay

Function-based directional components accept their motion function's timing props, including `duration`, `easing`, and `delay` for preview Fade, Scale, and Slide. On `.Out`, explicit ordinary timing is copied to its exit-prefixed counterpart before variant defaults are merged, whether or not `poseProps` is supplied. An explicit `exitDuration`, `exitEasing`, or `exitDelay` takes precedence over its ordinary counterpart. Variants created with `createPresenceComponentVariant` retain the pose mapping and directional components.

Change `replayKey` to replay a one-way motion without remounting the child:

```tsx
<MyFade.In replayKey={animationVersion}>
  <Content />
</MyFade.In>
```

`replayKey` reuses the existing animation. It does not rebuild keyframes from changed motion parameters; use a new React `key` to remount with new parameters.

Completing `.Out` does not unmount the child. Use a root presence component with `visible` and `unmountOnExit` for visibility-controlled mounting.
