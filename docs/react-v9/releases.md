# Releases

## Stable

Please refer to ADO wiki

## Experimental

Experimental releases allow developers to publish feature branches to NPM for testing and validation with partners before merging into `master`. These releases are published under the `experimental` NPM tag and use a unique versioning scheme to avoid conflicts with official releases.

### Process

#### 1. Create an Experimental Branch

To ensure security and consistency, experimental releases must be triggered from branches following the `experimental/<feature-name>` pattern.

Use the **[Create Experimental Branch](https://github.com/microsoft/fluentui/actions/workflows/create-experimental-branch.yml)** GitHub Action:

- Go to the "Actions" tab in GitHub.
- Select the "Create Experimental Branch" workflow.
- Click "Run workflow".
- Enter the `feature-name` (must be in `dash-case`).

This will create a new branch from the current `master` tip.

#### 2. Trigger the Release Pipeline

Once you have pushed your changes to the experimental branch:

- Go to Azure DevOps and find the `v9_experimental` pipeline.
- Manually trigger a build, selecting your `experimental/<feature-name>` branch.
- Set the `dryRun` parameter to `false` if you want to publish to NPM.

### Versioning Scheme

Experimental versions follow this pattern:
`<base-version>-experimental.<feature-name>.<date>-<hash>`

- `<base-version>`: Current version of `@fluentui/react-components` (e.g., `9.72.9`).
- `<feature-name>`: The name provided when creating the branch.
- `<date>`: YYYYMMDD format.
- `<hash>`: Short commit hash.

Example: `9.72.9-experimental.my-feature.20240520-a1b2c3d`

### Usage

To install an experimental version, use the `experimental` tag or the specific version:

```bash
yarn add @fluentui/react-components@experimental
# OR
yarn add @fluentui/react-components@9.72.9-experimental.my-feature.20240520-a1b2c3d
```

> [!CAUTION]
> Experimental releases are not intended for production use.
>
> - They may/will contain BREAKING CHANGES and may be deleted from NPM or superseded at any time.
