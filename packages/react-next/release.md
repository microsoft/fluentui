# @fluentui/react Release Notes

## Breaking changes

### Pivot

- Removed deprecated and redundant props from v7, including: `intialSelectedKey`, `defaultSelectedIndex`, and . Use `selectedKey` or `defaultSelectedKey` to define the selected tab, and provide `itemKey` on pivot item children.
