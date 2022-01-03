# RFC: Use ranges to define versions of dependencies

@layershifter @ling1726 @miroslavstastny

## Summary

This RFC proposes to continue use caret (`^`) and tilde (`~`) for production dependencies of converged packages.

## Problem statement

The are two options to manage packages:

- ranges via carets (`^1.0.0`), tildes (`~1.0.0`) or signs (`>=1.0.0`, `1.0.0 || 2.0.0`)
- exact versions

The preferred approach may vary on use case: applications and libraries follow different practices. Fluent UI is a library, so we should focus on the best experience for customers.

Usage of exact versions in our dependencies solves a problem with different versions for us and customers so there will be a guarantee that they will use same versions as we. This should guarantee us there will be no unknown bugs caused by third party dependencies in different versions. This is a huge benefit.

However, an approach with exact versions creates a different set of problems for consumers. Let's assume that we have two packages and ours will use an exact version:

```json
{
  "name": "@fluentui/react-COMPONENT",
  "dependencies": {
    "lodash": "4.17.20"
  }
}
```

```json
{
  "name": "eslint",
  "dependencies": {
    "lodash": "^4.17.21"
  }
}
```

This will result in two versions of installed packages by a package manager (`yarn` in this case):

```
lodash@4.17.20:
  version "4.17.20"
  resolved "https://..."
  integrity sha512-...

lodash@^4.17.21:
  version "4.17.21"
  resolved "https://..."
  integrity sha512-...
```

Thus a single package gets included multiple times in a Webpack bundle due to different package versions. This situation will happen without any warning, resulting in extra bloat in consumer's bundle and may lead to hard-to-find bugs.

It's also harder for consumers in this case to consume security patches, for example `lodash@4.17.20` contains [a security vulnerability](https://snyk.io/vuln/SNYK-JS-LODASH-1018905) but this version will be inside consumer's application without additional movements from their side. If we will use a caret ("lodash": "^4.17.20") only a single version (a latest in a range) will be installed:

```
lodash@^4.17.20, lodash@^4.17.21:
version "4.17.21"
resolved "https://..."
integrity sha512-...
```

There are workaround that customers can use in this case ([`yarn resolutions`](https://classic.yarnpkg.com/en/docs/selective-version-resolutions/), [webpack aliases](https://webpack.js.org/configuration/resolve/#resolvealias)) to use a proper version. But we should not create an additional walls for customers to properly consumer the library.

There is a Webpack plugin (similar to [duplicate-package-checker-webpack-plugin](https://github.com/darrenscerri/duplicate-package-checker-webpack-plugin)) that prevents imports of duplicate versions on Teams side.

## Detailed Design or Proposal

Use semver ranges to define production dependencies for our customers. Exact versions can be used in non-distributed code (build and infra tools).

_Optionally_: Distribute with packages `VERSIONS` file that will contain versions of dependencies that are used on our side in machine readable format that can be potentially used by customers in their pipelines.

## Pros and Cons

<!-- Enumerate the pros and cons of the proposal. Make sure to think about and be clear on the cons or drawbacks of this propsoal. If there are multiple proposals include this for each. -->

## Discarded Solutions

We potentially can use `peerDependencies` like React does, however these is no much sense in it: React does it to intentionally avoid multiple versions (it was not possible before React 17, [facebook/react#1939](https://github.com/facebook/react/issues/1939)). However, it creates issues for customers as they will need to install our dependencies, too:

```bash
$ yarn add @fluentui/react-COMPONENT DEPENDENCY1 DEPENDENCY2 ... DEPENDENCY999
```

_[NPMv7](https://blog.npmjs.org/post/631877012766785536/release-v700) installs `peerDependencies` by default._

## Open Issues

NA
