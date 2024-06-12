This document describes how to set up your development environment and contribute changes to the Fluent UI project. It assumes basic working knowledge with Git and related tools. A typical developer should budget 2 hours from fresh install to their first successful build completion.

# Basic setup

### Install dev tools

- If you don't have a **GitHub account**, [create one](https://github.com/join)
  - Microsoft employees: please [link your GitHub account](https://repos.opensource.microsoft.com) (new or existing) to your MS account
- Install **[Node.js LTS](https://nodejs.org/en/)** (20 as of writing)
  - Optional: If you're developing across multiple repos with varying Node version requirements, you may want to use `nvm` to install and manage Node versions.
- Install **[Yarn v1](https://classic.yarnpkg.com/) (we do not use Yarn >=v2)**
  - easiest way: run `npm install -g yarn@1`
- Install **[Git](https://git-scm.com/)**
- Install **[Visual Studio Code](https://code.visualstudio.com/)** or any other editor of your preference
- Install **[Nx Console extension for Visual Studio](https://marketplace.visualstudio.com/items?itemName=nrwl.angular-console)**
- Optional: If you'd like a GUI for Git, some team members use the one built into VSCode, **[GitHub app](https://desktop.github.com/)** or **[SourceTree](https://www.atlassian.com/software/sourcetree)**
- Optional: **[Snipping tool](https://apps.microsoft.com/detail/9mz95kl8mr0l?launch=true&mode=full&hl=en-us&gl=us&ocid=bingwebsearch)** for screen grabs and recordings
- Optional: **[Accessibility insight for web](https://accessibilityinsights.io/)**
- Optional: **[Node Version Manager](https://github.com/nvm-sh/nvm)**
- Optional: **[CSpell VS Code Extension](https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker)**
- Optional: **[Improve build times: WSL for Windows](https://learn.microsoft.com/en-us/windows/dev-environment/javascript/nodejs-on-wsl)**

### Verify your environment

Open a command line and run:

- `node -v`: Should be `^20.x.x`.
- `yarn -v`: Should be >= 1.15.0 but **less than 2**. If not, run `npm install -g yarn@1`.
- `git --version` to ensure you have Git installed.
- If using VS Code, go to a folder and run `code .` to open the folder in VS Code. If it doesn't work, open VS Code and press `F1` or `ctrl+shift+P` (`cmd+shift+P`), type `path`, and select the `Install 'code' command in PATH` option.

## Building (without contributing)

If you do not wish to contribute changes, for `@fluentui/react` version 8 please follow the instructions on the [`@fluentui/react` README](https://github.com/microsoft/fluentui/blob/master/packages/react/README.md#building-the-repo) page for how to clone and build the main repo. Else, keep reading.

Run `yarn`. This may take a while initially.

Run `yarn start` and select your start up project.

- @fluentui/public-docsite starts the public v8 documentation site.
- @fluentui/public-docsite-v9 starts the public v9 documentation storybook site.

# Configuration for contribution

## Creating your own fork

We use forks forks for development, which means you need to setup a fork. [Read about that here](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/fork-a-repo)

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

- `git config push.autoSetupRemote true` - Sets your local branch to push to your fork
- `git config --global user.name "Your Name"` - set your name to appear in commits
- `git config --global user.email "you@example.com"` - set your email to appear in commits
  - If a Microsoft employee, we prefer that you use your Microsoft email
  - You can also set this per-repo by omitting the `--global` flag
- Optional: `git config --global push.default current` - when running `git push`, only include the current branch by default
- Optional: `git config --global core.editor "code --wait"` - to set VS Code as your Git commit editor (assumes you have VS Code in your `PATH`)
