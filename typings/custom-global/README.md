# custom-global

## usage

As of writing, the `custom-global` type package only provides IE 11-compatible definitions of Map/Set/WeakMap.
Adding definitions to this type package should be a last resort; in general, changing the `lib` option in
`tsconfig.json` is a better approach (the IE 11-compatible types aren't available as a `lib` option).

The `custom-global` types are not referenced by default in most projects. To add a reference, add the following
to `tsconfig.json` `compilerOptions`:

```js
"typeRoots": ["../../node_modules/@types", "../../typings"],
"types": ["custom-global"] // and any other types you reference
```
