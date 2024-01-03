Fluent UI includes 9 theme colors, 14 neutral colors, and 24 accent colors. In Fluent UI React, these are all within the `theme.palette` object. In Fabric Core, each has helper classes for text, background, border, and hover states. When selecting colors, refer to the [color accessibility guidance (PDF)](https://res-1.cdn.office.net/files/fabric-cdn-prod_20230815.002/fabric-website/files/coloraccessibility_29sep2016.pdf) to ensure your text can be read by everyone. If you need to customize your theme, see the [Theme Designer](https://aka.ms/themedesigner).

### What is theming?

Theming is a mechanism by which a consistent look and feel can be applied to all the components on a page. For now, this means sharing a color scheme across the entire page.

### What's in a theme?

A theme is defined by a simple collection of variables (which we call slots) with string values. For example, `themePrimary` by default is `"#0078d4"`, but it could easily be `"rgba(0, 120, 212)"`.

### What are theme slots?

There are two kinds of theme slots: Fluent UI palette slots and semantic slots.

Fluent UI palette slots are documented in [IPalette](#/controls/web/references/ipalette). These are descriptive slots, it gives you an idea of what the color is, but you decide how to use it. Most slots with color names (besides white and black), such as yellow and yellowLight, will remain a shade of yellow in all themes, useful in cases where color has meaning (such as for errors and warnings). Customizing Fluent UI palette slots allows broad-stroke changes to the overall color scheme.

Semantic slots are documented in [ISemanticColors](#/controls/web/references/isemanticcolors). These, on the other hand, are prescriptive slots, each slot having an intended use. This allows more targeted customizations. For example, you could change the light gray color of a disabled checkbox without affecting the light gray background used by list item hover/selection state, even though they share the same color, because they use different slots. This wouldn't be possible with Fluent UI palette slots. We highly recommend using semantic slots wherever possible.
