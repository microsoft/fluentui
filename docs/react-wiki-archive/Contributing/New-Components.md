# Contributing a new component to Fluent UI React

Our components are a collection of small, independent, general-purpose UI components intended to be reused throughout an application.

## Questions to ask before starting to build a new component

### Does the component already exist?

Before making the decision to design a new component, check to see if the pattern already exists within any current Microsoft design system including our Figma toolkit _(public link needed)_. Please feel free to open Github issues to clarify doubts.

If you are a Microsoft employee please check the internal version of the Figma toolkit _(link needed)_ or if you have more in depth questions regarding any Microsoft design system, please visit our internal Microsoft [Teams channel](https://teams.microsoft.com/l/channel/19%3ab743ef5589594c2e8a28b720003cb2ea%40thread.skype/Design?groupId=ffe264f2-14d0-48b5-9384-64f808b81294&tenantId=72f988bf-86f1-41af-91ab-2d7cd011db47).

### Is the proposed component a variant of an existing component?

If the new component pattern you are proposing already exists, but varies slightly, then please consider creating a variant of the component. For example, if you were to create a new button that does one new thing for our existing button then we would suggest creating a variant off the original button, but containing the one additional feature. The **Button** component is a good example of this. It has multiple variants like the **ActionButton**, **PrimaryButton**, **CommandBarButton** each of which is a very small component in itself. They all use the **BaseButton** for the core implementation but apply specific variations.

### Should it be a shared component?​

If it’s a new component request, does it add value at a broad level or is it a product-specific customization?​ Product-specific customizations should be stored in local product repos.

There are also certain components which should only be used in first-party Microsoft products and therefore are not appropriate to include in a public component library. A commonly requested example is the Microsoft 365 suite header/nav bar (containing the app switcher, settings, etc).

### Does this pattern contain Microsoft Intellectual Property?

If the new component contains Microsoft Intellectual Property, it should be considered Internal and therefore all discussions around the component should **only** happen internally or within our [Fluent Design Teams channel](https://teams.microsoft.com/l/channel/19%3ab743ef5589594c2e8a28b720003cb2ea%40thread.skype/Design?groupId=ffe264f2-14d0-48b5-9384-64f808b81294&tenantId=72f988bf-86f1-41af-91ab-2d7cd011db47). If the component does not contain Microsoft Intellectual Property then this component can be discussed directly on GitHub in our [issues section](https://github.com/microsoft/fluentui/issues).

---

## Component contribution process

**WARNING: As of Fluent UI React version 7/8, the general ideas on the remainder of this page are still applicable, but the specific details may be out of date. Until we have a chance to fully update this page, please file a ["new component" issue](https://github.com/microsoft/fluentui/issues/new?template=new_component.md) or [feature request](https://github.com/microsoft/fluentui/issues/new?template=feature_request.md) with an overview of your idea or reach out to the team internally for current guidance.**

Microsoft employees can contact us on Teams via [Fluent Community](https://teams.microsoft.com/l/team/19%3ab207e5bce1cf40f0bcfbc6a60b8a7682%40thread.skype/conversations?groupId=ffe264f2-14d0-48b5-9384-64f808b81294&tenantId=72f988bf-86f1-41af-91ab-2d7cd011db47) "Design" or "Fluent UI React (Web)" channels.

### Create

Create a new component pattern or leverage an existing component and create a variant. Use our Figma toolkit _(public link needed)_ as a model for how we document component patterns in Fluent UI. ​We require that all components have detailed usage guidelines for developers and designers who want to integrate this pattern into their respective product/project. Component should be genericized before submission as much as possible leaving out product-specific colors/customizations/etc.

### Review and socialize​

Ask for design feedback within the Fluent UI community through our [FluentUI Design Teams channel](https://teams.microsoft.com/l/channel/19%3ab743ef5589594c2e8a28b720003cb2ea%40thread.skype/Design?groupId=ffe264f2-14d0-48b5-9384-64f808b81294&tenantId=72f988bf-86f1-41af-91ab-2d7cd011db47). Or, schedule review with the HVC product team for review. Socialize the component in Fluent UI community so other teams have visibility. ​You can also post an issue on GitHub outlining the component request as long as it doesn't contain any Microsoft Intellectual Property.

### Design implementation

#### Request the component be added to our Fluent UI Figma toolkit.

Submit Internal components to our [Fluent UI Design Teams channel](https://teams.microsoft.com/l/channel/19%3ab743ef5589594c2e8a28b720003cb2ea%40thread.skype/Design?groupId=ffe264f2-14d0-48b5-9384-64f808b81294&tenantId=72f988bf-86f1-41af-91ab-2d7cd011db47) so a designer on our team can update our toolkit. External components can be submitted via GitHub in our [issue tracking](https://github.com/microsoft/fluentui/issues) section.

### Where does the code live for this component?

If the component has no Microsoft Intellectual Property then it belongs in our public project @fluentui/react. If the component contains Microsoft Intellectual Property then it must live internally. Please reach out to our team for more information about our internal repository.

### Component categorization and lifecycle

#### Component maturity lifecycle

Before you start coding up your component, it is important to understand the lifecycle of a component.

- All new components should start in the **Experimental** category. Please read the **Experimental components** section below for more details.

- Once the component has been designed, developed and tested it can be deemed ready for promotion to the **Fundamental components** category. Please note, these components are widely used and changes can affect a lot of products.

- Once you feel your component is ready to be promoted to become a **Fundamental component**, please request for a review with a Fluent UI core members. From outside Microsoft, you can do this through a [GitHub issue](https://github.com/microsoft/fluentui/issues).

- Once the review is complete, you should be able to promote your component to the **Fundamental components** category. That is a big milestone.

#### Experimental components

Experimental components are any new components that do not currently exist within our Figma toolkit _(link needed)_. By default, new components have historically gone under `packages/experiments` (this may change in the future). New components stay in the experimental phase until the Fluent UI core team approves the migrations from Experimental to Fundamental. Check out our [experiments checklist](Experimental-Component-Checklist) to learn more about the expectations we have of a component before a PR is created.

#### Fundamental components

Fundamental components are the official React representation of our Figma toolkit _(link needed)_ and receive higher priority in respect to stabilization, bug fixes, accessibility and general design resourcing. Components **cannot** be immediately added as a Fundamental type component as it will need a period of stabilization and API review. All components should always start off as Experimental. A good portion of the Fundamental components are currently integrated within some of our major products such as OneDrive, SharePoint and Outlook.

Fundamental components have historically been developed in the `office-ui-fabric-react` package (now `@fluentui/react`), but we're moving towards a model of per-component packages such as `@fluentui/react-component-name` which are re-exported by `@fluentui/react`.

### Start coding your component

Moving forward from fall 2020, new components should be built on top of `@fluentui/react-compose`. Detailed guidance is still in progress as of writing.

### Unit tests and screener tests

For any new component you should think of adding **Unit tests**, **React functional tests** and **Screener tests** to prevent regressions. [More details here.](Testing)

### Code owners

When you add a new component, add yourself to the [CODEOWNERS file](https://github.com/microsoft/fluentui/blob/master/.github/CODEOWNERS).
