# RFC: Appearance migration

@peta-duda

## Summary

Fluent V9 changes the default appearance of input components (`Dropdown`, `Input`, `TextArea`). V0 input components default background color is grey-ish, whereas in V9 the background color is white.

## Background

Partners could change the background color to match the previous version of Fluent by passing a prop `appearance` with value `filled-darker`, but this solution does not scale well for partners when migrating to the new version and is error prone.

## Problem statement

This RFC explores potential solutions for partners, so they could migrate input components to V9 without the extra work of adding an additional prop to input components.

Partners should also easily revert the decision to the default appearance value if they decide so, without changing inputs individually.

👎 Cons of adding appearance to achieve the same design as V0:

- Not scalable, partners would have to add the prop to every component
- If they decide to revert back to default appearance in future, they would have to go through the same pain again by removing the prop
- Is error prone

## Detailed Design or Proposal

### Composition component

Partners could create a new composition component and modify the props in their preferred way. If the partner would like to keep the original color, they could create the composition component and have the default component without the appearance prop renders as `filled-darker`.

👍 Pros:

- Would work in iframes
- Is relatively safe

👎 Cons:

- Creating new composition component for each input `Dropdown`, `Input`, `TextArea` and `DatePicker`
- Composition component apperance prop wouldn't match our Fluent V9 documentation

### Global css selector

Targeting all input selectors from a partner app and change the color with global css.

👍 Pros:

- Relatively easy and fast to do

👎 Cons:

- Wouldn’t work in iframes (?)
- Difficult to validate

### New token alias to theme

Adding a new theme token that the partner could override the existing one.

👍 Pros:

- Easy to do but creating for each input component (?)

👎 Cons:

- Negative impact on performance by increasing variables (as read here: [fluentui/theme-shared-colors.md at d5d510bf1ffcc1a4ed2067e9eb009c84e7beb351 · microsoft/fluentui (github.com)](https://github.com/microsoft/fluentui/blob/d5d510bf1ffcc1a4ed2067e9eb009c84e7beb351/rfcs/react-components/convergence/theme-shared-colors.md))

### Unify design

Discuss with designers to unify V0 and V9 design, setting the appearance to filled-dark by default.

👍 Props: Will make migration easier for partners who already uses V0

👎 Cons: Inherits old design/dependency that might not be relevant this time

<!-- ### Pros and Cons -->

<!-- ## Discarded Solutions -->

<!-- As you enumerate possible solutions, try to keep track of the discarded ones. This should include why we discarded the solution. -->

<!-- ## Open Issues -->

<!-- Optional section, but useful for first drafts. Use this section to track open issues on unanswered questions regarding the design or proposal.  -->
