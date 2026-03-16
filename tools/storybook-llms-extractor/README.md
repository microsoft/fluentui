# storybook-llms-extractor

A CLI tool that extracts documentation from Storybook builds and converts it to LLM-friendly formats, following the [llmstxt.org](https://llmstxt.org/) specification.

## Overview

This tool processes Storybook production builds to generate comprehensive documentation in plain text format that's optimized for Large Language Models (LLMs). It extracts component documentation, props, examples, and MDX content to create structured documentation files.

## Features

- **Component Documentation**: Extracts props, descriptions, and type information from React components
- **Story Examples**: Captures all story variations with source code
- **MDX Support**: Processes MDX documentation pages and converts HTML to Markdown
- **Subcomponents**: Handles complex components with subcomponents
- **LLMs.txt Format**: Generates summary files following the llmstxt.org specification
- **Static File Serving**: Uses Playwright routing instead of Express for better reliability
- **Flexible Configuration**: Supports CLI arguments and config files

## Installation

```bash
npm install @fluentui/storybook-llms-extractor
# or
yarn add @fluentui/storybook-llms-extractor
```

## Usage

### Basic Usage

Extract documentation from a Storybook build:

```bash
storybook-llms-extractor --distPath "storybook-static" --summaryBaseUrl "https://storybook.example.com"
```

### CLI Options

| Option                 | Type   | Required | Default   | Description                                        |
| ---------------------- | ------ | -------- | --------- | -------------------------------------------------- |
| `--distPath`           | string | Yes      | -         | Relative path to the Storybook distribution folder |
| `--summaryBaseUrl`     | string | No       | `/`       | Base URL for the Storybook docs                    |
| `--summaryTitle`       | string | No       | `Summary` | Title for the summary file                         |
| `--summaryDescription` | string | No       | `""`      | Description for the summary file                   |
| `--refs`               | array  | No       | `[]`      | Array of composed Storybook refs                   |

### Configuration File

You can use a configuration file (e.g., `llms.config.js`) for complex setups:

```javascript
module.exports = {
  distPath: 'storybook-static',
  summaryBaseUrl: 'https://react.fluentui.dev',
  summaryTitle: 'Fluent UI React v9',
  summaryDescription: 'Fluent UI React components documentation',
  refs: [
    {
      title: 'Charts v9',
      url: 'https://charts.fluentui.dev',
    },
  ],
};
```

Then run:

```bash
storybook-llms-extractor --config llms.config.js
```

## Output Structure

The tool generates the following files in your Storybook dist directory:

```
storybook-static/
├── llms.txt                    # Main summary file (llmstxt.org format)
└── llms/
    ├── component-button.txt    # Individual component docs
    ├── component-accordion.txt
    └── concepts-introduction.txt # MDX page docs
```

### Summary File (`llms.txt`)

The main summary file follows the [llmstxt.org](https://llmstxt.org/) specification:

```
# Fluent UI React v9

> **Note:** This is a summary overview using the LLMs.txt format...

- [Components/Button](https://example.com/llms/components-button.txt): A button component
- [Components/Accordion](https://example.com/llms/components-accordion.txt): An accordion component
```

### Individual Component Files

Each component gets its own detailed documentation file:

````
# Components/Button

A button triggers an action or event.

## Props

| Name | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `appearance` | `"primary" | "secondary"` | No | `"secondary"` | Button appearance |

## Examples

### Primary Button
```tsx
<Button appearance="primary">Click me</Button>
````

````

## How It Works

1. **Static File Routing**: Uses Playwright to serve Storybook files without needing a web server
2. **Story Extraction**: Accesses Storybook's internal story store to get all component metadata
3. **Content Processing**: Converts HTML documentation to clean Markdown format
4. **Documentation Generation**: Creates structured text files optimized for LLM consumption

## Integration Examples

### GitHub Actions

```yaml
- name: Build Storybook
  run: npm run build-storybook

- name: Generate LLM Docs
  run: npx storybook-llms-extractor --distPath storybook-static --summaryBaseUrl ${{ env.DEPLOY_URL }}
````

### With Composed Storybooks

If you have multiple Storybook instances, you can reference them:

```bash
storybook-llms-extractor \
  --distPath "storybook-static" \
  --summaryBaseUrl "https://main.storybook.dev" \
  --refs '{"title":"Charts","url":"https://charts.storybook.dev"}' \
  --refs '{"title":"Icons","url":"https://icons.storybook.dev"}'
```

## Development

### Building

```bash
nx build storybook-llms-extractor
```

### Testing

```bash
nx test storybook-llms-extractor
```

### Local Development

```bash
# Link the package locally
npm link

# Use in another project
cd /path/to/your/storybook
npm link @fluentui/storybook-llms-extractor
storybook-llms-extractor --distPath storybook-static
```

## Requirements

- Node.js 16+
- Storybook 7+ (supports both Storybook 7 and 8)
- Built Storybook static files

## Supported Formats

- **Components**: React components with TypeScript props
- **Stories**: CSF (Component Story Format) stories
- **MDX**: Documentation pages written in MDX
- **Subcomponents**: Complex component hierarchies

## Troubleshooting

### Common Issues

**"Unable to find Storybook story store"**

- Ensure your Storybook build is complete and contains the necessary metadata
- Check that you're pointing to the correct `distPath`

**HTML content not converting properly**

- The tool handles most HTML-to-Markdown conversions automatically
- Complex HTML structures might need manual review

**Missing component props**

- Ensure your components have proper TypeScript definitions
- Check that Storybook's docgen is working correctly

## Contributing

This tool is part of the Fluent UI project. Please see the main repository for contribution guidelines.

## License

MIT - see the main Fluent UI repository for details.
