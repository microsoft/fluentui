<!-- Don't allow prettier to collapse code block into single line -->
<!-- prettier-ignore -->
> **⚠️ Preview components are considered unstable:**
>
> ```jsx
>
> import { DataGrid } from '@fluentui/react-components/unstable';
>
> ```
>
> - Features and APIs may change before final release
> - Please contact us if you intend to use this in your product

> 💡 This component is a higher level extension of the `Table` primitive components and the `useTableFeatures` hook.
> `DataGrid` is a feature-rich component that uses `useTableFeatures` internally,
> so there should always be full feature parity with what can be
> achieved with primitives. This component is **opinionated** and this is intentional. If the desired scenario can
> be achieved easily and does not vary too much from documented examples, it can be very convenient. If the desired
> scenario varies a lot from the documented examples please use the `Table` components with `useTableFeatures` (or
> another state management solution of choice).

> ⚠️ Feature requests will be accepted, but the team will prioritize overall API scalability and extensibility over
> uncommon features and scenarios.
