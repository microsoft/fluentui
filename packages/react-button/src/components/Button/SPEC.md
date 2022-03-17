# Button

**GitHub Epic issue** - [Button Convergence #16746](https://github.com/microsoft/fluentui/issues/16746)

## Background

The `Button` component enables users to trigger an action or event, such as submitting a form, opening a dialog, canceling an action, or performing a delete operation.

## Prior Art

### Open UI

The Open UI [Button Research](https://open-ui.org/components/button) page, shows how the `Button` component is used in UI platforms across the web. While there is consensus about some of the basic features that the `Button` needs to support the more advanced features and the variants presented differ significantly among the different UI platforms.

### Comparison of v8 and v0

The existing components are:

- v8 - [Button](https://developer.microsoft.com/en-us/fluentui#/controls/web/button)
- v0 - [Button](https://fluentsite.z22.web.core.windows.net/0.52.1/components/button/definition)

## Sample Code

Basic examples:

```jsx
<Button>Text</Button>
<Button icon={<SVGIcon />} />
<Button icon={<SVGIcon />}>Text</Button>
<Button icon={<SVGIcon />} iconPosition="after">Text</Button>
<Button appearance="primary">Text</Button>
<Button disabled>Text</Button>
<Button size="small">Text</Button>
<Button size="large">Text</Button>
```

## Variants

### Appearance

The `Button` component has several apparance variants depending on where it's being used:

- The default `Button` is rendered with its default styling indicating a trigger for an action.
- appearance="outline": The `Button` is styled such that it has no background styling and is just emphasized through the styling of its content and borders.
- appearance="primary": The `Button` is styled to emphasize that it represents the primary action.
- appearance="subtle": The `Button` is styled to blend into its background to become less emphasized.
- appearance="transparent": The `Button` is styled such that it has no background or border styling and is just emphasized through its content styling.

### Icon

The `Button` component can include an `icon` that appears before or after its `children`. If an `icon` is provided without any `children`, then the `Button` becomes an icon-only `Button`.

### Shape

- shape="rounded": The button as rounded corners. This is the default is shape is not set.
- shape="circular": The button has completely round corners. A button of equal width and height will be a circle.
- shape="square": The button has right-angle corners.

### Sizes

The `Button` component supports different sizing with at least three different sizes: `small`, `medium` (default) and `large`.

### Block

The `Button` component can completely fill the width of its container.

### Loading

The `Button` component can be loading if it's waiting for another action to occur before allowing itself to be interacted with.

## API

### Slots

- `root` - The outer container representing the `Button` itself that wraps everything passed via the `children` prop.
- `icon` - If specified, renders an `icon` either before or after the `children` as specified by the `iconPosition` prop.
- `loader` - If specified, renders a `loader` before the `icon` and `children` while the `loading` flag is set to `true`.

### Props

```ts
export type ButtonProps = ComponentPropsCompat &
  React.ButtonHTMLAttributes<HTMLElement> & {
    /**
     * A button can have its content and borders styled for greater emphasis or to be subtle.
     * - 'primary': Emphasizes the button as a primary action.
     * - 'outline': Removes background styling.
     * - 'subtle': Minimzes emphasis to blend into the background until hovered or focused.
     * - 'transparent': Removes background and border styling.
     */
    appearance?: 'primary' | 'outline' | 'subtle' | 'transparent';

    /**
     * Icon slot that, if specified, renders an icon either before or after the `children` as specified by the
     * `iconPosition` prop.
     */
    icon?: ShorthandPropsCompat<React.HTMLAttributes<HTMLElement>>;

    // /**
    //  * Loader slot that, if specified, renders a `loader` before the `icon` and `children` while the `loading` flag
    //  * is set to `true`.
    //  */
    // loader?: ShorthandPropsCompat<React.HTMLAttributes<HTMLSpanElement>>;

    /**
     * A button can fill the width of its container.
     * @default false
     */
    block?: boolean;

    /**
     * A button can show that it cannot be interacted with.
     * @default false
     */
    disabled?: boolean;

    /**
     * When set, allows the button to be focusable even when it has been disabled. This is used in scenarios where it
     * is important to keep a consistent tab order for screen reader and keyboard users. The primary example of this
     * pattern is when the disabled button is in a menu or a commandbar and is seldom used for standalone buttons.
     * @default false
     */
    disabledFocusable?: boolean;

    /**
     * A button can format its icon to appear before or after its content.
     * @default 'before'
     */
    iconPosition?: 'before' | 'after';

    // /**
    //  * A button can show a loading indicator if it is waiting for another action to happen before allowing itself to
    //  * be interacted with.
    //  * @default false
    //  */
    // loading?: boolean;

    /**
     * A button can be rounded, circular, or square.
     * @default 'rounded'
     */
    shape?: 'rounded' | 'circular' | 'square';

    /**
     * A button supports different sizes.
     * @default 'medium'
     */
    size?: 'small' | 'medium' | 'large';
  };
```

### Styling Tokens

TBD once we decide on component tokens work.

## Structure

For `Buttons` rendering as `<button>`:

_Icon before children:_

```tsx
<button class="root" href={href}>
  <span class="loader" />
  <span class="icon" />
  {children}
</button>
```

_Icon after children:_

```tsx
<button class="root" href={href}>
  <span class="loader" />
  {children}
  <span class="icon" />
</button>
```

For `Buttons` rendering as anything other than `<button>` (the example below uses `<div>`):

```tsx
<div class="root" href={href}>
  <span class="loader" />
  <span class="icon" />
  {children}
</div>
```

_Icon after children:_

```tsx
<div class="root" href={href}>
  <span class="loader" />
  {children}
  <span class="icon" />
</div>
```

## Migration

See [MIGRATION.md](https://github.com/microsoft/fluentui/blob/master/packages/react-button/MIGRATION.md).

## Behaviors

### States

The following section describes the different states in which a `Button` can be throughout the course of interaction with it.

#### Enabled state

An enabled `Button` communicates interaction by having styling that invites the user to click/tap on it to trigger an action.

#### Disabled state

A disabled `Button` is non-interactive, disallowing the user to click/tap on it to trigger an action.

#### Hovered state

A hovered `Button` changes styling to communicate that the user has placed a cursor above it.

#### Focused state

A focused `Button` changes styling to communicate that the user has placed keyboard focus on it. This styling is usually the same to the one in the hovered state plus extra styling on the outline to indicate keyboard focus has been placed on the component.

#### Pressed state

A pressed `Button` changes styling to communicate that the user is currently pressing it.

#### Loading state

A loading `Button` renders a `loader` before all the other content to indicate that it is waiting for another action before allowing itself to be interacted with.

### Interaction

#### Keyboard interaction

The following is a set of keys that interact with the `Button` component:

| Key                      | Description                            |
| ------------------------ | -------------------------------------- |
| `Enter`                  | Executes the `Button` action.          |
| `Space`                  | Executes the `Button` action.          |
| `Shift + F10` (Optional) | Opens a context menu for the `Button`. |

#### Cursor interaction

- `mouseenter`: Should immediately change the styling of the `Button` so that it appears to be hovered.
- `mouseleave`: Should immediately remove the hovered styling of the `Button`.
- `mouseup`: If triggered while cursor is still inside of the `Button's` boundaries, then it should execute the `Button` and move focus to its target.

#### Touch interaction

The same behavior as above translated for touch events. This means that there is no equivalent for `mouseenter` and `mouseleave`, which makes it so that the hovered state cannot be accessed.

## Accessibility

### Relevant documents

- [WAI-ARIA 1.1 Spec](https://www.w3.org/TR/wai-aria-1.1/#button)
- [WAI-ARIA 1.1 Authoring Practices](https://www.w3.org/TR/wai-aria-practices-1.1/#button)
- [WAI-ARIA 1.2 Spec](https://www.w3.org/TR/wai-aria-1.2/#button)
- [WAI-ARIA 1.2 Authoring Practices](https://www.w3.org/TR/wai-aria-practices-1.2/#button)

### Expected behavior

- Should default to render a native `button` element unless something else has been specified for the `root` slot, in which case `role="button"` should be added to it.
- Should mix in the native props expected for the `button` native element.
- Should be keyboard tabbable and focusable.
