# RFC: Update Icon package with bundled Icons and add a tool to trim bundled icons to only bundle size/state you want

<!--
An RFC can be anything. A question, a suggestion, a plan. The purpose of this template is to give some structure to help folks write successful RFCs. However, don't feel constrained by this template; use your best judgement.

Tips for writing a successful RFC:

- Simple plain words that make your point, fancy words obfuscate
- Try to stay concise, but don't gloss over important details
- Try to write a neutral problem statement, not one that motivates your desired solution
- Remember, "Writing is thinking". It's natural to realize new ideas while writing your proposal
-->

---

_List contributors to the proposal here_: [tomi-msft](@Hg53Xm6vSJy_3qjAVnpaLw)

## Summary

Update Icon package with Icons that bundle all sizes and state, and add a tool to trim bundled icons to only bundle size/state you want

## Background

Currently, the `@fluentui/react-icons` package is shipped in such a way that all different size and fill variants of each individual icon are shipped as separate react components. Eg: `<Persona24Filled />` and `<Persona32Regular />` are shipped as separate components.

## Problem statement

<!--
Why are we making this change? What problem are we solving? What do we expect to gain from this?

This section is important as the motivation or problem statement is indepenent from the proposed change. Even if this RFC is not accepted this Motivation can be used for alternative solutions.

In the end, please make sure to present a neutral Problem statement, rather than one that motivates a particular solution
-->

The current approach is bad for developer ergonomics. Users are unable to pass in `size` or `fill` props to a single component to get the exact icon they need. If they need different sizes of the same icon, they would have to import several different components to their application, when they should only need to import one, and pass in the proper props.

## Detailed Design or Proposal

<!-- This is the bulk of the RFC. Explain the proposal or design in enough detail for the inteded audience to understand. -->

The proposed fix is to add a build step that bundles all of the different sizes and states of each icon into one component, and add a `size` and `fill` prop for these components to allow devs to select the specific size and fill state they would need in the application. Additionally, we ship a build tool that will allow users to list the icons they need in a manifest, along with the size/fill state, and trim the bundled icons to only bundle the needed sizes and states.

#### Bundle the Icons

The first part of the proposal is to add bundled versions of all of the icons to the package. If users don't care about bundle size of each individual component, and they would like a better dev experience, then they will be able to use these bundled icons(This would be in addition to the already built icon components, not a replacement).

Internally, the bundled component would use the `size` and `fill` props to determine which size/fill would be rendered from this component. If no `size` or `fill` prop is selected, then the component defaults to the size 20 outlined version of the icon.

Ex: `<Persona size={24} fill="regular" />`

Then, add documentation that explains the better dev experience in using the bundled icons, with the tradeoff of higher bundle size hit for the bundled icons.

#### Bundled Icons Optimization Tool

The second part of the proposal is to create a tool that users can use, which will take the icons they need optimized, as well as the size and fill states that they will be using in their application, and create a subset of optimized bundled icons that they will be able to use in their application.

This can be achieved by leveraging the `use` element that svg has that allows for using an external link to a `path` variable for an svg.

Ex:

```tsx
    <!-- Reference IN THIS SAME DOCUMENT -->
<svg>
  <use href="#persona-24-filled"></use>
</svg>

<!-- EXTERNAL reference -->
<svg>
  <use href="sprite.svg#persona-24-filled"></use>
</svg>

    <!-- File that is being referenced -->
<svg xmlns="http://www.w3.org/2000/svg">

  <symbol id="persona-24-filled" viewBox="0 0 2048 2048">
    <title>Persona24Filled</title>
    <path class="path-1" d="..."></path>
  </symbol>

  ...

</svg>
```

As part of the build step, a `manifest.ts` file will be created, with an `svg` that contains `<symbol>` tags for all of the icons with their associated ids. The build tool will use this file and cross reference it with the user specifications to create a set of bundled Icons that only have bundled the exact sizes and states of the icons the user needs.

### Pros and Cons

<!-- Enumerate the pros and cons of the proposal. Make sure to think about and be clear on the cons or drawbacks of this propsoal. If there are multiple proposals include this for each. -->

#### Pros

- The dev ergonomics of the icon package will be increased, as users will be able to import one component and pass in size and fill state, and get the right icon right away.
- Using the optimized bundling tool, the component would not take a major bundle size hit from having multiple unused icons bundled together.
- Users will still be able to use the established way if it works for them, ie,
  `import Persona24Filled from "@fluentui/react-icons"`

#### Cons

- The package size will essentially double, since we are going to be shipping the same icons two different ways.
-

## Discarded Solutions

<!-- As you enumerate possible solutions, try to keep track of the discarded ones. This should include why we discarded the solution. -->

## Open Issues

<!-- Optional section, but useful for first drafts. Use this section to track open issues on unanswered questions regarding the design or proposal.  -->
