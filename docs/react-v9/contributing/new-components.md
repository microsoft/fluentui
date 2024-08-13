# Contributing a new component to Fluent UI React

Our components are a collection of small, independent, general-purpose UI components intended to be reused throughout an application.

## Questions to ask before starting to build a new component

### Does the component already exist?

Before making the decision to design a new component, check to see if the pattern already exists within any current Microsoft design system including our Figma toolkit. Please feel free to open Github issues to clarify doubts.

If you are a Microsoft employee please check the internal version of the Figma toolkit or if you have more in depth questions regarding any Microsoft design system, please visit our internal Microsoft [Teams channel](https://teams.microsoft.com/l/channel/19%3ab743ef5589594c2e8a28b720003cb2ea%40thread.skype/Design?groupId=ffe264f2-14d0-48b5-9384-64f808b81294&tenantId=72f988bf-86f1-41af-91ab-2d7cd011db47).

### Is the proposed component a variant of an existing component?

If the new component pattern you are proposing already exists, but varies slightly, then please consider creating a variant of the component. For example, if you were to create a new button that does one new thing for our existing button then we would suggest creating a variant off the original button, but containing the one additional feature. The **Button** component is a good example of this. It has multiple variants like the **ActionButton**, **PrimaryButton**, **CommandBarButton** each of which is a very small component in itself. They all use the **BaseButton** for the core implementation but apply specific variations.

### Should it be a shared component?​

If it’s a new component request, does it add value at a broad level or is it a product-specific customization?​ Product-specific customizations should be stored in local product repos.

There are also certain components which should only be used in first-party Microsoft products and therefore are not appropriate to include in a public component library. A commonly requested example is the Microsoft 365 suite header/nav bar (containing the app switcher, settings, etc).

### Does this pattern contain Microsoft Intellectual Property?

If the new component contains Microsoft Intellectual Property, it should be considered Internal and therefore all discussions around the component should **only** happen internally or within our [Fluent Design Teams channel](https://teams.microsoft.com/l/channel/19%3ab743ef5589594c2e8a28b720003cb2ea%40thread.skype/Design?groupId=ffe264f2-14d0-48b5-9384-64f808b81294&tenantId=72f988bf-86f1-41af-91ab-2d7cd011db47). If the component does not contain Microsoft Intellectual Property then this component can be discussed directly on GitHub in our [issues section](https://github.com/microsoft/fluentui/issues).

### Get started 🎉

Follow the component [implementation guide](component-implementation-guide.md) for the technical path forward for creating a new component.
