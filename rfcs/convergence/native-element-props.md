# RFC: Customizing application of native element props and `ref`

@ecraig12345 @sopranopillow @behowell

## Summary

For certain components, it's necessary to apply top-level native props to an element besides the actual DOM root. This RFC proposes two possible mechanisms for handling this.

Whichever option is chosen, it should be used very sparingly to avoid confusion. The most obvious case is for input components (options for exact criteria discussed below).

## Problem statement

For most components, it makes sense to apply native props (and `ref`) to the root element. Currently the `root` slot always gets native element props passed to the component, and is not explicitly exposed via the API.

The input components are a little unique because the actual `<input>` _cannot_ be the root element of the component, since we need various wrappers for styling (and `<input>` can't have children). However, users may expect that some or all native props passed to the root of the component would be applied to the `<input>` itself. This may also be a requirement for certain 3rd-party form libraries.

For example, rendering a `<Checkbox/>` actually does this _(before the RFC is implemented)_:

```tsx
<slots.root>
  <slots.checkmark {/* visual checkmark */} />
  <slots.input {/* actual input */}>
  {children /*label*/}
</slots.root>
```

Or an `<Input/>` is roughly like this _(again pre-RFC)_:

```tsx
<slots.root>
  <slots.bookendBefore />
  <slots.inputWrapper {/* visually styled as the input */}>
    <slots.insideStart />
    <slots.input /> {/* actual input element */}
    <slots.insideEnd />
  </slots.inputWrapper>
  <slots.bookendAfter />
</slots.root>
```

So to specify a value, you'd have to use slot props:

```tsx
<Input input={{ id: 'foo', value: 'stuff' }} />
```

The question of where to apply the top-level `ref` has similar considerations and should likely follow the same pattern as native props.

### Principles for any solution

The chosen solution needs to adhere to the following principles (thanks @levithomason):

- User needs to retain access to any part of DOM at any time (can't make a piece of DOM that's unable to receive props)
- Consider what the user expects when using the component

### For inputs: 3rd-party form validation libraries

To the degree possible, we'd like inputs to work nicely with 3rd-party form libraries, which may have APIs that expect to be able to pass native props to the component and have them applied to the actual `<input>`. (needs more research)

- [Formik](https://github.com/formium/formik)
- [react-hook-form](https://github.com/react-hook-form/react-hook-form)
  - Note, for this one they might need to make a wrapper for our component because the library expects to be able to _set_ `.value` on the input, which presents its own challenges. (Someone brought this up for v8 [here](https://github.com/microsoft/fluentui/issues/18126).)
- [React Final Form](https://github.com/final-form/react-final-form)

## Detailed Design or Proposal

### Option A: allow setting a different "primary" slot; explicitly expose `root` _(formerly the proposed solution)_

<!-- Instead of always applying native props and `ref` to the root, allow setting a different "primary" slot where these props should be applied. This option should be used sparingly: for input components and possibly a few other cases (options for exact criteria discussed below).

Also explicitly expose the `root` slot for all components. This will allow passing native props to the root if needed for the "special case" components discussed above, and provide consistency across the library. -->

Add a notion of "primary" slot (open to suggestions for the name) where top-level native props and `ref` are applied. This would default to `root` but could be customized (need to work with @bsunderhus to determine implementation approach).

To facilitate passing props to the actual root element when it's not the "primary" slot, explicitly expose the `root` slot in props (possibly with type constraints to prevent passing problematic things). This would be done in all components for consistency.

In the interest of consistency/clarity, customizing the "primary" slot would be discouraged unless a component falls under certain special categories: definitely input components (`Input`, `Checkbox`, etc), and see "Open Issues" below for discussion of other possibilities.

#### Example: Checkbox

Suppose `Checkbox` sets its `input` slot as "primary." If the user does this:

```tsx
<Checkbox name="foo" checked root={{ id: 'bar' }} ref={ref}>
  sample
</Checkbox>
```

Output HTML is roughly like this (a few things omitted for clarity):

```html
<div id="bar">
  <!-- ref points to this element -->
  <input type="checkbox" name="foo" checked />
  <label>sample</label>
</div>
```

If someone really wanted to, they could still pass props explicitly on the `input` slot rather than top-level. This would give the same output HTML as before:

```tsx
<Checkbox input={{ name: 'foo', checked: true, ref: ref }} root={{ id: 'bar' }}>
  sample
</Checkbox>
```

#### Code updates

TODO: Need to work with @bsunderhus to figure out a non-`mergeProps` version

#### Pros

- Intuitive API for passing props to inputs
- Still allows customization of root props if needed
- Exposing root slot everywhere provides consistency across components
- Still possible to explicitly pass props to the "primary" slot rather than specifying them at top level

#### Cons

- Inconsistent between components, potentially leading to confusion about where native props are applied. This could be somewhat mitigated by having a clear, coherent (and documented!) definition of which components which fall under this special case.
- Potential confusion about whether top-level or slot props take precedence for the primary slot. This could also be addressed by documentation.

#### Open question: should top-level `className` and `style` always be applied to the root?

In a discussion about this topic, it was proposed that since `className` and `style` are commonly used for layout, it would be most intuitive for users if the top-level `className` and `style` are applied to the actual root DOM element (even if top-level native props were applied to a different element).

For example, suppose this Checkbox is in a flex or grid CSS layout where _styling must be applied to the DOM root_, and CSS class `foo` defines this styling.

```tsx
<Checkbox name="foo" checked className="foo">
  sample
</Checkbox>
```

If we go with applying `className` to the root, you'd get roughly this HTML:

```html
<div class="foo">
  <label>sample</label>
  <input type="checkbox" name="foo" checked />
</div>
```

The real question here is, how important is this scenario to users? Is that worth introducing the behavior inconsistency?

### Option B: Use input as `root` and add `wrapper` slot for root DOM element _(formerly discarded option 3)_

Use the native input element as the `root` slot, and use a `wrapper` slot (standardized name) as the actual root DOM element. This is roughly what the component would look like internally:

```tsx
<slots.wrapper>
  <slots.root {...slotProps.root} /> {/* input element */}
  <slots.label {...slotProps.label} />
</slots.wrapper>
```

So doing this would give the desired HTML as shown at the top of the "Discarded Solutions" section:

```tsx
<Checkbox name="foo" checked>
  sample
</Checkbox>
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

- Inconsistent between components, potentially leading to confusion about where native props are applied. This could be somewhat mitigated by having a clear, coherent (and documented!) definition of which components which fall under this special case.
- Inconsistent what `root` means (it's weird to call something "root" which isn't actually at the root). However since `root` is not exposed in the public API in this proposal,
- The name `wrapper` is already being used for slots in some components, with a different meaning (would probably need to change this)

## Open Issues

### Which components are "special"?

To avoid confusion from a user standpoint, if we're going to allow varying where top-level native props go, we need a very clear/coherent definition of where people can expect this different behavior, and/or categories of compnents it applies to.

The most obvious category is input components, as discussed earlier. So for consistency we'd need to ensure this pattern is applied to **all input components**. Please comment if you can think of any input components where this wouldn't work.

The following definitions have also been discussed. Feel free to comment with feedback on these, breaking counter-examples, or additional proposals.

- For any component that's **directly emulating an underlying HTML element**, native props go to the actual underlying element.
  - Most obviously applies to input components
  - Need examples of other components where this applies (if any)
- Native props go to the **semantic element**: either the native element, or the one with the the primary `role` for that component
  - Still works for inputs
  - Need examples of when the semantic `role` wouldn't be on the root element
  - Example from v8 (not sure if this applies to converged): Modal's actual React root element is usually a Layer, but from a user standpoint it makes a lot more sense to apply top-level props to the modal _content's_ root element.
- For interactive controls, props are passed to the **interative element**
  - Need examples here too

## Discarded Solutions

These were discussed on a [previous RFC](https://github.com/microsoft/fluentui/pull/18804) and retain the numbering used there.

The examples below assume you're rendering a Checkbox and this is roughly your desired HTML output (a few things omitted for clarity):

```html
<div>
  <input type="checkbox" name="foo" checked />
  <label>sample</label>
</div>
```

### Option 1: All native props always applied to root (current behavior)

> **Reason discarded:** Counterintuitive to user; possible incompatibility with 3rd-party form libraries.

Given this:

```tsx
<Checkbox name="foo" checked>
  sample
</Checkbox>
```

You get roughly this HTML, which is not useful:

```html
<!-- checked would be applied here but not used in DOM -->
<div name="foo">
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

- Very counterintuitive API (could help enforce with typings, but still seems unnatural)
- Might not work as easily with 3rd-party form libraries? (needs more research)

### Option 2: Most native props applied to root, selected props applied to "actual" element

> **Reason discarded:** No one could come up with a concrete way to determine which props should be cherry-picked that doesn't rely on intuition (which varies by person)

Given this, and an implementation which uses a list of special props (including `checked` and `name`) that are passed to the "actual" element, you'd get the desired HTML as shown at the top of the "Discarded Solutions" section.

```tsx
<Checkbox name="foo" checked>
  sample
</Checkbox>
```

#### Pros

- Better API for input components (and maybe other special-case components)

#### Cons

- Not clear how to determine which top-level props should be passed down to the `input`
  - If `checked` and `name` (and a few others) go to the `input`, the user might expect this behavior for all props and then be surprised
- Not clear what happens if a prop may be needed in multiple places
  - Example: if top-level `className` or `id` is passed to the `input`, what happens if they also want to give the root a `className` or `id`?
- Inconsistent between components (reduces API clarity)
- It's a breaking change if you want to modify where a prop is applied

### Option 4: Publish an input wrapper for styling, user passes `<input>` as a child

> **Reason discarded:** Counterintuitive API; unclear where user ought to specify certain props

This was proposed [in a PR comment](https://github.com/microsoft/fluentui/pull/18804#issuecomment-878998437) (see following comments for more discussion).

Provide a wrapper which applies our styling and behaviors, and have the user pass the actual `<input>` as a child. The wrapper would clone the child and apply any behaviors directly to the input. (This is similar to Tooltip or MenuTrigger.)

```tsx
<CheckboxField>
  {/* TBD: where are props specified? does user need to provide `type` prop here? */}
  <input />
</CheckboxField>
```

#### Pros

- An explicit way to specify props on the root and the input

#### Cons

- Extremely counterintuitive API (makes sense for menu triggers but much less sense here)
- Not clear where to specify props that both the wrapper and the input itself would need to access, such as `checked`/`value` and `onChange`. [More details here.](https://github.com/microsoft/fluentui/pull/18804#issuecomment-880071590). This gets especially messy if/when we need to introduce state management within the control.
