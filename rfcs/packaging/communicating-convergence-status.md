# RFC: Communicating convergence status for `@fluentui/*` packages (and related code moves)

**Note that this RFC focuses solely on near-term steps to clearly communicate to consumers which of our packages are old vs. converged. It's focused primarily on v7/8 and converged packages and does not deal with folder structure or northstar packages.**

**[Related RFC around other package structure issues during convergence](https://github.com/microsoft/fluentui/pull/16577)**

Contributors: @paulgildea, @JustSlone, @ecraig12345, @khmakoto

## Summary

Currently, we have a lot of different component packages, and their purpose, production-readiness, and convergence status are not clear to consumers or contributors.

There are a few aspects to the proposed solution, involving a mix of code moves and documentation updates:

- "Converged" component packages should only contain convergence work
  - _(done)_ ~~For `react-{checkbox,link,slider,tabs,toggle}`:~~
    - ~~Move old (v8) component implementations back to `react-internal`~~
    - ~~Move prototype "converged" versions to the package roots and get rid of `/next` folders~~
  - Get rid of `react-internal`
    - `react-internal` components move back to `react`
    - To break a cycle: `react-date-time` components move into `react`, and `react-date-time` re-exports them
  - Open question: should we make code location or naming changes to any other `react-*` packages which still contain legacy components?
- Add badges to package readmes to clarify GA/preview/dev status
- Use semver to help communicate status

## Problem statement

Currently, we have a lot of different component packages, and their purpose, production-readiness, and convergence status are not clear to consumers or contributors.

### Background: current packages

(See also https://github.com/microsoft/fluentui/wiki/Repo-structure)

<!-- prettier-ignore-start -->
| Package | Notes about current implementation |
|---------|-------|
| `@fluentui/react` | Exports official finished components which we plan to support long-term (or provide good migration paths for major changes). Will be fixed after this proposal: ~~Mostly re-exports other packages, but a few components live here to avoid circular deps.~~ |
| ~~`@fluentui/react-internal`~~ | Going away after this proposal. ~~Split out solely to work around circular dep issues, and most of the code for old components lives here. Nobody should reference it directly outside our repo. `@fluentui/react` re-exports everything from here, and some of the `@fluentui/react-<component>` packages depend on this package.~~ |
| `@fluentui/react-button` | Was previously considered ready for release (and therefore ready to export from `@fluentui/react`), but we've decided that while it's ready for partners to try out and should be stable within this major release, there will be some significant changes in the next major release. |
| `@fluentui/react-cards` | Weird case since there's an old version (built on `@uifabric/foundation` `createComponent` patterns) but it never officially graduated from experimental status and isn't exported from the suite. It also has a `next` folder where the converged version is currently being worked on. |
| `@fluentui/react-date-time` | Previously `@uifabric/date-time`. It's a rewrite (mostly by OWA folks, started awhile ago) of the original OUFR Calendar and DatePicker, but still using older patterns. New for v8, the Calendar and DatePicker from this package are exported from `@fluentui/react` by default. |
| `@fluentui/react-focus` | Current version of FocusZone with most of the work needed to converge with v0's FocusZone. Still differs in are some default values and things that are pulled from the theme. |
| `@fluentui/react-checkbox`<br/>`@fluentui/react-link`<br/>`@fluentui/react-slider`<br/>`@fluentui/react-toggle`<br/>`@fluentui/react-tabs` | These previously default-exported the non-converged (v8) versions of the respective components (with prototype converged versions under `src/next`). The v8 components were recently moved backed to the suite and the convergence work was moved to the root. |
| `@fluentui/react-avatar`<br/>`@fluentui/react-flex`<br/>`@fluentui/react-image`<br/>`@fluentui/react-text` | These only contain work on the converged component versions (in varying states of active work and completeness). |
| `@fluentui/react-charting` | Has active work ongoing but is owned by a different team and doesn't really follow any of the newer patterns we're working on. (Once we establish a pattern for "high-value component" repos, we may split this out.) |
| `@fluentui/react-experiments` | Weird legacy package which we don't have a good story for moving forward, and probably don't recommend (certainly don't promote) for use except by authoring teams of the individual components. It's a mix of components in active development or heavy use by partners, old trials of previous patterns we should definitely delete, and things of unknown status or abandoned. [More discussion here.](https://github.com/microsoft/fluentui/issues/16452) |
<!-- prettier-ignore-end -->

## Detailed Design or Proposal

### All v8 components live in `@fluentui/react`

Motivation: improve contribution story, in some ways improve consumption story.

- Get rid of `react-internal` _(see detailed discussion below)_
  - Move all components back into `react`
  - To break a cycle: move `react-date-time` components into `react`, and have `react-date-time` re-export them
- _(done)_ ~~Move v8 Checkbox, Link, Pivot, Slider, Toggle out of component packages and back to `react`~~
- _(done)_ ~~`react-{checkbox,link,slider,tabs,toggle}`: Move prototype "converged" components in into the package roots and get rid of `/next` folders.~~
  - The component packages can _temporarily_ depend on `react` if needed for shared implementation parts.
  - Before release (ideally ASAP), any deps on `react` would need to be removed and handled with slots intead: e.g. if we haven't gotten to converge Label yet, converged Checkbox by default has built-in `<label>` as its `label` slot. But `@fluentui/react` will define and export a version of Checkbox which uses the old Label.
- _(done)_ ~~Delete react-next: it's not being used, causing minor confusion, and can come back later without too much trouble.~~

#### Open question: any other code moves?

See open questions section.

#### Decision to remove `react-internal`

`@fluentui/react-internal` was created as a workound for circular dependency issues that arose when breaking out components from the `@fluentui/react` version 8 suite package into individual packages (`react-checkbox` etc).

It broke the cycles but left a very convoluted developer experience for v8 components: the majority lived in `react-internal`, a handful lived in individual component packages like `react-checkbox`, and a handful which used components from the individual packages had to live in `react`. From the perspective of anyone but ~4 team members who worked on the split, there was no rhyme or reason for what lived where, and building/testing became more painful.

However, more recent developments have invalidated most of `react-internal`'s reasons for existence:

- We decided individual component packages like `react-checkbox` should _only_ contain converged components, and moved the v8 versions back to the suite (eliminating most current cycles)
  - Exception: `react-date-time` (not at all converged) is exported by the suite as of version 8, creating a cycle, but we can break this cycle as described above
- Shift in focus to aggressively converging components, with a hard policy that they _must not_ depend on old components from either v8 or v0 (eliminating most risk of future cycles)

While getting rid of `react-internal` is extra work, it seems worthwhile to get rid of the technical debt and improve the dev experience.

### Open question: should `@fluentui/react-*` mean converged? (remove `react-` prefix from old packages?)

See discussion later.

### Add status badges to all component package readmes

The badges below are generated using https://shields.io/ and link to a placeholder wiki page which will later contain explanations of each status.

We definitely want badges for stability, possibly with sub-badges for convergence status:

- [![in development](https://img.shields.io/badge/stability-in%20development-orange)](https://github.com/microsoft/fluentui/wiki/Package-status)
- [![preview](https://img.shields.io/badge/stability-preview-yellow)](https://github.com/microsoft/fluentui/wiki/Package-status)
  - Possible sub-badge: [![preview (legacy)](<https://img.shields.io/badge/stability-preview%20(legacy)-yellow>)](https://github.com/microsoft/fluentui/wiki/Package-status)
- [![stable](https://img.shields.io/badge/stability-stable-green)](https://github.com/microsoft/fluentui/wiki/Package-status)
  - Possible sub-badge: [![stable (legacy)](<https://img.shields.io/badge/stability-stable%20(legacy)-green>)](https://github.com/microsoft/fluentui/wiki/Package-status)
- [![deprecated](https://img.shields.io/badge/stability-deprecated-red)](https://github.com/microsoft/fluentui/wiki/Package-status)

We might also want separate badges for category/convergence/??? (naming suggestions welcome)

- [![legacy](https://img.shields.io/badge/convergence-legacy-lightgrey)](https://github.com/microsoft/fluentui/wiki/Package-status)
- [![mixed](https://img.shields.io/badge/convergence-mixed-yellow)](https://github.com/microsoft/fluentui/wiki/Package-status)
- [![done](https://img.shields.io/badge/convergence-done-green)](https://github.com/microsoft/fluentui/wiki/Package-status)

Notes:

- Charting and maybe experiments would probably fall into the "preview (legacy)" category
- Suite packages should list which components are converged or not

### Use semver to help communicate status

New packages should be created with version `0.1.0`. While the open source community (and even this repo) is extremely inconsistent in its use of `0.x` versions, that is in theory the "standard" way to indicate that a package is not production-ready.

For packages which already have a `-beta` version greater than 0 published for various reasons, such as `react-button` or `react-cards`, we should keep those on a prerelease tag after the version 8 release to indicate that they're not yet official releases. Preferably `-alpha` (or `-dev`?) but if we need to continue using `-beta` that's fine.

#### Open question: what npm `dist-tags` to use?

- For in-development packages?
  - `0.x`?
  - `1.0.0-beta.x` or `8.0.0-beta.x`?
  - Should we change anything about existing `latest` tag?
- For in-preview packages (if we keep this notion)?
  - `next`?
  - `beta`?

## Discarded Solutions

<!-- As you enumerate possible solutions, try to keep track of the discarded ones. This should include why we discarded the solution. -->

## Open Issues

<!-- Optional section, but useful for first drafts. Use this section to track open issues on unanswered questions regarding the design or proposal.  -->

### Should we change anything about `react-cards`?

The Card exported by default from `react-cards` is not converged and was never quite officially released, and there's work on a converged version in `src/next`. I'm not sure how many people were using the old Card.

Should we move the old implementation elsewhere (to experiments maybe?) or delete it so the new one can be exported by default? If we do that, what happens to existing consumers?

Another sneaky way out would be moving the new card to a new package `react-card` (singular), which is a more standard name but could definitely lead to confusion having both.

### Should `@fluentui/react-*` mean converged? (remove `react-` prefix from old packages?)

For communication purposes to consumers, I'm not sure that renaming all our React-based packages to have the `react-` prefix (which we're using for converged packages) was the right thing to do, since it worsens confusion about which packages are converged.

While the status badges proposed above would help clarify this, it might also be worth reconsidering some of the new package names before we release version 8 and are stuck with the names for awhile.

Some packages with this issue:

| Package                    | Old name           | Notes                                                    |
| -------------------------- | ------------------ | -------------------------------------------------------- |
| `react-cards`              | same               | see above                                                |
| `react-charting`           | `charting`         | no plan to converge                                      |
| `react-date-time`          | `date-time`        | exported from FUIR v8                                    |
| `react-docsite-components` | `example-app-base` | legacy doc site stuff, no plan to converge               |
| `react-experiments`        | `experiments`      | random mix of active/dead                                |
| `react-file-type-icons`    | `file-type-icons`  |                                                          |
| `react-monaco-editor`      | `tsx-editor`       | react wrapper for monaco editor, probably won't converge |
