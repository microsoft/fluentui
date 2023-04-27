The `TreeItem` component represents a single item in a tree. It can contain child items in the form of another `Tree` component or standalone `TreeItem`. The content and layout of a `TreeItem` can be defined using the `TreeItemLayout` or `TreeItemPersonaLayout` component, which should be used as a direct child of `TreeItem`.

When a `TreeItem` has child items, an expand/collapse control is displayed, allowing the user to show or hide the children.

<!-- Don't allow prettier to collapse code block into single line -->
<!-- prettier-ignore -->
> **⚠️ Preview components are considered unstable:**
>
> ```jsx
>
> import { Tree, TreeItem } from '@fluentui/react-components/unstable';
>
> ```
>
> - Features and APIs may change before final release
> - Please contact us if you intend to use this in your product
