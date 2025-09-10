# JSX Intrinsic Elements Type Transformer

This directory contains TypeScript transform scripts that extract actual JSX intrinsic element names from React type definitions and emit them as literal string unions instead of preserving `keyof JSX.IntrinsicElements` references.

## Problem Solved

TypeScript declaration files typically preserve type expressions like `keyof JSX.IntrinsicElements` rather than expanding them to the actual union of element names. This transformer ensures that consumers of the library get the fully expanded string union for better IntelliSense and type checking.

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

```bash
yarn nx run react-utilities:prebuild
```

### Direct Execution

```bash
npx tsx scripts/expand-jsx-intrinsic-elements.ts --target-file ./generated-types.ts
```

## Dual Type Strategy

The script generates two complementary types to handle React version compatibility:

### `JSXIntrinsicElementKeysCompat`

- **Purpose**: Maintains backward compatibility with React 17 and older projects
- **Content**: Filtered element set (excludes elements specified in `--omit-elements`)
- **Use Case**: Libraries that need to support older React versions
- **Migration**: Safe drop-in replacement for legacy `keyof JSX.IntrinsicElements` usage

### `JSXIntrinsicElementKeysLatest`

- **Purpose**: Provides complete element coverage for React 18+ projects
- **Content**: Union of omitted elements + `JSXIntrinsicElementKeysCompat`
- **Use Case**: Modern applications using React 18+ with full JSX element support
- **Migration**: Recommended for new projects and when upgrading React versions

This approach ensures smooth transitions between React versions while maintaining type safety.

### Command Line Arguments

The script supports command line arguments for customization:

- `--target-file, -t`: Output file path (required)
- `--react-types-path, -r`: Path to the React types directory (auto-detected if not provided)
- `--omit-elements, -o`: Comma-separated list of elements to exclude from the generated union
- `--help, -h`: Show help message

#### Examples:

```bash
# Show help
npx tsx scripts/expand-jsx-intrinsic-elements.ts --help

# Basic usage with required target file
npx tsx scripts/expand-jsx-intrinsic-elements.ts --target-file ./generated-types.ts

# Exclude specific elements from the generated union
npx tsx scripts/expand-jsx-intrinsic-elements.ts --target-file ./generated-types.ts --omit-elements div,span,p

# Use custom React types path
npx tsx scripts/expand-jsx-intrinsic-elements.ts --target-file ./generated-types.ts --react-types-path /path/to/react/types

# Combine multiple options
npx tsx scripts/expand-jsx-intrinsic-elements.ts --target-file ./custom-types.ts --omit-elements set,mpath,center,search
```

## Transformation Example

**Input:**

```typescript
export type JSXIntrinsicElementKeys = keyof JSX.IntrinsicElements;
```

**Output (Dual Type Generation):**

The script now generates two complementary types to ensure compatibility across React versions:

```typescript
/**
 * Unwrapped type for 'keyof JSX.IntrinsicElement'. (Backwards compatible with older versions of @types/react)
 */
export type JSXIntrinsicElementKeysCompat =
  | 'a'
  | 'abbr'
  | 'address'
  | 'animate'
  // ... filtered elements (178 total, minus any omitted elements)
  | 'video'
  | 'view'
  | 'wbr'
  | 'webview';

/**
 * Unwrapped type for 'keyof JSX.IntrinsicElement'
 */
export type JSXIntrinsicElementKeysLatest =
  | 'set' // Previously omitted elements (if --omit-elements was used)
  | 'mpath'
  | 'center'
  | 'search'
  | JSXIntrinsicElementKeysCompat; // Union with all compatible elements
```

This dual approach provides:

- **`JSXIntrinsicElementKeysCompat`**: Filtered elements for React 17 compatibility
- **`JSXIntrinsicElementKeysLatest`**: Complete element set for React 18+ projects

## Technical Details

### Detection Strategy

1. **TypeChecker-only Resolution**: Uses TypeScript's compiler API exclusively for type resolution
2. **Temporary Source File**: Creates temporary TypeScript source with type aliases to query JSX types
3. **Dual Fallback**: Tries `JSX.IntrinsicElements` first, then `React.JSX.IntrinsicElements` if needed
4. **Early Exit**: Stops processing once successful extraction is achieved
5. **Strict Mode**: Script fails if React types cannot be parsed successfully

### Output Features

- Alphabetically sorted element names
- **Dual Type Generation**: Creates both compatibility and latest versions
  - `JSXIntrinsicElementKeysCompat`: Backwards compatible with React 17 (filtered elements)
  - `JSXIntrinsicElementKeysLatest`: Full element set including previously omitted elements
- Formatted with each element on a new line for readability
- Preserves all HTML and SVG elements from React types
- Maintains exact element names from React type definitions
- **Element Filtering**: Supports excluding specific elements via `omitElements` option for backward compatibility
- **Detailed Logging**: Shows omitted elements and filtering statistics
- **Cross-Version Support**: Ensures compatibility across React 17, 18, and 19

### Error Handling

- **Strict extraction**: Script fails if React types cannot be parsed
- Detailed logging for debugging
- Version detection for React types
- Pattern matching for various input formats

### Implementation Details

The advanced script uses a sophisticated TypeChecker-only approach:

1. **Program Creation**: Creates a TypeScript program with React type definitions
2. **Temporary Source**: Generates a temporary `.tsx` file with type aliases:
   ```typescript
   type TestIntrinsicElements = JSX.IntrinsicElements;
   type TestReactIntrinsicElements = React.JSX.IntrinsicElements;
   ```
3. **Type Resolution**: Uses TypeChecker to resolve these aliases to their actual types
4. **Property Extraction**: Extracts all property names from the resolved IntrinsicElements type
5. **Early Exit**: Stops processing once the first successful extraction is complete

## Integration

The transformed types are automatically included in the build process:

1. Transform script updates `src/utils/generated-types.ts` with dual type definitions
2. `src/utils/types.ts` re-exports both generated types:
   - `JSXIntrinsicElementKeysCompat` for React 17 compatibility
   - `JSXIntrinsicElementKeysLatest` for React 18+ projects
3. `src/index.ts` exports both types to the public API
4. Build process includes both types in declaration files
5. Consumers can choose the appropriate type based on their React version

## Benefits

1. **Better IntelliSense**: IDEs show actual element names instead of type references
2. **Faster Type Checking**: No need to resolve `keyof` operations at compile time
3. **Cross-Version Compatibility**:
   - Works with React 17, 18, and 19 projects
   - Provides separate types for different compatibility requirements
   - Smooth migration path between React versions
4. **Comprehensive Coverage**: Includes both HTML and SVG elements (178+ total)
5. **Maintainable**: Automatically syncs with React type definition updates
6. **Performance Optimized**: TypeChecker-only approach with early exit for faster execution
7. **Reliable**: Uses TypeScript's built-in type resolution instead of manual AST parsing
8. **Flexible Element Management**:
   - Backward compatibility through element filtering
   - Future-proof with complete element sets

## Maintenance

Auto updates types via `prebuild` target to ensure that:

- **React Version Compatibility**: Both `JSXIntrinsicElementKeysCompat` and `JSXIntrinsicElementKeysLatest` stay synchronized with React type updates
- **Backward Compatibility**: React 17 projects continue to work with filtered element sets
- **Forward Compatibility**: React 18+ projects get access to complete element unions
- **Migration Support**: Teams can gradually transition from Compat to Latest types
- Manual verification of element output is needed after `generate-api` is run
- **Dual Type Validation**: Both generated types are tested for correctness
