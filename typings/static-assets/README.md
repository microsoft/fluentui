# static-assets

Enables importing various static assets to JS/TS modules (which is invalid ECMA syntax enabled by various tools like webpack etc).

This definition list is maintained manually and should be extended as needed.

## Usage

```json
{
  "compilerOptions": {
    "types": ["static-assets"]
  }
}
```

Now you can import images and others:

```ts
// @ExpectType string
import myImgSrc from './hello-world.png`

```

## Adding new asset types

Add new asset types extension as needed.

**Example:**

```ts
// Adding .avif image type support
// ↓↓↓
declare module '*.avif' {
  const src: string;
  export default src;
}
```
