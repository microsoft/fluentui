# Testing

## Basics

Visual testing is still in the early stages and is subject to change.

Our tests are visual tests are built with with [PhantomCSS](https://github.com/Huddle/PhantomCSS) which makes extensive use of [Casperjs](http://casperjs.org/).

In order to have PhantomCSS run you must have python version 2.6 or higher installed.

To run tests:

1. Navigate to packages/office-ui-fabric-react in command prompt.
2. gulp visualtest --production                          // To generate and comapre the baseline
3. gulp visualtest --production --match <ComponentName>  // To generate baseline for one component
4. gulp visualtest --debug                               // To debug components at localhost

To create new tests:
1. Add a file to the component you want to test named [ComponentName]Page.visualtest.tsx. This is where you will put all of the code for rendering the components you want to test. For example:

CheckBoxPage.visualtest.tsx
```typescript
import { Checkbox } from './index';
/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */
export default class CheckboxVPage extends React.Component<any, any> {
  public render() {
    return <div style={ { backgroundColor: 'white' } } >
      <Checkbox className='Checkbox' label='Check Box'
        defaultChecked={ true } />
      <Checkbox className='CheckboxDisabled' label='Check Box Disabled'
        defaultChecked={ true }
        disabled={ true } />
    </div>;
  }
}
```
2. Create a file to run the test, named [ComponentName].visualtest.ts . In this file you will need to import Casper and a IPhantomCss. Additionally you will need to declare 2 vars, phantomcss and casper (see below). Then you can use them to perform various functions. The proper start url to give casper is baseUrl + [ComponentName] (For example ` baseUrl + 'checkbox' `). The Most important one is phantomcss.screenshot which actually performs the screenshot tests.

For Example:
Checkbox.visualtest.ts
```typescript
import { Casper } from '../../visualtest/PhantomCssInterface';
import { baseUrl } from '../../common/VisualTest';
import { defaultScreenshot, mouseMoveScreenshot, mouseDownScreenshot, mouseClickScreenshot } from '../../visualtest/RunVisualTest';
import { IRunVisualTest } from '../../visualtest/IRunVisualTest';

declare var casper: Casper;

let componentIds: IRunVisualTest[] = [];  // Array of components

componentIds.push({
  selector: '.' + 'ms-Checkbox-input',// Selector for event
  fileName: 'checkbox',// baseline file name
  imageSelector: '.' + 'Checkbox',// Image selector
  commands: [defaultScreenshot, mouseClickScreenshot, mouseMoveScreenshot, mouseDownScreenshot] // Events for screen shots refer RunVisualTest.ts
});

componentIds.push({
  selector: '.' + 'CheckboxDisabled',
  fileName: 'checkboxDisabled',
  commands: [defaultScreenshot]
});

casper.
  start(baseUrl + 'checkbox').
  then(() => {
    testRunner();
  });

casper.run(() => { casper.test.done(); });
```
3. Add you're test component to VisualTestState.ts You'll just need to add the componentPath.
```typescript
'./Checkbox/CheckboxPage.visualtest',
```
## Viewing Tests
To see your test results navigate to the visualtests folder in packages/office-ui-fabric-react. In the base folder you can see current screenshots. In the Results you can see the results of the tests that were run, including failures and the diff screenshot (screenshot being compared to base).

## Updating base screenshot
To update a base screenshot navigate to visualtest, delete the screenshot you wish to recreate and run gulp visualtest --production again. This will automatically create a new screenshot to be used as base, then check this screenshot into github.