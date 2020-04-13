# @uifabric/migration

**Migration scripts for [Fluent UI React](https://developer.microsoft.com/en-us/fluentui)**
([formerly Office UI Fabric React](https://developer.microsoft.com/en-us/office/blogs/ui-fabric-is-evolving-into-fluent-ui/))

These are a set of scripts to help migrating your code to be compatible with the latest version during an upgrade.

## How to use this?

To update to the latest:
`npx @uifabric/migration`

`npx @uifabric/migration [target version of OUFR, e.g. 7.1.0]`

## What does it do?

`@uifabric/migration` will read your project's `package.json` to determine which migrations to run. By default, it'll run all the migrations up to a specific version. If no version is passed in, the tool will assume you're running all migrations up until the latest.
