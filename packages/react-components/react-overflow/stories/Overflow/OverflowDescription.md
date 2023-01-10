<!-- Don't allow prettier to collapse code block into single line -->
<!-- prettier-ignore -->
> **⚠️ Preview components are considered unstable:**
>
> ```jsx
>
> import { Overflow, OverflowItem } from '@fluentui/react-components/unstable';
>
> ```
>
> - Features and APIs may change before final release
> - Please contact us if you intend to use this in your product

The `Overflow` and `OverflowItem` components, are low level utilities that enable users to create overflow
experiences with any component. The components will detect and hide overflowing elements in DOM and manage
the overflow state. Additional overflow hooks can be used to handle overflowing items. In the reference
examples below the overflowing items are handled using a `Menu`.

Additional hooks will be needed to create _**your specific overflow scenario**_. Please refer to the reference implementations
below, which will use the additional utilities:

- `useOverflowMenu`- returns a ref that registers and overflow menu element.
- `useIsOverflowItemVisible`- returns whether an overflow item is visible.
- `useOverflowCount`- returns the number of overflowing items.
- `useOverflowGroupVisible`- return the visibility of an overflow group.
