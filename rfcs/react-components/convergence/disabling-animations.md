# RFC: Disabling animations

<!--
An RFC can be anything. A question, a suggestion, a plan. The purpose of this template is to give some structure to help folks write successful RFCs. However, don't feel constrained by this template; use your best judgement.

Tips for writing a successful RFC:

- Simple plain words that make your point, fancy words obfuscate
- Try to stay concise, but don't gloss over important details
- Try to write a neutral problem statement, not one that motivates your desired solution
- Remember, "Writing is thinking". It's natural to realize new ideas while writing your proposal
-->

---

@miroslavstastny

## Summary

This RFC describes how animations and transitions in Fluent UI components can be disabled.

## Background

Before adding motion tokens to `react-theme`, we should know how to disable applications during runtime.

## Problem statement

An application needs a way to disable animations due to following reasons:

- User accessibility.
- Stable screenshot tests.
- Performance on low-end devices.

Users can choose to disable animations in application settings:

![Disable animations setting dialog](assets/teams_disable_animations.png)

There is currently no known requirement to reduce motion (use less or slower/faster animations).

## Detailed Design or Proposal

There are multiple ways how the animations can be disabled. The following section describes the approaches and also links to codesandbox examples demonstrating the approach.

### Filter rules in `DOMRenderer`

Filter out `animation*` and `transition*` CSS properties before adding them to DOM.

Stardust uses this approach to disable [disable animations](https://github.com/microsoft/fluentui/blob/3360b45ec159250b1346c91afad7dce138e6bc20/packages/fluentui/react-northstar-emotion-renderer/src/disableAnimations.ts). The linked solution does not handle `transition`, only `animation`.
Similar implementation is doable with Griffel, there is `unstable_filterCSSRule` in `DOMRenderer` - with that we can filter out all transition and animation CSS properties.

Codesandbox: https://codesandbox.io/s/disable-animations-filter-80d4i

#### Pros

- 👍 Disables all animations in `makeStyles` no matter whether tokens or direct values have been used to style the animation.

#### Cons

- 👎 Does not disable animations in styles which are not processed by `makeStyles` (inline `style`).
- 👎 There might be a small perf hit to filter the CSS rules.
- 👎 Requires page reload to disable animations (Griffel can only filter CSS during insertion to DOM, it never removes CSS).

### Override duration motion tokens to 0

All animations are supposed to be styled using theme tokens, including the animation timings.
To disable the animations, we can set all the tokens for duration to 0.

#### Pros

- 👍 Can be enabled/disabled during runtime

#### Cons

- 👎 Requires additional theme merging
- 👎 Only disables animations which use design tokens for the duration

### Override animations !important

Add a CSS rule with `!important` property which will override all the animations and transitions on the page.

```css
*,
*::before,
*::after {
  transition: none !important;
  animation: none !important;
}
```

This approach is recommended by MUI - https://mui.com/getting-started/faq/#how-can-i-disable-transitions-globally.

Codesandbox: https://codesandbox.io/s/disable-animations-important-dpugv

#### Pros

- 👍 disables all animations on the page
- 👍 not coupled with tokens/griffel

## Open Issues

Open question: what is the v8 approach for disabling animations?
Open question: does any component in the application need to know whether the animations are disabled?
