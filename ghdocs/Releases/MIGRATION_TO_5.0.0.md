The changes from 4.x to 5.x are focused around bundle size, icon management, and css performance. Major list of changes:

* Icons have been moved to a separate `@uifabric/icons` package.
* Glamor has been replaced with `@uifabric/merge-styles` package.
* Deprecated `Button` component and `ButtonTypes` enum have been removed.

To give an idea of the bundle size impact of these change, bundling all dependencies (minus react) up to the Fabric component (one of the simplest components) has been reduced from Fabric 4 size of 34.229 KB to Fabric 5's 20.339 KB bytes gzipped. This includes all utilities, styling, and merge-styles logic, which is the foundation required for rendering Fabric components.

This 40% reduction in foundation code is a good start, but we still can do better and will continue to slice and dice the contents to reduce further in future updates.

# Migration guide from Fabric 4.x to Fabric 5.x

# Before updating to 5

It would be a good idea to update some deprecated things in your application code before the update:

1. Remove all references to Button and ButtonType. Replace with variants (PrimaryButton, DefaultButton, IconButton, CommandButton, CompoundButton.)

2. Remove all references to the `ms-Icon` and `ms-Icon-*` class names. Use the `Icon` component to render icons, rather than using Fabric Core icon class names. This will make the icon transition easier.

## Notes on Icons

Icons definitions have been a part of the bundle size problem. 5k gzipped is dedicated to the `IconCodes` code map. Most partners do not need these. Additionally, using the icons downloads the Fabric Icon font, which adds a whopping 80k font download. This is a bad practice that no partner should be burdened with. But this has been an awkward issue to address, since we also want icons to just work out of the box.

Another problem customers have faced is that the hardcoded SharePoint CDN urls to those icon fonts are not always ideal. In on-premise solutions, those urls can't be accessed and partners tend to have to redefine those rules. We want it to be easy to solve the on-premise scenario as well.

In Fabric 5, we did this:

1. We removed the IconCodes enum.

2. We added a method `registerIcons` to the `@uifabric/styling` package which enables the partner to register a subset definition (including which font to use for what codes.)

3. We updated the Icon subset tool to generate a package, including TypeScript code which would call `registerIcons` with multiple subsets.

4. The tool (which will become available on the Fabric website) can now allow a partner to choose the icons that are important to them, and then for remaining ones, can optionally split them into chunks. That means rendering the common icons would always download the first chunk but all other icons would only download the subset containing them when actually used.

The `@uifabric/icons` package is the output of that tool, and will be the official, always updated, single source of truth package for our icons. If there is an icon on the Fabric icons page, it will be registered through.

To use it, you need to npm install it and save it as a dependency. Then in your root code, initialize the icons through the imported `initializeIcons` function:

```tsx
import { initializeIcons } from '@uifabric/icons';

initializeIcons('//mycdn.com/path/to/icons/' /* optional base url, defaults to sharepoint cdn */);
```

The package has a `fonts` folder which contains the fonts which you can optionally copy to your cdn. This enables the on-prem scenario.

So, your options for supporting icons in your project are:

1. Don't use Fabric icons. 0 byte performance penalty, yay!

2. Use the `@uifabric/icons` package. 5k gzip penalty for registering all icons + used font subset download.

3. Import directly from `@uifabric/icons/lib/fabric-icons-0` to register only the first subset (which includes just the icons that Fabric components use, plus common commanding icons.) Less than 1k gzip penalty for registering just the core icons + 4k core only font subset.

4. Custom icons! Use the icon subset tool to choose the exact set of icons to register and build your own icon registration code. You can even choose to use inlined icons and include them with your JavaScript bundle.

# Glamor replacement

In Fabric 4, we introduced the library Glamor into our project as an initial step towards better control of css generation. It enabled a number of features such as contextual theming, better on demand class registration, and sharing of variables defined in javascript. Perhaps most importantly, it allows us to take `styles` in as props to components which is a much more robust and error-free way to style components compared to the fragile css class name approach which suffers from specificity and no build time validation.

In the initial set of components we converted, we saw a lot of room for improvement in Glamor:

* Bundle size penalty is ~11k total (glamor + dependencies)
* Edge performance is very poor (registering 1000 simple rules takes 350ms, and moves exponentially upwards beyond that.)
* TypeScript type safety is missing
* Numerous console warnings emitted with no way to disable them other than to use webpack with DefinePlugin defining the 'production' NODE_ENV value.

In order to address these issues, and to have tighter control over the iteration and management of this very important core service of creating controls, we are replacing it with our own library `@uifabric/merge-styles`. This allows us to address the issues:

* Bundle size reduced down to 2.6k. (~8k improvement)
* Edge performance is significantly better. (registering 1000 rules takes <45ms and stays static as you register more.)
* Registering styles is completely type safe now, so doing things like registering `background: 42` will red squiggly.
* No more console warnings
* Tighter control over the release process, we can fix things quickly
* Everything unit tested with 100% code coverage.

If you were using `mergeStyles` from the `@uifabric/styling` package before, there is a minor modification to the styles you pass into it. For selector rules such as `:hover` or `:before`, these must now be encapsulated within a `selectors` collection. This was done to keep type-safety working (once you add a string indexer, you lose type-safety benefits in catching typos like `bakcground: 'red'`.)

Before:

```tsx
mergeStyles({
  ':hover': {
    background: 'red'
  }
});
```

After:

```tsx
mergeStyles({
  selectors: {
    ':hover': {
      background: 'red'
    }
  }
});
```

Some helpers that were from glamor, such as `parent()` and `before()` have been removed, since you can express these using these selectors. If your selector statement has an ampersand in it, it will translate that into the exact rule replacing the ampersand with the generated className:

|selector|becomes|
|--------|------|
|`.parent &`|`.parent .css-123`|
|`& .child`|`.css-123 .child`|
|`&:before`|`.css-123:before`|
|`:hover`|`.css-123:hover`|
|`BUTTON.&`|`BUTTON.css-123`|
|`&&&`|`.css-123.css-123.css-123`|
