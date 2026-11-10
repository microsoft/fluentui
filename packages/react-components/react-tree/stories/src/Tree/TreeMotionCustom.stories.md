`Tree`'s `collapseMotion` slot can directly take `Collapse` props, such as `duration`, `easing`, `animateOpacity` and others.

The `collapseMotion` slot also supports the `children` render function, which allows replacing the default `Collapse` with a custom implementation. This story demonstrates the simpler direct prop approach.

Note that `collapseMotion` must be set on each subtree `<Tree>` element — not the root — since the root tree does not animate:

```tsx
// Don't use collapseMotion on the root tree, which does not animate
<Tree aria-label="...">
  <TreeItem itemType="branch">
    <TreeItemLayout>Branch label</TreeItemLayout>
    {/* Use collapseMotion on the subtree */}
    <Tree collapseMotion={{ duration, easing, animateOpacity }}>{/* leaf items */}</Tree>
  </TreeItem>
</Tree>
```
