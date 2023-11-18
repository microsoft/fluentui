# RFC: Automated dependency version management

---

_@varholak-peter_

## Summary

We would like to keep `devDependencies` updated to their latest versions when possible. This minimizes the extra effort needed to update packages across multiple versions if the need arises. We want to limit this behavior to `devDependencies` only, as it limits the impact on final build output that could affect our customers.

## Background

This RFC somewhat relates to [RFC: Use ranges to define versions of dependencies](https://github.com/microsoft/fluentui/blob/master/rfcs/convergence/dependency-versions.md).

## Problem statement

We want to avoid situations where we depend on a new feature introduced in a dependency but we cannot easily upgrade the dependency version as it would require a lot of work to ensure compatibility between versions. By introducing granular periodic updates we can minimize the impact of version bumping and make the whole process more predictable.

## Detailed Design or Proposal

Enabling an automated dependency maintenance tool such as [Dependabot](https://docs.github.com/en/code-security/supply-chain-security/keeping-your-dependencies-updated-automatically/about-dependabot-version-updates) can help us control the state of dependencies within our monorepo. The tool is native on GitHub and is currently enabled in the capacity where it handles only security updates. However with a proper configuration file we can achieve much more and improve DX.

For now, we would like to enable this periodic version bumping to `devDependencies` only as that prevents the issue of having multiple mismatched dependencies in final build output used by our customers. (More information about this can be found in [RFC: Use ranges to define versions of dependencies](https://github.com/microsoft/fluentui/blob/master/rfcs/convergence/dependency-versions.md))

This RFC includes a configuration file for Dependabot which enables weekly updates for `devDependencies` and mimics the behavior for security patches that are enabled in the repository currently.

### Pros and Cons

#### Pros

- Including Dependabot configuration within the repository makes the configuration transparent to everyone.
- PRs created by dependabot showcase statistics for each version bump, making it easier to understand what changes and whether it could introduce some unintended issues into the codebase.
- Easier update path for dependencies that are periodically kept up to date.

#### Cons

- More PRs to manage.

## Discarded Solutions

Manually updating all dependencies?

## Open Issues

N/A
