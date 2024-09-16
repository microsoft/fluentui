This document describes how to set up your development environment and contribute changes to the Fluent UI project. This document assumes basic working knowledge with Git and related tools. We are providing instructions specific to this project.

- [Basic setup](#basic-setup)
  - [Development environment](#development-environment)
  - [Building (without contributing)](#building-without-contributing)
- [Contributing changes](#contributing-changes)
  - [Creating your own fork](#creating-your-own-fork)
  - [Cloning your fork and setting the upstream remote](#cloning-your-fork-and-setting-the-upstream-remote)
  - [Git configuration](#git-configuration)
  - [Making changes](#making-changes)
  - [Updating from master](#updating-from-master)

# Basic setup

## Development environment

- If you don't have a **GitHub account**, [create one](https://github.com/join)
  - Microsoft employees: please [link your GitHub account](https://repos.opensource.microsoft.com) (new or existing) to your MS account
- Install **[Node.js LTS](https://nodejs.org/en/)** (14 or 16 as of writing)
  - Optional: If you're developing across multiple repos with varying Node version requirements, you may want to use `nvm` to install and manage Node versions. [More details here.](nvm-setup)
- Install **[Yarn 1](https://classic.yarnpkg.com/) (we do not support Yarn 2)**
  - easiest way: run `npm install -g yarn@1`
- Install **[Git](https://git-scm.com/)**
- Install **[Visual Studio Code](https://code.visualstudio.com/)** or any other editor of your preference
- Optional: If you'd like a GUI for Git, some team members use **[SourceTree](https://www.atlassian.com/software/sourcetree)**

### Verify your environment

Open a command line and run:

- `node -v`: Should be `14.x.x` or `16.x.x` (where "x" is some number). Newer versions may not work.
- `npm -v`: Should be >= 6. If not, run `npm install -g npm`.
- `yarn -v`: Should be >= 1.15.0 but **less than 2**. If not, run `npm install -g yarn@1`.
- `git --version` to ensure you have Git installed.
- If using VS Code, go to a folder and run `code .` to open the folder in VS Code. If it doesn't work, open VS Code and press `F1` or `ctrl+shift+P` (`cmd+shift+P`), type `path`, and select the `Install 'code' command in PATH` option.

## Building (without contributing)

If you do not wish to contribute changes, for `@fluentui/react` version 8 please follow the instructions on the [`@fluentui/react` README](https://github.com/microsoft/fluentui/blob/master/packages/react/README.md#building-the-repo) page for how to clone and build the main repo. Else, keep reading.

# Contributing changes

## Creating your own fork

To contribute changes, start by creating your own fork of the repository. (We develop in forks because there are lots of developers in this project, and creating lots of branches on the main repository wouldn't scale.)

1. Ensure you are logged in to GitHub.
2. Navigate to the **[microsoft/fluentui](https://github.com/microsoft/fluentui)** repository.
3. Click on the **Fork** button at the top right corner of the page.
4. Create the fork under your account. Your GitHub profile should now show **fluentui** as one of your repositories.

## Cloning your fork and setting the upstream remote

(For demo purposes, let's assume your username is **johndoe**.)

Change to an appropriate directory _(the path should not include spaces)_ and clone your fork. Notice how your GitHub username is in the repository location.

```
git clone https://github.com/johndoe/fluentui.git
cd fluentui
```

Now set your `upstream` remote to the primary **fluentui** repository:

```
git remote add upstream https://github.com/microsoft/fluentui.git
```

To check that this is set up correctly, you can run `git remote -v`:

```
git remote -v

    origin  https://github.com/johndoe/fluentui.git (fetch)
    origin  https://github.com/johndoe/fluentui.git (push)
    upstream        https://github.com/microsoft/fluentui.git (fetch)
    upstream        https://github.com/microsoft/fluentui.git (push)
```

## Git configuration

We recommend setting up the following Git configuration. In the command line, run:

- `git config --global user.name "Your Name"` - set your name to appear in commits
- `git config --global user.email "you@example.com"` - set your email to appear in commits
  - If a Microsoft employee, we prefer that you use your Microsoft email
  - You can also set this per-repo by omitting the `--global` flag
- Optional: `git config --global push.default current` - when running `git push`, only include the current branch by default
- Optional: `git config --global core.editor "code --wait"` - to set VS Code as your Git commit editor (assumes you have VS Code in your `PATH`)

## Making changes

For a more detailed walkthrough of this process, see the [Development Workflow](Development-Workflow) page.

### Creating a branch

Create a branch from your fork for your code changes:

```
git checkout -b my-branch-name
```

If you prefer not to use Git on the command line, we recommend using [SourceTree](https://www.sourcetreeapp.com/) for working in your repo. (VS Code also has good Git integration, including viewing and staging changed files.)

### Building

The inner development loop usually involves these steps:

First, `cd` to the root folder of the repo (usually `fluentui`) and run `yarn` to install dependencies and link packages.

```
cd fluentui
yarn
```

At this point, for basic component development, you should be able to just run (without building):

```
yarn start
```

Choose the appropriate package to demo (usually `@fluentui/react` or `@fluentui/react-northstar`). Then as you make changes to component code and save files, the demo app should update to reflect your changes.

In other cases, such as before checking in or running tests, you may need to run a full build (or build up to a certain package):

- `yarn build` - build everything.
- `yarn build --to package-name` - build up to a package.
  - `yarn build --to @fluentui/react`

You can also `cd` to any package under `packages/*` and run `yarn build` to build individual things, though keep in mind that this may require dependencies to be built first (using `build --to`).

For more details:

- [Full development workflow walkthrough](Development-Workflow)
- [List of build commands](Build-Commands)

### Folder structure

The repo has a few important top-level folders:

`/scripts/` - Contains shared build tools
`/packages/` - Contains all shared packages
`/packages/fluentui/` - Currently contains packages specific to `@fluentui/react-northstar`
`/apps/` - Contains app projects which aren't intended to be published packages (website, test apps, etc)

_Note that in the future, we'll be doing housecleaning under `/packages/` to separate frameworks (React, web components) and make things easier to find._

For more details, see the [Repo structure page](Repo-structure).

### Making a pull request

Before creating a pull request, be sure to run `yarn change` and provide a high-level description of your change, which will be used in the release notes. See the [change files page](Change-Files) for more details.

When your change is ready, [create a pull request](https://github.com/microsoft/fluentui/pulls) from your branch to the `master` branch in `microsoft/fluentui`.

Members of the Fluent UI core team will help merge your changes.

## Updating from master

### Merging upstream master into your fork master

From time to time, your fork will get out of sync with the `master` branch from `microsoft/fluentui` (your `upstream` remote). Use the following commands to get the master branch of your fork up up to date.

```
git checkout master
git pull upstream master
git push
```

### Merging upstream master into your current branch

Use these commands instead if you would like to update your _current_ branch in your fork from `microsoft/fluentui`'s `master` branch.

```
git pull upstream master
git push
```
