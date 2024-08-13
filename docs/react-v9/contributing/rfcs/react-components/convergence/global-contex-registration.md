# RFC: Global context registration

@ling1726

## Summary

This RFC proposes that all Fluent UI contexts be registered in the global scope when created. Global scope means
`window` for browser environments or the `global` object for nodejs environments when using SSR.

## Problem statement

Many of our partners have complex dependency trees. The complexity in dependency management means that duplicate
packages can exist in `node_modules` folders. Although duplicate depedencies should generally be avoided, this still
happens quite often due to these factors:

- Propagating dependency bumps downstream can be slow
- Engineering teams prioritize other work
- Incorrect version ranges declared

Duplicated code generally is not a huge issue unless there are singletons that are duplicated. React contexts are
singletons. When duplicated:

```tsx
<ContextV1.1.Provider>

</ContextV1.1.Provider>

React.useContext(ContextV1.2);
```

Scenarios like the above can be very difficult to debug. The value of `useContext` will always be the context
default value because it is not actually wrapped by its provider. The example above makes the reading simpler
by suffixing the version number in the name. In reality both contexts would actually share the same name even if
they are different.

The issue has been created before in React's GitHub repository:

- [facebook/react#13346](https://github.com/facebook/react/issues/13346)
- [reactjs/reactjs.org#1112](https://github.com/reactjs/reactjs.org/pull/1112)

## Detailed Design or Proposal

Prototypes can be found in the following repos for create-react-app and next.js SSR respectively:

- https://github.com/ling1726/global-context
- https://github.com/ling1726/global-context-ssr

A more detailed prototype has been created in the following repo, which also shows code transforms as a possible
solution to application

- https://github.com/bsunderhus/create-global-context-babel-transformer

```ts
import * as React from 'react';
import { major } from 'semver';

type GlobalObject = typeof globalThis & Record<symbol, React.Context<any>>;
const isBrowser = typeof window !== 'undefined';
const globalObject: GlobalObject = isBrowser ? window : global;

// Identifier for the symbol, for easy idenfitifaction of symbols created by this util
// Useful for clearning global object during SSR reloads
const SYMBOL_NAMESPACE = 'global-context:';

// During SSR the global object persists with the server process
// Clean out the global object during server reload during development
if (!isBrowser && process.env.NODE_ENV !== 'production') {
  const globalSymbols = Object.getOwnPropertySymbols(globalObject);
  globalSymbols.forEach(sym => {
    if (Symbol.keyFor(sym)?.startsWith(SYMBOL_NAMESPACE)) {
      console.log('deleting', sym);
      delete globalObject[sym];
    }
  });
}

/**
 * Wrapper around @see React.createContext that implements context registration
 * in the globalThis object to avoid duplicate contexts. Contexts are keyed with
 * a unique sybmol for the package name, version and name of the context.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol}
 *
 * @param defaultValue - @see React.createContext
 * @param name - name of the context
 * @param packageName - name of the npm package where the module is used
 * @param packageVersion - version of the npm package where the module is used
 * @returns @see React.createContext
 */
export const createContext = <T>(defaultValue: T, name: string, packageName: string, packageVersion: string) => {
  // Symbol guaranteed to be unique for the entire runtime
  const sym = Symbol.for(`${SYMBOL_NAMESPACE}${packageName}/${name}/@${major(packageVersion)}`);

  // Objects keyed with symbols are not visible with console.log
  // Object symbol properties can't be iterated with `for` or `Object.keys`
  const globalSymbols = Object.getOwnPropertySymbols(globalObject);
  if (!globalSymbols.includes(sym)) {
    globalObject[sym] = React.createContext(defaultValue);
  }

  return globalObject[sym] as React.Context<T>;
};
```

The proposed solution involves a wrapper around `React.createContext` which also uses a user defined name, package name
and package major version as a key to create a symbol on the global object.

When using this solution, the underlying javascript is not actually typed, so any backwards compatible context values
will work. However, if the context value change is breaking (e.g. removing a property, changing from string to object)
then the package containing the context should be major bumped.

The solution will result in one single context that is used for each major version.

[Symbol](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol)
is used as the key for global contexts, since symbol properties on objects are only visible through the
`Object.getOwnPropertySymbols` API, this will reduce the possibility that developers will access these global
contexts to abuse them. `Symbol` is quite an old APi that is supported from Chrome version 40 and Firefox version 36.

Although not in the prototypes, it should be possible to create a global flag that will enable this behaviour in
Fluent, which means that this feature **should be completely opt-in**, and only intended for partners with complex
apps and dependency chains.

### Forwards/Backwards compatibility for context default values

Backwards compatibility needs to be supported without a question because we need to follow semver.
However, since there is no guarantee which version of the context gets registered first in the global namespace, the default
values in our context will be unsafe by default. This introduces the constraint of forward compatibility for our
context values.

```tsx
// v1 context is registered first
const Contextv1 = React.createContext({ foo: 'xxx' });
const Contextv11 = React.createContext({ foo: 'xxx', bar: 'yyyy' });

// v1.1 context is not registered and uses v1 context as proposed above
// ⚠️⚠️⚠️ bar is undefined but typings suggest it is defined
const { bar } = React.useContext(Contextv11);
```

In order to work around this problem this RFC proposes practices to follow in Fluent UI with regards to our
context values:

- Never export contexts from Fluent UI directly
- Export context providers
- Context default values should always be undefined
- Export hook to access context
- Default values should be assigned in context hooks

```tsx
interface FooContextValue {
  foo: string;
  bar: string;
}

const FooContext = React.createContext<Partial<FooContextValue>>({});

export const FooContextProvider = FooContext.Provider;
export const useFooContext: FooContextValue = () => {
  const ctx = React.useContext(FooContext);

  // We enforce all default react contexts to be empty
  // if there are any properties we don't need to worry about default value
  if (Object.keys(ctx).length) {
    return ctx;
  }

  const fooContextDefaultValue: FooContextValue = {
    foo: 'xxx',
    bar: 'yyy',
  };
  return fooContextDefaultValue;
};
```

We only care about the cases where the context value is an object since it context values that are primitives
cannot ever be extended as it would result in a breaking change.

### Application through code transforms

Since the problem only occurs once `createContext` is invoked in the global file scope, it should be feasible
to apply the global context shim at build time for applications. The information needed to create a key for the
context (package name, version, context name) is all available at build time.

This result would mean that there would need to be no direct code changes to Fluent UI. This solution would also
be explicitly opt-in for customers that might need a temporary quick solution while they are cleaning up their
dependency tree so that only one version of Fluent UI is in a bundle.

> 💡 [A prototype code transform can be found here](https://github.com/bsunderhus/create-global-context-babel-transformer)

## Pros and Cons

### Cons

- Polluting the global namespace
- Custom magic when creating contexts in Fluent
- Generally using window/node globals is an antipattern
- Enforces stricter practices for using contexts
- Bundle size increase (+ 18.95 kB minified / + 5.224 kB gzipped)
  - mainly caused by `semver` package

### Pros

- One single major version context regardless of duplicate dependencies
- Not too different from `React.createContext` - we still use React contexts
- Global contexts are 'obfuscated' on window/node global with `Symbol`
- Functionality can be explicitly enabled
- Functionality can be applied with post processing so that we still use `React.createContext` internally
- Not exporting the actual context is good API encapsulation
- No code changes to Fluent UI

## Discarded Solutions

One of the solutions proposed in [facebook/react#13346](https://github.com/facebook/react/issues/13346), is to use
peer dependencies for the library so that apps are responsible for installing the final dependency once.

Peer dependencies have been discarded because:

- Mismatching peer deps only result in a warning (that tends to be ignored)
- Hard to determine version compatibility
- Sometimes apps want duplicate versions (e.g. during upgrades)
- No partner currently uses Fluent as a peer dependency -> lots of work to migrate
- Peer deps will only solve the problem, once all dependencies in the tree use Fluent as a peer dep

## Open Issues

[microsoft/fluentui#21338](https://github.com/microsoft/fluentui/issues/21338)
