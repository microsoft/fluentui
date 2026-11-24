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

## Authored Endpoints with `poseProps`

For function-based presence components, `createPresenceComponent` accepts an optional second argument with `poseProps` to declare temporal pose parameters (`from`, optional `in`, and `to`):

```tsx
const Slide = createPresenceComponent(slideMotion, {
  poseProps: [
    [
      { from: 'fromX', in: 'inX', to: 'toX', neutral: '0px' },
      { from: 'fromY', in: 'inY', to: 'toY', neutral: '0px' },
    ],
  ],
});
```

When `poseProps` is provided, `.In` and `.Out` expose directional prop contracts:

- `.In` accepts `from*` pose props and enter timing (`duration`, `easing`, `delay`), and omits `in*`, `to*`, and exit timing (`exitDuration`, `exitEasing`, `exitDelay`).
- `.Out` accepts `to*` pose props and timing (`duration`/`exitDuration`, `easing`/`exitEasing`, `delay`/`exitDelay`), and omits `in*` and `from*`.
- The root presence component accepts all declared `from*`, `in*`, and `to*` props.

Each entry in `poseProps` is either a single mapping object `{ from, in?, to }` for a scalar pose (omitting `in` when the settled pose is measured from the DOM) or a nested array of mappings for coupled axes of one multi-axis pose. Inside a multi-axis group, an optional `neutral` value fills omitted sibling axes whenever any axis in that group is authored, without affecting independent poses in other groups. A pose's `from`, `in`, and `to` keys must be distinct, optional on the motion parameters type, and share a value type. Without `poseProps`, `.In` and `.Out` keep the full motion parameter surface. A fixed definition such as `MyFade` above has no configurable motion parameters.

When typing custom motion parameters alongside `poseProps`, annotate the motion function (for example with `PresenceMotionFn<Params>` or an inline parameter type) instead of passing a single explicit `<Params>` type argument to `createPresenceComponent`, so TypeScript can infer the mapped keys for `.In` and `.Out`:

```tsx
const slideMotion: PresenceMotionFn<SlideParams> = ({ fromX = '0px', inX = '0px', toX = fromX }) => ({
  // ...
});

const Slide = createPresenceComponent(slideMotion, {
  poseProps: [{ from: 'fromX', in: 'inX', to: 'toX' }],
});
```

## Timing and Replay

Function-based directional components accept their motion function's timing props. On `.Out`, explicit ordinary timing (`duration`, `easing`, `delay`) is copied to its exit-prefixed counterpart (`exitDuration`, `exitEasing`, `exitDelay`) before variant defaults are merged, whether or not `poseProps` is supplied. An explicit `exitDuration`, `exitEasing`, or `exitDelay` takes precedence over its ordinary counterpart on `.Out`. Variants created with `createPresenceComponentVariant` retain the `poseProps` mapping and directional prop contracts.

Change `replayKey` to replay a one-way motion without remounting the child:

```tsx
<MyFade.In replayKey={animationVersion}>
  <Content />
</MyFade.In>
```

`replayKey` reuses the existing animation. It does not rebuild keyframes from changed motion parameters; use a new React `key` to remount with new parameters.

Completing `.Out` does not unmount the child. Use a root presence component with `visible` and `unmountOnExit` for visibility-controlled mounting.
