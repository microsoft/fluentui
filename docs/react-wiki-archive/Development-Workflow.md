Please use the following steps to contribute bug fixes or other changes.

- [Set up your development environment](#set-up-your-development-environment)

- Code and test the change.

  - [Update your master branch](#update-your-master-branch)
  - [Open the repo](#open-the-repo)
  - [Create a branch](#create-a-branch)
  - [Clean up the repo](#optional-clean-up-the-repo)
  - [Install and build](#install-and-build)
  - [Make the change](#make-the-change)
  - [Verify your changes](#verify-your-changes) (running and debugging unit tests)
  - [Commit your changes](#commit-your-changes)
  - [Create change files](#create-change-files)
  - [Push changes](#push-changes)

- [Create a pull request.](#creating-a-pull-request)

- Make sure the build and all the tests are passing.

## Set up your development environment

[Follow the steps on the Setup page.](Setup) This includes instructions for installing development tools, setting up your own fork, and setting up your local clone.

If you're developing against a previous major version branch, it's recommended to set up a separate local copy of the repo for that branch.

- For `7.0`, see [Contributing to the `7.0` branch](Contributing-to-the-7.0-branch)
- For `6.0` or `5.0`, see [Legacy Branches](Legacy-Branches)

### Optional: Extra VS Code setup

These are some VS Code extensions and settings that can be helpful for Fluent UI React development.

Some of the setup steps including updating VS Code settings. To open the settings page, press `ctrl+shift+P` (`cmd+shift+P`) and type **user settings**.

- Prettier
  - [Install extension](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
  - It's recommended to enable the "Prettier: Require Config" setting (in VS Code settings) to prevent Prettier from enforcing obnoxious defaults (such as line length 80) everywhere.
- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)

## Update your master branch

Skip this if you just cloned the repo. Otherwise, run the following to ensure that your branch is up to date. (Replace `master` with `7.0` or `6.0` if applicable.)

**Note: these steps assume you have your `origin` and `upstream` remotes configured as described on the [setup page](Setup#setting-the-upstream-remote).**

```
git checkout master
git pull upstream master
git push
```

## Detailed instructions for making a change

If this is your first change, below are some more detailed steps for getting your branch set up and submitting a PR. You can either do this with the command prompt or with a combination of the command prompt and Sourcetree or VS Code.

Some of steps below include instructions specific to VS Code. It's fine to use another editor/IDE if you prefer, but we're providing instructions for VS Code because its automatic TypeScript integration and other features make it very convenient for Fluent UI React development.

### Open the repo

To start, open the root folder of the repo in VS Code. You can do this by either `cd`ing to the folder and running `code .`, or opening VS Code and going to File > Open Folder. (You can also use another IDE or editor if you prefer.)

To open files in VS Code, use the navigation sidebar or press `ctrl+P` (Mac: `cmd+P`) and type part of the filename.

VS Code also has a built-in terminal. Press `` ctrl+`  `` (Windows or Mac) to open it. (Using the built-in terminal isn't required, just convenient.)

### Create a branch

It's recommended to start with a fresh branch for each bug or task. If you have any lingering changes in your current branch that you want to save, go ahead and commit them. If you are just beginning, then you are good to go.

If you're familiar with Git/GitHub and have a preferred way to create branches, go ahead and use that. Otherwise, choose one of the options below.

#### Option 1: Command line

1. Open a command prompt and `cd` to the root of your local copy of the repository
2. Follow the instructions under ["Update your master branch"](#update-your-master-branch)
3. Choose a name for your branch and run `git checkout -b your-branch-name` (in the name, don't use spaces, and limit special characters to `-` `_` `/`)

#### Option 2: Sourcetree

1. Open your local copy of the repository in Sourcetree
2. In the sidebar under **Branches**, double-click the **master** branch to check it out.
3. Click the **Branch** button in the top bar
4. Choose to create a new branch, and give it a name. (Don't use spaces, and limit special characters to `-` `_` `/`.) Click the button to create the branch.

### Optional: Clean up the repo

If you haven't made any Fluent UI React changes in awhile or you're switching between major release branches (`master`/`7.0`/`6.0`/`5.0`), it's recommended to use the `scrub` script to clean up the repo. (This shouldn't be needed if you've been making Fluent UI React changes regularly and haven't switched major release branches.)

`scrub` permanently removes all node_modules, build output, and other untracked files or uncommitted changes, which reduces the possibility of strange install/build issues.

_**Commit or stash any changes you want to keep**_, then run `yarn scrub` (in `master`) or `npm run scrub` (in `6.0`).

### Install and build

**Every time you update from master, you should install dependencies and do a basic build** (to pick up any changes others made).

If working in a branch based on `master` or `7.0`:

1. Run `yarn` to install dependencies
2. Depending on which package(s) you're working in and the type of change, you may need to run a build. You can either do `yarn build` to build everything, `yarn build:min` to build common packages, or `yarn buildto your-package-name`.

If working on a branch based on `6.0`:

1. Run `npm install` to install dependencies and build up to office-ui-fabric-react
2. The next step depends on where your change will be:
   - office-ui-fabric-react (or a package it depends on): all done!
   - Some other package such as experiments or charting: `npm run buildfast -- --to your-package-name`

### Make the change

Now it's time to start making your change. In most cases, if your change is in a single package, the easiest way to build and verify your change is with the local demo app.

If working in a branch based on `master` or `7.0`:

1. Run `yarn start` (and choose your package name) to start the local demo app, backed by [Storybook](https://storybook.js.org/)
2. When you make changes and save the file, it will re-compile

If working on a branch based on `6.0`:

1. `cd` to the folder for your package (optional for changes in the office-ui-fabric-react package)
2. Run `npm start` to start the local demo app, backed by `webpack-dev-server`
3. When you make changes and save the file, it will re-compile

Alternatively, if you prefer not to re-compile on change, you can run `yarn build` from the package folder.

If you're making changes across multiple packages, you can either:

- `yarn start` and choose the "leaf" package (the one consuming the other packages) and `yarn build` in the other packages, OR
- From the root, `yarn buildto leaf-package-name`

### Verify your changes

#### Run package unit tests

To verify your changes, start by running unit tests in the package where your change is. **Start by `cd`ing to the package's folder**, then choose one of the following:

- To run tests once: `yarn test` (in 6: `npm run build`)
- To start the tests and re-run when a file changes: `yarn start-test` (in 6: `npm run start-test`)
- (`6.0` only) To run tests once, without a full package build: `npm run just jest`
  - Note: this should still pick up the latest changes to TS files

Some of the tests take "snapshots" of the rendered controls. If you get a snapshot failure, and the change is expected, run `yarn update-snapshots` (in 6: `npm run update-snapshots`) and commit the changed files.

If you get an error about the API file being out of date, run `yarn update-api` from that package's folder.

#### Debugging unit tests

If you're having a lot of trouble with a test, or are writing a new test and would like to run a continuous loop as you develop (with just that test), the easiest way to do this is using VS Code.

1. Open the root folder of the repo in VS Code
2. Click the **Debug** button in the sidebar
3. In the dropdown at the top of the debug panel, choose **Debug current open test**
4. Open your test file
5. Press the **green play button** in the panel (or press **F5**)

The test will re-run as you make and save changes. You can also set breakpoints and debug into the test or component code.

#### Run all tests and lint

Once the tests in the package you've modified are passing, it's time to run a full build.

Go to the root folder of the repo and run the following, then address any failures that come up.

- For `master` or `7.0`: run `yarn buildci` to run tests and lint
  - You can optionally follow this with `yarn bundle` but this is less likely to fail in most scenarios.
  - If any API files (`*.api.md`) change, you should check them in.
- For `6.0`: run `npm run buildfast`
  - If you get a message in a package about the API file being out of date, `cd` to that package and run `yarn update-api`.

### Commit your changes

Once you've made your change, or a subset of the change, you need to **commit** it to Git. A commit is a list of changes and a message describing them, plus other metadata. (Other terminology: In Git, files must be **staged** before committing, which just means telling Git which changes you'd like to commit now or leave for later.)

You can commit multiple times until you are ready to make a pull request. You should keep the message short since it will not be used in the release notes and is just for keeping track of the multiple commits in one pull request.

To commit files, choose one of the options below. (As usual, if you already have a different way you like to commit changes, that's fine too.)

#### Option 1: VS Code

1. Open the root folder of the repo in VS Code
2. Click the **Source Control** button in the sidebar. This will show a list of changed files.
3. Click the **+** next to files you'd like to stage (or the **+** at the top to stage all files)
4. In the text box at the top, type your commit message and then press `ctrl+enter` (Windows) or `cmd+enter` (Mac)

#### Option 2: Git command line

1. `cd` to the root folder of the repo
2. Run `git status` to see the list of changed files
3. If you'd like to commit all the files, run `git add -A`. Otherwise, run `git add path/to/file-or-folder` to stage files individually.
4. Run `git commit -m "your message here"`

#### Option 3: Sourcetree

In Sourcetree, click on commit in the top left. This won't actually do anything to your files, it will just change to show the commit UI. In the bottom container, stage all of the files you want to submit by selecting them and clicking "Stage". Add a short message in the textbox at the bottom on what is included in your change. This will not show as your entire submission text, just for this commit.

### Create change files

Fluent UI React uses "change files" to figure out what type of release to make based on your changes (none, patch, minor, major) and generate a list of changes included in each release.

From the root of the repo, run `yarn change` (in 6: `npm run change`). This will prompt you to write a change description for each package.

The change description will be used in the release notes, so it should include the name of the component (or utility etc) that you modified and a high-level summary of what you did.

See the [Change Files](Change-Files) page for more information about change files, including how to choose the appropriate change type.

### Push changes

Before making a pull request, you must push your branch to your fork on GitHub. Choose one of the methods below (or some other method you prefer).

**Note: these steps assume you have your `origin` and `upstream` remotes configured as described on the [setup page](Setup#setting-the-upstream-remote).**

#### Option 1: VS Code

Towards the bottom left corner of the window, look for an icon showing a cloud with an up arrow. Click that, and choose **origin**. (Alternatively, press `ctrl+P` or `cmd+P` and type **Git: Push**.)

If you need to push more changes later, you can use the same button, but it will have a sync icon (circles/arrows). Click that to push your new changes, as well as pulling down any changes made on the remote copy of the branch. (Alternatively, press `ctrl+P` or `cmd+P` and type **Git: Sync**.)

#### Option 2: Git command line

Run `git push -u origin` to push your branch to your fork (`origin`).

To push additional changes later, you can just run `git push`.

#### Option 3: Sourcetree

In Sourcetree click Push.

## Creating a pull request

Go to the [main Fluent UI React repo on GitHub](https://github.com/microsoft/fluentui). You should see a yellow bar at the top with your branch name and a button that says **Compare & Pull Request**. Click that button.

> **NOTE:** If your change is based on the `7.0` or `6.0` branch, be sure to select that branch for the **base:** option instead of `master`. Otherwise your PR will have conflicts and lots of extra changes.

Fill out the fields with full description of your change, areas to test, and make sure you fill out the checklist when you have completed each item (add an `x` in between the `[]` at the top and make sure there are no spaces). If you are modifying the UI, this is also a good location to add screenshots of the before and after.

Click **Create Pull Request**, then watch it go through the process of running build checks and wait for reviews.

### Addressing check/build failures

The most common check failure is the PR build (**Fluent UI React - PR and CI** or similar). To see why the build (or another step) failed:

1. Scroll down to the bottom of the PR page and click **Details** next to the check name.
2. On the next page, click the text **1 errors / 0 warnings** (or similar) or **View more details on Azure Pipelines**.
3. Click the name of the build step that failed to see the log
4. Scroll to the bottom of the log (usually) to see the error

The most common errors are:

- Missing change files: run `yarn change` and push again
- Missing snapshot updates: if the updates seem reasonable, run `yarn update-snapshots`, commit, and push. Run this command from the root to update all snapshots, or within a package to update only that package's snapshots.
- _(Now applicable to `6.0` only--`7.0` and `master` handle this automatically)_ Missing API file updates: if the updates seem reasonable, run `yarn update-api` from the relevant package, commit, and push

### Pull request reviews

Someone will review your change before the change is allowed to be merged in. They may ask questions for more information or ask you to change things. Be sure to respond to their comments and push additional changes to the branch if they ask you to modify things before they sign off. If no one has looked at it in a few days, you can ping whomever is on shield and ask them to take a look.
