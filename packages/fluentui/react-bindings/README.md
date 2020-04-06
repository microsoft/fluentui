# `@fluentui/react-bindings`

A set of reusable components and hooks to build component libraries and UI kits.

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Installation](#installation)
- [Hooks](#hooks)
  - [`useAccesibility()`](#useaccesibility)
    - [Usage](#usage)
  - [`useAutoControlled()`](#useautocontrolled)
    - [Usage](#usage-1)
  - [`useStateManager()`](#usestatemanager)
    - [Usage](#usage-2)
    - [Reference](#reference)
  - [`useStyles()`](#usestyles)
    - [Usage](#usage-3)
    - [Reference](#reference-1)
  - [`useUnhandledProps()`](#useunhandledprops)
    - [Usage](#usage-4)
    - [Reference](#reference-2)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Installation

**NPM**

```bash
npm install --save @fluentui/react-bindings
```

**Yarn**

```bash
yarn add @fluentui/react-bindings
```

# Hooks

## `useAccesibility()`

A React hook that provides bindings for accessibility behaviors.

#### Usage

The example below assumes a component called `<Image>` will be used this way:

```tsx
const imageBehavior: Accessibility<{ disabled: boolean }> = props => ({
  attributes: {
    root: {
      'aria-disabled': props.disabled,
      tabIndex: -1,
    },
    img: {
      role: 'presentation',
    },
  },
  keyActions: {
    root: {
      click: {
        keyCombinations: [{ keyCode: 13 /* equals Enter */ }],
      },
    },
  },
});

type ImageProps = {
  disabled?: boolean;
  onClick?: (e: React.MouseEvent<HTMLDivElement> | React.KeyboardEvent<HTMLDivElement>) => void;
  src: string;
};

const Image: React.FC<ImageProps> = props => {
  const { disabled, onClick, src, ...rest } = props;
  const getA11Props = useAccessibility(imageBehavior, {
    mapPropsToBehavior: () => ({
      disabled,
    }),
    actionHandlers: {
      click: (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (onClick) onClick(e);
      },
    },
  });

  return (
    <div {...getA11Props('root', { onClick, ...rest })}>
      <img {...getA11Props('img', { src })} />
    </div>
  );
};
```

## `useAutoControlled()`

A React hook that allows to manage state like in `React.useState()`, but implements the [autocontrolled pattern](https://reactjs.org/docs/uncontrolled-components.html).

### Usage

The example below assumes a component called `<Input>` will be used this way:

```tsx
type InputProps = {
  defaultValue?: string;
  value?: string;
  onChange?: (value: string) => void;
};

const Input: React.FC<InputProps> = props => {
  const [value, setValue] = useAutoControlled({
    defaultValue: props.defaultValue,
    value: props.value,
  });

  return (
    <input
      onChange={e => {
        setValue(e.target.value);
        if (props.onChange) props.onChange(e.target.value);
      }}
      value={value}
    />
  );
};
```

## `useStateManager()`

A React hook that provides bindings for state managers.

### Usage

The example below assumes a component called `<Input>` will be used this way:

```tsx
type InputProps = {
  defaultValue?: string;
  value?: string;
  onChange?: (value: string) => void;
};
type InputState = { value: string };
type InputActions = { change: (value: string) => void };

const createInputManager: ManagerFactory<InputState, InputActions> = config =>
  createManager<InputState, InputActions>({
    ...config,
    actions: {
      change: (value: string) => () => ({ value }),
    },
    state: { value: '', ...config.state },
  });

const Input: React.FC<InputProps> = props => {
  const { state, actions } = useStateManager(createInputManager, {
    mapPropsToInitialState: () => ({ value: props.defaultValue }),
    mapPropsToState: () => ({ value: props.value }),
  });

  return (
    <input
      onChange={e => {
        actions.change(e.target.value);
        if (props.onChange) props.onChange(e.target.value);
      }}
      value={state.value}
    />
  );
};
```

### Reference

```tsx
const { state, actions } = useStateManager(createInputManager)
const { state, actions } = useStateManager(
  managerFactory: ManagerFactory<State, Actions>,
  options: UseStateManagerOptions<Props>,
)
```

- `managerFactory` - a factory that implements state manager API
- `options.mapPropsToInitialState` - optional, maps component's props to the initial state
- `options.mapPropsToState` - optional, maps component's props to the state, should be used if your component implements [controlled mode](https://reactjs.org/docs/uncontrolled-components.html).

## `useStyles()`

A React hook that provides bindings for usage CSSinJS styles and Fluent theming.

### Usage

The example below assumes a component called `<Text>` will be used this way:

```tsx
type TextComponentProps = {
  className?: string;
  color?: string;
};

const Text: React.FunctionComponent<TextComponentProps> = props => {
  const { className, children, color } = props;

  const { classes } = useStyles('Text', {
    className: 'ui-text',
    mapPropsToStyles: () => ({ color }),
  });

  return <span className={classes.root}>{children}</span>;
};
```

### Reference

```tsx
const { classes } = useStyles(
  displayName: string,
  options: UseStylesOptions<Props>,
)
```

- `displayName` - a component name to lookup in theme
- `options.className` - optional, a special class name that will be always added to the `root` slot
- `options.mapPropsToStyles` - optional, a set of props that will be passed style functions, only primitives are allowed
- `options.rtl` - optional, sets RTL mode

## `useUnhandledProps()`

A React hook that returns an object consisting of props beyond the scope of the component. Useful for getting and spreading unknown props from the user.

### Usage

The example below assumes a component called `<Text>` will be used this way:

```tsx
type TextComponentProps = React.HTMLAttributes<HTMLSpanElement> * {
  className?: string;
};

const Text: React.FunctionComponent<TextComponentProps> = props => {
  const { className, children } = props;
  const unhandledProps = useUnhandledProps(['className'], props);

  return <span {...unhandledProps} className={classes.root}>{children}</span>;
};
```

### Reference

```tsx
const unhandledProps = useUnhandledProps(handledProps, props);
```

- `unhandledProps` - an object with unhandled props by component
- `handledProps` - an array with names of handled props
- `props` - an object with all props that are passed to a component
