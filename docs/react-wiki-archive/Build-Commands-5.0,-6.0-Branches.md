This page outlines the major commands used for development in the Fluent UI (Fabric) repo's **5.0 and 6.0 branches.**

For the **master** or **7.0** branches, [see this page](Build-Commands).

🚨🚨🚨&nbsp; **WARNING** 🚨🚨🚨&nbsp; You **MUST** use **Node 8 or 10** for development in the `5.0` and `6.0` branches. It's recommended to set this up using `nvm`--see instructions on the [nvm setup page](nvm-setup).

- Quick references
  - [Repo-wide commands](#quick-reference-repo-wide-commands)
  - [Package-specific commands](#quick-reference-package-specific-commands)
- [Repo-wide commands](#repo-wide-commands)
  - [Install and build](#install-and-build)
  - [Before check-in](#before-check-in)
  - [Troubleshooting](#troubleshooting)
  - [Advanced: modifying dependencies, adding packages/components](#advanced-modifying-dependencies-adding-packagescomponents)
- [Package-specific commands](#package-specific-commands)

### Quick reference: repo-wide commands

These commands should be run from the root of the Fluent UI (Fabric) Git repo.

<!-- prettier-ignore-start -->
| Command | Explanation |
|------------|------------|
|[`npm install`](#npm-install)|Install dependencies and build most code|
|[`npm start`](#npm-start-repo)|Start demo site and inner development loop for `office-ui-fabric-react`|
|[`npm run build`](#npm-run-build-and-npm-run-buildfast)|Run a full production build|
|[`npm run buildfast`](#npm-run-build-and-npm-run-buildfast)|Rebuild only projects that have changed|
|[`npm run codepen`](#npm-run-codepen)|Use a local build in codepen|
|[`npm run change`](#npm-run-change)|Create change files|
|[`npm run update-snapshots`](#npm-run-update-snapshots-repo)|Update Jest snapshots for `office-ui-fabric-react`|
|[`npm run update-a11y`](#npm-run-update-a11y)|Update accessibility test snapshots|
|[`npm run update-api`](#npm-run-update-api-repo)|Update API review file for `office-ui-fabric-react`|
|[`npm run scrub`](#npm-run-scrub)|Revert the repo to a clean state *(commit or stash your changes first)*|
|[`npm run rush-update`](#npm-run-rush-update)|Use when adding/modifying dependencies|
|[`npm run create-component`](#npm-run-create-component)|Create a new experimental component|
|[`npm run create-package`](#npm-run-create-package)|Create a new package|
<!-- prettier-ignore-end -->

### Quick reference: package-specific commands

These commands can be used in an individual package during development. You must `cd` to the package's folder before running the commands.

<!-- prettier-ignore-start -->
| Command | Explanation |
|------------|------------|
|[`npm start`](#npm-start-package)|Start inner development loop for current package|
|[`npm run build`](#npm-run-build-package)|Build and run tests for current package|
|[`npm run clean`](#npm-run-clean)|Clean up build output for current package|
|[`npm run update-snapshots`](#npm-run-update-snapshots-package)|Update Jest snapshots for current package|
|[`npm run update-api`](#npm-run-update-api-package)|Update API review file for current package|
|[`npm run start-test`](#npm-run-start-test)|Start inner development loop for Jest tests|
|[`npm run just <taskname>`](#npm-run-just)|Run an individual task|
<!-- prettier-ignore-end -->

# Repo-wide commands

In general, we abstract away the tooling behind `npm run` scripts. This way, we can avoid forcing developers to have global tools to be installed, other than what was already available from node.js.

## Install and build

### `npm install`

`npm install` installs dependencies and builds most code. It should be run immediately after each `git pull` or `git merge` to get your repo back into a consistent state that allows for development.

Since most of our development work is on `office-ui-fabric-react` (OUFR), this command will build **up to OUFR**: packages it depends on, OUFR itself, and `fabric-website-resources` which powers `npm start`.

If `npm install` reports that your Node version is too new (or fails with an error like `TypeError: cb.apply is not a function`), [see these instructions](Legacy-Branches#node-version-setup) for how to install Node 8 or 10 alongside your current main Node version.

### `npm start` (repo)

To see a demo app with the OUFR components, simply run `npm start`. Note this starts `webpack-dev-server` only on OUFR. This command relies on certain other projects having been built. If it fails to find some files, stop the command, run `npm install`, and try `npm start` again.

Note that `npm` recognizes `start` as a command, so `npm start` means the same as `npm run start`.

### `npm run build` and `npm run buildfast`

`npm run build` does a full rebuild in production mode (abstracting `rush rebuild`).

`npm run buildfast` builds only projects that changed (abstracting `rush build`).

#### Common options

These options work with either `build` or `buildfast`, and can be combined together. Note that since these are `npm run` scripts, you must include a `--` after the script name but before any options: e.g. `npm run buildfast -- --min --to some-project`.

- `--to <project-name>`: Build only up to the given project, e.g. `npm run buildfast -- --to experiments`

- `--from <project-name>`: Build starting from the given project, e.g. `npm run buildfast -- --from office-ui-fabric-react`

- `--min`: Build but don't run tests, e.g. `npm run buildfast -- --min`

- `--production`: Do a production-mode build, e.g. `npm run buildfast -- --production`

### `npm run codepen`

In our bug templates, we encourage bug reporters to submit codepen examples. It is sometimes helpful to directly run those examples against in-development code. Run `npm run codepen` to generate several `<script>` tags to be pasted in the HTML section of the codepen. This command fires up a `webpack-dev-server` along with an `ngrok` instance to provide a proxy tunnel into the local server from the codepen site. (Note that the URL will only work as long as the `npm run codepen` command is running.)

## Before check-in

### `npm run change`

After you've checked changes into a local branch, you'll need to create change file(s) using `npm run change` and then commit them. A change file tells Rush how to increment each package's semantic version (semver) upon publish. The message in the change file will be included in the package release notes, so make it brief but informative.

### `npm run update-snapshots` (repo)

We use Jest snapshots heavily in our repository. In fact, all the examples are snapshotted. So, even the most granular change within our component code will probably require an update to the snapshots. These updates are expected to be checked in along with the component code.

This command can either be run at the repo root to update snapshots in OUFR, or in an individual project to update that project's snapshots.

### `npm run update-a11y`

This command updates the Jest snapshots for the accessibility checker tests (`apps/a11y-tests`).

### `npm run update-api` (repo)

To ensure Fabric has a consistent API that is semver-friendly, we need a way to make sure any public API changes are vetted in our PR review process. When a public API is changed, you will need to run `npm run update-api` to update the API review file (generated by `api-extractor`). These updates need to be reviewed and checked in along with the API code changes themselves.

This command can either be run at the repo root to update the OUFR API file, or in an individual project to update that project's API file.

## Troubleshooting

### `npm run scrub`

**WARNING: Commit or stash any changes you want to keep before running this command!**

This command **permanently removes** all `node_modules`, build output, and other untracked files or uncommitted changes. It can sometimes help resolve strange build or install errors.

**Always** run this command when switching between major release branches (`master`, `6.0`, `5.0`) due to install structure differences and the significant number of changed files. (It shouldn't be needed if you're just switching between an official branch like `6.0` and one of your own branches based off `6.0`.)

## Advanced: modifying dependencies, adding packages/components

### `npm run rush-update`

If you modify npm package dependencies in a `package.json` file, use `npm run rush-update` to install these new dependencies and update the dependency version lock file (`shrinkwrap.yaml`). The updated shrinkwrap _must_ be checked in along with the `package.json` file.

`npm run generate` is an alias to this command.

### `npm run create-component`

Use this command to create a new experimental component from a template.

See the [New Component](New-Components) page for details on how this works.

### `npm run create-package`

Use this command to create a new package inside the Fluent UI (Fabric) repo using a template: `npm run create-package your-package-name`. This is conceptually similar to the `create-component` command above, and it's a much more reliable approach than copying files manually.

# Package-specific commands

These commands can be used in an individual package during development. You must `cd` to the relevant package's folder before running the commands.

### `npm run build` (package)

Build and run tests for the current package. In most packages, it accepts the `--min` and `--production` flags used by the repo-wide build commands. Note that since this is a `npm run` script, you must include a `--` in the argument list before any flags: `npm run build -- --min`.

### `npm run clean`

Cleans the package build artifacts. Combined with the `npm run build` command, this has the effect of a rebuild.

### `npm run update-snapshots` (package)

Update `jest` snapshots for a particular package. (Not available in all packages.)

### `npm run update-api` (package)

Update the API review file for a particular package. (Not available in all packages.)

### `npm start` (package)

Start an inner development loop for a particular package. (Not available in all packages.)

### `npm run start-test`

This command (not available in all packages) starts an "inner loop" for `jest` tests. It fires up `jest` in watch mode, and by default will only run tests that it detects are relevant to modified files.

To focus on a single file, you can include a filename pattern in the command to make it faster:

`npm run start-test TextField`

### `npm run just`

Fabric uses the [`just`](https://github.com/kenotron/just-task) build system. All build, test, and lint tasks are defined as `just` tasks. These tasks are sequenced in parallel and series in a deterministic way according to the definition inside the project's `just-task.js`.

To run only an individual task, you can use `npm run just`. Some (non-comprehensive) examples:

- `npm run just ts`
- `npm run just ts:commonjs`
- `npm run just lint`
- `npm run just jest`
