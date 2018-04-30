
## Need for Change files

When we publish new releases, we need to know what major, minor or patch changes have gone into the build. For that reason, every developer should add a change file with their checkin using the `npm run change` command.

## Writing a change description

Please write a change description such that it is easy for the release manager to understand the impact of the change. When we ship out new releases, we need to build a cumulative set of **Release notes**. Those release notes are a summation of individual changes checked in. Hence, it is important that developers write clear and understandable change descriptions.

## Change annotation

Our builds are qualified using the [Semver](https://semver.org/) notation. Please do spend some time reading the Semver defintions.

### Patch

Any change that is fully backward compatible and does not have an API change should qualify as a **patch** level change. Most code bug fixes qualify as a **patch**.

### Minor

Following changes should require a **minor** build number change

- Any API change should qualify as at least as a **minor** change. When you add a new API in a backward compatible manner. i.e. Use of the new API is optional.

- When you add new functionality that is backward compatible.

- A new component should qualify as a **minor** change because it is fully backward compatible. In case, you made breaking changes to other generic APIs that are used by developers and can break them.

### Major

Any changes that are not backward compatible should be qualified as **major** changes.

- Any breaking API changes. i.e. API deletions, mandatory new APIs, API renames.

- Addition or removal of functionality in a non backward compatible way.