# RFC: Consistent Naming for String Union Prop Values

---

@spmonahan

---

## Summary

Standardize the naming conventions for string union prop values across the library so users and contributors get a consistent experience.

A "string union prop value" is a React component prop where the value is a Typescript string union:

```ts
myProp: 'a' | 'b';
```

This RFC does not apply to the prop names themselves as we consistently use `camelCase` for those.

## Problem Statement

Fluent UI v9 does not apply a single consistent naming convention for string union prop values. Some components use [`camelCase`](https://en.wikipedia.org/wiki/Camel_case), others use [`spinal-case`](https://en.wikipedia.org/wiki/Letter_case#Kebab_case) and some use both.

For example v9 `SpinButton` has the following two prop types:

```ts
// camelCase
appearance: 'outline' | 'underline' | 'filledDarker' | 'filledLighter';
// spinal-case
inputType: 'all' | 'spinners-only';
```

Lack of a preferred convention for Fluent v9 means component developers must make an additional, low value decision when creating APIs and users must work with APIs that lack internal consistency.

## Proposal

We should use `spinal-case` for string union prop values in all cases.

This proposal is arbitrary. We could just as easily propose the use of `camelCase` in all cases but there are some minor points in favor of `spinal-case`.

Adopting this covention aligns naming with how [Griffel](https://github.com/microsoft/griffel) styles (CSS-in-JS) are written, e.g.:

```ts
makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'row-reverse',
  },
});
```

In cases where values have long names using `spinal-case` provides visual distinction from prop names.

```jsx
<SpinButton
  inputType='spinners-only'/>
// vs
<SpinButton
  inputType="spinnersOnly"/>
```

### Pros

1. We have a standard naming convention and can focus on more important things
2. Better user experience
3. We could add linting to enforce this convention

### Cons

1. Some people may prefer `camelCase`
2. This is a breaking change for anything in stable.
   1. We have an issue to track proposed breaking changes in [#22130](https://github.com/microsoft/fluentui/issues/22130)
