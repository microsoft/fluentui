**Note: This page is about _contributing changes_ to legacy versions of the UI Fabric library, not using them in your app. If you're consuming Fabric/Fluent UI React, please use the latest version if possible!**

(If you must use an old version, the process for consuming it is similar; just substitute the old version number when installing, e.g. `npm install --save office-ui-fabric@6`. Also, be sure to reference the correct version of the control documentation: [here for version 6](https://developer.microsoft.com/en-us/fluentui#/controls/web?fabricVer=6) or [here for version 5](https://developer.microsoft.com/en-us/fluentui#/components?fabricVer=5).)

---

Fabric has separate branches with the code from previous major releases, such as `5.0` and `6.0`. This page outlines the setup and development process for working in those branches.

- [Setting up for legacy branch development](#setting-up-for-legacy-branch-development)
  - [Node version setup](#node-version-setup)
  - [Working copy setup](#working-copy-setup)
  - [Branch setup](#branch-setup)
- [Development](#development)
  - [Cherry-picking](#cherry-picking)
  - [Pull requests](#pull-requests)

## Setting up for legacy branch development

### Node version setup

We recommend using `nvm` (Node Version Manager) to manage and switch Node versions. The `5.0` and `6.0` branches **require using Node 8 or 10** to build. _(These steps are also useful if you're developing on `master` but need to use an older Node version in another repo.)_

See the [nvm setup page](nvm-setup) for instructions.

### Working copy setup

Due to the install structure differences and the significant number of changed files between major release branches (`master`, `6.0`, and `5.0`, etc), it's recommended to make a **separate clone** for each one.

#### Option 1: Making a separate clone

To make a separate clone for development based off the `6.0` branch (as an example):

1. `cd` to an appropriate folder (such as the one _above_ your main clone's root folder)
2. Grab the clone URL for your fork from GitHub
3. Choose a name for your new clone's folder (in this example, `fabric6`)
4. Clone the repo, supplying the folder name as an additional argument, and cd into the folder:

```
git clone https://github.com/microsoft/fluentui.git fabric6
cd fabric6
```

#### Option 2 (advanced): Making a separate worktree

Git's worktree feature allows multiple working copies of a repo to share the same underlying Git store. Worktrees are powerful but a bit more complicated to set up and maintain, and not all tools handle them properly (VS Code and SourceTree do reasonably well). See [this article on worktrees](https://spin.atomicobject.com/2016/06/26/parallelize-development-git-worktrees/) for more information on setup and pros/cons.

#### Option 3 (not recommended): Using the same clone

If you prefer to use the same clone for developing against multiple major release branches (and don't want to use worktrees), use the `scrub` script to clean up when switching between major releases. This script permanently removes all node_modules, build output, and other untracked files or uncommitted changes.

_**Commit or stash any changes you want to keep**_, then run `yarn scrub` (in `master`) or `npm run scrub` (in `6.0`).

### Branch setup

There are various ways to set up your own copy of the legacy release branch. One option is as follows (using `6.0` as an example):

```
git fetch upstream
git checkout upstream/6.0
git checkout -b 6.0
git push -u origin
```

With this approach, you can use the same commands as usual to update the branch or create additional branches off of it; just replace `master` with `6.0`.

## Development

`6.0` and `5.0` use [different specific build commands](<Build-Commands-(5.0,-6.0-Branches)>) than `master`, but otherwise the workflow is similar. Some special cases are covered below.

### Cherry-picking

In this example, we'll cherry-pick a commit `ce137b9` from `master` into `6.0`.

As part of the cherry-pick process, ideally you should delete and re-generate the change files to ensure they point to the right commits.

1. Run `git fetch upstream` to ensure you have all the latest commits
2. Find the SHA1 (short or full version) of the commit you'd like to cherry-pick (example: `ce137b9` or `ce137b9b03de9bb25ab6e2f86cf1786598122b9b`)
3. Check out your copy of `6.0` and ensure it's up to date:

```
git checkout 6.0
git pull upstream 6.0
git push
```

4. Create a new branch (use any name): `git checkout -b cherry-pick-example`
5. Start the cherry-pick but don't commit: `git cherry-pick ce137b9 --no-commit`
6. Resolve any merge conflicts and stage those files
7. Make note of the messages in the change files, then unstage and delete the change files (easiest to do in VS Code or SourceTree)
8. Run `git commit` to finish committing
9. Run `npm run change` to generate new change files
10. Run `git push -u origin` to push the branch

### Pull requests

When making a pull request, **be sure to select the old branch (such as `6.0`) as the target!** Otherwise your PR will show lots of modified files you didn't touch and lots of merge conflicts.
