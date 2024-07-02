**This content only applies to the [documentation site](https://developer.microsoft.com/en-us/fluentui) for `@fluentui/react` version 7/8 (formerly `office-ui-fabric-react`) and Fluent UI Android/iOS/etc.** (`@fluentui/react-northstar` and `@fluentui/web-components` currently have separate documentation sites.)

## Overview

Pages in the documentation site can import markdown files (using Webpack's [raw-loader](https://github.com/webpack-contrib/raw-loader)) as a `string`, which can then be passed as a child to the `Markdown` component from `@uifabric/example-app-base` (`@fluentui/react-docsite-components` in version 8+). These markdown files can be edited from GitHub (using a commit and a pull request). Once merged, the changes to the MD files will render on the website.

Many of the sections on the website pages, such as component overviews and best practices, are rendered from markdown files. Since text in markdown files is much easier to read, edit, and format than text in TSX, we recommend using a markdown file for each page section unless it needs more complex content which can't be represented with built-in markdown syntax. (The [markdown renderer](https://www.npmjs.com/package/markdown-to-jsx) we use has extremely limited support for custom HTML within markdown files.)

## Usage

The pattern for where to locate markdown files and where to add references varies; the best way to figure it out is to either look for a similar existing page (and follow that pattern) or ask a team member.

The [GetStartedPage](https://github.com/microsoft/fluentui/tree/master/apps/public-docsite/src/pages/Overviews/GetStartedPage) and [LocalizationPage](https://github.com/microsoft/fluentui/tree/master/apps/public-docsite/src/pages/Styles/LocalizationPage) provide decent examples of some simple and slightly more complex scenarios.

## Markdown syntax

If you're not familiar with Markdown syntax, [see this site](https://www.markdownguide.org/cheat-sheet/). Not all of the extended syntax is supported, so be sure to verify locally or using the PR deploy site that your content is rendered as expected.

Markdown on the Fluent UI website is rendered using [`markdown-to-jsx`](https://www.npmjs.com/package/markdown-to-jsx), which is decently fast but with the tradeoff that it has **extremely limited custom HTML support**. If you need more complex formatting, you'll need to write that section in a TSX file instead.

## Images

Images on the website are hosted on a CDN. Contact a team member for more information about how to get new images added.

## Tag overrides

In markdown on the Fluent UI website, some tags in the generated HTML are automatically replaced by pre-styled components by default. The full mapping is defined in [this file](https://github.com/microsoft/fluentui/blob/master/packages/react-docsite-components/src/components/Markdown/Markdown.tsx), but notable replacements include:

| Tag      | Component           | Notes                                                            |
| -------- | ------------------- | ---------------------------------------------------------------- |
| `code`   | `MarkdownCode`      | Also works on backtick code blocks.                              |
| ````tsx` | `SyntaxHighlighter` | Code fences display code blocks with syntax highlighting.        |
| `button` | `DefaultButton`     | You can pass `DefaultButton`'s top-level props such as `primary` |
