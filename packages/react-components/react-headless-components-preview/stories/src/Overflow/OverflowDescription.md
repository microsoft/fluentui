Overflow detects when its items no longer fit their container and moves the extras into an overflow
menu. It ships no styling — it only sets data attributes, which you style. Two of those rules are
required for the overflow engine to work, so add them alongside your own styling:

```css
[data-overflowing] {
  display: none;
} /* removes overflowed items from layout */
[data-overflow-menu] {
  flex-shrink: 0;
} /* keeps the menu at full size for measurement */
```

Compose it from:

- `Overflow` — the root; provides context and clones its single child to measure it.
- `OverflowItem` — marks a child as an overflow item (give each a unique `id`).
- `useOverflowMenu` — registers the overflow menu element and reports the overflow count.

Additional hooks (`useOverflowCount`, `useIsOverflowItemVisible`, `useIsOverflowGroupVisible`,
`useOverflowVisibility`, `useOverflowContext`) and the `OverflowDivider` / `OverflowReorderObserver`
components are re-exported from `@fluentui/react-overflow` for advanced scenarios.
