# RFC: Use fixed versions for `@fluentui` dependencies in prerelease

@ling1726

## Summary

This RFC proposes using fixed version dependencies within the Fluent monoreop for all v9 prerelease packages.
The term 'prerelease' refers to any packages with matching the version pattern `9.y.z-<prerelease tag>.<prerelease version>`.
Prerelease tags do not communicate any kind of breaking changes, we will illustrate this in below sections.

This interim versioning approach while we are in pre-release will help to alleviate the dependency hell currently
caused by using carets with prerelease tags.

Once the core of Fluent v9 is fully released without any prerelease tags, this approach should be abandoned. Without
prerelease tags, we can fully rely on caret dependencies to provider consumers with a consistent dependency tree.

## Problem statement

Assume a constraint `^9.0.0-alpha.15` for `@fluentui/react-shared-contexts`. The following versions all satisfy this
constraint:

- `9.0.0-alpha.16`
- `9.0.0-alpha.17` -> breaking change from `alpha.16`
- `9.0.0-alpha.30`

Any version greater than the current is matched, there is no way of communicating compatibility with prerelease versions.
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

```json
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
-    "@fluentui/react-accordion": "9.0.0-alpha.70",
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

```json
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

Assuming Fluent uses fixed internal dependency versions, let us consider the following example:

```json
// app/package.json
"dependencies": {
  "@fluentui/react-components": "^9.0.0-beta.15",
  "@fluentui/react-dropdown": "^9.0.0-alpha.15",
}

// @fluentui/react-dropdown
"dependencies": {
  "@fluentui/react-utilities": "^9.0.0-beta.1",
  "@fluentui/react-positioning": "^9.0.0-beta.2",
}
```

This will result in duplicated packages with different versions.

To mitigate this problem during the prerelease phase we can do the following:

### Release new components straight into react-components beta

This RFC argues that having a predictable dependency tree is during subsequent install is more important
than managing expectations for new components with `alpha` and `beta` release phases. `beta` does not
guarantee that APIs will/won't break, especially when a component has not even been used in any realistic
scenario by partners.

Realistically for the Fluent team, bugs found during either `alpha` or `beta` phases will must be addressed or fixed
upon release. If a bug or an API design does not match customer requirements in either phases, we **are entitled** break the
API in a further iteration to improve.

### Provide resolutions to customers

If there is a real need to release a component into the `alpha`, consumers can still apply manual resolutions, if we
want to support this scenario we can provide a generated set of yarn resolutions to allow all Fluent dependencies to
work together from the a consuming app.

We can provide this functionality either on our docsite or as a published CLI package.

### Conclusion -> consuming individual packages

We should propose to partners to consume only `@fluentui/react-components`. If new components are released to the same
prerelease phase, there is no obvious reason to consume components as separate packages and the obvious solution to
consuming a new component is to bump the suite package.

The only real scalable solution is to get out of the prerelease phase
and leverage all the benefits of semver. Since keeping caret versions during
prerelease tags does not solve the problem of consuming individual packages but does solve the problem of predictable
dependency tree, we should move on with it.

> Prerelease tags matching every latest version is not a bug, it's a feature.

## Pros and Cons

### Pros

- Predictably trace dependencies to code for debugging.
- Only a temporary measure until Fluent moves out of prerelease phase.
- We can still go back to carets easily in prerelease phase if needed.

### Cons

- Hard to release components into different prerelease phases.
- Cannot strictly enforce customers to only use the suite package.
