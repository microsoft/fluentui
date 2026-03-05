## Instructions

- see `ISSUE` label within output examples
- input is for actual source code
- output is current invalid output

### Issue - types and generic types

**input**

```ts
const renderRow: RowRenderer<Item> = (
  { item, rowId },
  style,
  _,
  isScrolling
) => ()
```

**output**

```json
{
  "others": {
    /* ISSUE: RowRenderer is a type category. Also if type is using generics they should be captured under `props` field */
    "RowRenderer": {
      "count": 4
    }
  }
}
```

### Issue - referencing Components

**input**

```ts
const meta: Meta<typeof HeadlessFluentProvider> = {
  title: 'Packages/react-headless-provider',
  component: HeadlessFluentProvider,
};
```

**output**

```json
{
"others": {
      /* ISSUE:
        - HeadlessFluentProvider is used once as Component reference, so should be under `components category
        - HeadlessFluentProvider type is used via `typeof`, we should put these under `types` category
       */
      "HeadlessFluentProvider": {
        "count": 2
      }
}
```

### Issue - function arguments

**input**

```ts
...useTableRow_unstable({}, React.createRef()),
```

**current output**

```json
{
  "useTableRow_unstable": {
    "props": {
      /* ISSUE: missing `{}` argument capture */
      "arg1": {
        "values": ["React.createRef()"],
        "count": 1
      }
    },
    "count": 1
  }
}
```
