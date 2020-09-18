# Fluent UI - React Northstar ([docs](https://aka.ms/fluent-ui))

This is the new home for `@fluentui/react-northstar` and related packages which were migrated from the [`microsoft/fluent-ui-react` repo][1].

> Since the `@fluentui/react-northstar` packages are on version 0.x, note that:
>
> 1.  **MINOR** versions represent **breaking changes**
> 1.  **PATCH** versions represent **fixes _and_ features**
> 1.  There are **no deprecation warnings** between releases
> 1.  Consult the [**CHANGELOG**][2] and related issues/PRs for more information

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Contributing](#contributing)
- [Issues](#issues)
- [Documentation and usage examples](#documentation-and-usage-examples)
- [FAQs](#faqs)
  - [Why the move?](#why-the-move)
  - [Why the separate folder?](#why-the-separate-folder)
  - [What's happening with Teams support?](#whats-happening-with-teams-support)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for a step-by-step setup and development guide specific to `@fluentui/react-northstar`.

## Issues

If you need to [file an issue][3], please note in the title or description that it refers to `@fluentui/react-northstar`.

## Documentation and usage examples

See the doc site at https://aka.ms/fluent-ui.

## FAQs

### Why the move?

We're in the process of converging UI projects at Microsoft under the "Fluent UI" banner to simplify the dev story. In the process, we're making performance improvements and enabling greater interoperability of these components across more places and platforms at Microsoft.

### Why the separate folder?

These packages remain in a separate folder while we work on converging the build systems and certain other details, but they will eventually move directly under `packages` (or `apps`) next to the other packages.

### What's happening with Teams support?

`@fluentui/react-northstar v0.x.x` (formerly `@fluentui/react v0.x.x`) has been the official set of components for Teams. This is still the case and no support is being dropped.

[1]: https://github.com/microsoft/fluent-ui-react
[2]: https://github.com/microsoft/fluentui/blob/master/packages/fluentui/CHANGELOG.md
[3]: https://github.com/microsoft/fluentui/issues/new/choose
