# RFC: Communicating new package structure for `@fluentui/*`

**Note that this RFC focuses solely on the package structure from a consumer perspective, focused primarily on v7/8 and converged packages. It does not deal with folder structure.**

Contributors: @paulgildea, @JustSlone, @ecraig12345, @khmakoto

## Summary

<!-- Explain the proposed change -->

## Background

(See also https://github.com/microsoft/fluentui/wiki/Repo-structure)

**@fluentui/react** exports official finished components which we plan to support long-term (or provide good migration paths if we make major changes). It's mostly a re-export package, but a few components live here to avoid circular dependencies

**@fluentui/react-internal** was split out solely to work around circular dependency issues, and most of the code for old versions of components lives here. Nobody should be referencing it directly outside our repo. `@fluentui/react` re-exports everything from this package (at least today), and some of the `@fluentui/react-<component>` packages depend on this package.

**@fluentui/react-button** was previously considered ready for release (and therefore ready to be exported from @fluentui/react), but now we've decided that while it's ready for partners to try out and should be stable within this major release, there will probably be some significant changes in the next major release, so we're choosing not to re-export these components in the suite package anymore.

**@fluentui/react-cards** is a weird case since there's an old version (built on @uifabric/foundation createComponent patterns) but it never officially graduated from experimental status and isn't exported from the suite. It also has a "next" folder where the converged version is currently being worked on.

**@fluentui/react-date-time** is what used to be the @uifabric/date-time package. It's a rewrite (mostly by OWA folks, started awhile ago) of the original OUFR Calendar and DatePicker, but still using older patterns. New for v8, the Calendar and DatePicker from this package are exported from @fluentui/react by default.

**@fluentui/react-focus**
Current version of FocusZone with most of the work needed to converge with v0's FocusZone. The things we're still differing in are some default values and things that are pulled from the theme.

**@fluentui/react-tabs** (Pivot)
These default-export an old version of the component, which is re-exported by `@fluentui/react`. Work on a new/converged version is happening under `src/next`.

**@fluentui/react-checkbox**
**@fluentui/react-link**
**@fluentui/react-slider**
**@fluentui/react-toggle**
These default-export a non-converged version of the component, which is re-exported by `@fluentui/react`. Work on a new/converged version is happening under `src/next`. The difference between these and the previous group is that the "current" version has been re-written in a pattern more similar to the new pattern for converged components.

**@fluentui/react-avatar**
**@fluentui/react-flex**
**@fluentui/react-image**
**@fluentui/react-text**
These packages only contain work on the converged component versions (in varying states of active work and completeness).

**@fluentui/react-charting** has active work ongoing but is owned by a different team and doesn't really follow any of the newer patterns we're working on. (Once we establish a pattern for "high-value component" repos, it would be worth considering whether to split this out.)

**@fluentui/react-experiments** is a weird legacy package which we don't have a good story for moving forward, and probably don't recommend (certainly don't promote) for use except by authoring teams of the individual components. It's a mix of components in active development or heavy use by partners, old trials of previous patterns we should definitely delete, and things of unknown status or abandoned. [More discussion here.](/xLNsv7leTLu9rANVsWf1xQ)

## Problem statement

<!--
Why are we making this change? What problem are we solving? What do we expect to gain from this?

This section is important as the motivation or problem statement is indepenent from the proposed change. Even if this RFC is not accepted this Motivation can be used for alternative solutions.

In the end, please make sure to present a neutral Problem statement, rather than one that motivates a particular solution
-->

## Detailed Design or Proposal

<!-- This is the bulk of the RFC. Explain the proposal or design in enough detail for the inteded audience to understand. -->

### Pros and Cons

<!-- Enumerate the pros and cons of the proposal. Make sure to think about and be clear on the cons or drawbacks of this propsoal. If there are multiple proposals include this for each. -->

## Discarded Solutions

<!-- As you enumerate possible solutions, try to keep track of the discarded ones. This should include why we discarded the solution. -->

## Open Issues

<!-- Optional section, but useful for first drafts. Use this section to track open issues on unanswered questions regarding the design or proposal.  -->
