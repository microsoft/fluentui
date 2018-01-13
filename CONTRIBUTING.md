# Contributing to Office UI Fabric

## Components
Our components are a collection of small, independent, general-purpose UI components intended to be reused throughout an existing application.

### Contributing new components
We have two main buckets for our new and existing components, Experimental and Fundamental. These categories are created to notify Fabric users which components are expected to be fully supported and stable and which ones are likely to change drastically over a short period of time.

### Design

#### Does the component already exist?
Before making the decision to design a new component, check to see if the pattern already exists within any current Microsoft design system including our [Adobe XD Toolkit](https://static2.sharepointonline.com/files/fabric/fabric-website/files/officeuifabric.zip). If you are a Microsoft employee please check the internal version of the [Adobe XD Toolkit (Microsoft Employees)](https://microsoft.sharepoint.com/teams/OfficeUIFabric97) or if you have more in depth questions regarding any Microsoft design system, please visit our internal Microsoft [Teams channel](https://teams.microsoft.com/l/channel/19%3a73a5dbc26c9a4d8d91264611995bbdbb%40thread.skype/Fabric%2520Design?groupId=ffe264f2-14d0-48b5-9384-64f808b81294&tenantId=72f988bf-86f1-41af-91ab-2d7cd011db47).

#### Is the proposed component a variant of an existing component?
If the new component pattern you are proposing already exists, but varies slightly, then please consider creating a variant of the existing pattern. For example, if you were to create a new button that does 1 new thing for our exisiting button then we would suggest creating a variant off the original button, but containing the one additional feature.

#### Qualify - Should it be a shared component?​
If it’s a new component request, does it add value at a broad level or is it a product-specific customization?​ Product-specific customizations should be stored in local product repos. [//]: # (TODO: add line exlaining how we extend our components and also create a page for extending components)

#### Does this pattern contain Microsoft Intellectual Property?
If the new component contains Microsoft Intellectual Property, it should be considered Internal and therefore all discussions around the component should __only__ happen internally or within our [Fabric Design Teams channel](https://teams.microsoft.com/l/channel/19%3a73a5dbc26c9a4d8d91264611995bbdbb%40thread.skype/Fabric%2520Design?groupId=ffe264f2-14d0-48b5-9384-64f808b81294&tenantId=72f988bf-86f1-41af-91ab-2d7cd011db47). If the component does not contain Microsoft Intellectual Property then this component can be discussed directly on GitHub in our [issues section](https://github.com/OfficeDev/office-ui-fabric-react/issues).

#### Create
Create a new component pattern or leverage an existing component and create a variant. Use our [Adobe XD Toolkit](https://static2.sharepointonline.com/files/fabric/fabric-website/files/officeuifabric.zip) as a model for how we document component patterns in Fabric. ​We require that all components have detailed usage guidelines for developers and designers who want to integrate this pattern into their respective product/project. Component should be genericized before submission as much as possible leaving out product specific colors/customizations etc.

#### Review and Socialize​
Ask for design feedback within the Fabric community through our [Fabric Design Teams channel](https://teams.microsoft.com/l/channel/19%3a73a5dbc26c9a4d8d91264611995bbdbb%40thread.skype/Fabric%2520Design?groupId=ffe264f2-14d0-48b5-9384-64f808b81294&tenantId=72f988bf-86f1-41af-91ab-2d7cd011db47). Or, schedule review with the HVC product team for review.
Socialize component in Fabric community so other teams have visibility. ​ You can also post an issue on GitHub outlining the component request as long as it doesn't contain any Microsoft Intellectual Property.

### Design Implementation

#### Request the component be added to our Fabric Adobe XD toolkit.
Submit Internal components to our [Fabric Design Teams channel](https://teams.microsoft.com/l/channel/19%3a73a5dbc26c9a4d8d91264611995bbdbb%40thread.skype/Fabric%2520Design?groupId=ffe264f2-14d0-48b5-9384-64f808b81294&tenantId=72f988bf-86f1-41af-91ab-2d7cd011db47) so a designer on our team can update our toolkit. External components can be submitted via GitHub in our [issue tracking](https://github.com/OfficeDev/office-ui-fabric-react/issues) section.

### Where does the code live for this component?
If the component has no Microsoft Intellectual Property then it belongs in our public project office-ui-fabric-react. If the component contains Microsoft Intellectual Property then it must live internally. Please reach out to our team for more information about our internal repository.

### How we categorize components within the project.

#### Experimental components
Experimental components are any new components and or do not currently exist within our [Adobe XD Toolkit](https://static2.sharepointonline.com/files/fabric/fabric-website/files/officeuifabric.zip). By Default, our `create-component` script will place the component folder and files in packages/experiments. new components stay in the experimental phase until a Fabric team member approves the migrations from Experimental to Fundamental. Experimental components are developed in the experiments project located in the `<root of project>packages/experiments` folder. We also view any components that were created as a prototype or proof of concept to be an experiment.

#### Fundamental components
Fundamental components are the official React representation of our [Adobe XD Toolkit](https://static2.sharepointonline.com/files/fabric/fabric-website/files/officeuifabric.zip) and receive higher priority in respect to stabilization, bug fixes, accessibility, and general design resourcing. Components __cannot__ be immediately added as a Fundamental type component as it will need a period of stabilization and potential API changes. A good portion of the components are currently integrated within some of our major products such as OneDrive and SharePoint. Fundamental components are developed in the office-ui-fabric-react project and within our `<root of project>/packages/office-ui-fabric-react` folder.

### Getting started coding your component

#### Creating a component via the command line
1. Open a command prompt in the root directory of your project directory.
2. Run `npm run create-component -- --name YourAwesomeNewComponentName`
  * Our components use the Pascal Case naming convention.

#### Creating a component manually.
1. From the root of the project, navigate to `packages/experiments/src/components/`
  * Note: All new components should start off as an experimental component in the experiment package. As the component matures, and the Fabric team signs off then we can migrate it over to our main component project.
2. Create a new folder here with your component name
  * Our components use the Pascal Case naming convention.
  * In this example the component will be called `ExcitingNewComponent`.
3. Create a `ExcitingNewComponent.types.ts` file that will contain an interface for your props
  * Import React
    * `import * as React from 'react'`;
  * Import ExcitingNewComponent
    * `import { ExcitingNewComponent } from './ExcitingNewComponent'`;
    * Note: This class and file don't exist yet but they will during step 4 of this small tutorial.
  * Create an empty interface `IExcitingNewComponent`
    * `export interface IExcitingNewComponent {}`
  * Add your props interface to this file.
    * `export interface IExcitingNewComponentProps extends React.Props<ExcitingNewComponent> { … Props }`
  * Create and export an interface for ExcitingNewComponent styles.
```
    export interface I{{componentName}}Styles {
      /**
      * Style for the root element
      */
      root?: IStyle;
    }
```
4. Create a react file, `ExcitingNewComponent.tsx`.
  * Import React
    * `import * as React from 'react';`
  * Import BaseComponent
    * `import { BaseComponent } from '../../Utilities';`
  * Import IExcitingNewComponentProps
    * `import { IExcitingNewComponentProps } from './ExcitingNewComponent.types';`
  * Add your class to this file.
    * Add the following example class
    * `export class ExcitingNewComponent extends BaseComponent<IExcitingNewComponentProps, {}> { };`
5. Create a class names file `ExcitingNewComponent.classNames.ts`
  * Import memoizeFunction.
    * `import { memoizeFunction } from '../../Utilities';`
  * Import mergeStyles.
    * `import { mergeStyleSets } from '../../Styling';`
  * Import ExcitingNewComponent.
    * `import { IExcitingNewComponentStyles } from './ExcitingNewComponent.types';`
  * Create and export an interface for your class names.
```
    export interface IExcitingNewComponentClassNames {
      /**
      * Root html container for this component.
      */
      root?: string;
    }
```
  * Create and export getClassNames
```
    export const getClassNames = memoizeFunction((): IExcitingNewComponentClassNames => {
      return mergeStyleSets({
        root: []
      });
    });
```