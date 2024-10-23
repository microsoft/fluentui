This document describes theming at a high level. For low level technical details, follow the links.

**Note that the information on this page currently applies only to `@fluentui/react` version 7/8 (and `office-ui-fabric-react`)**, not `@fluentui/react-northstar` or `@fluentui/web-components`.

## What is theming?

Theming is a mechanism by which a consistent look and feel can be applied to all the components on a page. For now, this means sharing a color scheme across the entire page.

## What's in a theme?

A theme is defined by a simple collection of variables (which we call slots) with string values.
For example, `themePrimary` by default is `"#0078d4"`, but it could easily be `"rgba(0, 120, 212)"`.

## What are theme slots?

There are two kinds of theme slots: palette slots and semantic slots.

Palette slots are documented in [IPalette.ts](https://github.com/microsoft/fluentui/blob/master/packages/theme/src/types/IPalette.ts). These are **descriptive** slots: it gives you an idea of what the color is, but you decide how to use it. Most slots with color names (besides `white` and `black`), such as `yellow` and `yellowLight`, will remain a shade of yellow in all themes, useful in cases where color has meaning (such as for errors and warnings). Customizing palette slots allows broad-stroke changes to the overall color scheme.

Semantic slots are documented in [ISemanticColors.ts](https://github.com/microsoft/fluentui/blob/master/packages/theme/src/types/ISemanticColors.ts). These are **prescriptive** slots: each one has an intended use. This allows more targeted customizations. For example, you could change the light gray color of a disabled checkbox without affecting the light gray background used by list item hover/selection state, even though they share the same color, because they use different slots. This wouldn't be possible with palette slots.

We highly recommend using semantic slots wherever possible.

<a name="add-semantic-slot"></a>

> **NOTE:** The semantic slot list is fairly comprehensive, and should satisfy the vast majority of theming needs. Fluent UI React's policy is that semantic slots may NEVER be removed from the list, so any additions are permanent. _Adding new slots should be a rare event that requires ample justification._
>
> If a designer can make a case that a new semantic slot is needed, **a new slot can be added to Fluent UI React with the following process:**
>
> 1. The new slot must be approved by the Fluent UI React theming feature crew
> 2. Add the slot definition to the [interface](https://github.com/microsoft/fluentui/blob/master/packages/theme/src/types/ISemanticColors.ts), with a description on how it can be used
>    - Follow the naming convention at the top, and try to fit it in a category
> 3. Add the slot's default palette color in the default blue theme in [`makeSemanticColors()`](https://github.com/microsoft/fluentui/blob/master/packages/theme/src/utilities/makeSemanticColors.ts)
> 4. Add the variant-specific logic to the [variants package](https://github.com/microsoft/fluentui/blob/master/packages/variants/src/variants.ts)
> 5. For backwards-compatibility with SASS, run the script to add the semantic slot and raw default color to the [fallback scss file](https://github.com/microsoft/fluentui/blob/master/packages/common-styles/src/_semanticSlots.scss): from within `packages/common-styles`, run `yarn update-sass-theme-files`.

## How do I make a theme?

Check out the [Theme Designer](https://aka.ms/themedesigner) tool to quickly create a custom theme.

You can define just the subset of slots you want to customize.
For instance, you could overwrite all the `neutral*`s with shades of red.
Anything using one of those palette slots will become reddish.

Semantic slots usually "inherit" from a palette slot. For example, the `bodyText` semantic slot, if uncustomized, will always pick up the color from the palette slot `neutralPrimary`. You can see these default assignments in [`makeSemanticColors()`](https://github.com/microsoft/fluentui/blob/master/packages/theme/src/utilities/makeSemanticColors.ts).

## What happens when you theme?

At a high level, there is a theme definition, which defines the desired color scheme. The theming module, which does the actual work, parses this theme definition, then updates any registered CSS to match the given color scheme.

Inside the registered CSS are theme tokens that the theming module keeps track of. These theme tokens are basically variables, whose values the theming module changes based on the provided theme definition.

## How to apply the theme?

Once you have defined the theme for your app, you need to apply the theme to the components. Fluent UI React currently supports multiple ways of applying themes. You can read [this wiki page](https://github.com/microsoft/fluentui/wiki/How-to-apply-theme-to-Fluent-UI-React-components) for more details.
