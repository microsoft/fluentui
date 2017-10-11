# Testing

## Overview

Our tests are built using [Jest](https://facebook.github.io/jest/). This allows us to run tests in a node environment, and simulates the browser using jsdom.

For snapshot testing, we use `react-test-renderer` and Jest apis.

For creating React functional tests, we use [Enzyme](http://airbnb.io/enzyme/) to automate rendering. This gives us helpers for mounting a component, accessing elements rendered by it, and simulating clicks and keypresses.

## Running tests

To run tests:

In command prompt navigate to the appropriate package, for example `packages/office-ui-fabric-react`

To just validate everything works, run `npm run build`, which will build the project including running tslint and jest for tests.

To actively develop tests, you can use Jest watch mode by running `npm run start-test`.

To debug tests, you can us Visual Studio Code. Inside of a `*.test.ts` file, add a `debugger` statement where you want to break, and hit F5 to start debugging.

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

```
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

## FAQ

*Q. Browser methods aren't working.*

A. Using browser methods like getBoundingClientRect won't work when using enzyme to render a document fragment. It's possible to mock this method out if you need, see the `FocusZone` unit tests as an example.

*Q. My event isn't being triggered.*

A. Make sure to use Enzyme `simulate` api to simulate React events. For example: `menuItem.simulate('click');`
