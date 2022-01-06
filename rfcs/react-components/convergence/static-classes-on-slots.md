# RFC: Conventions for static class names on slots

Contributors: @behowell
RFC Issue: [#21206](https://github.com/microsoft/fluentui/pull/21206)

## Summary/Background

Every slot of every component should have a static className with a consistent and predictable format for class names on slots

## Background

We currently have a static class name `"fui-{ComponentName}"` (e.g. `"fui-Button"`) added to the root slot of every component, as described in issue [#19937](https://github.com/microsoft/fluentui/issues/19937).

## Problem statement

It can be useful to have a static class name on the slot of a component, including by users of our library if they want to write static styles targeting a slot. We don't currently have any formal specification of the format of these static class names, nor any conformance tests ensuring that they are added to every slot.

Some of our components already have static classNames on slots (e.g. Checkbox's `indicator` slot). However, this patchwork addition of static classes makes it unpredictable for users of our library.

One example internal usage would be to write a style such as this, which changes the Checkbox `indicator` slot's backgroundColor when hovering over the `root`:

```ts
const useStyles = makeStyles({
  root: {
    ':hover': {
      '& .fui-Checkbox-indicator': {
        backgroundColor: tokens.colorCompoundBrandBackgroundHover,
      },
    },
  },
});
```

## Detailed Design or Proposal

### Slot Names

The root slot already has a static className with the format `fui-{ComponentName}`, per [#19937](https://github.com/microsoft/fluentui/issues/19937). This RFC proposes that every other slot of a component should have a static className added, with the format `fui-{ComponentName}-{slot}`. The static className would be added to the start before any other classNames.

For example, the HTML tree of Checkbox would look like:

```html
<span className="fui-Checkbox ...other classes...">
  <span className="fui-Checkbox-indicator ...other classes..."> ... </span>
  <input className="fui-Checkbox-input ...other classes..." />
  <label className="fui-Checkbox-label ...other classes..."> ... </label>
</span>
```

### Exports

These classNames could be exported from each components in an object. This would replace the existing `{component}ClassName` export.

Although these names could be automatically generated, there is value in having them be explicitly written out in the source code so it can be found via searching.

```ts
export const checkboxClassNames: ClassNames<'Checkbox', CheckboxSlots> = {
  root: 'fui-Checkbox',
  label: 'fui-Checkbox-label',
  input: 'fui-Checkbox-input',
  indicator: 'fui-Checkbox-indicator',
};
```

With the helper type that ensures every slot type is defined:

```ts
export type ClassNames<ComponentName extends string, Slots> = {
  [SlotName in keyof Slots]-?: SlotName extends 'root'
    ? `fui-${ComponentName}`
    : `fui-${ComponentName}-${Extract<SlotName, string>}`;
};
```

### Conformance Tests

There would be a new conformance test that would check that each slot has a static class name. We'd need to figure out the best way to implement it, but it might require passing the `{component}ClassNames` object so the test knows the names of all of the slots.

## Pros and Cons

### Pros

- Users can rely on every slot having a static class name they can use for selectors
- The naming convention is predictable

### Cons

- Adds extra classes that may never be used
- Encourages styling by static classes, which could have precedence issues with our atomic css classes(?)
