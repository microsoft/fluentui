# @fluentui/global-context

**Global Context for [Fluent UI React](https://react.fluentui.dev)**

This package contains a shim for `React.createContext` API that will register the context object to the global
scope (`window` for browsers, `global` for nodejs). This means that contexts will be real singletons.

> ⚠️ The recommended approach is not to use this package and deduplicate affected packages in node_modules

This package is is a workaround when multiple context objects are included into a bundle. This can happen when
there are multiple copies of the same package installed in `node_modules`.

**This package is not inteded to be used directly in code, but through a [Babel transform](/todo)**
