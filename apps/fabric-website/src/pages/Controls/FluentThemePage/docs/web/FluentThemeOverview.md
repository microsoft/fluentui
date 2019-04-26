### What’s being updated in the Fluent Theme?

We’re updating Fabric to include a new set of Web Fluent design styles, which include colors, type, depth and motion which are applied to the standard set of Fabric controls. These include:

- Colors are an updated, shared set used in common components such as personas, sites, groups and calendar events. We’ve also updated the Neutrals to be warmer and more approachable.
- Typography has been updated to a new common type ramp used across core Microsoft apps, leveraging the latest type weights from Fluent.
- Depth styles now include a common set of shadow levels from Fluent, and are applied to context menus, dialogs, panels, etc.
- Motion styles have been updated to the latest Fluent styles and are applied at the component level as well as are available for standalone applications within your app.
- To ensure the consistency of your app, we're making these changes over time, but will release them all together.

### When will these updates be released?

We're tracking updates to the Fabric React components in [this GitHub project](https://github.com/OfficeDev/office-ui-fabric-react/projects/23). Fluent styles for components will continue to be added to the @uifabric/fluent-theme package for Fabric React 6. They will become the default styles for Fabric React components in v7, which we aim to release by end of May 2019.

### Can I preview the changes in my app?

Yes! We're actively seeking feedback from developers and designers. Please try the new styles in your app using the instructions that follow, and reach out to us by opening a [GitHub issue](https://github.com/OfficeDev/office-ui-fabric-react/issues/new/choose) if you have suggestions or encounter and difficulties.

#### Fabric React (Styles and components)

The Fluent theme and component updates are included in the Fluent theme package:

```
npm install @uifabric/fluent-theme
```

Once installed, the Customizer component can be used to wrap portions of your app to apply the Fluent styles. You can even wrap your entire app:

```jsx
import { Customizer } from 'office-ui-fabric-react';
import { FluentCustomizations } from '@uifabric/fluent-theme';
import { AppCode } from 'myApp/AppCode';

<Customizer {...FluentCustomizations}>
  <AppCode />
</Customizer>;
```

#### Fabric Core (CSS styles)

For apps built with Fabric Core, a [Fluent branch](https://github.com/OfficeDev/office-ui-fabric-core/tree/fluent) is available for testing. This includes new colors, type sizes, animations, and shadows. Use NPM to import the latest release:

```
npm install office-ui-fabric-core@fluent
```

Once imported, you can reference the new SCSS variables and mixins for colors, type sizes, animations, depth, and more.
