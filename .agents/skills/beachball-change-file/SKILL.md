---
description: How to create a Beachball change file. ONLY use this skill when the user asks to generate change files, before pushing a branch, or before creating a PR.
license: MIT
metadata:
  github-path: skills/beachball-change-file
  github-ref: refs/heads/main
  github-repo: https://github.com/microsoft/beachball
  github-tree-sha: 5198ce6d081a41c46a6a1bbf211418972596ef33
  source: https://github.com/microsoft/beachball/blob/main/skills/beachball-change-file/SKILL.md
  version: 1.0.6
name: beachball-change-file
---

[Beachball](https://microsoft.github.io/beachball/) is a tool used for managing versioning and changelogs for JS/TS codebases. Every pull request must include a Beachball change file. Change files include the list of packages with public-facing changes in the branch, with the description and semver change type for each package. After the PR is checked in and a release is run, the change files are used to determine version bumps and update changelogs.

Beachball normally uses a CLI with an interactive prompt to create change files, but they can also be created manually using the standardized JSON format detailed below.

## Prerequisites

- Determine the root directory: this is almost always the git root, but the user might specify a different folder. (The root usually contains `beachball.config.*` or `.beachballrc.*` or has a `"beachball"` key in `package.json`.)
- Determine the package manager for the repo (`npm`, `yarn`, `pnpm`). The example commands below assume `yarn`, but substitute the appropriate command runner syntax for a different package manager.
- Check the root `package.json` `scripts` for scripts that run `beachball change` and `beachball check`.
  - The examples below assume `scripts` called `change` and `checkchange` respectively, but substitute the appropriate script names if found.
  - Using `scripts` if defined is preferred since they may add extra arguments, but it's possible to run the commands directly: `yarn beachball change` and `yarn beachball check` (substituting appropriate command runner)
- Use `beachball config get` to check the following settings (note: `beachball config get` only exists in versions `>= 2.64.0`)
  - `yarn beachball config get changeDir`: where to put the change files
  - `yarn beachball config get branch`: target branch name
  - `yarn beachball config get groupChanges`: whether grouped change files are enabled (true/false/undefined)

## Creating and validating a change file

Usually, an AI agent should create a change file manually following the standardized format detailed below.

### 1. Validate repo state

Beachball only considers staged and committed files, so you should check for unstaged or untracked changes before proceeding:

1. Get file paths with unstaged changes (`git ls-files -m`) and untracked changes (`git ls-files -o --exclude-standard`)
2. If there are any unstaged or untracked changes, ask the user whether they would like to stage all files or continue without staging. If they choose to stage, run `git add .` before proceeding.

### 2. Get changed packages

Run `yarn checkchange --verbose` to get the list of changed packages and files considered by `beachball`:

- The list of changed packages is under "Found changes in the following packages" -- you must ONLY include these packages in the change file! (beachball has various settings to ignore packages or files)
- The list of changed files is under "changed files in current branch". IGNORE any files with `~~` strikethrough formatting.

DO NOT manually check for existing change files.

### 3. Create the change file(s)

Change files are located under `<changeDir>`. There are two possible structures for change files, determined by the `groupChanges` setting.

When checking diffs to generate change files, DO NOT merge with the target branch; just use the local merge-base.

#### Case 1: Non-grouped format (`groupChanges` is `false` or unset)

If `groupChanges` is `false` or unset, you should create a separate change file for each package.

For each changed package **as listed by beachball**:

1. Generate a random GUID: `node -e "console.log(crypto.randomUUID())"`
2. Create a change file under `<changeDir>/<packageName>-<guid>.json` with the following format. See [Change entry values](#change-entry-values) below for the proper values of each field.

```json
{
  "packageName": "",
  "type": "",
  "dependentChangeType": "",
  "comment": "",
  "email": ""
}
```

#### Case 2: Grouped format (`groupChanges: true`)

If `groupChanges` is `true`, you should create a single change file.

1. Generate a random GUID: `node -e "console.log(crypto.randomUUID())"`
2. Create a single change file under `<changeDir>/change-<guid>.json` with the following format. The `changes` array should have an entry for each changed package **as listed by beachball**. See [Change entry values](#change-entry-values) below for the proper values of each field.

```json
{
  "changes": [
    {
      "packageName": "",
      "type": "",
      "dependentChangeType": "",
      "comment": "",
      "email": ""
    }
  ]
}
```

### 4. Validate the change file(s)

Run `git add <changeDir>`, then re-run `yarn checkchange` to verify.

## Change entry values

Each package's entry has the following values:

- `packageName`: The name of the changed package, e.g. `just-task`
- `type`: The semantic versioning change type for the package. See [Determining a package's change type](#determining-a-packages-change-type) below.
- `dependentChangeType`: Change type for packages that depend on this package. If `type` is `"none"`, this should be `"none"`. Otherwise, this should be `"patch"` (beachball internally handles this for the special case of prerelease packages).
- `comment` (`--message` CLI arg): A concise description of the changes made to the package. Tips:
  - This will go in the changelog, so it should focus on user-facing changes (especially any API changes) rather than implementation details.
  - Markdown formatting is allowed, so any references to names from code should be wrapped with backticks.
- `email`: User's email from `git config user.email`, or `"email not defined"` if not available. Do NOT invent an email.

### Determining a package's change type

The `type` field is the semantic versioning change type for the package, determined based on the diff content of changed files in that package. There are different options depending on whether the package's current version contains a prerelease suffix or not, and the `disallowedChangeTypes` setting may modify which change types are allowed.

If you're still uncertain about the change type after following the instructions below, ask the user to choose.

For each package, start by checking:

- The current `version` in `package.json`
- `disallowedChangeTypes` for the specific package: `yarn beachball config get disallowedChangeTypes --package <packageName>`
- Whether the package has a file `<package path>/etc/*.api.md`. If so, the diff of this file will show whether any public API signatures changed.

#### Case 1: Version is 1.0.0 or greater and NOT prerelease

If the package's current version is 1.0.0 or greater and does NOT have a prerelease suffix, the typical options are `<patch|minor|major|none>` (but you MUST respect `disallowedChangeTypes`):

- `"patch"`: Bug fixes or other changes that don't impact exported API signatures.
- `"minor"`: New exported APIs, non-breaking signature changes to exported APIs, or more significant changes to internal logic. (If the package has a `<package path>/etc/*.api.md` file, checking its diff is the easiest way to see exported API changes.)
- `"major"`: Breaking changes to exported APIs (removals or breaking signature changes), critical dependency updates, or behavior changes that might be breaking for the consumer. You MUST confirm with the user before choosing `"major"`.
- `"none"`: None of the changes will impact consumers of the package (e.g. the changes are only to non-exported test-specific files or documentation). If you're not certain, prefer `"patch"`.
- There are additional options `prerelease|premajor|preminor|prepatch`, but you should only use one of these if explicitly requested by the user.

#### Case 2: Version is 0.x.y and NOT prerelease

If the package's major version is 0 and does NOT have a prerelease suffix, this is similar to case 1. However, version 0 packages follow different conventions for semantic versioning (you MUST still respect `disallowedChangeTypes`):

- Use `"minor"` for breaking changes (do NOT use `"major"` unless specifically requested)
- Use `"patch"` for any other changes that impact consumers of the package
- Use `"none"` in the same circumstances as case 1

#### Case 3: Version IS prerelease

ONLY if the package's current version includes a prerelease suffix, the typical options are `<prerelease|none>` (but you MUST respect `disallowedChangeTypes`):

- `"prerelease"`: Any changes that impact consumers of the package
- `"none"`: None of the changes will impact consumers of the package (e.g. the changes are only to non-exported test-specific files or documentation). If you're not certain, prefer `"prerelease"`.
- There are additional options `premajor|preminor|prepatch`, but you should only use one of these if explicitly requested by the user or all other change types are disallowed.
