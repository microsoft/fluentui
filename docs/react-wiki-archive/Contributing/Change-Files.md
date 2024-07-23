## Need for change files

When we publish new releases, we need to know what major, minor or patch changes have gone into the build. For that reason, every developer should add a change file with their check-in using the `yarn change` command.

## Writing a change description

Please write a change description such that it is easy for the release manager to understand the impact of the change. When we ship out new releases, we need to build a cumulative set of **Release notes**. Those release notes are a summation of individual changes checked in. Hence, it is important that developers write clear and understandable change descriptions.

## Change annotation

Our builds are qualified using the [Semver](https://semver.org/) notation. Please do spend some time reading the Semver definitions.

### Patch

Any change that is fully backward-compatible and does not have an API change should qualify as a **patch** level change. Most code bug fixes qualify as a **patch**.

### Minor

Minor changes introduce new functionality or APIs, in such a way that using the newly added thing is entirely optional for consumers. The following are examples of **minor** changes:

- Any API change which is backward-compatible, i.e. use of the new API is optional. (Common example: a new optional prop or parameter.)

- Adding new functionality that is backward-compatible.

- Adding a new component.

### Prerelease (special case)

When making changes to a package which is currently using a beta (or other prerelease) version number, you may see only **prerelease** and none as options for `yarn change`, instead of patch or minor.

In this special case, choose **prerelease** for any change that would normally be **patch** or **minor**.

### None

If your change doesn't affect any files that will be published, choose **none**. A common example is test-only changes or some build script changes.

### Major

Any changes that are not backward-compatible are **major** changes.

- Any breaking API changes. i.e. API deletions, mandatory new APIs, API renames.

- Addition or removal of functionality in a non backward-compatible way.

Major changes are **generally not allowed** except when preparing for a major release.
