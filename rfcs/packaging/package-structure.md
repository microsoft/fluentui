# RFC: Communicating new package structure for `@fluentui/*`

**Note that this RFC focuses solely on the package structure from a consumer perspective, focused primarily on v7/8 and converged packages. It does not deal with folder structure or northstar packages.**

Contributors: @paulgildea, @JustSlone, @ecraig12345, @khmakoto

## Summary

Currently, we have a lot of different component packages, and it's not clear to consumers what the purpose of each one is or whether it's production-ready.

There are a few aspects to the proposed solution:

- Add badges (or similar) to package readmes to clarify GA/preview/dev status
- "Converged" component packages only contain convergence work
  - Move old (v8) component implementations from `react-{checkbox,link,slider,tabs,toggle}` back to `react-internal`
  - Move prototype "converged" components to the package roots and get rid of `/next` folders
  - Probably also move all component implementations in `react` back to `react-internal`
    - OR (open question) just get rid of `react-internal`?
- _(after v8 release)_ Add `@fluentui/react-preview` package which exports _only_ converged components
- _(future note)_ We eventually want to export converged components from `@fluentui/react` once APIs are stable _and_ old usage in suite is replaced, but this is probably not a priority in the next 6-9 months

## Problem statement

Currently, we have a lot of different component packages, and it's not clear to consumers what the purpose of each one is or whether it's production-ready.

### Background: current packages

