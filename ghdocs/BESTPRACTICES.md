# Component design

## Basic expectations for every component

- The component can always provide `id`, `className`, `style`, `aria-*` and `data-*` attributes on the container of a component.

- If the component represents a standard HTML element (e.g. Button), we should mix in the valid root props using the `getNativeProps`
utility so that we can let the user use native things as expected.

- If the component hosts clickable elements, there must be a way to inject `data-*` attributes onto the clickable things. This enables
automation to be built downstream.

- Interactable elements must be accessible via keyboard, mouse, and touch`. Nothing can be ONLY interactable by mouse.

## Build many smaller components and compose them together.

Often we want to build something complex, like a CommandBar. We see a picture of what we want and we build one giant component that does
this. Then we find other scenarios that have overlaps. The CommandBar contains a SearchBox, a set of left side collapsable links and right
side links. We may find we have other cases that just want a set of links, without the extra overhead. We may also find cases where we just
want a single command bar item with a dropdown menu.

This is an example where instead of building a single large component, we should build more atomic building blocks that are puzzled
together. While it may be more effort to think in smaller blocks, it makes the code easier to reuse and often simpler to maintain.

## Use a .Props.ts file to extract out the public contracts that should be supported and documented.

A props file contains all of the interface contracts that the user should know about to use the component. It is the "contract" for the
component. When we evaluate semversioning, we look through the changes at Props files to determine if the change is a major, minor, or
patch.

The props files are also auto documented. All JSDoc comments will be extracted and shown on the demo site for documentation.

When your component exposes public methods/properties, define an interface for the component in the props file and implement the interface.
The auto documentation will interpret the I{Component} interface as the class contract and show it in the documentation as the class
definition.

```typescript
interface IButton {
  /**
   * Sets focus to the button element.
   */
  focus(): void;
}
```

### Provide explicit return types for methods declared in .Props.ts

Bad:
```typescript
interface IButton {
  /**
   * Sets focus to the button element.
   */
  focus();
}
```

Good: explicitly specify the return type of `focus`:
```typescript
interface IButton {
  /**
   * Sets focus to the button element.
   */
  focus(): void;
}
```

## Naming guidance

### Flags(Booleans)

Property flags should be as consistent as possible with given html guidelines.

The names should reflect the exceptional case. If something is visible by default, the name should be `hidden`. If something is selected by
default, the name should be `unselected`. By doing this, it becomes really clear to the consumer what the default value for the flag is
(the opposite of the name) and it makes it easy to use the component in its default state without guessing which flag needs to be set for
it to be used (e.g. Panels have an isOpen flag that MUST be set to true for them to show up... that's a bad developer experience as it
requires them to read through all of the property descriptions in order to understand how to get the Panel to show up.)

If a flag needs to be targeted at a specific subject (the foo label), prefix the flag with the subject: `fooLabelHidden`. The subject
should be easy to understand; avoid unclear generalizations.

Avoid prefixed subjects if it pertains to the primary subject of the component. (for TextField, “disabled” is good enough for a flag
controlling the disabled state of the input element.)

|BAD|GOOD|Notes|
|---|----|-----|
|isChecked|checked|There is an HTML precidence for checked.|
|isVisible|visible|
|isSelected|selected|
|isEnabled|disabled|If the state is enabled by default, it should be named for the exceptional case.|
|isOpen|hidden|If the exceptional case should be that we hide something, call it hidden.|
|isFooDisabled|fooButtonDisabled|If the `foo` subject is unclear, make is specific to the type.|
|buttonDisabled|disabled|If the subject IS the component, don't give it a subject name.|

### Event callbacks

Event callbacks should be prefixed with `on`. If it is necessary to target a subject, the subject should be in between `on` and the event
name.

|BAD|GOOD|Notes|
|---|----|-----|
|mouseClick|onClick|
|inputClick, onClickInput|onInputClick|


It should also be noted that for event callbacks, the ORDER of parameters should be consistent with the precisdence if one exists. For
example:

|BAD|GOOD|
|---|----|
|`onClick: (item: any, ev: React.MouseEvent) => void`|`onClick: (ev?: React.MouseEvent<{}>, item?: any) => void`

### Custom render methods

In cases where you wish to give the user a way to render a custom version of a thing, follow the convention `onRenderSubject`. It should
also use the `IRenderFunction` interface defined in common, which takes in `props` and a `defaultRender` function and returns a JSX element:

BAD:
`renderItem: (item: any, foo: any, bar; any) => JSX.Element`

GOOD:
`onRenderItem: IRenderFunction<IItemProps>`

## Use @autobind. Avoid ALL binds in templates

The autobind decorator simplifies making event callbacks "bound" to the instance. It's easy to use:

```typescript
class Foo {

