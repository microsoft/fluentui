# Extended tokens for Fluent UI React

A proposal for cross-platform customization by extending existing Design Tokens.

**✍️ Document owners:** Brandon Thomas, Peter Jahn, Ed Wang

**🎯 Document objectives**: Inform, discuss, decide, align, execute

**✏️ Document status**: Review

**🎬 Prototypes and demo PRs:**

- [(Architecture Prototype): Extended tokens on each component](https://github.com/microsoft/fluentui/pull/31330)

  - [Default Button Demo](https://fluentuipr.z22.web.core.windows.net/pull/31330/public-docsite-v9/storybook/index.html?path=/docs/components-button-button--default#appearance)

  - [ToggleButton Demo](https://fluentuipr.z22.web.core.windows.net/pull/31330/public-docsite-v9/storybook/index.html?path=/docs/components-button-togglebutton--default#appearance)

  - [ComboBox Demo](https://fluentuipr.z22.web.core.windows.net/pull/31330/public-docsite-v9/storybook/index.html?path=/docs/components-combobox--default#appearance)

  - [Switch Demo](https://fluentuipr.z22.web.core.windows.net/pull/31330/public-docsite-v9/storybook/index.html?path=/docs/components-switch--default#checked)

- [(Architecture Prototype): Adding semantic tokens to FluentProvider typing](https://github.com/microsoft/fluentui/pull/32104)

- [(Performance testing): on tokens.ts (not actual architecture)](https://github.com/microsoft/fluentui/pull/31672)

- [(Performance testing): on each component for Teams](https://github.com/microsoft/fluentui/pull/31692)

- [(Performance testing): hashed tokens for bundle size](https://github.com/microsoft/fluentui/pull/32304)

**🎨 Design WIP**

- [Control and Semantics Tokens Figma File with components](https://www.figma.com/design/QvbzVbuxcLKGMTNCHpAsjt/Fluent-Semantic-Token-Library?m=auto&node-id=11392-41202&t=UupAnqOZkQ3PuSbj-1)

- [Figma plugin for exporting extended tokens set](https://github.com/Jeremy-Knudsen/Fluent-Tokens-Exporter)

- [Script for pruning Control, Semantic, and Alias tokens into smallest set](https://github.com/EdDaWord/design-tokens-collapse)

**📖 Related RFCs**:

- [RFC: Custom Styling](https://github.com/microsoft/fluentui/blob/master/docs/react-v9/contributing/rfcs/react-components/convergence/custom-styling.md)

- [RFC: Theme Tokens](https://github.com/microsoft/fluentui/blob/master/docs/react-v9/contributing/rfcs/react-components/convergence/theme-tokens.md)

- [RFC: Reduce number of shared color alias tokens](https://github.com/microsoft/fluentui/blob/master/docs/react-v9/contributing/rfcs/react-components/convergence/theme-shared-colors.md)

- [RFC: Update theme shape](https://github.com/microsoft/fluentui/blob/master/docs/react-v9/contributing/rfcs/react-components/convergence/theme-shape.md)

**🎤 Types of feedback requested:**

- Implementation suggestions, especially on var() fallback strategy.

- Performance considerations.

- Dev experience.

- Insight on open questions.

## Summary

This RFC outlines implementation details for an expansion of Fluent UI React's token system to enable better cross-platform support and more intuitive and predictable customization. **It is effectively adding an additional component token layer to complete the original tokens proposal, which today only includes global and alias.**

It is also part of a broader effort to align and unify tokens across various implementations of Microsoft's design system. This expanded token system will also serve as a mechanism to achieve visual alignment between products and libraries implementing Fluent 2.

## Background

Increasingly, Fluent is being asked to deliver common shared experiences which can show up on platforms that have different UX styling from out-of-the-box Fluent 2 web libraries (Windows, mobile). Often these experiences require a common design spec but use different UI libraries and platform technologies to implement, such as React or Web Components on web, or Compose and XML on Android.

Keeping these experiences visually aligned requires a token system with enough fidelity to make component-level adjustments to ensure UI elements feel natural on every platform without requiring wholesale restyling or expensive to build and maintain conditional rendering (e.g. rendering custom UI for specific platforms).

In the long term, a more flexible token system also helps Fluent UI React (FUIR) be more resilient to design language changes in response to evolving business needs.

## Problems with current Fluent tokens ecosystem

Fluent UI React's current token system and the broader Fluent tokens ecosystem have three core shortcomings that make it challenging to fully support cross-platform, theme-based customization.

1.  Current FUIR tokens lack component-level tokens.

2.  Alias token names lack usage semantics: Density

3.  Token names and semantics differ between platforms and libraries

## Current FUIR tokens lack component tokens

The current Theme definition only supports global and alias tokens, with no support for component-level tokens. This has been discussed previously ([Theme Tokens](https://github.com/microsoft/fluentui/blob/6e6a1bf624e5a682b3607d918793d6f0eeb6b12a/rfcs/react-components/convergence/theme-tokens.md#component-tokens), [Custom Styling](https://github.com/microsoft/fluentui/blob/6e6a1bf624e5a682b3607d918793d6f0eeb6b12a/rfcs/react-components/convergence/custom-styling.md#extended-design-tokens)), but never implemented due to the [performance cost](https://github.com/microsoft/fluentui/blob/6e6a1bf624e5a682b3607d918793d6f0eeb6b12a/rfcs/react-components/convergence/theme-shape.md#performance-analysis) from the number of CSS variables that would be injected. As a result, the system doesn't have enough fidelity to support different platforms' component customization needs at the _theming layer_.

Additionally, FUIR's components consume these alias tokens directly:

```javascript
// useButtonStyles.styles.ts
const useRootBaseClassName = makeStyles({
  ...
  backgroundColor: tokens.colorNeutralBackground1,
  ...
});
```

This effectively tightly-couples components together from a styling POV. There is no abstraction layer at the component level to prevent theme-level token changes from affecting other components.

Example: Changing the border radius and border width of all Button components through the theme requires modifying borderRadiusMedium and strokeWidthThin, which are used extensively throughout the library. There is no way to change these values at the theme layer just for Buttons without affecting other components.

The CustomStyleHook is an alternative that enables deeper customization of all instances of a specific component, but this is limited to apps using v9 and React. We need a solution that is agnostic to the rendering tech.

## Alias token names lack usage semantics

Fluent's alias tokens add some semantic context to global tokens by assigning design language category, foreground/background, interactive state, and occasionally other descriptors like inverted, static, alpha, etc. These tokens give some meaning to static values, but by design are generic and do not indicate in what contexts they should be used; usage is not self-evident from the names.

Without this meaning, it can be difficult to know how to apply tokens correctly. For example, the tokens don't differentiate between surfaces (app page, container controls) and control backgrounds, so an app that wanted to use `colorNeutralBackground3` for its page background would find that it is also used as backgrounds for [Tag](https://github.com/microsoft/fluentui/blob/ff79ac88545c9cbc7966f75f61a9d506f3ebb963/packages/react-components/react-tags/src/components/Tag/useTagStyles.styles.ts#L107) or certain variants of [Input](https://github.com/microsoft/fluentui/blob/ff79ac88545c9cbc7966f75f61a9d506f3ebb963/packages/react-components/react-input/src/components/Input/useInputStyles.styles.ts#L181). Adjusting this color at the theme layer would result in styling changes to components that may not have been desired or expected.

This type of outcome can be mitigated with clearer guidance (documentation, theme typings, UI toolkit notes, etc), but context-specific names that guide developers to the right usage can prevent them from occurring in the first place.

## Token names and semantics differ between platforms and libraries

Among apps and libraries implementing Fluent, the conventions for naming tokens/brushes/slots varies in terms of the labels as well as the level of granularity exposed. This isn't strictly an issue with FUIR but presents a challenge when seeking to use a single design spec for a shared experience that renders in multiple contexts. It requires interop layers between theming systems where semantic concepts may not map 1:1, which can lead to issues like inaccessible color pairings or insufficient styling knobs when embedding an experience built with v9 into a host environment. Differences like these are the key motivating factor in the broader tokens unification effort this RFC is representing.

**Example: WinUI brushes**

An example is Windows' WinUI brushes, which use more granular labels like text-on-accent-fill-color-primary in addition to more primitive ones like text-fill-color-primary. This table illustrates an attempted mapping of WinUI's Text brushes to Fluent UI's closest equivalent alias tokens, which would be needed to create a "Windows theme" for Fluent UI. Bolded items are missing.

| WinUI Brush                         | Closest Fluent UI Alias token | Usage                                                 |
| ----------------------------------- | ----------------------------- | ----------------------------------------------------- |
| text-fill-color-primary             | Neutral Foreground 1          | Primary text and icon color at rest                   |
| text-fill-color-secondary           | Neutral Foreground 1 hover    | Primary text pressed, Secondary text at rest          |
| text-fill-color-tertiary            | Neutral Foreground 3          | Secondary text pressed. **Not accessible on Windows** |
| text-fill-color-disabled            | Neutral Foreground Disabled   | Not accessible. Primary text and icon color disabled  |
| accent-text-fill-color-primary      | Brand Foreground Link         | The color of a link                                   |
| accent-text-fill-color-secondary    | Brand Foreground Link Hover   | Link while hovering                                   |
| accent-text-fill-color-tertiary     | Brand Foreground Link Pressed | Link while pressing                                   |
| accent-text-fill-color-disabled     | **No direct replacement**     | Link while pressing                                   |
| text-on-accent-fill-color-primary   | Neutral Foreground on Brand   | Primary text and icon color disabled                  |
| text-on-accent-fill-color-secondary | **No direct replacement**     | Primary text and icon color disabled                  |
| text-on-accent-fill-color-disabled  | **No direct replacement**     | Primary text and icon color disabled                  |

While some of the more generic brushes can map 1:1 with Fluent UI's global or alias tokens, in some cases there are no direct mappings, which would represent a loss of semantic meaning. In practice this would necessitate new alias tokens to ensure full fidelity.

## Requirements

1.  No disruption to existing Fluent 2 token users.

2.  No or low performance impact. Dimensions to consider:

    a. Bundle size

    b. Reflow calculations

    c. Memory

## Goals

1.  Backwards-compatibility with existing Fluent 2 tokens. Transparent update to customers.

2.  Unified token API with other Fluent 2 implementations, e.g. Fluent Web Components and WinUI

## Non-goals

1.  Modify, deprecate, or remove existing tokens.

2.  Require existing themes to consume the new tokens.

# Proposed changes

## Solution summary

We propose extending the token layer to effectively complete the existing system that was originally introduced with the v9 theme shape, which lacked component-specific tokens.

The changes needed to do this will be **additive**, rather than a replacement. The proposal consists of 3 elements:

1.  New expanded tokens: Semantic and Control tokens

2.  Expose Semantic tokens in Theme via `tokens/src/types.ts`

3.  Update components to optionally consume Control tokens with fallbacks to Semantic if Control in Theme is absent. Similarly if Semantics are absent in Theme then fallback to Alias tokens (Fluent 2).

## New extended tokens

The expanded tokens have 2 types of tokens available to customize different aspects of the theme at various levels of granularity. Both are optional, only to be used when customizing specific components in the theme; existing components will always fall back on alias tokens. From more generic to more specific, these token types are:

1.  Semantic tokens

2.  Control tokens

## Semantic tokens

Many components share common design elements like spacing, colors, border radius, etc. and can reasonably expect to be customized together as a family. **Semantic tokens** capture these shared design decisions and allow more granular customization of component families compared to alias tokens while keeping the ceiling of additional required tokens lower than if only control-level tokens were used.

Conceptually they are similar to alias tokens, which also provides semantic meaning with foreground/background and interactive states, but lack the component information of semantic tokens.

These semantic token groups might include but aren’t limited to:

- Button

  - Default

  - Brand

  - Outline

  - Subtle

- Choice

  - Checkbox

  - Radio

- Input

  - Input

  - Textarea

  - Searchbox

  - SpinButton

- Progress

  - ProgressBar

  - Spinner

## Control tokens

**Control tokens** are used to customize all instances of a specific component or variant. Because they are more narrowly scoped, they should only be used when needing to make precise changes that don't affect related components, or when a semantic token is not available for a particular change.

Examples:

- ctrlButtonForegroundColorRest

- ctrlInputBaseBackgroundColor

## Token naming: Semantic and control tokens

Semantic and control tokens use a 6-part structure for creating their names. Like alias tokens, the parts start with broad context and become increasingly granular. Note that not all every part will always be present: for example, base components won’t include variant, and some properties may not include modifiers.

_Prefix – Component – Variant – Part – Property – Modifier_

| Term      | Definition                                                                                                                                     | Examples                                                       |
| --------- | ---------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------- |
| Prefix    | Prefix to distinguish control-specific tokens from semantic tokens that might share the same name, e.g. Button. Only applies to control tokens | ctrl / smtc                                                    |
| Component | The base UI component or component family, aka semantic group                                                                                  | Button<br>Switch                                               |
| Variant   | A variant of the base component for more specific use cases                                                                                    | Secondary<br>Compound<br>Brand                                 |
| Part      | A specific element within the default component. Can be a single part or multiple parts. Typically maps to a DOM element                       | Icon<br>SecondaryIcon                                          |
| Property  | A visual attribute of the Component or Part. Often maps to a CSS property, but not always (e.g. stroke)                                        | ForegroundColor<br>BackgroundColor<br>IconAfter<br>StrokeWidth |
| Modifier  | Context that changes the value of a property based on state or mode. Usually maps to an interactive state or mode.                             | Rest<br>Hover<br>Pressed<br>Disabled<br>Selected-\*            |

_Variants_

The term “variants” is often used to describe alternative forms or styles of components. There are typically 3 types of variants representing different axes of changes:

1.  **Style variant**: Component has a different look and feel, but same behaviors and visual structure as the base component.

    a. In code, v9 typically uses appearance prop

    b. In Figma, the Style property controls these

    c. Example: Button has Secondary, Primary, Subtle, Transparent style variants

2.  **Layout variant**: Component has a different visual structure from the base component, but typically retains the same behaviors and data. Different Parts may be toggled on/off or have different visual treatments due to their composition.

    a. In code, this might be controlled through optional component props e.g. Button icon and iconPosition

    b. In Figma,

    c. Example: Buttons can have just a text label, just an icon, or an icon and Button

3.  **Functional variant**: Component exposes different interactions or data than the base component.

    a. In code, these might be separate components with different APIs

## Expose expanded tokens in Theme

Each component that exposes tokens would add a Component.tokens.ts file to expose its tokens API:

```javascript
// Button.tokens.ts

import { tokens } from '@fluentui/react-theme';

// Semantic button, shared between all Button-family components

export const buttonGroupTokens = {

  buttonBorderRadius: `var(--buttonBorderRadius, ${tokens.borderRadiusMedium})`,

  buttonFontFamily: `var(--buttonFontFamily,${tokens.fontFamilyBase})`,

  // ...

}
// Button control tokens, used by Default button

export const buttonTokens = {

  // Default

  ctrlButtonBorderRadius: `var(--ctrlButtonBorderRadius, ${buttonGroupTokens.buttonBorderRadius})`,

  ctrlButtonFontFamily: `var(--ctrlButtonFontFamily,${buttonGroupTokens.buttonFontFamily})`,

  ...

}

```

These would then be added to the current Theme object:

```javascript
// Tokens/src/types.ts
import { ButtonTokens } from '@fluentui/react-components';

export type Theme = FontSizeTokens &
  LineHeightTokens &
  BorderRadiusTokens &
  StrokeWidthTokens &
  HorizontalSpacingTokens &
  VerticalSpacingTokens &
  DurationTokens &
  CurveTokens &
  ShadowTokens &
  ShadowBrandTokens &
  FontFamilyTokens &
  FontWeightTokens &
  ColorPaletteTokens &
  ColorStatusTokens &
  ColorTokens &
  ButtonTokens; // Addition
```

### Other options considered

| Option                                                          | Pros                                                                                                                                     | Cons                                                                                                                                                                                                                                               |
| --------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Option A: Add all tokens to current FluentProvider**          | • Simple<br>• Builds on existing API<br>• No additional deps for partners                                                                | • Theme typings will get large as we'd include all component tokens<br>• Tokens object will get larger but not massive since we'd only ship values for component groups and not component tokens (these are optional slots)                        |
| Option B.1: Create separate semantic FluentProvider             | • Separates Fluent Semantic Tokens (FSTs) from FluentProvider and Theme.<br>• Optional layering so partners only pull it in when needed. | • Requires extra layer<br>• May not be as intuitive as just using the existing provider already in applications<br>• May not provide much value since the components still need to have some level of awareness of the group and component tokens. |
| Option B.2: Create separate semantic FluentProvider and package | • Same pros as above but with added flexibility around packaging and versioning                                                          | See above                                                                                                                                                                                                                                          |

## Update components to optionally consume expanded tokens

Once exposed in the theme, the new tokens could be accessed in existing components simply by updating existing references to alias tokens with var(), passing the more precise token as the first argument and retaining original alias token as the second.

For example, instead of:

```javascript
const useRootBaseClassName = makeStyles({ backgroundColor: 'var(--colorNeutralForeground1)' });
```

We would use this:

```javascript
const useRootBaseClassName = makeStyles({
  backgroundColor: 'var(--buttonBackgroundColorRest, var(--colorNeutralForeground1))',
});
```

This leverages `var()`’s fallback feature to read the new token’s value first only if defined in the theme, while falling back on the existing alias token if not defined.

To ensure backwards compatibility with existing themes, all v9 components consuming the new tokens should **always** use alias token fallbacks.

## Performance

Given [previously observed performance issues](https://github.com/microsoft/fluentui/blob/6e6a1bf624e5a682b3607d918793d6f0eeb6b12a/rfcs/react-components/convergence/theme-shape.md#performance-analysis) when injecting a class with many CSS variables that referenced other CSS variables, we wanted to be sensitive to bloating the theme object with additional tokens. We noticed that performance penalties in the original tests were not concentrated at variable lookup time, but instead due to the root-level nature of the custom properties: each of the FluentProviders injected tokens that were associated with DOM elements, causing more reflows than would be expected with more scoped properties.

Our hypothesis is that more granularly scoped tokens tied to fewer DOM nodes would not incur the same performance penalties, although of course this needs to be tested.

### var() fallback test

To test the effect of many var() fallbacks, we configured a test using [tensile-perf](https://github.com/microsoft/tensile-perf) to generate an extremely large DOM. We then defined a series of CSS classes with varying levels of fallbacks, often going 20 layers deep.

[Test repo](https://github.com/brandonthomas/var-fallback-perf-test) _(currently private. Will make public asap)_

[Raw tensile-perf test results](https://github.com/brandonthomas/var-fallback-perf-test/tree/main/results)

In both Chrome and tensile-perf, we saw little to no difference in both render and paint times compared to the baseline.

Other options considered

| Option                                                        | Pros                                                                                                                                                                                                        | Cons                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| ------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Option A: Update existing components with var() fallbacks** | • Existing consumers automatically get the FST system without additional work beyond updating their packages<br>• Everyone stays in sync and should have equal capability improving interop and portability | • Once the changes are made, we are somewhat stuck with them (until the next major version)<br>• All consumers will pull these changes which means some increases in bundle size (gzipped impact seems minor based on our test PR so far).                                                                                                                                                                                                                                                               |
| Option B: Custom style hooks                                  | • Fully opt in<br>• Removes component changes at the root and could allow us to ship separately from the core packages meaning breaking changes could be managed more easily in a separate package          | • performance regressions were noted in testing. This might be due to the fact that styles were generated and inserted in runtime. Additionally, it depends on React's context which re-renders components.<br>• Because it's opt in we wouldn't have uniform adoption<br><br>Opportunity: If we can fix the performance issues or understand them better this might be a really interesting option with lower risk. Can we investigate using these styles hooks but with Griffel outputting static CSS? |
| Option C: Create component variants through recomposition     | • Could be shipped in separate packages<br>• avoids breaking changes                                                                                                                                        | • Could create confusion (which Button do consumers use? The base one or our SemanticTokenButton?)<br> There could be confusing ways in which semantic tokens could work in some places but not others if the right variants aren't used.                                                                                                                                                                                                                                                                |

## Bundle Size

On option to reduce bundle size is to hash the Control and Semantic tokens. In our tests we've shown a reduction in the GZipped file from [22 kB](https://github.com/microsoft/fluentui/pull/31692) to [18 kB](https://github.com/microsoft/fluentui/pull/32304)

## Open questions

In-product performance testing

To date, we’ve mostly conducted synthetic tests against var() fallback performance. We still need to run integration tests against product scenarios to test real-world effects of additional CSS variables and fallbacks, as well as the overall dev experience. We plan to test this in Teams and will update accordingly.

### Package location

Where should the expanded tokens live? We’re leaning towards Option A (**bolded**) now but would like feedback.

| Option                                                                                               | Pros                                                                                                                                            | Cons                                                                                                                                                                                                          |
| ---------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **A: Expanded tokens would be co-located with corresponding components, adjacent to component code** | • Straightforward conceptual grouping for control tokens<br>• Easier to manage API surface for specific components                              | • Introduces circular dependency: react-components depends on tokens via react-theme, but not the other way around<br>• Where to host semantic tokens is less clear since they represent groups of components |
| B: Expanded tokens would be added adjacent to current tokens in @fluentui/tokens                     | • Doesn't introduce circular dependency<br>• Single entry point for all tokens<br>• Simpler to opt-in                                           | • Ergonomics of splitting out component token API from component code might be awkward                                                                                                                        |
| C: In a new package, e.g. @fluentui/tokens-expanded                                                  | • Doesn't introduce circular dependency<br>• Flexibility around packaging & versioning<br>• Insulates @fluentui/tokens from control token churn | • More friction to opt-in to expanded tokens<br>• Adds overhead                                                                                                                                               |

## How far do we go in exposing semantic tokens?

The expanded token system opens the door to adding many more tokens than might be needed while growing the API surface. We should consider the strategy we’ll use to scope and prioritize which components and variants will be tokenized, and how tokens will be exposed over time. We’re leaning towards Option C (**bolded**) but would like feedback.

| Option                                                                                                                                                                                                                                                    | Pros                                                                                                                                                                | Cons                                                                                                                                                                                                      |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Option A: Tokenize everything, even if it's a variant. This includes recreating tokens for those variants even if the base has tokens.<br><br>e.g. base button includes ctrlButtonBackgroundRest, rounded would then have ctrlButtonRoundedBackgroundRest | • Tokens can control all aspects of each control and its variants.                                                                                                  | • Huge API surface<br>• A lot more work to implement<br>• Could easily get out of hand<br>• Hard to roll back (we basically couldn't) if we find we don't need this level of fidelity                     |
| Option B: Tokenize only the base styles, and use style overrides for variants and keep the tokens the same for the variants (pointing to alias or globals) aka don't have variant tokens                                                                  | • Simpler mental model, no figuring out what applies to variants vs base etc.                                                                                       | • Less fidelity and no cross library interop. Overrides have to be done in the context of v9 (this doesn't meet some of our requirements)<br>• Could still allow for future expansion to include variants |
| **Option C: Tokenize the base and variant overrides only, expand the tokens to include additional variant tokens if needed.**                                                                                                                             | • Still a somewhat simple mental model but with enough fidelity that we can control what we currently see.<br>• Matches the way design is approaching this in Figma | • If there is a need to modify variants we might be prevented from doing so within the token system and need to expand it down the road.<br>• Could still allow for future expansion                      |

## Usage guidance

### Semantic tokens

The expanded token enables deeper, more portable customization, but adding many extra CSS variables to a theme can have a performance tradeoff. To guide developers to make the most of this system, we’d propose adding the following guidance to the [Styles Handbook](https://github.com/microsoft/fluentui/blob/master/docs/react-v9/contributing/rfcs/react-components/styles-handbook.md) and/or [Theming page](https://react.fluentui.dev/?path=/docs/concepts-developer-theming--docs).

1.  **Only include the tokens you need to customize in a theme.** Component tokens are pay-for-play: there is a small but measurable cost to using them.

2.  **Start by customizing semantic tokens, which target groups of components.** Semantic tokens are meant to share styling rules between highly related components. Only use control tokens when you truly need to scope changes to specific components, and take care that customizations are coherent with the application.

3.  Consider if other [v9 customization scenarios](https://github.com/microsoft/fluentui/blob/6e6a1bf624e5a682b3607d918793d6f0eeb6b12a/rfcs/react-components/convergence/custom-styling.md#appendix-current-mechanisms-analysis) meet your needs. Each has capabilities, limitations, and varying complexity that impact suitability.

    a. Custom themes using extended tokens = Customize a single component, family of components, or all components

    b. Custom themes using alias tokens => Customize generic style values for all components

    c. CustomStyleHook => Customize the style of all instances of a component

    d. classname prop => Customize the style of one instance of a component

    e. Hooks recomposition => Create a new component customizing the behavior, style, or rendering of an existing component.

4.  Consider local application or repository policies to limit usage of semantic tokens

### Custom tokens

We also propose adding formal guidance and best practices for how to handle **custom tokens** in projects. It might consist of:

1.  Follow Fluent’s naming guidelines for new tokens

2.  Prefix custom tokens with a product/brand prefix, e.g. OneDrive = --od-_token_

3.  If creating custom tokens targeting a particular platform, always look for a fallback in the existing set

    a. Example: Ensure token extensions fall back to a related control token

4.  Don’t maintain copies of Fluent tokens directly as they are subject to change

5.  Consider creating a “proxy” internal tokens API that merges Fluent tokens and custom product tokens

6.  Clearly denote tokens that are custom and not part of Fluent. Example locations to clarify:

    a. Figma

    b. Code comments

    c. Typings
