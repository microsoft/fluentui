`PresenceGroup` is a component that manages a set of components created with `createPresenceComponent()` in a list. `PresenceGroup` is a state machine for managing the mounting and unmounting of components over time.

> Note: `PresenceGroup` does not define motions.
>
> It only manages the mounting and unmounting of components. You must use `createPresenceComponent()` to define the motions for each component. This allows you to mix and match different motions for different components in the same `PresenceGroup`.

<!-- Don't allow prettier to collapse code block into single line -->
<!-- prettier-ignore -->
> **⚠️ Preview packages are considered unstable:**
> - Features and APIs may change before final release
> - Please contact us if you intend to use this in your product
