# Testing

## Overview

Our tests are built using [Jest](https://facebook.github.io/jest/). This allows us to run tests in a node environment, and simulates the browser using jsdom.

For snapshot testing, we use `react-test-renderer` and Jest apis.

For creating React functional tests, we use [Enzyme](http://airbnb.io/enzyme/) to automate rendering. This gives us helpers for mounting a component, accessing elements rendered by it, and simulating clicks and keypresses.

Visual regression testing uses [Storybook](https://storybook.js.org/basics/introduction/) to document various UI states of components.

## Running tests

In command prompt navigate to the appropriate package, for example `packages/office-ui-fabric-react`

To just validate everything works, run `npm run build`, which will build the project including running tslint and jest for tests.

If you *only* want to run jest, you can also run only the `jest` task by running `npm run build jest`.

## Running tests in watch mode

When you are developing tests, use the watch mode to run the tests as you write them!

1. Go to the package folder where you want to run the tests.
2. Type `npm run start-test`.
3. Edit and saving tests should now cause the console to re-run the tests you have added/modified.

### Debugging

To debug tests, you can use Visual Studio Code. Inside of a `*.test.ts` file, add a `debugger` statement where you want to break, and hit F5 to start debugging.

Note: Because of limitations with the current Node LTS version, breakpoints in VSCode will not hit until you're actively in the debugger using `debugger` statement. The latest Node version however has fixes that will enable breakpoints to resolve, so this workaround is temporary.

## Writing tests

### Simple unit testing

Tests in Jest are written similar to mocha tests, though Jest includes a number of assertions that work similar to chai. A basic test example:

```ts
describe('thing', () => {
  it('does something', () => {
    expect(thing.something()).toEqual(aValue);
  });
});
```

Note that you do not need to import the assertions or the Jest APIs; they should be available automatically through the included typings.

### Snapshot testing

Jest enables you to create snapshot tests. Snapshots simply compare a JSON object with an expected output. The assertion `toMatchSnapshot` api will abstract loading a .snap file for the test to compare, or will create one if none exists.

```typescript
import * as React from 'react';
import { CommandBar } from './CommandBar';
import * as renderer from 'react-test-renderer';

describe('CommandBar', () => {
  it('renders commands correctly', () => {
    expect(renderer.create(
      <CommandBar
        items={ [
          { key: '1', name: 'name 1' },
          { key: '2', name: 'name 2' }
        ] }
      />
    ).toJSON()).toMatchSnapshot();
  });
});
```

If you ever break a snapshot, you can update all baselines either manually, or using the `npm run update-snapshots` command within a given package folder. Currently the `office-ui-fabric-react` and `experiments` packages both have snapshot testing enabled.

### Functional testing

In cases where you need to automate a component and validate it performs correctly, you can use [Enzyme](http://airbnb.io/enzyme/) apis to mount components, evaluate dom structure, and simulate events.

```jsx
  it('opens a menu with IContextualMenuItem.subMenuProps.items property', () => {
    const commandBar = mount<CommandBar>(
      <CommandBar
        items={ [
          {
            name: 'TestText 1',
            key: 'TestKey1',
            className: 'MenuItem',
            subMenuProps: {
              items: [
                {
                  name: 'SubmenuText 1',
                  key: 'SubmenuKey1',
                  className: 'SubMenuClass'
                }
              ]
            }
          },
        ] }
      />
    );

    const menuItem = commandBar.find('.MenuItem button');
    expect(menuItem.length).toEqual(1);
    menuItem.simulate('click');
    expect(document.querySelector('.SubMenuClass')).toBeDefined();
  });
```

### Visual regression testing

[Storybook](https://storybook.js.org/basics/introduction/) is a dev environment for UI components. We write 'stories' to capture different states of components. With every pull request, the stories are rendered by Screener to check for any visual changes. Screener posts a status to Github PRs where you can view the visual test report. If changes are found, the status will fail on Github until the regressions are fixed or an admin approves the changes.

Stories are found at `./apps/vr-tests/src/stories`. Most stories are written with a `FabricDecorator` that wraps the components with consistent padding. [Screener](https://github.com/screener-io/screener-storybook) steps are added to crop to a specific CSS class (most stories should crop to the `.testWrapper` class of the `FabricDecorator`) and to simulate different events, such as `hover` and `click`.

```jsx
import * as React from 'react';
import Screener, { Steps } from 'screener-storybook/src/screener';
import { storiesOf } from '@storybook/react';
import { FabricDecorator } from '../utilities';
import { Link, ILinkProps } from 'office-ui-fabric-react';

storiesOf('Link', module)
  .addDecorator(FabricDecorator)
  .addDecorator(story => (
    <Screener
      steps={ new Steps()
        .snapshot('default', { cropTo: '.testWrapper' })
        .hover('.ms-Link')
        .snapshot('hover', { cropTo: '.testWrapper' })
        .click('.ms-Link')
        .hover('.ms-Link') // Always add a 'hover' step after 'click'
        .snapshot('click', { cropTo: '.testWrapper' })
        .end() // Every set of Screener steps should finish with 'end()'
      }
    >
      { story() }
    </Screener>
  ))
  .add('Root', () => (<Link href='#'>I'm a link</Link>))
  .add('Disabled', () => (<Link href='#' disabled>I'm a disabled link</Link>))
  .add('No Href', () => (<Link>I'm rendered as a button because I have no href</Link>));
```

Certain components may be written with a custom decorator/wrapper, and you may crop to a different CSS class or omit the `cropTo` option altogether. Components that render outside its container, require specific styles on its parent, or render on a different layer, such as Callout, are cases where you would customize the decorators.

```jsx
storiesOf('Slider', module)
  .addDecorator(story => (
    // Vertical slider requires its parent to have a height specified
    <div style={ { width: '300px', height: '200px', display: 'flex' } }>
      { story() } // Render story (component) inside this container
    </div>
  ))
  .addDecorator(FabricDecorator)
  .addDecorator(story => (
    <Screener
      steps={ new Screener.Steps()
        .snapshot('default', { cropTo: '.testWrapper' })
        .hover('.ms-Slider-line')
        .snapshot('hover', { cropTo: '.testWrapper' })
        .end()
      }
    >
      { story() }
    </Screener>
  )).add('Vertical', () => (
    <Slider
      label='Basic example:'
      min={ 1 }
      max={ 3 }
      step={ 1 }
      defaultValue={ 2 }
      showValue={ true }
      vertical={ true }
    />
  ));
```

## FAQ

*Q. Browser methods aren't working.*

A. Using browser methods like getBoundingClientRect won't work when using enzyme to render a document fragment. It's possible to mock this method out if you need, see the `FocusZone` unit tests as an example.

*Q. My event isn't being triggered.*

A. Make sure to use Enzyme `simulate` api to simulate React events. For example: `menuItem.simulate('click');`
