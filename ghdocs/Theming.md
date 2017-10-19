# Theming

This document describes theming at a high level. For low level technical details, follow the links.


## What is theming?

Theming is a mechanism by which a consistent look and feel can be applied to all the components on a page. For now, this means sharing a color scheme across the entire page.


## What's in a theme?
A theme is defined by a simple collection of variables (which we call slots) with string values.
For example, `themePrimary` by default is `"#0078d7"`, but it could easily be `"rgba(0, 120, 215)"`.


## What are theme slots?

There are two kinds of theme slots: Fabric palette slots and semantic slots.

Fabric palette slots are documented in [IPalette.ts](https://github.com/OfficeDev/office-ui-fabric-react/blob/master/packages/styling/src/interfaces/IPalette.ts).
These are descriptive slots, it gives you an idea of what the color is, but you decide how to use it.
Most slots with color names (besides `white` and `black`), such as `yellow` and `yellowLight`, will remain a shade of yellow in all themes, useful in cases where color has meaning (such as for errors and warnings).
Customizing Fabric palette slots allows broad-stroke changes to the overall color scheme.

Semantic slots are documented in [ISemanticColors.ts](https://github.com/OfficeDev/office-ui-fabric-react/blob/master/packages/styling/src/interfaces/ISemanticColors.ts).
These, on the other hand, are prescriptive slots, each slot having an intended use.
This allows more targeted customizations.
For example, you could change the light gray color of a disabled checkbox without affecting the light gray used by list item hover/selection state.
We highly recommend using semantic slots wherever possible.


## How do I make a theme?

Check out the [Theme Generator](https://developer.microsoft.com/en-us/fabric#/styles/themegenerator) tool to quickly create a custom theme.
Currently only Fabric palette slots are generated. Semantic slots can be manually added to the resulting output.

You can define just the subset of slots you want to customize.
For instance, you could overwrite all the `neutral*`s with shades of red.
Anything using one of those Fabric palette slots will become reddish.

Semantic slots usually "inherit" from a Fabric palette slot.
For example, the `bodyText` semantic slot, if uncustomized, will always pick up the color from the Fabric palette slot `neutralPrimary`.
You can see these default assignments in [theme.ts](https://github.com/OfficeDev/office-ui-fabric-react/blob/master/packages/styling/src/styles/theme.ts) in `_makeSemanticColorsFromPalette()`.


## What happens when you theme?

At a high level, there is a theme definition, which defines the desired color scheme. The theming module, which does the actual work, parses this theme definition, then updates any registered CSS to match the given color scheme.

Inside the registered CSS are theme tokens that the theming module keeps track of. These theme tokens are basically variables, whose values the theming module changes based on the provided theme definition.


## What does the theming?

We have two theming modules that can apply a theme.
The first operates on raw CSS, the second manages styles defined in code that are not put onto the page until needed.

### `load-themed-styles` package

The old way, which most of our components still use, uses the [load-themed-styles package](https://github.com/Microsoft/web-build-tools/tree/292582a72afbcff6409c89bfb258ca6fa65f27b3/libraries/load-themed-styles).
This is a backwards-compatible method of theming that operates on raw CSS, such as CSS written by hand or compiled from SASS or LESS.
The raw CSS uses theming tokens, which are strings, as variables, in place of actual colors.
The module will find these tokens and replace them with the value of the corresponding slot as the theme changes.
All styles must also be registered through this module instead of being put directly on the page.
See the documentation for more details on implementation.

### `styling` package
The new and recommended way is the [styling package](https://github.com/OfficeDev/office-ui-fabric-react/tree/master/packages/styling) in this repo.
Styles are defined in a JSON format and managed in code, avoiding issues like specificity and providing a typesafe surface for customization.
The theme itself gets passed to the component. As the theme changes, the state of the component changes as well, and it will modify its own CSS to match.

This is the recommended path forward for new components, but it does have quite a learning curve.
[todo: link to new documentation about conversion process]

The `loadTheme()` call in the `styling` package will automatically invoke `loadTheme()` from `load-themed-styles` as well.
Thus, new environments should implement theming with the `styling` package regardless of whether they intend to do styles-in-code or styles with a CSS preprocessor.
Additionally, the `styling` package contains logic for defining default and fallback values for certain theme slots.


## Who applies the theme?

The host app is responsible for getting the theme and then applying it to the page by calling `loadTheme()`.
This can be called multiple times to dynamically change the theme.