(See also https://github.com/microsoft/fluentui/wiki/Repo-structure)

Note that this describes the state of packages **prior to implementation of the proposal** (there will be some changes to where legacy and converged components live).

<!-- prettier-ignore-start -->
| Package | Notes |
|---------|-------|
| `@fluentui/react` | Exports official finished components which we plan to support long-term (or provide good migration paths if we make major changes). It's mostly a re-export package, but a few components live here to avoid circular dependencies. |
| `@fluentui/react-internal` | Was split out solely to work around circular dependency issues, and most of the code for old versions of components lives here. Nobody should be referencing it directly outside our repo. `@fluentui/react` re-exports everything from this package, and some of the `@fluentui/react-<component>` packages depend on this package. |
| `@fluentui/react-button` | Was previously considered ready for release (and therefore ready to export from `@fluentui/react`), but we've decided that while it's ready for partners to try out and should be stable within this major release, there will be some significant changes in the next major release. |
| `@fluentui/react-cards` | Weird case since there's an old version (built on `@uifabric/foundation` `createComponent` patterns) but it never officially graduated from experimental status and isn't exported from the suite. It also has a `next` folder where the converged version is currently being worked on. |
| `@fluentui/react-date-time` | Previously `@uifabric/date-time`. It's a rewrite (mostly by OWA folks, started awhile ago) of the original OUFR Calendar and DatePicker, but still using older patterns. New for v8, the Calendar and DatePicker from this package are exported from `@fluentui/react` by default. |
| `@fluentui/react-focus` | Current version of FocusZone with most of the work needed to converge with v0's FocusZone. Still differs in are some default values and things that are pulled from the theme. |
| `@fluentui/react-tabs` (Pivot) | Default-exports an old version of the component, which is re-exported by `@fluentui/react`. Work on a new/converged version is happening under `src/next`. |
| `@fluentui/react-checkbox`<br/>`@fluentui/react-link`<br/>`@fluentui/react-slider`<br/>`@fluentui/react-toggle` | These default-export a non-converged version of the component, which is re-exported by `@fluentui/react`. Work on a new/converged version is happening under `src/next`. The "current" versions have been re-written in a pattern more similar to the new pattern for converged components. |
| `@fluentui/react-avatar`<br/>`@fluentui/react-flex`<br/>`@fluentui/react-image`<br/>`@fluentui/react-text` | These only contain work on the converged component versions (in varying states of active work and completeness). |
| `@fluentui/react-charting` | Has active work ongoing but is owned by a different team and doesn't really follow any of the newer patterns we're working on. (Once we establish a pattern for "high-value component" repos, we may split this out.) |
| `@fluentui/react-experiments` | Weird legacy package which we don't have a good story for moving forward, and probably don't recommend (certainly don't promote) for use except by authoring teams of the individual components. It's a mix of components in active development or heavy use by partners, old trials of previous patterns we should definitely delete, and things of unknown status or abandoned. [More discussion here.](https://github.com/microsoft/fluentui/issues/16452) |
<!-- prettier-ignore-end -->

## Detailed Design or Proposal

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

### Add `@fluentui/react-preview` and related communication channels

Sometime in the next couple months after version 8 release, add a `@fluentui/react-preview` package which exports _only_ converged components which have reached "80% ready"/preview status. Notes:

- Exports will go away once they're moved to the suite
- Document clearly from the start that the stability is lower, and people can consume it if they're willing to accept that minor versions may sometimes contain breaking changes (to be clearly noted in the changelogs)
- Either 1st or 3rd parties can use this if they're willing to accept the extra risk/work
- Readme should be kept updated with status of each component
- If people prefer, they can use the individual preview component packages, but `@fluentui/react-preview` is the "one-stop shop" for previewing converged components

We should also make a private Teams channel within Fluent Community for internal partners who are working closely with us to try out the preview components. (It's possible that this could be expanded to external partners in the future.) This would be a very direct way for partners to share feedback and get support with preview components.

### Related code moves

Motivation: improve contribution story, in some ways improve consumption story.

- All current v8 component implementations should go back into `react-internal`:
  - Checkbox
  - Link
  - Pivot
  - Slider
  - Toggle
  - All components which were put in `react` to resolve cycles
- Move "converged" components into the package roots and get rid of `/next` folders.
  - The component packages can depend on `react` if needed for shared implementation parts, at least temporarily.
  - Before release, any deps on `react` would need to be removed and handled with slots intead: e.g. if we haven't gotten to converge Label yet, converged Checkbox by default has built-in `<label>` as its `label` slot. But `@fluentui/react` will define and export a version of Checkbox which uses the old Label.
- _(done)_ ~~Delete react-next: it's not being used, causing minor confusion, and can come back later without too much trouble.~~
- **Open question** (see below): should we merge `react-internal` back into `react`?

## Discarded Solutions

<!-- As you enumerate possible solutions, try to keep track of the discarded ones. This should include why we discarded the solution. -->

## Open Issues

<!-- Optional section, but useful for first drafts. Use this section to track open issues on unanswered questions regarding the design or proposal.  -->

### Should `react-internal` move back into `react`?

If we move the legacy components out of `react-{checkbox,link,slider,tabs,toggle}` and back to the suite, this gets rid of the majority of the circular dependency issues we were trying to solve with `react-internal`...which raises the question, can we (please) just get rid of `react-internal`?

The main benefit is that getting rid of `react-internal` would be very very nice from a developer experience/clarity perspective, and make various aspects of maintenance easier.

The major risk is that we'd do this extra work to combine the packages, then in the future encounter some other circular dependency that requires splitting it out again (so double extra work). This may not be an issue in practice since we plan to have a strong policy that converged packages (once they're ready for release) MUST NOT depend on `@fluentui/react`.

Other issues to consider:

- We still have one remaining circular dependency with `react-date-time`. While it's not ideal, we could work around this by moving that package's components into `react` itself, and making `react-date-time` into a pure re-export package.
- We have a weird temporary state where some of the "converged"(ish) components actually depend on other things from `@fluentui/react`: for example, Checkbox depends on Label. I think having "converged" `react-checkbox` temporarily depend on `react` is no worse than having it depend on `react-internal` like it does today. (Before release, this issue will be resolved using slots.)

### Clarify requirements for promotion to `@fluentui/react`

Ideas:

- APIs are stable
- We have tooling to help with the API migration
- All references within the suite are updated
  - This gets nasty when props of the component are exposed within other components' props (like `buttonProps: IButtonProps`)
- Notes:
  - Next 9 months (probably): we're not bringing anything back into the suite--just building them and working with partners to vet them
  - Legacy versions will move to `/compat` if still needed
