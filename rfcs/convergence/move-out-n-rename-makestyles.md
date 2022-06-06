# RFC: Rename and move out `makeStyles` to a separate repo

@layershifter

## Summary

`makeStyles()` is CSS-in-JS engine that is used in Fluent UI React v9. At this moment it seems that `makeStyles()` is more than just a piece of Fluent UI and moving it out a separate repository can bring result in more visibility in the community to both `makeStyles` and Fluent.

We can take [Braid Design System](https://seek-oss.github.io/braid-design-system/) as an example. It uses [Vanilla Extract](https://github.com/seek-oss/vanilla-extract): as its CSS-in-JS engine which lives in a separate repositories.

## Problem statement

### No community engagement

In Fluent UI repository we have already 4 projects, `makeStyles` is invisible behind them 🙄 This results in inability to get community feedback and consumers outside of Fluent UI.

At the same time, the community might have interest in `makeStyles` as it solves its goals efficiently. Taking into account that:

- `makeStyles` is based on similar ideas as [Stylex](https://www.youtube.com/watch?v=9JZHodNR184&t=229s) from Facebook
- we use module evaluation from [Linaria](https://github.com/callstack/linaria)

It is a good opportunity to improve collaboration with the wider open source community as a company 🚀

### `makeStyles` is coupled to Fluent UI

Even if there is interest to use `makeStyles` separately from Fluent UI, it's currently impossible since it's coupled with Fluent UI React v9. There is a separate proposal to decouple `makeStyles` from Fluent (see RFC [microsoft/fluentui#20651](https://github.com/microsoft/fluentui/pull/20651)).

But while it stays as a folder in Fluent UI repo there is no clarity about how to use it for third parties.

### Lack of docs

Compared to other CSS-in-JS `makeStyles` does not have enough docs to explain APIs and design. While every other library has them 🙄 Currently there is no right place for them.

### "Bad" naming

It's a point that was not considered initially, but `makeStyles` is also a function in [MUI](https://mui.com/styles/basics/) and any search queries will point to it.

### Opportunities for partners

Without a strict dependency on Fluent UI v9 we can potentially involve more partners to be consumers of `makeStyles` since they will be able to try the new styling engine even without consuming v9 components.

Partners using other component libraries can still see a performance improvement when using `makeStyles` with their components. This has been proven in the Teams chat list in T2.

### Build issues

Currently there are two unsolved issues: "buildless builds", "build dependency hell" once v9 & other packages are linked and circular dependencies with other repositories.

#### Buildless environment

The problem is described in [microsoft/fluentui#18357](https://github.com/microsoft/fluentui/issues/18357):

- we cannot dogfood our Babel plugin/Webpack loader as it breaks buildless environment: to start Storybook you will need to run `yarn build --to @fluentui/make-styles-webpack-loader`
- even currently it's required to build `@fluentui/jest-serializer-make-styles` before running tests

#### Dependency issues

For incremental adoption with Teams we are looking into a compat layer between `makeStyles` & Fela ([microsoft/fluentui#20611](https://github.com/microsoft/fluentui/pull/20611)). This requires Fluent UI React Northstar (v0) take `makeStyles` core as a dependency.

Existing issues:

- missing aliases for v9 packages in v0 configs
- different TypeScript configuration
- breaks in releases due different release cadences (v0 uses Lerna & manual releases)

#### Circular dependencies between repos

Currently `@fluentui/react-icons` depends on `@fluentui/react-make-styles`. When we need to perform major bump of `@fluentui/react-make-styles`:

- try to bump `@fluentui/react-make-styles` to v10
- `@fluentui/react-icons` still uses v10 (double dependency)
- cannot bump `@fluentui/react-make-styles` in `@fluentui/react-icons` as v10 is not released yet 💥

## Detailed Design or Proposal

- Create new repository in Microsoft org and move related packages
- Rename packages to use new name and NPM scope (`makeStyles` will not use Fluent UI scope)
- Improve documentation, engage community & partners

### Pros and Cons

Pros: It solves all problems described above ✅

Cons:

- Another repository could have visibility/engagement issues for Fluent UI team, but we already have Tabster, `@fluentui/react-icons` and others.
- Potential confusion in docs: `makeStyles` & Fluent UI docs will be in separate places

## Discarded Solutions

NA

## Open Issues

NA
