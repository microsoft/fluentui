# Contributing to Office UI Fabric

## Creating New Components

### Creating a component via the command line
1. Open a command prompt in the root directory of your project directory.
2. Run `npm run create-component -- --name YourAwesomeNewComponentName`
  * Our components use the Pascal Case naming convention.

### Creating a component manually.
1. From the root of the project, travel to `packages/experiments/src/components/`
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