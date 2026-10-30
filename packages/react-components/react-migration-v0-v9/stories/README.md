# @fluentui/react-migration-v0-v9-stories

Storybook stories for packages/react-components/react-migration-v0-v9

## Usage

To include within storybook specify stories globs:

\`\`\`js
module.exports = {
stories: ['../packages/react-components/react-migration-v0-v9/stories/src/**/*.stories.mdx', '../packages/react-components/react-migration-v0-v9/stories/src/**/index.stories.@(ts|tsx)'],
}
\`\`\`

## API

no public API available

## Font icon checks

```bash
yarn nx run react-migration-v0-v9-stories:storybook --port 6007
FLUENTUI_ICON_VARIANT=fonts yarn nx run react-migration-v0-v9-stories:storybook --port 6007
```

Run variants sequentially to avoid sharing the webpack cache. Open
[Attachment typography overrides](http://localhost:6007/iframe.html?id=migration-shims-v0-attachment--typography-overrides&viewMode=story).
Its `play` checks are manual aids, not CI assertions. Compare glyph sizing, clipping,
and outlines visually; a high-contrast theme does not activate `forced-colors`.
