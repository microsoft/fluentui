# dependency-mismatch

Fixes the dependency mismatch caused by release of Fluent UI v9.

The generator goes through all projects in the workspace and updates converged dependencies to the version
in the original package.json.

Before publish:

````json
{
  "name": "@fluentui/react-theme",
  "version": "9.0.1"
}

{
  "name": "@fluentui/public-docsite-v9"
  "dependencies": {
    "@fluentui/react-theme": "^9.0.1"
  }
}

After publish (dependency versions mismatching):
```json
{
  "name": "@fluentui/react-theme",
  "version": "9.0.2"
}

{
  "name": "@fluentui/public-docsite-v9",
  "dependencies": {
    "@fluentui/react-theme": "^9.0.1"
  }
}
````

After running generator:

```json
{
  "name": "@fluentui/react-theme",
  "version": "9.0.2"
}

{
  "name": "@fluentui/public-docsite-v9",
  "dependencies": {
    "@fluentui/react-theme": "^9.0.2"
  }
}
```

<!-- toc -->

- [NOTES](#notes)
- [Usage](#usage)
  - [Examples](#examples)
  <!-- tocstop -->

## Usage

```sh
yarn nx g @fluentui/workspace-plugin:dependency-mismatch
```

Show what will be generated without writing to disk:

```sh
yarn nx g @fluentui/workspace-plugin:dependency-mismatch --dry-run
```

### Examples

```sh
yarn nx g @fluentui/workspace-plugin:dependency-mismatch
```
