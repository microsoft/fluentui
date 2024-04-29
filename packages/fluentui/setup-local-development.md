# Setup for `@fluentui/react-northstar` (and others under `packages/fluentui`)

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [General setup](#general-setup)
- [Inner loop for `@fluentui/react-northstar` packages](#inner-loop-for-fluentuireact-northstar-packages)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## General setup

To contribute to packages **in this folder**, follow most of the [main setup instructions][1], then return to this page when you're ready to build.

## Inner loop for `@fluentui/react-northstar` packages

For most packages under `packages/fluentui`, such as `@fluentui/react-northstar`, the inner loop works as follows.

After following the instructions linked above, run this from the root of the repo:

```
yarn start
```

and choose the `@fluentui/docs` option.

Open [localhost:8080](http://localhost:8080) after the initial build has completed. You can now hack on packages under `packages/fluentui` to make changes and see the doc site update in real-time.

[1]: https://github.com/microsoft/fluentui/wiki/Setup
