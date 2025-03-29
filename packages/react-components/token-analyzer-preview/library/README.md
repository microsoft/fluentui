# Design Token Usage Analyzer

A static analysis tool that scans your project's style files to track and analyze design token usage. The analyzer helps identify where and how design tokens are being used across your codebase, making it easier to maintain consistency and track token adoption.

## TODO

- we also need to ensure var analysis is done correctly after the refactor
- ~~**This is high pri now since we have components in source using this technique (see buttonstyles.styles.ts)** Handle very complex cases like `var(--optional-token, var(--semantic-token, ${some-other-var-with-a-string-or-fallback}))`. This other var might be in another package or file as well. Currently we won't handle this level of depth but we could do symbol extraction in the future if needed to resolve the chain fully. This will likely require changes in importAnalyzer.ts and structural changes in the data we return. On top of needing to find referenced symbols within an aliased template string literal, we might also then need to parse out var fallbacks within short hands. IE: `padding: 'var(--first, var(--second)) 10px` and ensure the ordering is correct.~~
- ~~Format output with prettier when we save to ensure stage lint doesn't fail.~~
- ~~make sure this works with shorthand spread~~
- Look at the path info again. Do we ever need it?
- Convert token member within the analysis output to an array so we can hold multiple tokens. The order should be the order or priority. [0] being the highest pri with the last item in the array the least prioritized.
- Duplicate entries in useButtonStyles.styles.ts for useRootDisabledStyles.base.nested:hover.color - we might need to test case this
- ~~We've added the ability to analyze spreads but there's an issue where we find the tokens and call them out but they get nuked somewhere before we return them. Need to trace that and fix.~~
- Add makeResetStyles specific tests in analyzer to ensure we process those correctly.
- ~~Button has some weird patterns in it where it uses makeResetStyles and then uses enums to pull in the styles, we might need to account for those as well.~~
- ~~Some property assignments can also be function calls, we need to process this scenario~~
- ~~`createCustomFocusIndicatorStyle` is a special function that is used throughout the library so we might be able to special case it~~
- ~~if we have file imports we need to analyze those such as importing base styles~~
  ~~- Manage makeResetStyles (likely same as makeStyles)~~
- ~~what if we have multiple `makeStyles` calls merged, are we handling that correctly or just nuking the conflicts in our output?~~
- as we update the functionality, we should update our test cases to reflect the new functionality we support and ensure it works.
- ~~if we have functions we can't process (or other code for that matter), can we add that data into our report so we know to manually go deal with it?~~
- ~~assignedSlots in output to track which slots classes are applied to~~
- ~~Add variables full name to metadata (i.e. classNames.icon instead of just 'icon)~~
- ~~Module importing~~

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
