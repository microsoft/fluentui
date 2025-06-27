# JSX Intrinsic Elements Type Transformer

This directory contains TypeScript transform scripts that extract actual JSX intrinsic element names from React type definitions and emit them as literal string unions instead of preserving `keyof JSX.IntrinsicElements` references.

## Problem Solved

TypeScript declaration files typically preserve type expressions like `keyof JSX.IntrinsicElements` rather than expanding them to the actual union of element names. This transformer ensures that consumers of the library get the fully expanded string union for better IntelliSense and type checking.

## Scripts

### 1. `expand-jsx-intrinsic-elements.ts` (Basic)

- Uses a fallback list of known HTML elements
- Simple pattern matching for transformation
- Good for scenarios where React types are not available

### 2. `expand-jsx-intrinsic-elements-advanced.ts` (Recommended)

- Dynamically extracts from actual React type definitions
- Supports both React 17 and React 18+ type structures
- Handles HTML and SVG elements
- Provides version detection and detailed logging
- **Fails if extraction is unsuccessful** (no fallback to static list)

## React Version Compatibility

The advanced script handles both React type definition structures:

### React 17 Style (Global JSX)

```typescript
declare global {
  namespace JSX {
    interface IntrinsicElements {
      div: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;
      // ... other elements
    }
  }
}
```

### React 18+ Style (React.JSX)

```typescript
declare namespace React {
  namespace JSX {
    interface IntrinsicElements {
      div: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;
      // ... other elements
    }
  }
}
```

## Usage

### Via NPM Scripts (Recommended)

```bash
cd packages/react-components/react-utilities

# Basic version with fallback list
npm run expand-jsx-types

# Advanced version with React type extraction
npm run expand-jsx-types:advanced
```

### Direct Execution

```bash
# Advanced script
npx tsx scripts/expand-jsx-intrinsic-elements-advanced.ts

# Basic script
npx tsx scripts/expand-jsx-intrinsic-elements.ts
```

## Transformation Example

**Input:**

```typescript
export type JSXIntrinsicElementKeys = keyof JSX.IntrinsicElements;
```

**Output:**

```typescript
export type JSXIntrinsicElementKeys =
  | 'a'
  | 'abbr'
  | 'address'
  | 'animate'
  | 'animateMotion'
  | 'animateTransform'
  | 'area'
  | 'article'
  | 'aside'
  | 'audio'
  // ... 175+ elements total including HTML and SVG
  | 'video'
  | 'view'
  | 'wbr'
  | 'webview';
```

## Technical Details

### Detection Strategy

1. **AST Parsing**: Parses React type definition files to find JSX namespace structures
2. **Dual Approach**: Checks both global JSX (React 17) and React.JSX (React 18+) patterns
3. **TypeChecker Fallback**: Uses TypeScript's type checker API if AST parsing fails
4. **Strict Mode**: Script fails if React types cannot be parsed successfully

### Output Features

- Alphabetically sorted element names
- Formatted with each element on a new line for readability
- Preserves all HTML and SVG elements from React types
- Maintains exact element names from React type definitions

### Error Handling

- **Strict extraction**: Script fails if React types cannot be parsed
- Detailed logging for debugging
- Version detection for React types
- Pattern matching for various input formats

## Integration

The transformed types are automatically included in the build process:

1. Transform script updates `src/utils/generated-types.ts`
2. `src/utils/types.ts` re-exports the generated type
3. `src/index.ts` exports it to the public API
4. Build process includes it in declaration files

## Benefits

1. **Better IntelliSense**: IDEs show actual element names instead of type references
2. **Faster Type Checking**: No need to resolve `keyof` operations at compile time
3. **Cross-Version Compatibility**: Works with both React 17 and React 18+ projects
4. **Comprehensive Coverage**: Includes both HTML and SVG elements
5. **Maintainable**: Automatically syncs with React type definition updates

## Maintenance

Run the transformer script whenever:

- React types are updated
- New JSX elements are added to React
- Build process changes affect type generation
- Manual verification of element completeness is needed

The script can be integrated into CI/CD pipelines to ensure types stay current with React updates.
