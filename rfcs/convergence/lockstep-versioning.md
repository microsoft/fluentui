# RFC: Lockstep versioning for Fluent v9

@ling1726

## Summary

At the time of writing, there are 36 Fluent packages with version `9.x.x`. Some of these packages are private are due
to be published in the future. Most of these packages are a part of the dependency tree of
`@fluentui/react-components`. This RFC proposes to:

- Rollup the changelog from all packages on every version bump to `@fluentui/react-components`.
- Use a longer release cadence than the current daily one, but with accommodations for ad-hoc releases.
- Release all Fluent v9 packages in lockstep.

## Problem statement

Recent debugging attempts to find duplicated/incorrect versions of Fluent packages with partners has been difficult
since it was difficult to inspect the lockfile and:

- Check which installed versions were incompatible.
- Check which package versions were duplicated and which versions were incorrect.
- Correct the incorrect versions with correct versions.

In addition to debugging problems, the current changelog, is incredibly hard to read, and contains a lot of entries.
Here is a snippet of the `@fluentui/react-components` changelog:

```md
## [9.0.0-alpha.102](https://github.com/microsoft/fluentui/tree/@fluentui/react-components_v9.0.0-alpha.102)

Mon, 06 Sep 2021 07:34:53 GMT
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-components_v9.0.0-alpha.101..@fluentui/react-components_v9.0.0-alpha.102)

### Changes

- Bump @fluentui/react-button to v9.0.0-alpha.81 ([PR #19638](https://github.com/microsoft/fluentui/pull/19638) by lingfangao@hotmail.com)

## [9.0.0-alpha.101](https://github.com/microsoft/fluentui/tree/@fluentui/react-components_v9.0.0-alpha.101)

Thu, 02 Sep 2021 07:36:46 GMT
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-components_v9.0.0-alpha.100..@fluentui/react-components_v9.0.0-alpha.101)
```

Every change is simply a version bump since the package only reepxorts other component packages and utilities. A slightly
more sane changelog would be a component changelog:

```md
## [9.0.0-alpha.70](https://github.com/microsoft/fluentui/tree/@fluentui/react-accordion_v9.0.0-alpha.70)

Thu, 02 Sep 2021 07:36:46 GMT
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-accordion_v9.0.0-alpha.69..@fluentui/react-accordion_v9.0.0-alpha.70)

### Patches

- Bump @fluentui/react-conformance to v0.4.5 ([PR #19590](https://github.com/microsoft/fluentui/pull/19590) by olfedias@microsoft.com)

### Changes

- Bump @fluentui/babel-make-styles to v9.0.0-alpha.43 ([PR #19065](https://github.com/microsoft/fluentui/pull/19065) by olfedias@microsoft.com)

## [9.0.0-alpha.69](https://github.com/microsoft/fluentui/tree/@fluentui/react-accordion_v9.0.0-alpha.69)

Wed, 01 Sep 2021 07:39:56 GMT
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-accordion_v9.0.0-alpha.68..@fluentui/react-accordion_v9.0.0-alpha.69)

### Changes

- Updates react-accordion to use root as slot ([PR #19483](https://github.com/microsoft/fluentui/pull/19483) by bsunderhus@microsoft.com)
```

Component packages can have more concrete changelog entries, but they will still contain version bump changelog entries.
This is problem is made worse by the fact that our daily release cadence means that any PR that day will get released,
and all dependents are updated.

After a few months, we already have >100 alpha versions of `react-components`. It is incredibly hard to for users
to find what changed between versions. Some partners are still pinned at `alpha.60`, it will be a challenge for them
to follow all the changelog entries to check for changes.

## Detailed Design or Proposal

### Rollup the react-components changelog and remove the version bump entries

Work has already been done in [#19349](https://github.com/microsoft/fluentui/pull/19349), but additional work is
required to add this kind of functionality into our CI release flow. This work **will** be completed regardless of
the result of the other proposals in this RFC, since the `@fluentui/react-components` changelog currently provides
no meaningful information to users.

### Slower release cadence

A slower release cadence will allow us to:

- Plan work, PRs and validation before release.
- Release a coherent set of changes with clear migration plan for version upgrades.
- Reduce the number of version bump entries in changelogs that don't provide a lot of information.
- Set clear expectations for partners when they can expect to consume expected changes/fixes. There should be very
  little reason that partners can't plan around a slower release cadence.

This RFC proposes a **monthly** automated release cadence for Fluent v9 packages. There should be a clear way to
run ad-hoc releases when necessary, to ship urgent features and hotfixes.

Daily/Nightly releases be published under a `9.x.x-nightly.commitSha` prerelease tag, for anyone that wants to
test features from the bleeding edge.

### Lockstep all v9 packages

All v9 packages should be bumped in lockstep. Any release bumps every package with the maximum change
type in the version group (major, minor, patch). Below is an example of how it would work:

```
// Before
@fluentui/react-components 9.0.0
@fluentui/react-button     9.0.0 -> patch
@fluentui/react-accordion  9.0.0 -> patch
@fluentui/react-utilities  9.0.0 -> minor


// After
@fluentui/react-components 9.1.0
@fluentui/react-button     9.1.0
@fluentui/react-accordion  9.1.0
@fluentui/react-utilities  9.1.0
```

Once partners install `react-components` as a single suite package they can investigate versioning issues
but checking if every v9 dependency is on the same version as the suite package. Installing separate component/utility
packages also becomes easy, since partners should just make sure that the resolved versions are all the same.

Our versioning and release tool `beachball` currently has a version group feature, which can support lockstep if all
packages are already on the same version. This feature was does not actually guarantee lockstep, we should continue work
on it so that it supports lockstep versioning strictly.

Lockstep versioning is only feasible with the slower release cadence. A daily release cadence would mean the same
version problem we currently have with `react-components` but for every single v9 package.

### Pros and Cons

#### Pros

- Easier debuggability of dependency tree
- More coherent changelogs for the suite package

#### Cons

- Packages can be bumped with no changes
- Major bumps would be incorrect for packages that don't have breaking changes
- Need to separate v8 release from v9 release
