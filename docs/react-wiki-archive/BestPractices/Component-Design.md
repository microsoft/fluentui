**WARNING: Many of the general ideas on this page still apply to `@fluentui/react` 7/8 (and `office-ui-fabric-react` previously), but some of the details may be out of date or are specific to class components (which are no longer recommended).** Until updated guidance is finalized, please talk to the team or file an issue to learn about current best practices if you'd like to add a new component.

## Basic expectations for every component

- The component can always provide `id`, `className`, `style`, `aria-*` and `data-*` attributes on the container of a component.

- If the component represents a standard HTML element (e.g. Button), we should mix in the valid root props using the `getNativeProps`
  utility so that we can let the user use native functionality as expected.

- If the component hosts clickable elements, there must be a way to inject `data-*` attributes onto the clickable components. This enables test automation to be built downstream.

- Interactable elements must be accessible via keyboard, mouse, and touch. Nothing can be ONLY interactable by mouse.

## Build many smaller components and compose them together.

Often we want to build something complex, like a CommandBar. We see a picture of what we want and we build one giant component that does
this. Then we find other scenarios that have overlaps. The CommandBar contains a SearchBox, a set of left side collapsible links and right
side links. We may find we have other cases that just want a set of links, without the extra overhead. We may also find cases where we just
want a single command bar item with a dropdown menu.

This is an example where instead of building a single large component, we should build more atomic building blocks that are puzzled
together. While it may be more effort to think in smaller blocks, it makes the code easier to reuse and often simpler to maintain.

## Use a .types.ts file to extract out the public contracts that should be supported and documented.

A types file contains all of the interface contracts that the user should know about to use the component. It is the "contract" for the component. When we evaluate semantic versioning, we look through the changes to the types files to determine if the change is a major, minor, or patch.

If your component exposes public methods/properties (or an imperative handle for function components), define an interface for the component in the types file and implement the interface.

```tsx
interface IButton {
  /**
   * Sets focus to the button element.
   */
  focus(): void;
}
```

### Provide explicit return types for methods declared in .types.ts

Bad:

```tsx
interface IButton {
  /**
   * Sets focus to the button element.
   */
  focus();
}
```

Good: explicitly specify the return type of `focus`:

```tsx
interface IButton {
  /**
   * Sets focus to the button element.
   */
  focus(): void;
}
```

## Naming guidance

### Flags (Booleans)

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

| BAD            | GOOD              | Notes                                                                            |
| -------------- | ----------------- | -------------------------------------------------------------------------------- |
| isChecked      | checked           | There is an HTML precedence for checked.                                         |
| isVisible      | visible           |
| isSelected     | selected          |
| isEnabled      | disabled          | If the state is enabled by default, it should be named for the exceptional case. |
| isOpen         | hidden            | If the exceptional case should be that we hide something, call it hidden.        |
| isFooDisabled  | fooButtonDisabled | If the `foo` subject is unclear, make is specific to the type.                   |
| buttonDisabled | disabled          | If the subject IS the component, don't give it a subject name.                   |

### Event callbacks

Event callbacks should be prefixed with `on`. If it is necessary to target a subject, the subject should be in between `on` and the event
name. Always use present tense verbs instead of past tense.

| BAD                      | GOOD         | Notes |
| ------------------------ | ------------ | ----- |
| mouseClick               | onClick      |
| onClicked                | onClick      |
| inputClick, onClickInput | onInputClick |

It should also be noted that for event callbacks, the ORDER of parameters should be consistent with the precedence if one exists. For example:

| BAD                                                  | GOOD                                                       |
| ---------------------------------------------------- | ---------------------------------------------------------- |
| `onClick: (item: any, ev: React.MouseEvent) => void` | `onClick: (ev?: React.MouseEvent<{}>, item?: any) => void` |

### Custom render methods

In cases where you wish to give the user a way to render a custom version of a thing, follow the convention `onRenderSubject`. It should
also use the `IRenderFunction` interface defined in common, which takes in `props` and a `defaultRender` function and returns a JSX element:

BAD:
`renderItem: (item: any, foo: any, bar; any) => JSX.Element`

GOOD:
`onRenderItem: IRenderFunction<IItemProps>`

## Use arrow function properties to avoid ALL binds

When we use `bind`, it means that the function is recreated every time, which is an anti-pattern.

BAD:

```tsx
class Foo extends React.Component {
  public render() {
    return <button onClick={this._onClick.bind(this)}>Click me</button>;
  }

  private _onClick(ev: React.MouseEvent) {}
}
```

Instead we can use an arrow function property as it will always be bound to the component.

GOOD:

```tsx
class Foo extends React.Component {
  public render() {
    return <button onClick={this._onClick}>Click me</button>;
  }

  private _onClick = (ev: React.MouseEvent) => {};
}
```

## For gathering refs, use `React.createRef`

String refs are deprecated. Don't use them. Also don't use inline-created functions.

Bad:

```tsx
class Foo extends React.Component {
  public render() {
    return <div ref="root" />;
  }
}
```

Bad:

```tsx
class Foo extends React.Component {
  public render() {
    return <div ref={el => (this._root = el)} />;
  }
}
```

Good:

`React.createRef` creates a reference object that has the following type `{ current: T | null }`, where T is the element to reference (either a dom node or a react component). You set the reference by passing the reference object as the `ref` prop. You can then subsequently access the reference through the `.current` property on the reference object elsewhere in your code.

```tsx
class Foo extends React.Component {
  // Create the reference object that will be used for setting and accessing the reference
  private _root = React.createRef<HTMLButtonElement>();

  public render(): JSX.Element {
    // Set the reference by passing the reference object as the ref prop
    return <button ref={_root} onClick={this._onClick} />;
  }

  private _onClick(): void {
    // Access the reference through the .current property on the reference object
    this._root.current.focus();
  }
}
```

