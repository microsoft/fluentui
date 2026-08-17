# focusgroup

Adds a typed `focusgroup` attribute to React's `HTMLAttributes` for components that use the experimental [Open UI Focusgroup V2 proposal](https://open-ui.org/components/focusgroup-v2.explainer/).

This typing is intended for development-time validation only. It does not provide focusgroup behavior or become part of a package's public API.

## Usage

Opt into the typing from the consuming project's TypeScript configuration:

```json
{
  "compilerOptions": {
    "types": ["focusgroup"]
  }
}
```

The repository's root `typeRoots` already includes `typings`. A project that overrides `typeRoots` must also include the repository typings directory.

React elements then accept supported focusgroup values:

```tsx
<div focusgroup="toolbar inline wrap" />;
<div focusgroup="radiogroup" />;
<div focusgroup="feed block nowrap nomemory" />;
<div focusgroup="grid manual rowflow colflow" />;
<button focusgroup="none" />;
```

Unsupported behaviors, modifiers, and modifier ordering produce TypeScript errors:

```tsx
<div focusgroup="tree" />;
<div focusgroup="toolbar manual" />;
<div focusgroup="feed rowflow" />;
```

## Supported values

The first token identifies the behavior:

- `toolbar`
- `menubar`
- `tablist`
- `radiogroup`
- `listbox`
- `menu`
- `grid`
- `feed`

`none` is a standalone value that opts an element and its subtree out of an ancestor focusgroup.

Linear behaviors support these modifiers:

- Axis: `inline` or `block`
- Wrapping: `wrap` or `nowrap`
- Memory: `nomemory`
- Nested controls: `itemcontrols` or `noitemcontrols`

The `grid` behavior supports:

- Topology: `manual`
- Both-axis edges: `wrap`, `nowrap`, or `flow`
- Inline-axis edges: `rowwrap` or `rowflow`
- Block-axis edges: `colwrap` or `colflow`
- Memory: `nomemory`
- Nested controls: `itemcontrols` or `noitemcontrols`

The Open UI syntax permits tokens in any order. To keep React's ambient attribute type tractable, this typing uses the conventional order recommended by the explainer:

- Linear: behavior, axis, wrapping, memory, nested controls
- Grid: `grid`, topology, edge behavior, memory, nested controls
