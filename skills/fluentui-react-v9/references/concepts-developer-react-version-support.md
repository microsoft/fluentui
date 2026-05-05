# React Version Support

> ℹ️ **Note**: Our migration docs focus solely on FluentUI related changes.

If you're migrating between React major versions, please refer to the official React documentation for comprehensive migration guides.

For migrating your codebase TypeScript types, you can leverage [Types React Codemod](https://github.com/eps1lon/types-react-codemod)

## React 17

Full support starting `@fluentui/react-components` v9.0.0.

## React 18

Full support starting `@fluentui/react-components` v9.66.0.

### Migration

> 💡 Check Following PR for further details [https://github.com/microsoft/fluentui/pull/34456](https://github.com/microsoft/fluentui/pull/34456)

#### Runtime/API changes:

NONE

#### TypeScript types changes:

##### Slot Children as a Function

Because `@types/react@18` Breaking Changes, we needed to loosen `Slot` children property to `any`.

This change will affect users that use `Slot` children as a function in conjunction with TypeScript strict mode.

If that's your case, TypeScript will fail on `noImplicitAny`. To mitigate this you need to add type assertions (`satisfies SlotRenderFunction<T>`)

Before:

After:

## React 19

Full support starting `@fluentui/react-components` v9.72.2.

### Migration

> 💡 Follow official React 19 migration guidelines

#### Runtime/API changes:

NONE

#### TypeScript Types Recommendations

> 📚 **For Library Authors & FluentUI Extension Developers**
>
> These recommendations ensure your library's TypeScript types remain backwards compatible across React 17, 18, and 19.
>
> 💡 [See PR #34733 for technical details](https://github.com/microsoft/fluentui/pull/34733)

##### 1. Enforce Explicit Return Types for Render Functions & Hooks

React 19 made removed global `JSX` type, that can cause type compatibility issues across versions.

Always explicitly type your APIs that return JSX markup (render functions, hooks).

**Setup ESLint Rule:**

**Why?** This prevents implicit return type inference that may differ between React versions, ensuring your component and hook signatures remain consistent.

> 📖 [Learn more in PR #35080](https://github.com/microsoft/fluentui/pull/35080)

##### 2. Use FluentUI Cross-Version Compatible JSX Types

React's JSX namespace types changed between versions. FluentUI provides stable, cross-compatible type utilities that work across React 17, 18, and 19.

**Setup ESLint Rule:**

Configure `@typescript-eslint/no-restricted-types` to enforce FluentUI types. [View complete setup](https://github.com/microsoft/fluentui/pull/34923/files#diff-76039af2f09c079049956d7b4b45efee6d01993677e1680519f5863fae6f0919)

**Migration Example:**

❌ **Before (React-specific types):**

✅ **After (FluentUI cross-version types):**

**Available Types:**

- `JSXElement` - Replaces `JSX.Element` / `React.JSX.Element`
- `JSXIntrinsicElementKeys` - Replaces `keyof JSX.IntrinsicElements`
- `JSXIntrinsicElement<K>` - Replaces `JSX.IntrinsicElements[K]`

**Benefits:**

- ✅ Works across React 17, 18, and 19
- ✅ No breaking changes when users upgrade React versions
- ✅ Consistent type checking regardless of `@types/react` version
