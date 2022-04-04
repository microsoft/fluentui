# RFC: Global context registration

@ling1726

## Summary

This RFC proposes that all Fluent UI contexts be registered in the global scope when created. Global scop means
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

### Pros and Cons

#### Cons

- Polluting the global namespace
- Custom magic when creating contexts in Fluent
- Generally using window/node globals is an antipattern

#### Pros

- One single major version context regardless of duplicate dependencies
- Not too different from `React.createContext` - we still use React contexts
- Global contexts are 'obfuscated' on window/node global with `Symbol`
- Functionality can be explicitly enabled

## Discarded Solutions

One of the solutions proposed in [facebook/react#13346](https://github.com/facebook/react/issues/13346), is to use
peer dependencies for the library so that apps are responsible for installing the final dependency once.

Peer dependencies have been discarded because:

- Mismatching peer deps only result in a warning (that tends to be ignored)
- Hard to determine version compatibility
- Sometimes apps want duplicate versions (e.g. during upgrades)
- No partner currently uses Fluent as a peer dependency -> lots of work to migrate

## Open Issues

[microsoft/fluentui#21338](https://github.com/microsoft/fluentui/issues/21338)
