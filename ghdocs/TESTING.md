# Testing

## Basics

Our tests are built with [Mocha](https://mochajs.org/), [Chai](http://chaijs.com/), and
[ReactTestUtils](https://facebook.github.io/react/docs/test-utils.html).

To run tests:

1. In command prompt navigate to the appropriate package, for example git/office-ui-fabric-react/packages/office-ui-fabric-react
2. Run `gulp test` to run all of the tests
  * To run only one test add `--match <Testname>`. Example: `gulp test --match Button`
  * To debug your test add `--debug`. Example: `gulp test --debug`.
    1. After running this, you will need to open the localhost url found in your command prompt.
    2. A page will open with a "Debug" button. Pressing that will open a page that loads the tests.
    3. Press f12 in the new page. Tests will be in a tests.js bundle, and you'll need to find your code in there.

## Examples

### Basic ReactTestUtils Example
```typescript
describe('ComponentName', () => {

  it('does foo', () => {
    let component = ReactTestUtils.renderIntoDocument(
      <ComponentName
        componentProps={props}}
        />
    );
      let renderedDOM = ReactDOM.findDOMNode(component as React.ReactInstance);
      let componentName = renderedDOM.querySelector('<unique selector>');
      expect(componentName).to.be.eq('foo', 'componentName was not foo');
  });
});
```

### Basic Example Without ReactTestUtils

```typescript
describe('ComponentName', () => {

  it('can render item in dom', () => {
    let root = document.createElement('div');
    document.body.appendChild(root);
    ReactDOM.render<HTMLDivElement>(
      <ComponentName
        componentProps={props}}
        />, root
      );
    let componentName = document.querySelector('<unique selector>');
    // Write assertions.
  });
});
```

## Some Common Problems

* Browser methods aren't working.
  * Using browser methods like getBoundingClientRect won't work when using ReactTestUtils to render a document fragment. It's possible to mock this method out if you need, see the FocusZone unit tests as an example. You can also render the objects inside the actual dom, see [Example Without ReactTestUtils](#basic-example-without-reacttestutils) for more information.
* My event isn't being triggered.
  * React uses synthetic events, so you should will need to use the synthetic events. For example ReactTestUtils.Simulate.change(<yourelement>)