  @autobind
  public _onClick(ev: React.MouseEvent) {
  }

}
```

When we use bind in a template, it means that the function is recreated every time, which is an anti-pattern.

## For gathering refs, avoid string refs, use resolve functions

Facebook has deprecated the use of string refs. Plus, string refs don't play very well with some scenarios like in Layered content, where
the content may be asynchronously rendered. The recommendation is to use functions to resolve refs. These functions must be pre-bound to

Bad:
```typescript
public render() {
  return <div ref='root' />
}
```

Bad:
```typescript
public render() {
  return <div ref={ (el) => this._root = el } />
}
```

Acceptable:
```typescript
private _root: HTMLElement;
private _resolveRoot: (element: HTMLElement) => any;

constructor() {
  this._resolveRoot = (el: HTMLElement) => this._root = el;
}

public render() {
  return <div ref={ this._resolveRoot } />
}
```

Best, use _resolveRef in BaseComponent:
```typescript
class Foo extends BaseComponent<...> {
  private _root: HTMLElement;

  public render() {
    return <div ref={ this._resolveRef('_root') } />;
  }
}
```

Note that it's very critical you do NOT inline the functions in render! This causes weird side effects, because the function
is recreated. If you do this, react will call your function with null to clear it, and then render, and then once complete, will
call it again with the element. This creates timing issues where your ref may be null when you didn't expect.

See example here that illustates refs being re-evaluated:

http://codepen.io/dzearing/pen/WGZOaR

## Use unique keys for items in a mapped array, avoid indexes for keys

```typescript
public render() {
  return (
    <div>
      { this.props.items.map((item, index)=> (
        <div key={ item.key }>
          <input type="text" />
        </div>
      )) }
    </div>
  );
}
```

When you need to map data, require that your data have unique ids available. When you map the data to content, use the id as
the item's key. This helps React's dom diffing to understand which elements represent which items.

When your code uses index as the key, this can cause unexpected side effects. For example, say that each component you map items to
maintains some internal state, like the value in an uncontrolled input box. Removing an item in the array will not reset that state
and react will think the first text box still represents key "0", which is actually now a different item, and thus will not re-render
the component, leaving the old state intact.

So lesson is, use actual unique ids for items that come from the data, rather than generated by the ux component, and thus require
that your data has ids so that you can use that as a unique identifier for rendering.

## Avoid nesting content in an array, wrap mapped content in component instead.

When we do inline mapped entries, we want to inline the content in the map:

Bad:
```typescript
class Foo extends React.Component {
  public render() {
    return (
      <div>
        { items.map(item => (
          <div key={ item.key } onClick={ this._onItemClick.bind(this, item) }>{ item.name }</div>
        ))}
      </div>
    );
  }
}
```

Better:
```typescript
class Foo extends React.Component {
  public render() {
    return (
      <div>
        { items.map(item => (
        <ItemComponent key={ item.key } item={ item } />
        )) }
      </div>
    );
  }
}

class ItemComponent extends React.Component<...> {
  let { item } = this.props;

  render() {
    return (
      <div onClick={ this._onClick }>{ item.name }</div>
    );
  }

