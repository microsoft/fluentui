# RFC: Suite package structure during convergence

**Note that this RFC does not cover folder structure within the repo, most aspects of allowed import paths, build output structure, or anything about non-converged packages besides `@fluentui/react`.**

**[Related RFC around near-term steps for communicating package convergence status](https://github.com/microsoft/fluentui/pull/16772)**

## Summary

<!-- TODO once more open issues are settled -->

## Problem statement

We need initial plans for these closely-related issues:

- How people should consume converged components once they're ready
- How converged components should be promoted to `@fluentui/react` (if at all) and impact on `@fluentui/react` versioning
- How to retire legacy components (including an intermediate location if needed)

### Background: current packages

See the [communicating convergence status](https://github.com/microsoft/fluentui/pull/16772) RFC for details of the current package structure.

## Detailed Design or Proposal

**The things proposed here will not be implemented before version 8 release.**

### Suite package(s) for only converged components

While consumers are welcome to use individual converged component packages directly, we'll also add one or more suite package(s) containing only converged components.

See open issues section for details.

### Requirements for promotion to `@fluentui/react`

_(The following assumes `@fluentui/react` continues to export legacy components, as well as eventually converged components--this is likely, but see open issues around suite packages.)_

At some point, the goal is (probably) to export converged components from `@fluentui/react` in a way that facilitates a smooth transition for existing partners. Requirements:

- APIs are stable
- We have tooling to help with the API migration (if any)
- All references within the suite are updated
  - This gets harder when props of the component are exposed within other components' props (like `buttonProps: IButtonProps`)
  - Primary motivation for this requirement: bundle size

(Note that bringing things into the suite is probably not a priority in the next 6-9 months, but will be important later to help people migrate.)

#### Impact on versioning

Re-exporting a converged component package `@fluentui/react-foo` from `@fluentui/react` in place of a legacy component will very likely require `@fluentui/react` to major bump (unless we can reasonably provide a compatibility layer).

After `@fluentui/react-foo` is exported from `@fluentui/react`:

- If `@fluentui/react-foo` major bumps again, then `@fluentui/react` must also major bump.
- The opposite (hopefully) is not true: if `@fluentui/react` needs to major bump, but `@fluentui/react-foo` doesn't have breaking changes, `@fluentui/react-foo` _should not_ need to major bump.

As a result, it's likely that component package re-exports and/or major bumps will be done in batches to avoid major bumping the suite too often.

Full details of how to handle versioning within the repo (especially where major release servicing branches are concerned) will be discussed in a separate RFC.

### How to retire legacy (`@fluentui/react` v8) components

#### Intermediate retirement location

See open issues section.

#### Full removal timeline

Assuming we do have an intermediate location for retired components, they should be fully removed **one major version later**.

### Centralize communication channels with early adoption partners

We should make a private Teams channel within Fluent Community for internal partners who are working closely with us to try out the preview components (it's possible that this could be expanded to external partners in the future). This would be a very direct way for partners to share feedback and get support (from us or each other) with preview components. It would also make it easier for the whole team to see the feedback rather than it being highly compartmentalized.

## Discarded Solutions

<!-- As you enumerate possible solutions, try to keep track of the discarded ones. This should include why we discarded the solution. -->

### Move legacy `@fluentui/react` to a servicing branch (forever version 8), version 9 is converged

Since the legacy components currently in `@fluentui/react` are theoretically in maintenance mode, the package could potentially go in a servicing branch with the assumption that it will stay on major version 8 forever. Then version 9 of `@fluentui/react` in master would contain only converged components.

While this is the cleanest path forward for the converged components, it's likely to be impractical due to many partners' extensive dependencies on the legacy components.

Updating legacy components to internally use converged components is likely to be a key part of getting some partners to migrate, for bundle size reasons. If they're using new Button directly, but also using legacy components which use old Button (then multiply by the number of components that would actually end up duplicated), the bundle size impact is likely to be unacceptable. Using converged components in legacy would become much harder if the packages are in different branches.

It's also likely not safe to assume that we'll never need to major rev the legacy components. One reason is the migration point mentioned above: using new components in old ones which don't have a converged version yet will in some cases require API changes. Another is that even if we declare the legacy components to be in maintenance mode, it wouldn't be surprising if at some point external forces required us (or partners) to introduce behavior and/or visual design changes large enough to require a new major version.

### "Insiders" channel and package

During an earlier meeting about this topic, we came up with the idea of an "insiders" release channel: a way that early adoption partners could consume components in preview, and related communication channels.

We decided not to use the "insiders" naming since it has some specific connotations/expectations attached, and while what we have in mind is similar, we don't want people to feel like we've over-promised/under-delivered based on their previous experience with more formalized insider programs. However, the `@fluentui/react-preview` proposal and early adopter Teams channel proposal stemmed from this idea.

---

## Open Issues

<!-- Optional section, but useful for first drafts. Use this section to track open issues on unanswered questions regarding the design or proposal.  -->

### Suite package(s) for only converged components

While consumers are welcome to use individual component packages directly, we'll also add one or possibly two new suite packages which export _only_ converged components.

**Notes for all options:**

- I'm using `Button` just for demonstration purposes (it could be any component)
- "Version 9" means "eventual `@fluentui/react` version which includes some or all converged components" (we don't know yet if it will literally be version 9)
- Options are not in order of preference
- This always works regardless of the option chosen:

```ts
import { Button } from '@fluentui/react-button';
```

#### Option 1: `@fluentui/react-preview`

(this was the initial proposal)

Sometime in the next couple months after version 8 release, add a `@fluentui/react-preview` package which exports **only** converged components that have reached "80% ready"/preview status but are **not** yet exported from `@fluentui/react`.

We would document clearly from the start that stability is lower and **minor (or prerelease?) versions may sometimes have breaking changes** (to be clearly noted in the changelogs). People can consume the preview package if they're willing to accept this risk.

```ts
// While Button is "in preview" (but not GA)
import { Button } from '@fluentui/react-preview';

// After promotion to @fluentui/react (requirements discussed later)
import { Button } from '@fluentui/react';
// This no longer works
/* ERROR */ import { Button } from '@fluentui/react-preview';
```

Notes:

- Once a component is ready to be exported from `@fluentui/react`, it will be removed from `@fluentui/react-preview`'s exports (details of promotion criteria are discussed later).
- Either 1st or 3rd parties can use this if they're willing to accept the extra risk/work
- Readme should be kept updated with status of each component
- People can still use individual preview component packages if they prefer

Advantages:

- Provides a "one-stop shop" for previewing converged components

Downsides:

- Might encourage people to take deps on things in production before they're ready, then be upset when there are breaks.
- Kind of a "point in time" name and package

#### Option 2: `@fluentui/react-components` (name tentative)

This would only contain converged components which have reached stable/GA status.

It could potentially co-exist with `@fluentui/react-preview` if we decide that type of package would be useful.

```ts
// After button is stable/GA
import { Button } from '@fluentui/react-components';

// After promotion to @fluentui/react (requirements discussed later)
import { Button } from '@fluentui/react';
// Still works
import { Button } from '@fluentui/react-components';
```

Advantages:

- naming-wise, if we got stuck with this being the converged suite package forever, it wouldn't be terrible
- allows us to mark a component as ready for release (from a semi-consolidated location) even if it's not feasible to integrate it into `@fluentui/react` yet
- it's extremely clear which components are converged

#### Option 3: rename legacy components package, use `@fluentui/react` as converged package in v9

Due to partners' extensive dependencies on the v8 components that currently live in `@fluentui/react` (and the fact that it will take a long time to converge all components), we definitely can't just get rid of them all right away.

However, it's possible that we could rename the old component suite to `@fluentui/react-legacy` or something, which would free up the `@fluentui/react` name in version 9 for new stuff.

```ts
// After button is stable/GA
import { Button } from '@fluentui/react-components';

// After promotion to @fluentui/react (requirements discussed later)
import { Button } from '@fluentui/react';
// Still works
import { Button } from '@fluentui/react-components';
```

Advantages:

- very clean from the perspective of converged components (easy to tell what's converged)

Disadvantages:

- may cause confusion/panic among consumers of the legacy components

---

### How to retire legacy (`@fluentui/react` v8) components: Intermediate retirement location

For existing partners, we need to provide a good migration path between the legacy and converged components. Even once a converged component is exported from `@fluentui/react`, there are likely to be some cases where migration is particularly challenging (not feasible to do while picking up a major bump) and the old version of the component needs to remain available for some period of time.

**Notes for all options:**

- I'm using `Button` just for demonstration purposes (it could be any component)
- "Version 9" means "eventual `@fluentui/react` version which includes some or all converged components" (we don't know yet if it will literally be version 9)
- These options assume that `@fluentui/react` continues to export converged components in addition to legacy components (requirements for promotion of converged components to `@fluentui/react` will still apply)

This is what the imports will look like while `@fluentui/react` version 8 is current:

```ts
// Old button
import { Button } from '@fluentui/react';
import { Button } from '@fluentui/react/lib/Button';

// Converged button (before or after GA)
import { Button } from '@fluentui/react-button';
// *Tentative* option after GA (but before next major of @fluentui/react)
import { Button } from '@fluentui/react-components';
```

Regardless of the option chosen, this is what the **converged** component imports might look like in "version 9":

```ts
import { Button } from '@fluentui/react';
// maybe (depends on other discussions)
import { Button } from '@fluentui/react/lib/Button';
import { Button } from '@fluentui/react-components';
```

#### Option 1: Move under `@fluentui/react/lib/compat`

In "version 9":

- Move the implementation to `packages/react/src/compat/components/Button`
- Import from under `@fluentui/react/lib/compat`

```ts
// Old button
import { Button } from '@fluentui/react/lib/compat';
// maybe (depends mainly on partner requirements)
import { Button } from '@fluentui/react/lib/compat/Button';
```

Advantages:

- Allows still importing things from a single package
- Allows interdependencies between the compat legacy component and other legacy components in the suite if absolutely necessary

Disadvantages:

- Requires continuing to support non-root imports

#### Option 2: Move to a new "compat" suite

In "version 9", move the legacy implementation under a separate "compat" suite package and import from there.

For clear communication purposes, this legacy/compat suite will export **only** components that are being retired. (Others must be imported from `@fluentui/react`.)

Possible names: `@fluentui/react-compat` (using this for demo purposes), `@fluentui/react-legacy`, `@fluentui/react-fabric`

```ts
import { Button } from '@fluentui/react-compat';
// maybe (depends mainly on partner requirements)
import { Button } from '@fluentui/react-compat/lib/Button';
```

Advantages:

- Lets us potentially remove official support for non-root imports (pending partner requirements)

Disadvantages:

- No possibility of interdependencies between compat legacy components and other legacy components that are still in the main suite (maybe not entirely bad)
