The createV8Theme shim method allows you to create a v8 Theme from a BrandVariants (a.k.a brand ramp) and a v9 Theme.

Create your v9 theme using `createLightTheme` or `createDarkTheme,` passing the BrandVariants you also pass to createV8Theme. The shim populates the v8 palette from the BrandVariants and the semanticColors from the v9 Theme. Because v9 Theme does not expose the BrandVariants used to create it, it must be passed in separately.
