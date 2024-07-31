This page outlines the major commands used for development in the Fluent UI repo **master and 7.0 branches**.

(For the **5.0** and **6.0** branches, [see this page](<Build-Commands-(5.0,-6.0-Branches)>).)

- Quick references
  - [Repo-wide commands](#quick-reference-repo-wide-commands)
  - [Package-specific commands](#quick-reference-package-specific-commands)
- [Repo-wide commands](#repo-wide-commands)
  - [Install and build](#install-and-build)
  - [Before check-in](#before-check-in)
  - [Troubleshooting](#troubleshooting)
  - [Advanced: adding packages/components](#advanced-adding-packagescomponents)
- [Package-specific commands](#package-specific-commands)

### Quick reference: repo-wide commands

These commands should be run from the root of the Fluent UI Git repo.

You can see all the available commands by looking at the `scripts` section of the [root `package.json`](https://github.com/microsoft/fluentui/blob/master/package.json).

Many of the repo-wide commands internally use the Lage task runner and support its [CLI options](https://microsoft.github.io/lage/guide/cli.html), including:

- `--to package-name`: build only packages matching `package-name`, and their dependencies. `package-name` can be a substring of the name, such as `react-examples` instead of `@fluentui/react-examples`.
- `--concurrency N`: use max of N processes to build

<!-- prettier-ignore-start -->
| Command | Explanation |
|------------|------------|
|[`yarn`](#yarn-install)|Install dependencies and build most code|
|[`yarn start`](#yarn-start-repo)|Start demo site and inner development loop for `@fluentui/react`|
|[`yarn build`](#yarn-build)|Run a build on all packages *(supports `--to`)*|
|[`yarn build:min`](#yarn-buildmin)|Build only up to `@fluentui/react` and `@fluentui/react-northstar`|
|[`yarn buildci`](#yarn-buildci)|Runs build, lint, and test *(supports `--to`)*. To also bundle, run `yarn bundle` separately.<br/>**This command approximates CI build steps and is useful for validating your changes locally** |
|[`yarn buildto`](#yarn-build-and-yarn-buildto)|Run a build up to a certain package *(alias of `yarn build --to package-name`)*|
|`yarn bundle`|Runs `yarn bundle` (builds webpack bundles) in all packages *(supports `--to`)*|
|`yarn clean`|Cleans package build output *(supports `--to`)*|
|[`yarn codepen`](#yarn-codepen)|Use a local build in codepen|
|[`yarn change`](#yarn-change)|Create change files|
|`yarn lint`|Runs lint on all packages *(supports `--to`)*|
|`yarn test`|Runs unit tests on all packages *(supports `--to`)*|
|[`yarn update-snapshots`](#yarn-update-snapshots-repo)|Update Jest snapshots for all packages *(**must build first**; supports `--to`)*|
|[`yarn scrub`](#yarn-scrub)|Revert the repo to a clean state *(commit or stash your changes first)*|
|[`yarn create-package`](#yarn-create-package)|Create a new package|
|`yarn lage run`|(advanced) Run any package.json script name repo-wide using Lage. This is usually unnecessary. *(supports `--to`)*|
<!-- prettier-ignore-end -->

### Quick reference: package-specific commands

These commands can be used in an individual package during development. You must `cd` to the package's folder before running the commands.

Most packages support the commands outlined below. You can see all the available commands for a package by looking at the `scripts` section of its `package.json`.

(**Do not run plain `yarn` (install) in an individual package.** This should only be run at the repo root.)

<!-- prettier-ignore-start -->
| Command | Explanation |
|------------|------------|
|[`yarn start`](#yarn-start-package)|Start inner development loop for current package|
|[`yarn build`](#yarn-build-package)|Build the current package|
|`yarn bundle`|Bundle current package (if supported)|
|[`yarn clean`](#yarn-clean)|Clean up build output for current package|
|`yarn lint`|Run lint for current package (if supported)|
|`yarn test`|Run tests for current package (if supported)|
|[`yarn update-snapshots`](#yarn-update-snapshots-package)|Update Jest snapshots for current package **(must build first)**|
|[`yarn start-test`](#yarn-start-test)|Start inner development loop for Jest tests|
|[`yarn just <taskname>`](#yarn-just)|Run an individual task|
<!-- prettier-ignore-end -->

# Repo-wide commands

In general, we abstract away the tooling behind `yarn` scripts. This way, we can avoid forcing developers to have global tools to be installed, other than what was already available from node.js.

You can see all the available commands by looking at the `scripts` section of the [root `package.json`](https://github.com/microsoft/fluentui/blob/master/package.json).

## Install and build

### `yarn` (install)

`yarn` installs dependencies. It should be run immediately after each `git pull` or `git merge` to get your repo back into a consistent state that allows for development.

If you've added/updated any dependencies, running `yarn` will automatically install those and add them to `yarn.lock`. Updates to this file _must_ be checked in with your other changes.

### `yarn start` (repo)

After running `yarn`, you should be able to start a demo app for any package (without further build steps) by running `yarn start`.

### `yarn build`

Builds all packages.

Add `--to package-name` to build only packages matching `package-name`, and their dependencies. `package-name` can be a substring of the name, such as `react-examples` instead of `@fluentui/react-examples`.

### `yarn build:min`

This command will build `@fluentui/react` and `@fluentui/react-northstar` and all their dependencies.

### `yarn buildto`

This is an alias of `yarn build --to package-name`.

(Related command: `yarn buildto:lerna` does the same thing but orchestrated using Lerna rather than Lage. This is usually unnecessary.)

### `yarn codepen`

In our bug templates, we encourage bug reporters to submit codepen examples. It is sometimes helpful to directly run those examples against in-development code. Run `yarn codepen` to generate several `<script>` tags to be pasted in the HTML section of the codepen. This command fires up a `webpack-dev-server` along with an `ngrok` instance to provide a proxy tunnel into the local server from the codepen site. (Note that the URL will only work as long as the `yarn codepen` command is running.)

## Before check-in

### `yarn change`

After you've checked changes into a local branch, you'll need to create change file(s) using `yarn change` and then commit them. A change file tells [beachball](https://github.com/microsoft/beachball) how to increment each package's semantic version (semver) upon publish. The message in the change file will be included in the package release notes, so make it brief but informative.

### `yarn buildci`

`yarn buildci` approximates the steps that CI performs on PRs: build, test, and lint. This makes it a useful command for validating that your local changes will pass CI before you create or update a PR.

Add `--to package-name` to run the command only for packages matching `package-name`, and their dependencies. `package-name` can be a substring of the name, such as `react-examples` instead of `@fluentui/react-examples`.

If you want to also test bundling, you should run `yarn bundle` separately.

### `yarn update-snapshots` (repo)

We use Jest snapshots of rendered DOM heavily in our repository, including for individual components and all examples. So any change affecting component DOM structure or styling will probably require an update to the snapshots, which should be checked in along with the component code.

This command can either be run at the repo root to update all packages' snapshots, or in an individual package to update that package's snapshots.

Note that **you must build before running this command**. So some common workflows would be (from the repo root):

- Update snapshots in all packages (may be slow): `yarn build && yarn update-snapshots`
- Update snapshots up to a certain package (medium speed): `yarn build --to package-name && yarn update-snapshots --to package-name`
- Only do targeted snapshot updates, where `package-name` is the last package requiring snapshot updates (fastest, requires more knowledge of repo internals):

  ```bash
  # Generic example
  yarn buildto package-name
  yarn workspace @scope/some-package update-snapshots
  yarn workspace @scope/package-name update-snapshots
  # and repeat as needed (can also cd to package paths rather than using yarn workspace)

  # Common specific example
  yarn buildto react
  yarn workspace @fluentui/react update-snapshots
  ```

## Troubleshooting

### `yarn scrub`

**WARNING: Commit or stash any changes you want to keep before running this command!**

This command **permanently removes** all `node_modules`, build output, and other untracked files or uncommitted changes. It can sometimes help resolve strange build or install errors.

**Always** run this command when switching between major release branches (`master`, `6.0`, `5.0`) due to install structure differences and the significant number of changed files. (It shouldn't be needed if you're just switching between an official branch like `master` and one of your own branches.)

## Advanced: adding packages/components

### `yarn create-package`

Use this command to create a new package inside the Fluent UI repo using a template: `yarn create-package your-package-name`. You may still need to make some manual updates, but overall this is a much more reliable approach than copying files manually.

# Package-specific commands

These commands can be used in an individual package during development. You must `cd` to the relevant package's folder before running the commands.

Package-specific commands also support passing flags, such as `yarn build --production`. Note that since this is a yarn script, you must include a `--` in the argument list before any flags: `yarn build -- --production`.

You can see all the available commands for a package by looking at the `scripts` section of its `package.json`: for example, to see the commands for the `experiments` package, look at [`packages/experiments/package.json`](https://github.com/microsoft/fluentui/blob/master/packages/experiments/package.json).

**Do not run plain `yarn` (install) in an individual package.** This should only be run at the repo root.

### `yarn build` (package)

Build current package. You can also pass flags such as `--production`. Note that since this is a yarn script, you must include a `--` in the argument list before any flags: `yarn build -- --production`.

### `yarn clean`

Cleans the package build artifacts. Combined with the `yarn build` command, this has the effect of a rebuild.

### `yarn update-snapshots` (package)

Update `jest` snapshots for a particular package. (Not available in all packages.)

**You must build the current package and all its dependencies before running this command.**

### ~~`yarn update-api` (package)~~

API report files (where applicable) are now updated automatically on a local run of `yarn build`. If you see `*.api.md` file change, be sure to commit those changes!

### `yarn start` (package)

Start an inner development loop for a particular package. (Not available in all packages.)

### `yarn start-test`

This command (not available in all packages) starts an "inner loop" for `jest` tests. It fires up `jest` in watch mode, and by default will only run tests that it detects are relevant to modified files.

To focus on a single file, you can include a filename pattern in the command to make it faster:

`yarn start-test TextField`

### `yarn just`

Fluent UI uses the [`just`](https://github.com/kenotron/just-task) build system. All build, test, and lint tasks are defined as `just` tasks. These tasks are sequenced in parallel and series in a deterministic way according to the definition inside the project's `just.config.ts`.

To run only an individual task, you can use `yarn just`. Some (non-comprehensive) examples:

- `yarn just ts`
- `yarn just ts:commonjs`
- `yarn just lint`
- `yarn just jest`

Open the project's `just.config.ts` and/or the repo-wide `scripts/just.config.ts` to see the available task names.
