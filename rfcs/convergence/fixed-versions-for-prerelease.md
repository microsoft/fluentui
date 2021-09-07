# RFC: Use fixed versions for `@fluentui` dependencies in prerelease

@ling1726

## Summary

This RFC proposes using fixed version dependencies within the Fluent monorepo for all v9 prerelease packages.
The term 'prerelease' refers to any packages with matching the version pattern `9.y.z-<prerelease tag>.<prerelease version>`.
Prerelease tags do not communicate any kind of breaking changes, we will show this in the problem statement.

This versioning strategy will be temporary while we are in pre-release. It will reduce the dependency hell currently
caused by using carets with prerelease tags.

Once the core of Fluent v9 is fully released without any prerelease tags, this approach should be abandoned. Without
prerelease tags, we can fully rely on caret dependencies to provide consumers with a consistent dependency tree and
communicate breaking changes with major version bumps.

## Problem statement

Assume a constraint `^9.0.0-alpha.15` for `@fluentui/react-shared-contexts`. The following versions all satisfy this
constraint:

- `9.0.0-alpha.16`
- `9.0.0-alpha.17` -> breaking change from `alpha.16`
- `9.0.0-alpha.30`

Any version greater than the current is matched, there is no way of communicating breaking changes with prerelease versions.
You can test this for yourself [on the official npm semver calculator](https://semver.npmjs.com/).

All Fluent v9 packages are currently released with a prerelease tag. There is no possible way of knowing
the compatibility of packages without examining the lockfile, or `node_modules` if
no lockfile is being used, and then tracing this version to code.

**Each reinstall could result in accidentally consuming breaking changes.**

Unfortunately there is no 'correct' way to handle this problem. [According to the NPM semver docs](https://docs.npmjs.com/cli/v6/using-npm/semver#prerelease-tags) we are already trying to handle this problem incorrectly.

> a user who has opted into using a prerelease version has clearly indicated the intent to use that specific set of alpha/beta/rc versions. By including a prerelease tag in the range, the user is indicating that they are aware of the risk.

**We have to work around the problem in a non-standard way because we have a hard requirement to not utilize semver fully while introducing new components for partners to use in production**

## Detailed Design or Proposal

While Fluent v9 is in a prerelease stage and the core of packages for v9 use a prerelease tag (alpha, beta...), use
fixed versions for all dependencies within the Fluent monorepo.

Example of proposed changes to `@fluentui/react-components` `package.json` file.

```diff
{
  "dependencies": {
-    "@fluentui/react-accordion": "^9.0.0-alpha.70",
-    "@fluentui/react-avatar": "^9.0.0-alpha.75",
-    "@fluentui/react-badge": "^9.0.0-alpha.75",
-    "@fluentui/react-button": "^9.0.0-alpha.80",
-    "@fluentui/react-divider": "^9.0.0-alpha.62",
-    "@fluentui/react-image": "^9.0.0-alpha.73",
-    "@fluentui/react-label": "^9.0.0-alpha.34",
-    "@fluentui/react-link": "^9.0.0-alpha.76",
-    "@fluentui/react-make-styles": "^9.0.0-alpha.61",
-    "@fluentui/react-menu": "^9.0.0-alpha.71",
-    "@fluentui/react-popover": "^9.0.0-alpha.36",
-    "@fluentui/react-portal": "^9.0.0-alpha.43",
-    "@fluentui/react-provider": "^9.0.0-alpha.72",
-    "@fluentui/react-theme": "^9.0.0-alpha.22",
-    "@fluentui/react-tooltip": "^9.0.0-alpha.76",
-    "@fluentui/react-utilities": "^9.0.0-alpha.43",
+    "@fluentui/react-accordion": "9.0.0-alpha.70",
+    "@fluentui/react-avatar": "9.0.0-alpha.75",
+    "@fluentui/react-badge": "9.0.0-alpha.75",
+    "@fluentui/react-button": "9.0.0-alpha.80",
+    "@fluentui/react-divider": "9.0.0-alpha.62",
+    "@fluentui/react-image": "9.0.0-alpha.73",
+    "@fluentui/react-label": "9.0.0-alpha.34",
+    "@fluentui/react-link": "9.0.0-alpha.76",
+    "@fluentui/react-make-styles": "9.0.0-alpha.61",
+    "@fluentui/react-menu": "9.0.0-alpha.71",
+    "@fluentui/react-popover": "9.0.0-alpha.36",
+    "@fluentui/react-portal": "9.0.0-alpha.43",
+    "@fluentui/react-provider": "9.0.0-alpha.72",
+    "@fluentui/react-theme": "9.0.0-alpha.22",
+    "@fluentui/react-tooltip": "9.0.0-alpha.76",
+    "@fluentui/react-utilities": "9.0.0-alpha.43",
    "tslib": "^2.1.0"
  },
}
```

Example of proposed changes to `@fluentui/react-button` `package.json` file.

```diff
  "dependencies": {
-    "@fluentui/keyboard-keys": "^9.0.0-alpha.1",
-    "@fluentui/react-icons": "^1.1.136", // not a monorepo dependency
-    "@fluentui/react-make-styles": "^9.0.0-alpha.61",
-    "@fluentui/react-tabster": "^9.0.0-alpha.55",
-    "@fluentui/react-utilities": "^9.0.0-alpha.43",
+    "@fluentui/keyboard-keys": "9.0.0-alpha.1",
+    "@fluentui/react-icons": "^1.1.136", // not a monorepo dependency
+    "@fluentui/react-make-styles": "9.0.0-alpha.61",
+    "@fluentui/react-tabster": "9.0.0-alpha.55",
+    "@fluentui/react-utilities": "9.0.0-alpha.43",
    "tslib": "2.1.0"
  },
```

### Consuming individual packages -> `alpha` component problem

> It is important to remember that this section applies mainly to the prerelease stage of Fluent. Once the core of
> Fluent v9 uses caret dependencies and full semver, some edge cases might still occur. For the most part as long
> as the Fluent uses semver accurately with caret dependencies, resolving dependencies becomes a problem (rightly)
> for the consumer. For example `yarn` is known to require deduplication in its lockfile even with caret resolution, this
> is a problem that Fluent cannot solve.

The consequence of using fixed versions for the entire suite of `@fluentui/` scoped packages is that consuming
multiple individual packages becomes problematic.

Assuming Fluent uses fixed internal dependency versions, a consumer installs the
latest version of `react-components` and `react-dropdown`.

- `@fluentui/react-components` -> 9.0.0.beta.15

  - `@fluentui/react-shared-contexts` -> 9.0.0.beta.4
  - `@fluentui/react-make-styles` -> 9.0.0.beta.3

- `@fluentui/react-dropdown` -> 9.0.0.alpha.1
  - `@fluentui/react-shared-contexts` -> 9.0.0.beta.4
  - `@fluentui/react-make-styles` -> 9.0.0.beta.3

This scenario will work, both packages are on the latest version and pin the same shared dependencies.
We release all changes in one pipeline run, so after a single release phase the dependencies should be in sync.

When `react-components` is an older version a customer is already using, adding the new package will
result in duplicate versions. This can happen if a consumer is already using an older `react-components`
and installs a newly released `react-dropdown`.

- `@fluentui/react-components` -> 9.0.0.beta.13

  - `@fluentui/react-shared-contexts` -> 9.0.0.beta.3
  - `@fluentui/react-make-styles` -> 9.0.0.beta.3

- `@fluentui/react-dropdown` -> 9.0.0.alpha.1
  - `@fluentui/react-shared-contexts` -> 9.0.0.beta.4
  - `@fluentui/react-make-styles` -> 9.0.0.beta.3

In the above example `react-shared-contexts` is duplicated.

When upgrading Fluent v9 packages, the customer needs to make sure that the dependencies of `react-components` and
`react-dropdown` are pinned to the same versions, the only way to easily guarantee this without doing an exhaustive
investigation is to make sure to use the latest version of both, which is still not easy.

To mitigate this problem during the prerelease phase we can do the following:

### Prefer to release new components straight into react-components beta

This RFC argues that having a predictable dependency tree during subsequent installs is more important
than managing expectations for new components with `alpha` and `beta` release phases. `beta` does not
guarantee that APIs won't break, especially when a component has not even been used in any realistic
scenario by partners.

Realistically for the Fluent team, bugs found during either `alpha` or `beta` phases must be addressed or fixed
upon release. If a bug or an API design does not match customer requirements in either phases, we **are entitled** break the
API in a further iteration to improve.

#### Pros

- No extra work required, just a convention to release all new components straight to beta
- Avoid dependency hell by recommending customers to only use the suite package
- No extra effort for customers other than install the correct suite package version

#### Cons

- Not sure what customer expectations are for new components in beta
- Need to properly define alpha vs beta -> what are our requirements ?

### Provide resolutions to customers

If we must release a component into the `alpha`, consumers can still apply manual resolutions.
To support this scenario, we can provide a generated set of yarn resolutions to allow all Fluent dependencies to
work together from the a consuming app.

The generated resolutions must be for a specific version of the `react-components` package.

We can provide this functionality either on our docsite or as a published CLI package.

#### Pros

- Easier debugging for partners, there should only be one Fluent UI version in node_modules

#### Cons

- Need to work on a project to generate resolutions
- Temporary, no need for this after major release

### Lockstep versioning for `beta` components

Lockstep versioning does not solve the problem, but makes finding compatible versions of `beta` and `alpha` packages
easier. Using the below example:

- `@fluentui/react-components` -> 9.0.0.beta.13

  - `@fluentui/react-shared-contexts` -> 9.0.0.beta.13
  - `@fluentui/react-make-styles` -> 9.0.0.beta.3

- `@fluentui/react-dropdown` -> 9.0.0.alpha.1
  - `@fluentui/react-shared-contexts` -> 9.0.0.beta.10
  - `@fluentui/react-make-styles` -> 9.0.0.beta.10

It's clear that we only need to find any version of `react-dropdown` that uses `beta.10` dependencies. Any
future version mismatch can be easily investigated and fixed.

For the problem of fixed versions, lockstep only solves a temporary problem since
on major release Fluent can use full semver features.

#### Pros

- Easy to find compatible versions for alpha packages
- Easier debugging for partners, there should only be one Fluent UI version in node_modules
- Don't have to get rid of lockstep after major release

#### Cons

- Need infra to support lockstep versioning
- Doesn't solve the dependency issue, just makes it easier to manage

### Deep imports for `alpha` packages

> Demo here: https://github.com/ling1726/multiple-entrypoints-test

This solution reintroduces deep imports with the path `@fluentui/react-components/lib/alpha`. The only workaround that
should be necessary is for jest, which uses `commonjs`.

Since `lib` is used the `esm` imports only, it's possible to generate a new `package.json` file that points to the
correct commonjs code so that tests still work in the same way for alpha components. This modification needs to happen
for react-components only. Here is the sample snippet for `package.json`, you can find a fully
working demo repo in the link under the heading.

```json
// react-components/lib/alpha/package.json
{
  "main": "../../lib-commonjs/alpha/index.js", // commonjs entrypoint for jest
  "module": "index.js" // esm entrypoint for webpack
}
```

#### Pros

- Avoid dependency hell by recommending customers to only use the suite package
- No extra effort for customers other than install the correct suite package version

#### Cons

- Still a temporary solution, we should get rid of it after major release
- Extra scripts/infra needed to manage an interim solution
- We now ship alpha with beta in the same package
- No clear difference compared to releasing new components straight into beta -> if API breaks, customers will still
  have to deal with it

### Conclusion -> consuming individual packages

We should recommend partners to install only `@fluentui/react-components`. If new components are released to the same
prerelease phase, there is no obvious reason to consume components as separate packages and the solution to
consuming a new component is to bump the suite package.

The only scalable solution is to get out of the prerelease phase
and leverage all the benefits of semver.

Making it harder to consume `alpha` packages if they are even needed for customers should be acceptable, since
they opt to use a less stable release stage. We can try to make it easier for them to consume `alpha` packages.

> Prerelease tags matching every latest version is not a bug, it's a feature.

## Pros and Cons

### Pros

- Predictably trace dependencies to code for debugging.
- Only a temporary measure until Fluent moves out of prerelease phase.
- We can still go back to carets easily in prerelease phase if needed.
- If beta released in lockstep, can easily go back to independent versioning for main release.
  - We don't break semver because we were still using prerelease tags

### Cons

- Hard to release components into different prerelease phases.
  - Resolutions are not good developer experience.
  - Lockstep is solving temporary problem in this case.
- Cannot strictly enforce customers to only use the suite package.
