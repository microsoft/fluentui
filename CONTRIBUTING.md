# Contributing to Office UI Fabric

## Components
Our components are a collection of small, independent, general-purpose UI components intended to be reused throughout an existing application.

### Contributing new components
We have two main buckets for our new and existing components, Experimental and Fundamental. These categories are created to notify Fabric users which components are expected to be fully supported and stable and which ones are likely to change drastically over a short period of time.

#### Contribute component design
If you are looking to submit a newly designed component to our design system we first suggest submitting an issue in our [issue tracking](https://github.com/OfficeDev/office-ui-fabric-react/issues) section of GitHub in order for our team and community to come to an agreement that the proposed component/feature makes sense for our project. Before making any requests or submissions we suggest looking at our [Adobe XD Toolkit](https://static2.sharepointonline.com/files/fabric/fabric-website/files/officeuifabric.zip) to see if your proposed component already exists. If it does exists, we suggest checking if your component design could be added as a variant or even replace the existing component in the toolkit.

If you are a Microsoft employee and want to contribute an internal component, please check the internal version of the [Adobe XD Toolkit (Microsoft Employees)](https://microsoft.sharepoint.com/teams/OfficeUIFabric97) or if you have more in depth questions regarding our design system please visit our internal Microsoft [Teams channel](https://teams.microsoft.com/l/channel/19%3a73a5dbc26c9a4d8d91264611995bbdbb%40thread.skype/Fabric%2520Design?groupId=ffe264f2-14d0-48b5-9384-64f808b81294&tenantId=72f988bf-86f1-41af-91ab-2d7cd011db47).

#### Experimental components
Experimental components are any new components and or do not currently exist within our [Adobe XD Toolkit](https://static2.sharepointonline.com/files/fabric/fabric-website/files/officeuifabric.zip). By Default, our `create-component` script will place the component folder and files in packages/experiments. new components stay in the experimental phase until a Fabric team member approves the migrations from Experimental to Fundamental. Experimental components are developed in the experiments project located in the `<root of project>packages/experiments` folder.

#### Fundamental components
Fundamental components are the official React representation of our [Adobe XD Toolkit](https://static2.sharepointonline.com/files/fabric/fabric-website/files/officeuifabric.zip) and receive higher priority in respect to stabilization, bug fixes, accessibility, and general design resourcing. Components __cannot__ be immediately added as a Fundamental type component as it will need a period of stabilization and potential API changes. A good portion of the components are currently integrated within some of our major products such as OneDrive and SharePoint. Fundamental components are developed in the office-ui-fabric-react project and within our `<root of project>/packages/office-ui-fabric-react` folder.

#### Creating a component via the command line
1. Open a command prompt in the root directory of your project directory.
2. Run `npm run create-component -- --name YourAwesomeNewComponentName`
  * Our components use the Pascal Case naming convention.

#### Creating a component manually.
1. From the root of the project, navigate to `packages/experiments/src/components/`
  * Note: All new components should start off as an experimental component in the experiment package. As the component matures, and the Fabric team signs of then we can migrate it over to our main component project.
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