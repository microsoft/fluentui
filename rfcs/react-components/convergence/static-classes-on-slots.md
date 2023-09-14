# RFC: Conventions for static class names on slots

Contributors: @behowell

History:

- [PR #21206](https://github.com/microsoft/fluentui/pull/21206) - Initial submission

## Summary

This RFC proposes adding a static className to every slot, using the naming format `"fui-{ComponentName}__{slotName}"`.

It can be useful to have a static class name on every slot of a component, both for writing style selectors, and when debugging to tell what slot a given element is.

## Problem statement

We currently have a static class name `"fui-{ComponentName}"` (e.g. `"fui-Button"`) added to the root slot of every component, as described in issue [#19937](https://github.com/microsoft/fluentui/issues/19937). However, we don't currently have any formal specification of the format of the classNames for other slots, nor any conformance tests ensuring that they are added to every slot.

Some of our components already have static classNames on slots (e.g. Checkbox's `indicator` slot). However, this patchwork addition of static classes makes it unpredictable for users of our library.

One example of internal usage would be to write a style such as this, which changes the Checkbox `indicator` slot's backgroundColor when hovering over the `root`:

```ts
const useStyles = makeStyles({
  root: {
    ':hover': {
      '& .fui-Checkbox__indicator': {
        backgroundColor: tokens.colorCompoundBrandBackgroundHover,
      },
    },
  },
});
```

## Detailed Design or Proposal

### Slot Names

The root slot already has a static className with the format `fui-{ComponentName}`, per [#19937](https://github.com/microsoft/fluentui/issues/19937). This RFC proposes that every other slot of a component should have a static className added to the start before any other classNames, with the format `fui-{ComponentName}__{slot}`. This naming convention aligns other libraries' CSS naming conventions, including [BEM](https://en.bem.info/methodology/naming-convention/).

For example, the HTML tree of Checkbox would look like:

```html
<span className="fui-Checkbox ...other classes...">
  <span className="fui-Checkbox__indicator ...other classes..."> ... </span>
  <input className="fui-Checkbox__input ...other classes..." />
  <label className="fui-Checkbox__label ...other classes..."> ... </label>
</span>
```

### Exports

These classNames could be exported from each component in an object. This would replace the existing `{component}ClassName` export.

Although these names could be automatically generated, there is value in having them be explicitly written out in the source code so it can be found via searching.

```ts
export const checkboxClassNames: ClassNames<CheckboxSlots> = {
  root: 'fui-Checkbox',
  label: 'fui-Checkbox__label',
  input: 'fui-Checkbox__input',
  indicator: 'fui-Checkbox__indicator',
};
```

With the helper type that ensures every slot type is defined:

```ts
export type ClassNames<Slots> = {
  [SlotName in keyof Slots]-?: string;
};
```

### Conformance Tests

There would be a new conformance test that would check that each slot has a static class name. We'd need to figure out the best way to implement it, but it might require passing the `{component}ClassNames` object so the test knows the names of all of the slots.

## Pros and Cons

### Pros

- Users can rely on every slot having a static class name they can use for selectors.
- The naming convention is predictable.
- Simplifies debugging: you can see which component and slot the element applies to.
- Gives users an option to avoid writing code that relies on the specific DOM order of our elements. For example, instead of using something fragile like `.fui-Checkbox:nth-child(3)`, they can instead use `.fui-Checkbox__indicator`.
- Reinforces that slots are a part of the API of a component: changes to a slot's name, or removing a slot, are breaking changes.

### Cons

- Adds extra classes that may never be used.
- Encourages styling by static classes, which could have precedence issues with our atomic css classes.
- Increases bundle size (by a trivial amount).
