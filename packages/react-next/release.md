# @fluentui/react Release Notes

## Breaking changes

### Pivot

- Converted Pivot to a function component.
- Removed deprecated and redundant props from v7, including: `intialSelectedKey`, `defaultSelectedIndex`, and . Use `selectedKey` or `defaultSelectedKey` to define the selected tab, and provide `itemKey` on pivot item children.
