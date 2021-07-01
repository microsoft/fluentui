# RFC: How to handle native element props for input components

<!--
An RFC can be anything. A question, a suggestion, a plan. The purpose of this template is to give some structure to help folks write successful RFCs. However, don't feel constrained by this template; use your best judgement.

Tips for writing a successful RFC:

- Simple plain words that make your point, fancy words obfuscate
- Try to stay concise, but don't gloss over important details
- Try to write a neutral problem statement, not one that motivates your desired solution
- Remember, "Writing is thinking". It's natural to realize new ideas while writing your proposal
-->

---

@sopranopillow @ecraig12345

## Summary

This RFC proposes options on how to handle the native element props for input components on `vNext`. Currently the native props for all vNext components are applied to the root element, but in the case of an input component there are native input props that should be handled as well.

<!-- Explain the proposed change -->

## Problem statement

For most components, it makes sense to apply native props (and the ref) to the root element.

The input components are a little unique because the actual `<input>` *cannot* be the root element of the component, since we need various wrappers for styling. For example, rendering a `<Checkbox/>` actually does this:
```tsx
<div>
  <div ... /> {/* checkmark */}
  <input type="checkbox" />
  <label {...slotProps.label} />
</div>
```
Or an `<Input/>` is roughly like this:
```tsx
<div>
  {/* optional bookend before slot */}
  <div> {/* wrapper visually styled as an input (maybe, TBD) */}
    {/* optional start slot */}
    <input type="text" .../>
    {/* optional end slot */}
  </div>
  {/* optional bookend after slot */}
</div>
```

Another unique thing about inputs is that to the degree possible, we'd like them to work nicely with 3rd-party form libraries, which may have APIs that expect to be able to pass native props to the component and have them applied to the actual `<input>`. (needs more research)

### [Formik](https://github.com/formium/formik)

### [react-hook-form](https://github.com/react-hook-form/react-hook-form)

Note, for this one they'd need to make a wrapper for our component because the library expects to be able to *set* `.value` on the input, which we probably don't intend to support. (Someone brought this up for v8 [here](https://github.com/microsoft/fluentui/issues/18126).)

### [React Final Form](https://github.com/final-form/react-final-form)



<!--
Why are we making this change? What problem are we solving? What do we expect to gain from this?

This section is important as the motivation or problem statement is indepenent from the proposed change. Even if this RFC is not accepted this Motivation can be used for alternative solutions.

In the end, please make sure to present a neutral Problem statement, rather than one that motivates a particular solution
-->

## Detailed Design or Proposal

<!-- This is the bulk of the RFC. Explain the proposal or design in enough detail for the inteded audience to understand. -->

We don't have one suggested/preferred solution yet, because all of them have some significant problems.

The examples below assume you're rendering a Checkbox and this is roughly your desired HTML output (it would also include a generated ID to associate the label and input):
```html
<div>
  <input type="checkbox" name="foo" checked />
  <label>sample</label>
</div>
```

### Option 1: All native props always applied to root (current behavior)

Given this:
```tsx
<Checkbox name="foo" checked>sample</Checkbox>
```

You get roughly this HTML, which is not useful:
```html
<div name="foo" checked>
  <input type="checkbox" />
  <label>sample</label>
</div>
```

So to specify a value, you'd have to use slot props:
```tsx
<Checkbox input={{ name: 'foo', checked: true }}>sample</Checkbox>
```

#### Pros

- Complete consistency between all components

#### Cons

- Very counterintuitive API
    - We could use typings to ensure that doing e.g. `<Checkbox checked/>` caused a TS error, but it still seems very unnatural
- Might not work as easily with 3rd-party form libraries? (needs more research)

### Option 2: Most native props applied to root, selected props applied to "actual" element

Given this, and an implementation which uses a list of special props (including `checked` and `name`) that are passed to the "actual" element:
```tsx
<Checkbox name="foo" checked>sample</Checkbox>
```

You'd get the desired HTML.

The problem is, it's unclear where some of the other props ought to be applied, such as `id`, `className`, and event handlers.

#### Pros

- Better API for input components (and maybe other special-case components)

#### Cons

- Not clear how to determine which top-level props should be passed down to the `input`
    - If `checked` and `name` (and a few others) go to the `input`, the user might expect this behavior for all props and then be surprised
- Not clear what happens if a prop may be needed in multiple places
    - Example: if top-level `className` or `id` is passed to the `input`, what happens if they also want to give the root a `className` or `id`?
- Inconsistent between components (reduces API clarity)

### Option 3

Let the native input element be the "root" slot, but use a `wrapper` slot as the actual root DOM element. Here's an example:

```tsx
<slots.wrapper>
    <div {...checkmark} />
    <slots.root {...slotProps.root} /> <!-- input element -->
    <slots.label {...slotProps.label} />
</slots.wrapper>
```

So doing this would give the desired HTML:
```tsx
<Checkbox name="foo" checked>sample</Checkbox>
```

And if you wanted to apply props to the wrapper element, you could use slot props:
```tsx
<Checkbox name="foo" checked className="foo" wrapper={{ className: 'bar' }}>
  sample
</Checkbox>
```

Which would give you roughly this:
```html
<div class="bar">
  <input type="checkbox" name="foo" checked className="foo" />
  <label>sample</label>
</div>
```

#### Pros

- For the individual component, more obvious which props go where, and a more intuitive API
- Allows any valid prop to be applied to the root and/or the input (not just one or the other)

#### Cons

- Inconsistent between components, potentially leading to confusion
- Might be unclear which components implement this special handling

### Pros and Cons

<!-- Enumerate the pros and cons of the proposal. Make sure to think about and be clear on the cons or drawbacks of this propsoal. If there are multiple proposals include this for each. -->

(to be filled out once a solution is chosen)

## Discarded Solutions

<!-- As you enumerate possible solutions, try to keep track of the discarded ones. This should include why we discarded the solution. -->

(to be filled out once a solution is chosen)

## Open Issues

<!-- Optional section, but useful for first drafts. Use this section to track open issues on unanswered questions regarding the design or proposal.  -->
