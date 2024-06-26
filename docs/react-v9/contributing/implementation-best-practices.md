# Implementation best practices

### Prefer property names consistent with other components

Consistent property names across the component library help developers understand how to use your component more quickly because the names are familiar. When there aren't good examples, check out [open-ui.org](https://open-ui.org/) to see what names are commonly used across UI component libraries and frameworks.

For example, a property that controls the overall layout and style of a component is most commonly named `appearance`. Avoid naming your property `display`, `look`, etc.

This is true for discriminated union values too. For example, sizes is most commonly `'extra-small' | 'small' | 'medium' | 'large' | 'extra-large'`. There are two common outlier sizes `tiny` and `jumbo`. Avoid naming sizes `ex-s` or `hugely`.

### Prefer to minimally distinguish property names

If a property applies to the component or to the logical element of the component choose an unadorned name. Avoid prefixing the component name (e.g. prefer `icon` over `buttonIcon`) or unnecessary adjectives (e.g. prefer `shape` over `overallShape`).

If a property applies to a part or slot of a component, prefix/suffix with the part name (e.g. prefer `iconPosition` over `position`). Prefer to prefix the part name except where the property is acting as a verb (e.g. `alignContent` over `contentAlign`).

Avoid any hungarian notation of properties. While they can appear helpful when writing the props in Typescript, they are not idiomatic when calling from TSX.

### List properties in alphabetical order

Trying to logically group properties is too sensitive to each developers preferences. Listing alphabetically allows developers to easily scan for a property. It also matches with how the API and storybook documentation will list properties.

### Avoid re-declaring properties from native element attributes

If your component provides a `forwardRef` to a native element (e.g. `Button => <button>`) and you intersect `React.HTMLAttributes<>`, avoid re-declaring those attributes within your component props. Doing so can lead to type mismatch problems.

Avoid names that are commonly used in other HTML elements or attributes. They won't cause a compile or runtime error, but they may be confusing to callers.

### Always use the design names for properties representing parts (a.k.a. slots)

Part of the design specification process for a component is to identify and name the parts that make up a component visually. When defining properties representing slots for these parts, use the name as specified.

### Prefer types over interfaces

v9+ components are built using React Hooks and Typescript. Hooks is a functional programming approach that replaces the the object-oriented approach of React component classes. While Typescript supports object-oriented programming through interfaces and classes, it also fully supports functional programming through type declarations, type intersections, and discriminated unions. Because Typescript transpiles to JavaScript, a prototype-based language, it provides type inference and [duck typing](https://en.wikipedia.org/wiki/Duck_typing).

Types and interfaces can often be used [interchangeably](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#differences-between-type-aliases-and-interfaces) in Typescript. There are a few differences that make types the preferred choice:

- Interfaces can be re-opened to add new properties through declaration merging.

  This is something to avoid with component props. Props form the API contract of the component and should change with the component. If someone adds a required property to an interface, all extensions must implement it. It is a compile error if subsequent property declarations define the same property with a different type.

- Type aliases can rename primitives.

  This can help to provide more meaning about a property to developer. For example an ID property could be declared as `id : string;`, but `id: Base64EncodedString` provides much more information.

- Types can declare and intersect with discriminated unions.

  Discriminated unions are helpful when using components through TSX/JSX from a component library. The various attributes on the element that control the component are strings that need to be one-of from a set of values. `position: 'before' | 'after'` for example.

### Use discriminated union over boolean for mutually exclusive props

Boolean properties are convenient to set in TSX and are appropriate for flag values.

For example, a Tooltip component may have an option to show an arrow pointing at the target. `withArrow: boolean`. Callers can easily set this in TSX `<Tooltip withArrow />`.

If there are properties that are mutually exclusive, then a discriminated union is a better choice. The caller cannot accidentally specify multiple values which could lead to unpredictable behavior.

Going back to the Tooltip component, it might have different options for position relative to the target. If these were boolean values like `before?: boolean`, `after?: boolean`, or `cover?: boolean`, the caller could write `<Tooltip before after cover />`. It is much clearer to specify `<Tooltip position="before" />`.

### Consider a discriminated union for future additional values

If you have only a single optional value today and think there could be multiple values in the future, prefer a discriminated union with one value. For example: `border: boolean` would have to be changed to a discriminated union later to support both square, rounded, and circular borders.

### Prefer to inline small & independent discriminated unions

When a property type is a discriminated union, it is tempting to declare and export a type for it.

For example a size, `'small' | 'medium' | 'large'` would be easy to define as `export type Size = 'small' | 'medium' | 'large'` and declare `size: Size;`.

There are few pitfalls with defining and exporting types for every discriminated union:

- Tightly bound cross-component dependencies.

  If a component A uses the Size type from component B and then component B adds a value to the union, it could break component A. Component A is also less portable.

- Extra F12 navigation

  Developers inspecting the props have to follow the union to understand it rather than seeing the union right next to the property. This can lead to duplicate documentation comments on property and type declarations.

- Type explosion/collision in the type declaration files (`.d.ts`).

  While types are compiled away, having many types used only in one place increases declaration file size without much benefit.

  Component authors have to be careful to distinguish their type from other component types (e.g. ButtonSize vs. ImageSize). Otherwise tooling might auto-import the incorrect type.

  Since the practice is to place types in separate `.types.ts` files, these get exported for the component to use and can be inadvertently exported by `index.ts` `export * from ...`

There are scenarios when you should consider defining a type for a discriminated union:

- It is used across multiple components within the same package, or multiple times in the same props declaration.
- There are many union values that it clutters the props declaration.
- The type is a union of unions (e.g. `color: 'brand' | 'neutral' | StatusColor`)
- Callers will need to use the type in TS/JS rather than in just TSX/JSX.
- Developers authoring variants of your component will need that type in their component props.
