# @fluentui/workspace-plugin

nx private monorepo plugin which contains:

- generators
- executors
- migrations
- other things...

## Usage

Run following to get all plugin functionality:

`yarn nx list @fluentui/workspace-plugin`

## CSS assets in v9 builds

The `build` executor automatically copies `src/**/*.css`, preserving source
subdirectories, beside each configured JavaScript module output for projects
tagged `vNext` whose package metadata declares CSS side effects
(`"sideEffects": ["**/*.css"]`, a pattern ending in `.css`, or `true`).
Use the CSS-specific array entry to retain styles without disabling JavaScript
tree shaking; preserve any existing side-effect entries.

No per-package `project.json` asset or output configuration is needed for CSS
Modules. The executor uses the already-read package metadata and skips CSS
globbing for other projects. Explicit `assets` remain supported and are copied
in addition to these automatic CSS assets. CSS follows `moduleOutput` (including
AMD or custom output directories) even when `outputPathRoot` differs from the
project root. Keep custom module directories in the target's declared outputs
for Nx caching.
