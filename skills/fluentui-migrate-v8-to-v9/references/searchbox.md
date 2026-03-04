# SearchBox Migration

v9 `SearchBox` is in `@fluentui/react-components`. The API is similar to v9 `Input` with a built-in dismiss button and search icon. Wrap in `<Field>` for labels.

## Prop Mapping

| v8 `ISearchBoxProps` | v9 `SearchBoxProps`        | Notes                                                                                        |
| -------------------- | -------------------------- | -------------------------------------------------------------------------------------------- |
| `value`              | `value`                    |                                                                                              |
| `defaultValue`       | `defaultValue`             |                                                                                              |
| `placeholder`        | `placeholder`              |                                                                                              |
| `onChange`           | `onChange`                 | Type changed: `(_, data: InputOnChangeData) => void`; dismiss fires with `data.value === ''` |
| `onSearch`           | —                          | Use native `onKeyDown` checking `event.key === 'Enter'`                                      |
| `onClear`            | `onChange` with `''`       | Dismiss button calls `onChange` with empty string                                            |
| `iconProps`          | `contentBefore` slot       | Pass `<SearchRegular />` or custom icon                                                      |
| `underlined`         | `appearance="underline"`   |                                                                                              |
| `disableAnimation`   | —                          | Not supported                                                                                |
| `disabled`           | `disabled`                 |                                                                                              |
| `className`          | `className`                | Applies to the outer wrapper                                                                 |
| `styles`             | `className` + `makeStyles` |                                                                                              |
| `theme`              | —                          | Use `FluentProvider`                                                                         |
| `componentRef`       | `ref`                      |                                                                                              |

## Appearance Values

| v8                  | v9                    |
| ------------------- | --------------------- |
| Default             | `"outline"` (default) |
| `underlined={true}` | `"underline"`         |
| —                   | `"filled-darker"`     |
| —                   | `"filled-lighter"`    |

## Before / After

```tsx
// v8
import { SearchBox } from '@fluentui/react';
<SearchBox
  placeholder="Search"
  value={query}
  onChange={(_, v) => setQuery(v ?? '')}
  onSearch={v => doSearch(v)}
  onClear={() => setQuery('')}
/>;

// v9
import { SearchBox } from '@fluentui/react-components';
<SearchBox
  placeholder="Search"
  value={query}
  onChange={(_, data) => setQuery(data.value)}
  onKeyDown={e => e.key === 'Enter' && doSearch(query)}
/>;
```

## With Field (label + validation)

```tsx
import { Field, SearchBox } from '@fluentui/react-components';
<Field label="Search products">
  <SearchBox placeholder="Type to search..." />
</Field>;
```

## Accessibility Notes

- For a top-level site search area, wrap `SearchBox` in a `<div role="search">` element
- Use `underline` or `outline` appearance when the surrounding background has low contrast
