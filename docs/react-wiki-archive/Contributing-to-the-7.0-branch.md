If your app is still on version 7 and you need a bug fix to be released in version 7, you'll need to cherry-pick it to the `7.0` branch. This page explains how to make changes in `7.0`.

## Setting up for v7 branch development

The file structure is different enough between the `7.0` branch and master that it's best if you have a separate clone (or worktree) for each one. This makes preparing for development on a new change faster, and it reduces the chance of hitting weird issues due to built files or node_modules from the other version hanging around after changing branches.

### Option 1: Making a separate clone

To make a separate clone for development based off the `7.0` branch:

1. `cd` to an appropriate folder(such as the one above your main clone's root folder)
2. Grab the clone URL for your fork from GitHub
3. Choose a name for your new clone's folder (e.g. `fluentui7`)
4. Clone the repo, supplying the folder name as an additional argument, and `cd` into the folder:

```
git clone https://github.com/microsoft/fluentui.git fluentui7
cd fluentui7
```

### Option 2 (advanced): Making a separate worktree

Git's worktree feature allows multiple working copies of a repo to share the same underlying Git store. Worktrees are powerful but a bit more complicated to set up and maintain, and not all tools handle them properly (VS Code and SourceTree do reasonably well). See [this article on worktrees](https://spin.atomicobject.com/2016/06/26/parallelize-development-git-worktrees/) for more information on setup and pros/cons.

### Option 3 (not recommended): Using the same clone

If you prefer to use the same clone for developing against multiple major release branches (and don't want to use worktrees), use the `scrub` script to clean up when switching between major releases. This script permanently removes all node_modules, build output, and other untracked files or uncommitted changes.

**_Commit or stash any changes you want to keep_**, then run `yarn scrub`

## Branch setup

There are various ways to make a new branch based on the `7.0` branch. One option is as follows (assuming you have the `origin` and `upstream` remotes configured per the [setup instructions](https://github.com/microsoft/fluentui/wiki/Setup#setting-the-upstream-remote)):

```
git fetch upstream
git checkout upstream/7.0 --no-track
git push -u origin 7.0
```

> What this does:
>
> 1. Fetch changes from `upstream` github.com/microsoft/fluentui.
> 2. Create a local `7.0` branch starting from the main `7.0` branch. `--no-track` keeps Git from trying to push updates in your branch to `upstream/7.0`.
> 3. Push your copy of `7.0` to your remote (`origin`).

With this approach, you can use the same commands listed in the standard development instructions to update the branch or create additional branches off of it; just replace `master` with `7.0`

### Git settings

Since many files were renamed between versions 7 and 8, you may want to try setting `diff.renameLimit` to a high number to make cherry-picks go more smoothly. For example:

```
git config diff.renameLimit 9999
```

(The downside is that this can sometimes contribute to files incorrectly being marked as deleted when they were actually just moved, so you may have to change the setting for different cherry-picks depending on the specific files involved.)

## Cherry-picking

In this example, we'll cherry-pick a commit `ce137b9` from `master` into `7.0`.

(If you try this and have a lot of merge conflicts, it may be easier to stop the cherry-pick and just manually copy the changes, especially if it's a simple change.)

1. Find the SHA1 (short or full version) of the commit you'd like to cherry-pick (example: ce137b9 or ce137b9b03de9bb25ab6e2f86cf1786598122b9b).
2. Check out your copy of `7.0` and ensure it's up to date:
   ```
   git checkout 7.0
   git pull upstream 7.0
   git push origin 7.0
   ```
3. Create a new branch (use any name): `git checkout -b cherry-pick-example`
4. Run the cherry pick command, but don't commit: `git cherry-pick ce137b9 --no-commit`
5. Ensure the change is applied in the correct package, and resolve any merge conflicts (see tips below).
6. Unstage and delete the change files (they'll need to be re-generated).
7. Repeat the `cherry-pick` command with other commits if needed.
8. Run `yarn change` to ensure you have updated change files.
9. Run `git push -u origin` to push the branch

### Merge conflict resolution tips

Changes in the following packages in `master` should be ported to `office-ui-fabric-react` in `7.0`. Imports from these packages should also be updated to reference `office-ui-fabric-react`.

- `@fluentui/react`
- `@fluentui/react-checkbox`
- `@fluentui/react-link`
- `@fluentui/react-slider`
- `@fluentui/react-tabs`
- `@fluentui/react-toggle`

If your change is in a component which was converted to a function component in version 8, you may need to manually re-create the change to the old implementation. (It may be better to manually redo the change instead of cherry-picking.)

## Troubleshooting

1. If you are having issues successfully building the v7 branch, please make sure that you're using Node 14 as that version works best with this library.
