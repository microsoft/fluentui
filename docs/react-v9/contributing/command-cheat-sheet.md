This is a list of helpful commands.

```shell
yarn # installs everything. It fixes many things.
yarn buildto package-name # Does a yarn build scoped to a specific package and its dependencies for faster speeds vs building the whole repo.
yarn test # runs a test suite. It is slightly different from the test suite in the CI/CD test suite. Can be run from inside a given package to run faster.
yarn create-package # scaffolds a new package
yarn create-component # scaffolds a new component
yarn change # creates a new change file, if needed
yarn clean # tidies any cached dependencies
yarn build # generates and relinks all packages and temporary files, this can be a good option if you see errors unrelated to the packages you are working on
yarn start # runs a package. You can select the package of choice.
yarn update-snapshots # updates snapshot tests
yarn run dedupe # dedupes dependencies - necessary to run after any kind of package bump/changes
yarn nx run <package-name>:generate-api # updates API files
yarn nx run <package-name>:<target-name> # runs tasks within a package. [More help here](https://nx.dev/features/run-tasks#running-tasks)
yarn nx run @fluentui/<package-name>:type-check # quickly runs type checks and associated linting
yarn lage build --to react # build v8 so intellisense works.
```

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
