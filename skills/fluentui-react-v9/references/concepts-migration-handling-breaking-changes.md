# Handling Breaking Changes

Here are ways you can migrate to v9 while minimizing the impact of breaking changes.

## Breaking Change: Props differences

As each v9 component was built, the props API was carefully considered. v0, v8, and other component libraries were evaluated. The props across v9 components were reviewed for consistency. The result is a lighter-weight, easier to use, and more extensible props API.

You will need to pass different props to v9 components than you passed to v8 components. You may also need to use a new component name.

For example, v8 has ActionButton, DefaultButton, and PrimaryButton components. In v9, Button provides for each of these with an appearance property.

These v8 buttons

would become these v9 buttons

See [Component Mapping](./?path=/docs/concepts-migration-from-v8-component-mapping--docs) for details migrating components.

### You can update your code to pass new props

If you use Fluent components in a small or medium number of places in your codebase and you have capacity, then you should update your code directly. Avoid the other approaches more suited for long-term migration.

### Pre-migration: You can encapsulate components in an abstraction layer

If you have many, many places where you use Fluent components and you have a large codebase, you should strongly consider creating an abstraction layer around Fluent components.

You can create a package that imports and re-exports Fluent components. The rest of your code can use these components instead of depending on Fluent directly.

This gives you a place where you can control your migration. You can flight v9 components, export shim components that support v8 props, or recompose components to customize props, behavior, or style.

### You can create or use shim components

If you don't have the capacity to migrate your usage of v8 to v9 or want to try out v9 components before fully migrating, you can consider using a shim component.

A shim component accepts v0 or v8 props but renders a v9 component. Shim components depend on both v9 and the previous version, so you may not be able to reduce a bundle size.

We author shim components for popular components in the `@fluentui/react-migration-v8-v9` package. These shim components are _best effort_. We welcome contributions and fixes to our migration components.

## Breaking Change: Data props to TSX/JSX children

In v9, components accept TSX/JSX children. If you previously passed data to props, you will need to map data to child components yourself.

For example, v8 contextual menu buttons displayed context menus on click when passed `menuProps`.

### You can update code from data props to TSX/JSX

If you had data props that were constants, you can quickly convert them to TSX/JSX children.

Continuing the contextual menu button example: To have a contextual menu in v9, you need to declare a `Menu` structure with `MenuItem` children.

### You can map data props to children

If you have complex code that builds up the data props, you can author your own map call to convert the data to children.

Continuing the contextual menu button example: If you want to keep your `menuProps` data, you can map the items to `MenuItem` children.

## Breaking Change: Render props to slots

In v9, components provide slots to customize parts. If you use the render props callbacks to customize the children, items, or parts of a component, you will need to update them to use slots.

For example, the v8 CheckBox has an onRenderLabel() callback.

To customize the label for a v9 CheckBox, you would use the label slot. The slot accepts a string literal, JSX, or a render function.

## Breaking Change: Custom styles to className

In v9, styles are customized by using makeStyles and mergeClasses to set the className prop. The className prop can be set on the component as well as on individual slots.

If you have customized v8 components using the styles prop and passed custom style objects, you will need to convert them to class names. There may not be a one-to-one mapping between the parts from a v8 styles object to the slots of a v9 component.

For example, a v8 Persona with customized styles to display the primary text as steel blue and the secondary text to have extra top and left margin.

To keep this customization in v9 Persona, you will need to create styles with makeStyles and then apply them to the associated slot.
