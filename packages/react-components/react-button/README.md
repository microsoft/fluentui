# @fluentui/react-button

**Button components for [Fluent UI React](https://react.fluentui.dev/)**

- Buttons enable users to trigger an action or event, such as submitting a form, opening a dialog, canceling an action, or performing a delete operation.
- CompoundButtons are buttons that can have secondary content that adds extra information to the user.
- MenuButtons are buttons that have a chevron icon after the button contents and are usually clicked to open/close menus.
- SplitButtons are a grouping of two interactive surfaces where interacting with the first one triggers a primary action, while interacting with the second one opens a menu with secondary actions.
- ToggleButtons are buttons that toggle between two defined states when triggered.

## Usage

To import Button:

```js
import { Button, CompoundButton, MenuButton, SplitButton, ToggleButton } from '@fluentui/react-components';
```

### Examples

### Button

```jsx
<Button>Submit</Button>
<Button icon={<SVGIcon />} />
<Button icon={<SVGIcon />}>Submit</Button>
<Button icon={<SVGIcon />} iconPosition="after">Submit</Button>
<Button appearance="primary">Submit</Button>
<Button disabled>Submit</Button>
<Button size="small">Submit</Button>
<Button size="large">Submit</Button>
```

### CompoundButton

```jsx
<CompoundButton icon={<CalendarMonth />} secondaryContent="Secondary content" {...props}>
  Example
</CompoundButton>
```

### MenuButton

```jsx
<Menu>
  <MenuTrigger>
    <MenuButton>Example</MenuButton>
  </MenuTrigger>

  <MenuPopover>
    <MenuList>
      <MenuItem>Item a</MenuItem>
      <MenuItem>Item b</MenuItem>
    </MenuList>
  </MenuPopover>
</Menu>
```

### SplitButton

```jsx
<Menu positioning="below-end">
  <MenuTrigger>
    {(triggerProps: MenuButtonProps) => <SplitButton menuButton={triggerProps}>Example</SplitButton>}
  </MenuTrigger>

  <MenuPopover>
    <MenuList>
      <MenuItem>Item a</MenuItem>
      <MenuItem>Item b</MenuItem>
    </MenuList>
  </MenuPopover>
</Menu>
```

### ToggleButton

```jsx
<ToggleButton>Toggle volume</ToggleButton>
<ToggleButton defaultChecked={true}>Toggle volume</ToggleButton>
<ToggleButton checked={true}>Toggle volume</ToggleButton>
<ToggleButton checked={false}>Toggle volume</ToggleButton>
```

See [Fluent UI Storybook](https://react.fluentui.dev/) for more detailed usage examples.

Alternatively, run Storybook locally with:

1. `yarn start`
2. Select `react-button` from the list.

### Specification

See [SPEC.md](./src/components/Button/SPEC.md).

### Migration Guide

If you're upgrading to Fluent UI v9 see [MIGRATION.md](./src/components/Button/MIGRATION.md) for guidance on updating to the latest component implementations.
