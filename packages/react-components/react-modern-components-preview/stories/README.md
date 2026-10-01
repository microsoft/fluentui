# @fluentui/react-modern-components-preview-stories

Storybook for the modern component implementations.

The project reuses the existing Fluent UI v9 component stories and rewrites imports to
`@fluentui/react-modern-components-preview` during the monorepo Storybook build. The import
rewrite is temporary test infrastructure and is not part of the published package.

## Usage

Run `yarn nx run react-modern-components-preview-stories:start`.
