# es2023-shim

This package contains type definitions which are present in the ECMAScript 2023 specification but aren't available in TypeScript 4.9. Once the project is updated to TypeScript 5+, this package should be removed.

## Usage

```json
{
  "compilerOptions": {
    "typeRoots": ["../../node_modules/@types", "../../typings"],
    "types": ["es2023-shim"] // and any other types you reference
  }
}
```
