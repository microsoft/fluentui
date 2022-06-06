# environment

Enables access to `process.env` in both node and browser packages (your code needs to rely on wepback or bundler that understands node environment).

This definition list of env variables is maintained manually and should be extended as needed.

## Usage

```json
{
  "compilerOptions": {
    "types": ["environment"]
  }
}
```

Now you can use `process.env` global with strict type checking:

```ts
// @ExpectType string
export function log(...messages: Array<string>) {
  if (process.env.NODE_ENV === 'development') {
    console.log(...messages);
  }

  // $ExpectError - 'prod' is not defined, did you mean to 'production' ?
  if (process.env.NODE_ENV === 'prod') {
    // do something
  }
}
```

## Adding env variables

Add new env variables as needed

**Example:**

```diff
// Adding NX_ENV env variable
// ↓↓↓
interface ExtendedProcessEnv {
  NODE_ENV?: 'production' | 'development' | 'test';
  LAGE_PACKAGE_NAME?: string;
  CI?: string;
  TF_BUILD?: string;
+ NX_ENV?: string
}
```
