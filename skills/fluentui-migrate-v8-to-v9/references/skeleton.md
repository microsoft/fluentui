# Shimmer → Skeleton Migration

`Shimmer` (v8) → `Skeleton` + `SkeletonItem` (v9). The data-loading gate (`isDataLoaded`) is removed — Skeleton is purely a visual placeholder; show/hide it with your own conditional rendering.

## Key Differences

- No `isDataLoaded` toggle — conditionally render `<Skeleton>` vs real content yourself
- `shimmerElements` array (Line, Circle, Gap) → compose `<SkeletonItem>` children with CSS layout
- `customElementsGroup` → use `<SkeletonItem>` children directly
- `width` prop on `<Shimmer>` is equivalent to setting `width` on `<SkeletonItem>` (or use `className`)

## Prop Mapping — Shimmer → Skeleton / SkeletonItem

| v8 `IShimmerProps`    | v9 equivalent                                | Notes                                                |
| --------------------- | -------------------------------------------- | ---------------------------------------------------- |
| `isDataLoaded`        | —                                            | Conditionally render `<Skeleton>` vs real content    |
| `shimmerElements`     | `<SkeletonItem>` children                    | Build layout with JSX + CSS instead of element array |
| `customElementsGroup` | `<SkeletonItem>` children                    |                                                      |
| `width`               | `width` on `<SkeletonItem>` (or `className`) | **Deprecated** in v9 — use `className`               |
| `styles`              | `className` + `makeStyles`                   |                                                      |
| `theme`               | —                                            | Use `FluentProvider`                                 |
| `shimmerColors`       | —                                            | Use `className` + token overrides                    |

## SkeletonItem Props

| Prop         | Values                                                                                                         | Notes                                 |
| ------------ | -------------------------------------------------------------------------------------------------------------- | ------------------------------------- |
| `shape`      | `"rectangle"` (default) \| `"circle"`                                                                          |                                       |
| `size`       | `16` \| `20` \| `24` \| `28` \| `32` \| `36` \| `40` \| `48` \| `56` \| `64` \| `72` \| `96` \| `120` \| `128` | Pixel height                          |
| `animation`  | `"wave"` (default) \| `"pulse"`                                                                                | On `<Skeleton>`, applies to all items |
| `appearance` | `"opaque"` (default) \| `"translucent"`                                                                        | On `<Skeleton>`                       |

## Before / After

```tsx
// v8 — data-gated with isDataLoaded
import { Shimmer, ShimmerElementType } from '@fluentui/react';

<Shimmer
  isDataLoaded={isLoaded}
  shimmerElements={[
    { type: ShimmerElementType.circle, height: 40 },
    { type: ShimmerElementType.gap, width: 8 },
    { type: ShimmerElementType.line },
  ]}
>
  <MyContent />
</Shimmer>;

// v9 — conditional render
import { Skeleton, SkeletonItem, makeStyles } from '@fluentui/react-components';

const useStyles = makeStyles({
  row: { display: 'flex', alignItems: 'center', gap: '8px' },
});

function LoadableContent({ isLoaded }: { isLoaded: boolean }) {
  const s = useStyles();
  if (!isLoaded) {
    return (
      <Skeleton aria-label="Loading content">
        <div className={s.row}>
          <SkeletonItem shape="circle" size={40} />
          <SkeletonItem style={{ flex: 1 }} />
        </div>
      </Skeleton>
    );
  }
  return <MyContent />;
}
```

## Accessibility

- Add `aria-label` to `<Skeleton>` (single loader) or `aria-busy="true"` to the container (multiple loaders)
- Announce once when all content loads — don't add `aria-live` to individual `<Skeleton>` items
