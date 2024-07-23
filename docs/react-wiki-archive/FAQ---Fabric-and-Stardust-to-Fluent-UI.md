# FAQ - Fabric and Stardust to Fluent UI

Fabric and Stardust are evolving into Fluent UI. Here are some common questions and answers.

### Fabric to Fluent UI...why the name change?

It's a consolidation of names and concepts.

Fluent UI represents our UX building approach. It encapsulates Microsoft's concerted effort to unify design and code across platforms and technologies while following the Fluent Design System.

This extends beyond Fabric's original roots in web and React, hence the rename. We want one umbrella to fold our component and theming efforts under.

### How am I affected by Fluent UI?

If you're a Fabric customer:

Nothing at this time. If you have references to `office-ui-fabric-react` in your app, rest assured that whether you're still on v5, v6, or v7, we will still take PRs and apply fixes as needed.

Our primary package was renamed to `@fluentui/react`, but this package simply exports bits from the `office-ui-fabric-react` package. This ensures no partners are broken, they still receives fixes, but you can upgrade your package name at your leisure.

Our plan is that the upcoming v8 package will start publishing only under the `@fluentui/react` name. To make the transition easier, we will be offering an upgrade script you can run on your project to upgrade to v8. This will fix your package names, but also make sure that any components which have major breaking improvements are patched to reference compat imports so that you can adjust to consume improvments when you're ready.

### What package should I use to build a new application?

#### `@fluentui/react` - Best for building Office apps\*

- Used by Outlook, SharePoint, Office (Word/PowerPoint/Excel), and more.
- Consolidating with `@fluentui/react-northstar` over time
- Default look and feel: **Fluent**
- Follows semantic versioning: **Yes**
- Release frequency: **~2 major release per year**
- Break frequency: **On major releases**
- Use: **For building experiences aligned with Office UX.**

#### `@fluentui/react-northstar` - Best for building Teams apps\*

- Used by Microsoft Teams, Teams Apps.
- Consolidating with `@fluentui/react` over time
- Default Look and Feel: **Fluent - Teams**
- Follows SemVer: **Yes, but pre-release (only major releases)**
- Release Frequency: **As needed: ~Monthly**
- Break Frequency: **No more frequent than Monthly**
- Use: **Fast moving package for building experiences aligned with Teams UX.**

**\* Both libraries are converging over time. Review the docs for each and choose the best starting point for you today.**

There also is a `@fluentui/react-next` package that acts as a staging ground for components. This package should only be used for early testing and validation. It should not be used for production.

### Why Stardust? Why the merge? Why 2 libraries in one repo?

Microsoft is a large organization with many efforts. Customers were running into issues working on M365 code which needed to integrate with Teams, which was building out Stardust separately from Fabric. This diversion led to fragmentation, causing partners to build their apps twice.

We recognize that as a huge issue. As a result, we have decided to converge the two libraries to provide one solution. It can't happen overnight, so we're moving along to pull the best of Stardust concepts and Fabric concepts and ship them iteratively in installments.

Fabric customers should rest assured, we have not dropped support for you.

Stardust customers should also rest assured; we won't drop support for you either.

Our end goal is to unify these things. One styling solution, one theming solution, one set of utilities, one set of component authoring patterns, one set of components, one documentation site.

### Are the different release channel packages compatible with each other?

They can live side by side. They currently use different theming and css approaches, which is something we're addressing over the next future updates.
