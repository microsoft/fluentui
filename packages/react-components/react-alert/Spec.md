# Alert

## Background

An Alert displays a brief, important message to attract a user's attention without interrupting their current task.

## Prior Art

- [Alert - Open UI](https://open-ui.org/components/toast.research)
- [Convergence epic issue #22579](https://github.com/microsoft/fluentui/issues/22579)

## Sample Code

Default Alert

```
import { Alert } from '@fluentui/react-alert'

const AlertExample = () => <Alert>This is a default alert</Alert>
```

Success Alert

```
import { Alert } from '@fluentui/react-alert'

const AlertExample = () =><Alert intent="success">This is a success alert</Alert>
```

## API

See [Alert.types.ts](./src/components/Alert/Alert.types.ts)

## Structure

### Slots

- `root`: The outermost `<div>` that contains the rest of the slots
- `icon`: (optional) A `<span>` that renders an icon and is inferred by the `intent` prop or passed in via the `icon` prop
- `action`: (optional) A `<button>` that prompts users to act on it

### **Public**

```jsx
<Alert>This is a default alert</Alert>
```

### **Internal**

```tsx
<slots.root {...slotProps.root}>
  {slots.icon && <slots.icon {...slotProps.icon} />}
  {slotProps.root.children}
  {slots.action && <slots.action {...slotProps.action} />}
</slots.root>
```

### **DOM**

```html
<div class="fui-Alert">
  <span class="fui-Alert__icon">DeletedFilled</span>
  Chat deleted
  <button type="button" class="fui-Button fui-Alert__action">Undo</button>
</div>
```

## Migration

See [Migration.md](./Migration.md)

## Behaviors

_Explain how the component will behave in use, including:_

- _Component States_
- _Interaction_
  - _Keyboard_
  - _Cursor_
  - _Touch_
  - _Screen readers_

## Accessibility

Base accessibility information is included in the design document. After the spec is filled and review, outcomes from it need to be communicated to design and incorporated in the design document.

- Decide whether to use **native element** or folow **ARIA** and provide reasons
- Identify the **[ARIA](https://www.w3.org/TR/wai-aria-practices-1.2/) pattern** and, if the component is listed there, follow its specification as possible.
- Identify accessibility **variants**, the `role` ([ARIA roles](https://www.w3.org/TR/wai-aria-1.1/#role_definitions)) of the component, its `slots` and `aria-*` props.
- Describe the **keyboard navigation**: Tab Oder and Arrow Key Navigation. Describe any other keyboard **shortcuts** used
- Specify texts for **state change announcements** - [ARIA live regions
  ](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Live_Regions) (number of available items in dropdown, error messages, confirmations, ...)
- Identify UI parts that appear on **hover or focus** and specify keyboard and screen reader interaction with them
- List cases when **focus** needs to be **trapped** in sections of the UI (for dialogs and popups or for hierarchical navigation)
- List cases when **focus** needs to be **moved programatically** (if parts of the UI are appearing/disappearing or other cases)
