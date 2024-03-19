# RFC: Integrate Popper.js as positioning helper for convergence

<!--
An RFC can be anything. A question, a suggestion, a plan. The purpose of this template is to give some structure to help folks write successful RFCs. However, don't feel constrained by this template; use your best judgement.

Tips for writing a successful RFC:

- Simple plain words that make your point, fancy words obfuscate
- Try to stay concise, but don't gloss over important details
- Try to write a neutral problem statement, not one that motivates your desired solution
- Remember, "Writing is thinking". It's natural to realize new ideas while writing your proposal
-->

---

@ling1726

## Summary

<!-- Explain the proposed change -->

This RFC proposes the introduction of the OSS library [popper.js](https://popper.js.org/) as the main positioning engine
for converged components that require this functionality. Current examples include `Tooltip` and `Menu` components.

Popper is an OSS library that powers the positioning of multiple known and commonly used UI libraries. The library is
designed to function independent of the rendering framework (i.e. React). The library also is designed with a plugin -like
API to encourage custom modification of any part of the positioning logic used. Sane default behaviour is used that
covers a large number of positioning use-cases such as:

- Preventing overflow on available space and window resize
- Content repositioning on window scroll
- Content flipping based on available space
- Content offset from anchor element
- Beak/Arrow positioning

## Background

<!-- If there is relevant background include it here -->

v0 currently wraps [popper.js](https://popper.js.org/) into components that require out of order positioning in the DOM.
v7 uses the [Callout component](https://developer.microsoft.com/en-us/fluentui#/controls/web/callout) to support positioning
behaviour.

Popper is also used by the following OSS UI libraries in industry:

- [Atlaskit](https://www.npmjs.com/package/@atlaskit/popper)
- [Materia UI](https://www.npmjs.com/package/@material-ui/core)
- [reactstrap](https://www.npmjs.com/package/reactstrap)
- [bootstrap](https://getbootstrap.com/docs/4.0/getting-started/introduction/)
- [Semantic UI React](https://react.semantic-ui.com/modules/popup/)
- [reakit](https://www.npmjs.com/package/reakit)
- [ing-bank/lion](https://github.com/ing-bank/lion)
- [AWS chime SDK](https://github.com/aws/amazon-chime-sdk-js)

## Problem statement

<!--
Why are we making this change? What problem are we solving? What do we expect to gain from this?

This section is important as the motivation or problem statement is indepenent from the proposed change. Even if this RFC is not accepted this Motivation can be used for alternative solutions.

In the end, please make sure to present a neutral Problem statement, rather than one that motivates a particular solution
-->

Positioning is a hard problem to solve. Pure CSS solutions are not powerful enough in modern applications since they have
accessibility and usability problems:

- CSS tooltips will not take into account boundaries
- CSS will not flip and reposition based on available viewport space
- Cannot follow mouse cursor or be used as a context menu
- Hard to modify the behaviour at runtime

Therefore, most solutions are writting in complex javascript that requires handling of all the boundary and scroll cases
at runtime. This results in very complicated code, that needs to be actively maintained and improved. Looking
[at the current v7 documentation of Callout](https://developer.microsoft.com/en-us/fluentui#/controls/web/callout), there are
more than 20 issues that stretch back to 2018 that still have not been resolved.

Popper references and supports the following selection of v8 open issues (following the thread discussions):

- [#7970](https://github.com/microsoft/fluentui/issues/7970) - Beak positioning and offset
- [#9249](https://github.com/microsoft/fluentui/issues/9249) - Modifiers to create sane resizing/repositioning variants of popper
- [#5148](https://github.com/microsoft/fluentui/issues/5148) - Decoupled placement properties for each access for easy RTL modifiers

Convergence is moving fast, spending time to build a fully-fledged positioning library that handles all the boundary cases
can be time consuming and slow down or block development for some components

## Detailed Design or Proposal

<!-- This is the bulk of the RFC. Explain the proposal or design in enough detail for the inteded audience to understand. -->

The important part of this RFC is to get quorum on using popper in Fluent. This will allow us to offload the heavy effort
of managing out of order DOM popoverse and focus on delivering value to our partners through usable components.

As mentioned above, out of the box popper provides support and configuration for the following scenarios:

- Preventing overflow on available space and window resize
- Content repositioning on window scroll
- Content flipping based on available space
- Content offset from anchor element
- Beak/Arrow positioning

In the short/long-term future, it is always possible for the team to reevaluate the scenarios supported by popper to see
if the the library needs to be extended through [popper modifiers](https://popper.js.org/docs/v2/modifiers/) or a custom
solution, if there is a need for it based on feedback from our partners.

This RFC does not specify exactly how popper should be integrated into fluent, and is left to a technical discussion or
follow up RFC. Since Popper is independent of any rendering framework (i.e. React), multiple integrations can be proposed
and we can choose the one best suited for Fluent.

How the library is used can therefore be seen as a technical detail. It can be possible to use popper as an external
component or hook or JS helper function. Lazy loading of the code module is also possible.

### Pros and Cons

#### Pros

- Covers more scenarios than current v7 Callout
- Already used by v0 and teams
- Battle tested and used by popular UI libraries
- Active community and maintainers - reduce our workload to deliver value through components
- Modifier/Plugin API for easy variant customisations

#### Cons

- We do not directly control the code to apply modifications and fixes, although we can create custom modifiers
- Possible bloat, the library is ~5kB, without more precise bundle size requirements it's hard to evaluate this one
- Risk of API changes. Recently v0 has had to migrate from v1 to v2 of popper which cause some issues with partner scenarios
  in teams. However this was achieved without changing the wrapper API.

## Discarded Solutions

<!-- As you enumerate possible solutions, try to keep track of the discarded ones. This should include why we discarded the solution. -->

## Open Issues

<!-- Optional section, but useful for first drafts. Use this section to track open issues on unanswered questions regarding the design or proposal.  -->