  @autobind
  _onClick(ev: MouseEvent) {

  }
}
```

## Extend from BaseComponent instead of React.Component in most cases.

In the common folder, there exists a BaseComponent class. For simple components, it may be unnecessary to use.

If you extend this, you get a few useful utilities:

_events: An instance of the EventGroup, scoped to the component. It will auto dispose on component unmounting so that you don't forget.

_async: A collection of utilities for performing async operations, scoped to the component. This includes setTimeout/setInterval helpers as
well as utilities for generating throttled/debounced wrappers. Again, anything you use here will be automatically cleaned up on unmounting.

_disposables: An array of IDisposable instances. If you have things you want disposed, you can push them into this.

Another interesting thing is that when exceptions occur within React's methods, things tend to silently fail. With the BaseComponent, we
make all methods "safe" meaning that if an exception occurs, we send the exception to a global callback which can be hooked up to a
telemetry post. By default however, we forward the exception to `console.error` with the exact class/method that threw the exception so
that there is an obvious hint what went wrong.

There are some cases where it may be overkill to subclass from this; a simple Button wrapper for example really doesn't need to be more
than a simple stateless component and doesn't need extra imports, which would result in making Button's dependency graph heavier. Use your
best judgement.

## Use React eventing, unless you need to use native.

Be aware that React eventing and DOM eventing are two different systems. They do not play well with each other. DOM event handlers will
always fire BEFORE React events, regardless of the DOM structure. This can introduce unexpected bugs in code that mixes both React and
native DOM eventing.

Unfortunately there are plenty of scenarios where we must mix the two systems together; for example, you may need to listen for
application-wide clicks that bubble up to window in order to implement a light-dismiss behavior. Or perhaps you need to listen for window
resizes. Or maybe you need to observe scroll events so that you can hide/show something.

We use the EventGroup object for abstracting native eventing. It is simple to use; there is an "on" method and an "off" method that wrap
calling addEventListener in modern browsers (or attachEvent in legacy IE.) Again if you're using the BaseComponent, it is already available
to you via the _events property.

## Root elements should have a component class name.

Every component's root element should have a ms-Component class name. Additinally the user should be able to provide their own className
via prop that should be added to the class list of the root element.

If specific component elements need special classnames injected, add more classNames to props.

A component's SCSS file should ONLY include files applicable to the component, and should not define styles for any other component.

# Data/state management best practices

## Things to flat out avoid

Singletons and globals. Do not share state of a component via a singleton instance object. This is a pure anti-pattern for the following
reasons:

* Singletons have no lifetime and therefore can't initialize/clean up when they aren't used.
* Singletons often paint you into a corner when you want more than one of the same thing on the page.
* They are often difficult to test without polluting states required for other tests.
* The make non-browser scenario reuse really difficult. (Build tooling, server side code.)

Data and state should always follow the lifetime of the component that owns it. When that component is no longer needed, the state should
be garbage collected, event handlers should be removed, and xhr requires spawned in that context should be cancelled.

There are cases where everything should share a common instance of a store; Persona presence is a great example. We have solutions that
enable the code within a component scope to access shared stores. See store usage section below.

## Use const values global to a file, rather than as static members

Don't use public/private statics, use file scope.

Bad:
```typescript
class Foo {
  private static DEFAULT_DELAY = 300;
}
```

Good:
```typescript
const DEFAULT_DELAY = 300;

class Foo {
}
```

Note: using file scopes minimizes the name down to 1 character, whereas this.REALLY_LONG_NAME doesn't minify the name. Caveat being
that if you export it, minify won't touch exports.

## Use private members only for managing state local to a component that should not affect rendering when mutating

Bad:
```typescript
class Foo extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isMounted: false
    };
  }

  componentDidMount() {
    this.setState({
      isMounted: true
    });
  }

  render() {
    return <div>Hello!</div>
  }
}
```

Good:
```typescript
class Foo extends React.Component {
  private _isMounted: boolean;

  constructor(props) {
    super(props);
    this._isMounted = false;
  }

  componentDidMount() {
    this._isMounted = true;
  }