Note that it's very critical you do NOT inline the functions in render! This causes weird side effects, because the function
is recreated. If you do this, React will call your function with null to clear it, and then render, and then once complete, will
call it again with the element. This creates timing issues where your ref may be null when you didn't expect.

## Use unique keys for items in a mapped array, avoid indices for keys

```tsx
class Foo extends React.Component {
  public render() {
    return (
      <div>
        {this.props.items.map((item, index) => (
          <div key={item.key}>
            <input type="text" />
          </div>
        ))}
      </div>
    );
  }
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

```tsx
class Foo extends React.Component {
  public render() {
    return (
      <div>
        {items.map(item => (
          <div key={item.key} onClick={this._onItemClick.bind(this, item)}>
            {item.name}
          </div>
        ))}
      </div>
    );
  }
}
```

Better:

```tsx
class Foo extends React.Component {
  public render() {
    return (
      <div>
        {items.map(item => (
          <ItemComponent key={item.key} item={item} />
        ))}
      </div>
    );
  }
}

class ItemComponent extends React.Component {
  public render() {
    let { item } = this.props;
    return <div onClick={this._onClick}>{item.name}</div>;
  }

  private _onClick = (ev: MouseEvent) => {};
}
```

## Adding the option to override the root DOM element

Some components allow users to override the root DOM element that is rendered by the component. Our `<Link />` component is one of these. The user can provide an `as` prop to specify the root element.

When designing components you can choose to allow the user to do the same. The component should render a particular element by default but render the component passed through the `as` prop instead when it is provided. For example:

```tsx
function MyLink({ as: Root = 'a', text = 'Hello' }) {
  return <Root>{text}</Root>;
}
```

## Use React eventing, unless you need to use native.

Be aware that React eventing and DOM eventing are two different systems. They do not play well with each other. DOM event handlers will
always fire BEFORE React events, regardless of the DOM structure. This can introduce unexpected bugs in code that mixes both React and
native DOM eventing.

Unfortunately there are plenty of scenarios where we must mix the two systems together; for example, you may need to listen for
application-wide clicks that bubble up to window in order to implement a light-dismiss behavior. Or perhaps you need to listen for window
resizes. Or maybe you need to observe scroll events so that you can hide/show something.

One abstraction we use for native eventing is the EventGroup class. It is simple to use; there is an "on" method and an "off" method that wrap calling addEventListener in modern browsers (or attachEvent in legacy IE). Be sure to dispose the EventGroup instance on unmount.

## Root elements should have a component class name.

Every component's root element should have a ms-Component class name. Additionally the user should be able to provide their own className
via prop that should be added to the class list of the root element.

If specific component elements need special classnames injected, add more classNames to props.

A component's SCSS file should ONLY include files applicable to the component, and should not define styles for any other component.

# Data/state management best practices

## Things to flat out avoid

Singletons and globals. Do not share state of a component via a singleton instance object. This is a pure anti-pattern for the following
reasons:

- Singletons have no lifetime and therefore can't initialize/clean up when they aren't used.
- Singletons often paint you into a corner when you want more than one of the same thing on the page.
- They are often difficult to test without polluting states required for other tests.
- The make non-browser scenario reuse really difficult. (Build tooling, server side code.)

Data and state should always follow the lifetime of the component that owns it. When that component is no longer needed, the state should
be garbage collected, event handlers should be removed, and xhr requires spawned in that context should be cancelled.

## Use const values global to a file, rather than as static members

Don't use public/private statics, use file scope.

Bad:

```tsx
class Foo {
  private static DEFAULT_DELAY = 300;
}
```

Good:

```tsx
const DEFAULT_DELAY = 300;

class Foo {}
```

Note: using file scopes minimizes the name down to 1 character, whereas this.REALLY_LONG_NAME doesn't minify the name. Caveat being
that if you export it, minify won't touch exports.

## Use private members only for managing state local to a component that should not affect rendering when mutating

Bad:

```tsx
class Foo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isMounted: false,
    };
  }

  componentDidMount() {
    this.setState({
      isMounted: true,
    });
  }

  render() {
    return <div>Hello!</div>;
  }
}
```

Good:

```tsx
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
    return <div>Hello!</div>;
  }
}
```

Basically privates should only be use for tracking this that in no way affect the frequency of render. In some cases, you many
have an object which fires change events yet doesn't mutate, and you want to re-render on change events. In these cases, privates
may be used to store the object reference.

## Use component state only for managing local state that is private to a component that should trigger re-render on mutation

Bad:

```tsx
class Foo extends React.Component {
  private _fooRocks: boolean;

  render() {
    return <div onClick={this._onClick}>Foo {this._fooRocks ? 'rocks' : 'rolls'}</div>;
  }

  private _onClick = (): void => {
    this._fooRocks = !this._fooRocks;
    this.forceUpdate();
  }
```

Good:

```tsx
class Foo extends React.Component {
  constructor() {
    super(props);

    this.state = {
      fooRocks: false
    };
  }

  render() {
    return <div onClick={this._onClick}>Foo {this._fooRocks ? 'rocks' : 'rolls'}</div>;
  }

  private _onClick = (): void => {
    this.setState({
      fooRocks: !this.state.fooRocks
    });
  }
```

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
html[dir='ltr'] .ms-Foo {
  float: left;
}

html[dir='rtl'] .ms-Foo {
  float: right;
}
```

Additionally try to have symmetrical paddings rather than using padding-right or left specifics.

## Do not use Fabric Core classnames, but instead use Fabric Core SCSS mixins.

E.g. using ms-font-s classname in a component is forbidden. It makes overriding CSS rules really painful. Instead, use @include ms-font-m;
