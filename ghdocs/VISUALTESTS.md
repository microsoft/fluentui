# Testing

## Basics

Visual testing is still in the early stages and is subject to change.

Our tests are visual tests are built with with [PhantomCSS](https://github.com/Huddle/PhantomCSS) which makes extensive use of [Casperjs](http://casperjs.org/).

In order to have PhantomCSS run you must have python version 2.6 or higher installed.

To run tests:

1. Navigate to git/office-ui-fabric-react/packages/office-ui-fabric-react in command prompt.
2. Run gulp visualtest --production

To create new tests:
1. Add a file to the component you want to test named [ComponentName]Page.visualtest.tsx. This is where you will put all of the code for rendering the components you want to test. For example:

ButtonPage.visualtest.tsx
```typescript
import { DefaultButton, IconButton } from './index';
import { IconName } from '../../Icon';
/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */
export default class ButtonVPage extends React.Component<any, any> {
  public render() {
    let iconName: IconName = 'Snow';
    return <div >
      <DefaultButton id='DefaultButton'> I'm a button! </DefaultButton>
      <div style={ { backgroundColor: 'white' } }>
        <IconButton id={ 'IconButton' } icon={ iconName } />
      </div>
    </div>;
  }
}
```
2. Create a file to run the test, named [ComponentName].visualtest.ts . In this file you will need to import Casper and a IPhantomCss. Additionally you will need to declare 2 vars, phantomcss and casper (see below). Then you can use them to perform various functions. The proper start url to give casper is baseUrl + [ComponentName] (For example ` baseUrl + 'button' `). The Most important one is phantomcss.screenshot which actually performs the screenshot tests.

For Example:
Button.visualtest.ts
```typescript
import { Casper, IPhantomCSS } from '../../visualtest/PhantomCssInterface';
import { baseUrl } from '../../common/VisualTest'
declare var phantomcss: IPhantomCSS;
declare var casper: Casper;
/* tslint:disable:no-function-expression */
casper.
  start(baseUrl + 'button').
  then(function () {
    phantomcss.screenshot('#DefaultButton', 'Button_not_pressed');
  }).then(function () {
    this.mouse.move('#DefaultButton');
    phantomcss.screenshot('#DefaultButton', 'Button_Hovered');
  }).then(function () {
    this.mouse.down('#DefaultButton');
    phantomcss.screenshot('#DefaultButton', 'Button_pressed');
  }).then(function () {
    phantomcss.screenshot('#IconButton', 'Icon_Button');
  })
casper.run(function () { casper.test.done(); });
/* tslint:enable:no-function-expression */
```
3. Add you're test component to VisualTestRootState. You'll just need to add the componentPath.

## Some Common Problems

* Browser methods aren't working.
  * Using browser methods like getBoundingClientRect won't work when using ReactTestUtils to render a document fragment. It's possible to mock this method out if you need, see the FocusZone unit tests as an example. You can also render the objects inside the actual dom, see [Example Without ReactTestUtils](#basic-example-without-reacttestutils) for more information.
* My event isn't being triggered.
  * React uses synthetic events, so you should will need to use the synthetic events. For example ReactTestUtils.Simulate.change(<yourelement>)