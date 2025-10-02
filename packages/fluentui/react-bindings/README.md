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
