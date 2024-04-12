## Making changes

### Creating a branch

Create a branch from your forked repo for your code changes:

\```
git checkout master
git pull upstream master
git checkout -b my-branch-name
\```

We strongly recommend using the CLI as your primary interface with git. GUIs are useful for viewing diffs, creating branches and making quick commits. However they often do not correctly merge and sync working branches with master. Mistakes in this step are time consuming to fix.

That said, some team members use [SourceTree](https://www.sourcetreeapp.com/), [GitHub app](https://desktop.github.com/) or the git integrations available in VS Code.

We don't have an official branch naming policy. Since every contribution happens from your personal fork, there's little risk of naming clashes. However some developers use the following to make their branches easier to find: `user/[alias]/your-fancy-branch-name`, ie `user/jdoe/fix-that-bug`.

### Building

The inner development loop usually involves these steps:

First, `cd` to the root folder of the repo (usually `fluentui`) and run `yarn` to install dependencies and link packages. This can take some time.

```
cd fluentui
yarn
```

Run `yarn start` and select your start up project.

```
@fluentui/public-docsite // starts the public v8 documentation site.
@fluentui/public-docsite-v9 // starts the internal v9 documentation storybook site.
```

Pick a specific component package if you intend to work on a v9 component directly.

Most projects have hot module reloading, so file saves will trigger refreshes.

### Iterating

Make the changes you need, and commit along the way.

```
git status // Shows all changed files
git add . // Stages the changed files
git commit -m "Your brief message." // Makes the commits. You may notice a slight lag during committing as our linters work away.
git push --force// Pushes your changes to your forked branch.
```

### Syncing with master

It is strongly recommended that you rebase your branch onto (rather than merging with) master.

```
git checkout master // Switches to master
git pull upstream master // Syncs your local master with the latest version of master at the origin
git checkout your-fancy-branch // Switches to your branch
git rebase -i master // Tacks your commits onto the end of master. Force is necessary since rebase changes history.
```

Resolve any conflicts in your editor.

`git push upstream --force` // Pushes your changes to your forked branch. Include `upstream` if you have an open pull request, otherwise do not include it.

Creating _draft_ pull requests is often an easy way to keep track of your work without it being actively reviewed by others.

In other cases, such as before checking in or running tests, you may need to run a full build (or build up to a certain package):

- `yarn lage build --since master` - build everything. You shouldn't need to do this for regular work flow.
- `yarn buildto package-name` - build up to a package. It is good to run this weekly, or anytim you start a new project off master.
  - `yarn buildto @fluentui/react`

### Making a pull request

Make sure all your changes are committed, and run `yarn nx run @fluentui/react-components:build` or `yarn buildto @fluentui/react-components` for changes to the v9 components. This will compare your changes and detect if the publicly facing API has changed, and update the right docs accordingly. Commit this change.

If your changes make any changes or additions to the DOM, you may need to run `yarn nx run @fluentui/<package>:test -u` or `yarn workspace @fluentui/<package> test --updateSnapshot`. Check these updates in.

Before creating a pull request, be sure to run `yarn change` and provide a high-level description of your change, which will be used in the release notes. We follow [semantic versioning](https://semver.org/), so use the guide when selecting a change type:

- Major - Don't do these without expressed agreement from the team. This is a very stable repo. This option is usually disabled.
- Minor - Adding new API surface area that is backwards compatible and does not dramatically change the intent of an API.
- Patch - No change in API surface area.

After choosing a change type, the description should follow the [semantic commit message format](https://gist.github.com/joshbuchea/6f47e86d2510bce28f8e7f42ae84c716), and be prepended by one of the following: `feat:`, `fix:`, `chore:`, `docs:`, or `refactor:`. Use [this guide](https://www.conventionalcommits.org/en/v1.0.0/#summary) for more guidance on how to write your change log files.

When your change is ready, [create a pull request](https://github.com/microsoft/fluentui/pulls) from your branch to the `master` branch in `microsoft/fluentui`.

Common checklist for PR's

- Descriptive title: "feat: Adding 'multiple' prop to Nav"
- Brief description of the improvement you're making. You should summarize the issue you are addressing. Assume the PR is the reviewer's starting point and they should only have to dive into the issue for very specific details.
- Link to the relevant issue.
- Visual aid for changes to give more context. Before and After clips help a lot.
- Open questions - Point reviewers to places in your code you're looking for specific feedback on.
- How to test - Briefly explain how a reviewer can test your code, and what they should focus on.
- Reviewers will be automatically added based on the location of the changes in the code base.

If you're using an internal Microsoft linked account, feel free to squash that big green button. 🎉
If you're not using a Microsoft linked account, someone from the team will have to merge it for you. Thanks for the contribution! 🙏
