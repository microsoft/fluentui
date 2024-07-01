The `migration` package provides code modifications and notes in order to ease upgrades between fabric versions. **This package is only applicable when upgrading from `office-ui-fabric-react` 6 to 7.**

Can be run with `npx` inside your project without being an explicit dependency.

# Usage

```
Usage:
  migration [-w] VERSION

Options:
  -h --help   Display this message
  -w --write  Write changes directly to files
```

## Examples

**Run in notify-only mode:**

```
$ npx @uifabric/migration@7.0.0 7
```

_outputs:_

```
Apply migration steps:
- warn ColorPicker-related onChanged props removed

- warn ComboBox.onChanged removed
  src/tsx/combocontrol.tsx:13:11 - onChanged is removed; please use onChange instead (NOTE: the arguments have changed from onChanged to onChange; please update accordingly)

- remove use of deprecated ComboBox props

- createRef should come from React.createRef, not from office-ui-fabric-react
  src/tsx/combocontrol.tsx
- rename componentWillReceiveProps with UNSAFE_componentWillReceiveProps
  src/tsx/file1.tsx
- warn SearchBox.onChange args changed

- warn autobind decorator removed

- Deprecated DetailsRowCheck.isSelected has been removed. Use DetailsRowCheck.selected instead.

- warn Slider.ValuePosition removed
  src/ts/file0.ts:4:9 - ValuePosition no longer available
  src/ts/file0.ts:5:9 - ValuePosition no longer available
```

**Run in write mode:**

**Important: Before running with `-w`, ensure all files are backed up or checked in to version control.**

```
$ npx @uifabric/migration@7.0.0 -w 7
```

# Supported versions

The migration package currently supports migrations to the following versions:

## 7.0.0

### ColorPicker - onChanged props removed _(Notify only)_

`TODO`

### ComboBox - onChanged removed _(Notify only)_

`TODO`

### ComboBox - remove use of deprecated props

`TODO`

### DetailsRowCheck - isSelected has been removed. Use DetailsRowCheck.selected instead.

`TODO`

### React - createRef should come from React.createRef, not from office-ui-fabric-react

React's implementation of `createRef` has improved to the degree where the office-ui-fabric-react version does not provide additional value. As a result, Fabric 7 no longer provides `createRef`. This migration will import `createRef` from `react` while removing it from `office-ui-fabric-react`'s import statements.

### React - rename componentWillReceiveProps with UNSAFE_componentWillReceiveProps

React is removing support for `componentWillReceiveProps` and will only be supporting the method as `UNSAFE_componentWillReceiveProps` in future versions (before removing support entirely). See https://reactjs.org/docs/react-component.html#the-component-lifecycle for more information. This migration renames all instances of this function in a codebase.

### SearchBox - onChange args changed _(Notify only)_

`TODO`

### Slider - ValuePosition removed _(Notify only)_

`TODO`

### Util - autobind decorator removed _(Notify only)_

Fabric 6 and earlier versions shipped a decorator called `autobind`. Autobind takes a function definition and binds it to `this` on class instantiation, such that all calls to the method would have a predicable `this` value regardless of their invocation.

In practice, a const lambda function provides the same guarantees of binding `this` without the need for annotation support, which is not on by default.

In practice, these are the practical changes needed:

```ts
class Foo {
  private _val = 0;

  // using autobind - no longer supported directly by fabric
  @autobind
  bar(): void {
    console.log(this._val); // this is always bound correctly
  }

  // recommended
  bar = (): void => {
    console.log(this._val); // this is always bound correctly
  };
}
```

If stopping use of `@autobind` represents a large migration burden, consider implementing it in your own codebase or finding an implementation in a pre-existing package, as several exist.
