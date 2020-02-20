# Setup

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [First step](#first-step)
- [Contributors](#contributors)
  - [Clone](#clone)
- [Collaborators](#collaborators)
  - [Fork](#fork)
- [Start](#start)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## First step

Make sure you have [Node.js][1] version v8 or later installed.

```sh
node -v

v8.11.3
```

`yarn` is used for Fluent UI because of its [benefits][2].

```sh
yarn -v

1.7.0
```

## Contributors

If you do not yet have access to the repo as a contributor, ask one of the maintainers to add you. If you want to collaborate on the project without permissions, see [Collaborators](#collaborators).

### Clone

Start by cloning Fluent UI React and installing dependencies:

SSH ([learn more][3])

```sh
git clone git@github.com:microsoft/fluent-ui-react.git
```

HTTPS

```sh
git clone https://github.com/microsoft/fluent-ui-react.git
```

Continue to [Start](#start).

## Collaborators

If you are not part of the Fluent UI team, use these instructions. If you are, or should be, use the [Contributor](#contributors) instructions.

### Fork

Start by forking Fluent UI React to your GitHub account. Then clone your fork and install dependencies:

```sh
git clone git@github.com:<your-user>/fluent-ui-react.git
cd fluent-ui-react
yarn
```

Add our repo as a git remote so you can pull/rebase your fork with our latest updates:

```
git remote add upstream git@github.com:microsoft/fluent-ui-react.git
```

Continue to [Start](#start).

## Start

Now, enter the directory and install dependencies:

```
cd fluent-ui-react
yarn
```

All commands are executed with `yarn`. This will run the doc site, which is also used for development:

```
yarn start
```

Open [localhost:8080](http://localhost:8080) after the initial build has completed. You can now hack on `/src` to make changes and see the doc site update in real-time.

Once setup, you can start [adding a new feature](add-a-feature.md).

[1]: https://nodejs.org/
[2]: https://github.com/yarnpkg/yarn/#features
[3]: https://help.github.com/articles/connecting-to-github-with-ssh/
