# RFC: Ending support for IE11 with Fluent v9

@ling1726

## Summary

Fluent v9 will officially no longer support IE11.

[Microsoft has officially announced a deadline to end IE11 support for M365 Apps](https://techcommunity.microsoft.com/t5/microsoft-365-blog/microsoft-365-apps-say-farewell-to-internet-explorer-11-and/ba-p/1591666).
This comes at a time where the market share of IE11 has [dropped to below 1%](https://caniuse.com/usage-table).

One of the major goals of the convergence project in Fluent v9, is to address past drawbacks and issues with both `@fluentui/react` and `@fluentui/react-northstar` and
improve the experience for web developers at Microsoft. This has given an opportunity for the team to take a step back, look at the
fundamentals and rethink our support for IE11.

In this RFC we will explain our motivations for this decision and finally formalize this decision in writing.

## Detailed Design or Proposal

### Keep calm and carry on

Our partners and products in M365 will either adhere to the August 2021 deadline or receive a 6 month extension for IE11 support.
Since Fluent v9 is still in alpha release, and is planned to be at beta at August 2021, we will be ready for early adopters.
Until that deadline, users that require full support for IE11 can do so with the existing versions of `@fluentui/react` and
`@fluentui/react-northstar` that do provide support.

## Motivation

### Reduced transpilation - (perf + bundlesize improvements)

The ability to use ES2015/ES6 features without the transpilation required for IE11 will result in perf and bundle size improvements,
and tslib will no longer be needed as a dependency to emulate the missing features of modern javascript.

It's possible that newer language features in the future might re-introduce tslib or extra transpilation. However since our support moves
mainly to evergreen browsers, the risk of introducing unsupported language features will decrease.

### Improved Theming

Theming a web application is always a challenge and can easily lead to performance issues. Performance has been a challenge for the current
versions of fluent that evaluated theme values with javascript. Fluent v9 uses [CSS variables](https://developer.mozilla.org/en-US/docs/Web/CSS/--*) for its theming and styling solution. This means
that it does not need to have a different set of classes for each theme and css rules never change regardless of theme which is a
big boost to performance.

Our future theming system also uses the [Proxy](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy)
in a key step to create the CSS variables that map to theme values.

Without these platform features missing in IE11, we would need to dedicate more time to another solution which would be also less performant for both IE11 and evergreen browser users.
to dedicate more time to another solution for this.

### Maintenance Burden

The lack of support that IE11 offers for modern (ES2015) javascript has not stopped developers from using it. With EOL of IE11
we no longer have to consider the language features and built-in APIs used across the entire codebase, and figure out the the real support our
transpiled code has for the browser. Since dropping support of IE11 is a breaking change, once we support it in a major version
of Fluent, we can't drop support until the next major release.

Our tooling will improve and its complexity will decrease. With babel and `preset-env` will be able to use the same tooling
in our tests, storybook and the code we ship. Our build times and and test times will also decrease which means faster CI
times overall.

### Motivating our partners

There are clear benefits we have planned with Fluent v9, from easier composition to performant styling. We want our partners
to leverage the full set of advantages that Fluent v9 has to offer. The web ecosystem needs to move forward and supporting
IE11 will inevitably make it slower. By taking this stance in Fluent v9 we give a clear motivation to our partners to
modernize their own products.

## Pros and Cons

### Pros

Already mentioned in previous chapters

### Cons

We understand that this might cause initial adoption headaches from our partners. However, they should also generally be targeting
the same EOL date for IE11.

There will be a cost to overhauling the codebase and tooling for vNext to fully leverage all the benefits that IE11 EOL will bring us.
This cost is acceptable to the team, in achieving our efforts to make Fluent v9 a great modern design system.