  render() {
    return <div>Hello!</div>
  }
}
```

Basically privates should only be use for tracking this that in no way affect the frequency of render. In some cases, you many
have an object which fires change events yet doesn't mutate, and you want to re-render on change events. In these cases, privates
may be used to store the object reference.

## Use component state only for managing local state that is private to a component that should trigger re-render on mutation

Bad:
```typescript
class Foo extends React.Component {
  private _fooRocks: boolean;

  render() {
    return <div onClick={ this._onClick }>{ `Foo ${ this._fooRocks ? 'rocks' : 'rolls' }</div>;
  }

  private _onClick() {
    this._fooRocks = !this._fooRocks;
    this.forceUpdate();
  }
```

Good:
```typescript
class Foo extends React.Component {
  constructor() {
    super(props);

    this.state = {
      fooRocks: false
    };
  }

  render() {
    return <div onClick={ this._onClick }>{ `Foo ${ this.state.fooRocks ? 'rocks' : 'rolls' }</div>;
  }

  private _onClick() {
    this.setState({
      fooRocks: !this.state.fooRocks
    });
  }
```

## Experimental: Use a store for storing shared state within a component heirachy which must be shared across objects

While React state management is very useful for simple, private state, it becomes unweildy when many things share that state
and you start ending up with many owners of the same state value. In these cases it may drive you towards a flux solution, but
before we jump there, lets call out a few things.

* Global singletons are code smell, do not use globals or singletons except for very rare cases
* Do not store complex shared state directly in the components, this is also code smell

Instead, make a store and wire dumb components together the store.

What is a store?

Think of a store as a self aware observable; it maintains state, and provides read/write access to that state. When its state
changes, it can emit change events causing components to re-evaluate.

Here's an example store which tracks selection:

```typescript
class SimpleSelectionStore extends BaseStore {
  private _selectedKey: string;

  public isSelected(key: string) {
    return key === this._selectedKey;
  }

  public setSelected(key: string) {
    if (this._selectedKey !== key) {
      this._selectedKey = key;
      this.emitChange();
    }
  }
}
```

While we do not want globals, we do want simplified access to the stores available in a given component scope.

You can use the StoreHost component to host stores within any given scope:

```typescript
const stores = {
  selection: new SimpleSelectionStore()
};

public render() {
  return (
    <StoreHost stores={ stores }>
      <UIContent />
    </StoreHost>
  );
}
```

You can write dumb components:

```typescript
const Item = (props) => (
  <div onClick={ props.onClick }>{ `I am item ${ props.name } and I'm ${ props.isSelected ? 'selected' : 'unselected' }</div>
);
```

And you can use the `connect` function to create a ConnectedItem which wraps the dumb component and translates the props
and stores in its context into props for the dumb component:

```typescript
export ConnectedItem = connect(Item, (stores, props) => ({
  name: props.item.name,
  isSelected: stores.selection.isSelected(props.item.key),
  onClick: () => stores.selection.setSelected(props.item.key)
}));
```

Now in this setup, your state is in one place, it is composable and can have lifetime, and your dumb ui has no understanding
of the contextual stores provided.

# CSS class name guidelines

TODO: include our class name guidelines.

Example:

ms-Component-area--flags

# Style guidelines

## Every component must be RTL friendly.

Be conscious of RTL support. In scss, do not hardcode left/right alignemnts and instead use the RTL macros:

```scss
.ms-Foo {
  @include float(left);
}
```

This will output the following rules in the output:

```css
html[dir=ltr] .ms-Foo {
  float: left;
}

html[dir=rtl] .ms-Foo {
  float: right;
}
```

Additionaly try to have symetrical paddings rather than using padding-right or left specifics.

## Do not use core fabric classnames, but instead use core fabric scss mixins.

E.g. using ms-font-s classname in a component is forbidden. It makes overriding CSS rules really painful. Instead, use @include ms-font-m;

# Example page guidelines

Examples should follow a naming convention: Component.Desc.Example.ts

The root of the test component should use ms-ComponentDescExample as the root class.

Examples should not re-define component styles.
