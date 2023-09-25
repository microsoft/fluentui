The createBrandVariants shim method allows you to create a v9 BrandVariants (a.k.a brand ramp) from a v8 Palette.

The v9 BrandVariants has 16 colors while the v8 Palette has 9 brand colors. You can choose between two algorithms when calling the shim.

- pairs (default): This interpolates the colors between each pair of palette colors (e.g. themeDarker and themeDark). This works best for palettes that are a gradient of the same color.
- primaryAndEnds: This interpolates the colors between the themeDarker and themePrimary and then between themePrimary and themeLighterAlt. Each interpolation is a mix based on the step between BrandVariants colors (e.g. 40, 50, 60). This works best to create a smooth gradient from a palette that has varied colors.

You should also feel free to make changes to the BrandVariants after using the shim to handle special palette cases.
