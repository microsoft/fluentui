# bundle-size-auditor

A CLI utility for getting bundle size information from your package.

> NOTE: this is a legacy tool which was created to replace global "apps/test-bundles" functionality.
> ATM it is used only for `fluentui/react` and `fluentui/react-northstar`
> In future this will be removed and replaced by more robust `bundle-size` CLI tool(monosize).

## CLI

`yarn bundle-size-auditor --help`

## Configuration

Add task to your package.json

```json
{
  "name": "@proj/one",
  "scripts": {
    "bundle-size-auditor": "bundle-size-auditor --report-path='../dist/bundle-size-auditor/one'"
  }
}
```

## How it works

1. creates fixtures for your modules within a package
2. bundles those fixtures via webpack in production mode with `webpack-bundle-analyzer` included to generate needed stats.
3. generates `bundlesize.json` which contains bundle size per module within a package
4. (CI) a `bundlesizes.json` is generated (via `yarn bundle-size-auditor --create-report --report-path dist/bundle-size-auditor`), which contains merged `bundlesize.json` files from all projects within monorepo that use `bundle-size-auditor`
5. (CI) `bundlesizes.json` needs to be uploaded as an artifact on your CI from where it will be processed by some auditing service (we use `lightrail`)

### lightrail

To get meaningful auditing capabilities on CI, generated output needs to be uploaded to some BLOB storage on CI which is processed by `lightrail service` (which has "sizeauditor" capabilities build-in).

Ligtrail service is configured within monorepo root [sizeauditor.json](./sizeauditor.json)

```json
{
  "devopsDropFolderName": "drop",
  "devopsAssemblyArtifactName": "drop"
}
```

Those `drop` values need to be the same as artifact name being uploaded on CI

```yml
- task: PublishBuildArtifacts@1
        displayName: 'Publish Merged Bundle Size information for lightrail processing'
        inputs:
          PathtoPublish: 'dist/bundle-size-auditor/bundlesizes.json'
          ArtifactName: drop
```
