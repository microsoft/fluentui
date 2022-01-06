# RFC: Conventions for static class names on slots

<!--
An RFC can be anything. A question, a suggestion, a plan. The purpose of this template is to give some structure to help folks write successful RFCs. However, don't feel constrained by this template; use your best judgement.

Tips for writing a successful RFC:

- Simple plain words that make your point, fancy words obfuscate
- Try to stay concise, but don't gloss over important details
- Try to write a neutral problem statement, not one that motivates your desired solution
- Remember, "Writing is thinking". It's natural to realize new ideas while writing your proposal
-->

---

@behowell

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

The root slot already has a static className with the format `fui-{ComponentName}`, per [#19937](https://github.com/microsoft/fluentui/issues/19937). This RFC proposes that every other slot of a component should have a static className added, with the format `fui-{ComponentName}-{slot}`. The static className would be added to the start before any other classNames.

For example, the HTML tree of Checkbox would look like:

```html
<span className="fui-Checkbox ...other classes...">
  <span className="fui-Checkbox-indicator ...other classes..."> ... </span>
  <input className="fui-Checkbox-input ...other classes..." />
  <label className="fui-Checkbox-label ...other classes..."> ... </label>
</span>
```

This would be added to every slot of every component, and enforced by a conformance test.

These classNames could be exported from each components in an object:

```ts
export const checkboxClassNames: ClassNames<CheckboxSlots> = {
  root: 'fui-Checkbox',
  label: 'fui-Checkbox-label',
  input: 'fui-Checkbox-input',
  indicator: 'fui-Checkbox-indicator',
};
```

With the helper type:

```ts
export type ClassNames<Slots extends Record<string, unknown>> = {
  [SlotName in keyof Slots]-?: SlotName extends 'root' ? `fui-${string}` : `fui-${string}-${Extract<SlotName, string>}`;
};
```

### Pros and Cons

#### Pros

- Reliable, predictable class names for every element in our components

#### Cons

- Adds extra classes that may never be used
- Encourages styling by static classes, which could have precedence issues with our atomic css classes(?)

## Open Issues

### Should we export constants for each slot?

We could export constants, or just rely on the single export for the root className, and people can follow the naming convention if they want slot names? if we want to export the slots, it could be done like so:

```ts
// Helper type in react-utilities:
export type ClassNames<Slots extends Record<string, unknown>> = {
  [SlotName in keyof Slots]-?: SlotName extends 'root' ? `fui-${string}` : `fui-${string}-${Extract<SlotName, string>}`;
};

// Exported from react-checkbox:
export const checkboxClassNames: ClassNames<CheckboxSlots> = {
  root: 'fui-Checkbox',
  label: 'fui-Checkbox-label',
  input: 'fui-Checkbox-input',
  indicator: 'fui-Checkbox-indicator',
};
```
