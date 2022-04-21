# Alert

## Background

An Alert displays a brief, important message to attract a user's attention without interrupting their current task.

## Prior Art

- [Alert - Open UI](https://open-ui.org/components/toast.research)
- [Convergence epic issue #22579](https://github.com/microsoft/fluentui/issues/22579)

## Sample Code

Default Alert

```
import { Alert } from '@fluentui/react-northstar'

const AlertExample = () => <Alert content="This is a default alert" />
```

Success Alert

```
import { Alert } from '@fluentui/react-northstar'

const AlertExample = () => <Alert intent="success" content="This is a success alert" />
```

Dismissible Error Alert

```
import { Alert } from '@fluentui/react-northstar'

const AlertExample = () => <Alert intent="error" content="This is an error alert" dismissible/>
```

InfoAvatar Alert

```
import { Alert, Avatar } from '@fluentui/react-northstar'

<Alert
    intent="infoAvatar"
    content="This is an avatar alert"
    avatar={<Avatar name="John Doe" />
  />
```

## API

_List the **Props** and **Slots** proposed for the component. Ideally this would just be a link to the component's `.types.ts` file_

TODO - Add interfaces to the type file & copy here

## Structure

- _**Public**_
- _**Internal**_
- _**DOM** - how the component will be rendered as HTML elements_

TODO - Not sure what goes here

## Migration

_Describe what will need to be done to upgrade from the existing implementations:_

- _Migration from v8_
- _Migration from v0_

TODO - Do we need a migration path from Stardust's Alert component?

## Behaviors

_Explain how the component will behave in use, including:_

- _Component States_
- _Interaction_
  - _Keyboard_
  - _Cursor_
  - _Touch_
  - _Screen readers_

## Accessibility

TODO -

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
