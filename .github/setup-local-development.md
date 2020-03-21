# Setup for `@fluentui/react-northstar` (and others under `packages/fluentui`)

**Please see [this wiki page](https://github.com/microsoft/fluentui/wiki/Setup) for general setup instructions.**

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Inner loop for `react-northstar` packages](#inner-loop-for-react-northstar-packages)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Inner loop for `react-northstar` packages

For most packages under `packages/fluentui`, such as `@fluentui/react-northstar`, the inner loop works as follows.

After following the instructions linked above, run this from the root of the repo:

```
yarn start
```

and choose the `@fluentui/docs` option.

Open [localhost:8080](http://localhost:8080) after the initial build has completed. You can now hack on packages under `packages/fluentui` to make changes and see the doc site update in real-time.

[1]: https://nodejs.org/
[2]: https://github.com/yarnpkg/yarn/#features
[3]: https://help.github.com/articles/connecting-to-github-with-ssh/
