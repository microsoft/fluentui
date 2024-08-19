## Executing tasks:

To run tasks(targets) we use `nx run` command. Learn more https://nx.dev/nx-api/nx/documents/run

### Common workspace tasks(targets)

#### `build`

- transpile TypeScript code into vanilla JavaScript supporting various module formats
- generate public API definitions (`d.ts` files)

> - allowed only within `"projectType": "library"` ( library projects )

#### `bundle`

> - allowed only within `"projectType": "application"` ( application projects )

bundle application code (via bundler - most probably webpack)

#### `build-storybook`

build storybook in production mode via storybook CLI

#### `storybook`

start local storybook

#### `bundle-size`

measure bundle-size differences for code changes based on project fixtures via [monosize](https://github.com/microsoft/monosize)

#### `lint`

run eslint on project files

#### `e2e`

run [cypress (component tests)](https://docs.cypress.io/guides/component-testing/overview) or playwright ( currently only within web-components project)

#### `test`

run project tests via [jest](https://jestjs.io/).

#### `test-ssr`

run SSR tests via [`@fluentui/scripts-test-ssr`](../../../scripts/test-ssr/README.md) CLI

#### `test-vr`

run Visual Regression tests via [storywright](https://github.com/microsoft/storywright)

#### `test-perf`

run performance tests

#### `test-integration`

> this target name is mandatory to us if scope of test is using `@fluentui/scripts-projects-test` APIs

runs integration tests leveraging [`@fluentui/scripts-projects-test`](../../../scripts/projects-test/README.md) setup

#### `verify-packaging`

verifies integrity of package assets published to npm via `npm publish`

#### `type-check`

run type-check per project environment (if TS Solution Config is in place) via `tsc`

## Executing generators:

To run generators we use `nx generate` command. Learn more https://nx.dev/nx-api/nx/documents/generate#generate

Primary source of our generators lives in [workspace-plugin](../../../tools//workspace-plugin/README.md) project.

- To execute workspace generator run `yarn nx g @fluentui/workspace-plugin:<generator>`
- To learn more about available generators you can run `yarn nx list @fluentui/workspace-plugin`

## List of helpful commands.

> [!TIP]
>
> `<project-name>` is project name without `@npmScope`

> [!NOTE]
>
> Following commands should be invoked from monorepo root !

```shell
# dependencies
yarn # installs everything. It fixes many things.
yarn run dedupe # dedupes dependencies - necessary to run after any kind of package bump/changes

# run tasks
yarn start # our custom nx-console CLI alternative to guide you through monorepo

# generators
yarn nx list @fluentui/workspace-plugin # prints all available workspace generators
yarn nx g @fluentui/workspace-plugin:<generator-name> # run <generator-name> from workspace plugin
yarn create-package # scaffolds a new package. alias for `nx g @fluentui/workspace-plugin:react-library`
yarn create-component # scaffolds a new component. alias for `nx g @fluentui/workspace-plugin:react-component`

yarn change # creates a new change file, if needed

# 💡 NOTE: following tasks will be executed against all monorepo projects ( avoid = SLOW )
yarn clean # tidies any cached dependencies in all packages
yarn nx run-many -t <target-name> # runs <target-name> on all monorepo projects
yarn nx run-many -t build # triggers build target(task) on all monorepo projects, this can be a good option if you see errors unrelated to the packages you are working on


# running project tasks
yarn nx run <project-name>:<target-name> # runs tasks within a package. [More help here](https://nx.dev/features/run-tasks#running-tasks)
yarn nx run <package-name>:build # Does a yarn build scoped to a specific package and its dependencies for faster speeds vs building the whole repo.
yarn nx run <package-name>:test # runs a test suite. It is slightly different from the test suite in the CI/CD test suite.
yarn nx run <project-name>:generate-api # updates API files
yarn nx run <project-name>:type-check # quickly runs type checks and associated linting
yarn nx run react:build  # build v8 so intellisense works.
```

![running project tasks](https://github.com/user-attachments/assets/89d3295a-ceeb-43a7-b2d5-f913003e17ab)

```shell
git checkout user/jdoe/some-fancy-branch-name # checks out an existing branch
git checkout -b user/jdoe/some-fancy-branch-name # creates a branch initially
git status # shows a list of changed files.
git add . # stages all your changed files
git add some/file/name # adds a specific file to the change set
git commit -m "your commit message" # commits all your staged files
git commit -am "some commit message" # stages and commits everything in one command (does not account for new files)
git pull upstream master # pulls the latest version of master to your local machine from the root repo, not your fork
git rebase master # tacks all your commits from your current branch onto the end of master. Prefer this over merges.
git rebase -i master # shows your list of commits about to rebased before it's committed.
git branch # lists all the branches on your local machine
git push # pushes things to your forked repo, not the main repo.
git push upstream # pushes your branch to the main repo.
git push upstream --force # force is needed after a rebase.
```
