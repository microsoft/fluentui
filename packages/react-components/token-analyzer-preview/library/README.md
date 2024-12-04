# Design Token Usage Analyzer

A static analysis tool that scans your project's style files to track and analyze design token usage. The analyzer helps identify where and how design tokens are being used across your codebase, making it easier to maintain consistency and track token adoption.

## TODO

- Some property assignments can also be function calls, we need to process this scenario
- `createCustomFocusIndicatorStyle` is a special function that is used throughout the library so we might be able to special case it
- if we have file imports we need to analyze those such as importing base styles
- we also need to ensure var analysis is done correctly after the refactor

## Features

- Scans TypeScript/JavaScript style files for token usage
- Tracks both direct token references and variables that reference tokens
- Follows imports to resolve token references across files
- Generates detailed JSON reports of token usage
- Performance tracking and debugging capabilities
- Handles nested style objects and property assignments

## Installation

```bash
npm install --save-dev @your-org/token-analyzer
```

## Usage

### Via CLI

The analyzer can be run from the command line:

```bash
npm run analyze-tokens -- [sourceDir] [outputFile] [flags]
```

#### Arguments:

- `sourceDir`: Directory to analyze (default: `./src`)
- `outputFile`: Output JSON file path (default: `./token-analysis.json`)

#### Flags:

- `--debug`: Enable debug logging
- `--perf`: Enable performance metrics

Examples:

```bash
# Analyze src directory with default output
npm run analyze-tokens

# Analyze specific directory with custom output
npm run analyze-tokens -- ./components ./analysis.json

# Run with debug logging
npm run analyze-tokens -- --debug

# Run with performance metrics
npm run analyze-tokens -- --perf

# Run with both debug and performance tracking
npm run analyze-tokens -- --debug --perf
```

### Programmatic Usage

```typescript
import { analyzeProjectStyles } from '@your-org/token-analyzer';

async function analyze() {
  const results = await analyzeProjectStyles('./src', './analysis.json', {
    debug: true,
    perf: true,
  });

  console.log(`Analyzed ${Object.keys(results).length} files`);
}
```

## Configuration

The analyzer identifies style files based on naming conventions. By default, it looks for:

- Files containing `style` or `styles` in the name
- Files with extensions: `.ts`, `.tsx`, `.js`, `.jsx`, `.mjs`

### Debug Configuration

Debug and performance tracking can be configured via:

1. CLI flags (as shown above)
2. Programmatic options when calling `analyzeProjectStyles`
3. Environment variables:
   - `TOKEN_ANALYZER_DEBUG=true`
   - `TOKEN_ANALYZER_PERF=true`

## Output Format

The analyzer generates a JSON file with the following structure:

```typescript
{
  "path/to/file.ts": {
    "styleName": {
      "tokens": [
        {
          "property": "color",
          "token": "tokens.colors.primary",
          "fromVariable": false  // true if reference comes from a variable
        }
      ],
      "nested": {
        "hover": {
          "tokens": [
            {
              "property": "backgroundColor",
              "token": "tokens.colors.secondary",
              "fromVariable": true,
              "sourceFile": "path/to/variables.ts"  // only present for variable references
            }
          ]
        }
      }
    }
  }
}
```

## Development

### Project Structure

```
src/
  ├── index.ts           # Main entry point
  ├── astAnalyzer.ts     # AST analysis logic
  ├── fileOperations.ts  # File handling utilities
  ├── formatter.ts       # Output formatting
  ├── debugUtils.ts      # Debug and performance utilities
  └── types.ts          # TypeScript type definitions
```

### Running Tests

```bash
npm test
```

### Building

```bash
npm run build
```

## Pending Improvements

- [ ] Add more granular performance metrics
- [ ] Implement different levels of debug logging
- [ ] Add output format customization
- [ ] Add parallel processing options
- [ ] Add token pattern customization
- [ ] Add file pattern customization

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
