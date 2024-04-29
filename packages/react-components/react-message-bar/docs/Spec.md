# @fluentui/react-message-bar-preview Spec

## Background

MessageBar communicates important information about the state of the entire application or surface. For example, the status of a page, panel, dialog or card. The information shouldn't require someone to take immediate action, but should persist until the user performs one of the required actions.

## Prior Art

- [Convergence epic](https://github.com/microsoft/fluentui/issues/22579)

### Northstar (v0)

```tsx
<Alert
  warning
  icon={<ExclamationTriangleIcon />}
  content="This is an alert with a warning icon"
  dismissAction={{ 'aria-label': 'close' }}
  actions={[
    {
      content: 'Privacy policy',
      key: 'privacy',
      primary: true,
    },
    'Settings',
  ]}
/>
```

### Fabric (v8)

```tsx
<MessageBar
  messageBarType={MessageBarType.warning}
  isMultiline={false}
  dismissButtonAriaLabel="Close"
  actions={
    <div>
      <MessageBarButton>Action</MessageBarButton>
    </div>
  }
>
  Warning MessageBar content.
  <Link href="www.bing.com" target="_blank" underline>
    Visit our website.
  </Link>
</MessageBar>
```

## Sample Code

```tsx
<MessageBar>
  <MessageBarBody>
    <MessageBarTitle>Descriptive title</MessageBarTitle>
    Message providing information to the user with actionable insights. <Link>Link</Link>
  </MessageBarBody>
  <MessageBarActions
    containerAction={<Button aria-label="dismiss" appearance="transparent" icon={<DismissRegular />} />}
  >
    <Button>Action</Button>
    <Button>Action</Button>
  </MessageBarActions>
</MessageBar>
```

## Variants

### Single line

### Multi line

## API

### MessageBar

[Link to types](https://github.com/microsoft/fluentui/blob/master/packages/react-components/react-message-bar/src/components/MessageBar/MessageBar.types.ts)

### MessageBarTitle

[Link to types](https://github.com/microsoft/fluentui/blob/master/packages/react-components/react-message-bar/src/components/MessageBarTitle/MessageBarTitle.types.ts)

### MessageBarBody

[Link to types](https://github.com/microsoft/fluentui/blob/master/packages/react-components/react-message-bar/src/components/MessageBarBody/MessageBarBody.types.ts)

### MessageBarActions

[Link to types](https://github.com/microsoft/fluentui/blob/master/packages/react-components/react-message-bar/src/components/MessageBarActions/MessageBarActions.types.ts)

## Structure

```html
<div role="group" aria-labelledby="fui-5" class="fui-MessageBar">
  <div class="fui-MessageBar__icon"></div>
  <div class="fui-MessageBarBody">
    <span id="fui-5" class="fui-MessageBarTitle">Descriptive title</span>Message providing information to the user with
    actionable insights.
    <a>Link</a>
  </div>
  <div class="fui-MessageBarActions">
    <button>Action</button>
    <button>Action</button>
  </div>
  <div class="fui-MessageBarActions__containerAction" aria-label="Close">X</div>
</div>
```

## Migration

### From v8

| v8 prop                | v9 prop | Description                                                                              |
| ---------------------- | ------- | ---------------------------------------------------------------------------------------- |
| messageBarType         | intent  | String enums are used instead of Typesript enums                                         |
| isMultiline            | layout  | A string enum is used to toggle layout instead of a boolean.                             |
| onDismiss              | N/A     | No need to migrate, the dismiss button and state should be handled by the user           |
| actions                | N/A     | Use the children the `MessageBarActions` component                                       |
| messageBarIconProps    | icon    | Use the `icon` slot with any custom icon                                                 |
| dismissButtonAriaLabel | N/A     | Use the `containerAction` slot of the `MessageBarActions` component to set an aria-label |

### From v0

| V0 prop       | v9 prop | Description                                                                                   |
| ------------- | ------- | --------------------------------------------------------------------------------------------- |
| attached      | N/A     | Use custom CSS overrides on the MessageBar component                                          |
| body          | N/A     | Use the `MessageBarBody` component                                                            |
| content       | N/A     | Use the children of the `MessageBarBody` component                                            |
| danger        | intent  | Use `error` as the value for the `intent` prop                                                |
| info          | intent  | Use `info` as the value for the `intent` prop                                                 |
| warning       | intent  | Use `warning` as the value for the `intent` prop                                              |
| success       | intent  | Use `success` as the value for the `intent` prop                                              |
| visible       | N/A     | This can be done by mounting/unmounting the `MessageBar` component                            |
| icon          | icon    | Migrate from v0 slot syntax to v9 slot syntax                                                 |
| dismissible   | N/A     | The `containerAction` slot of the `MessageBarActions` component is up to the user to render   |
| dismissAction | N/A     | The `containerAction` slot of the `MessageBarActions` component is up to the user to render   |
| fitted        | N/A     | This is the default behaviour, otherwise use custom CSS overrides on the MessageBar component |

## Behaviors

### Reflow

Once the text content in the message bar wraps around to a second line, the layout of the entire component should change.
The layout should more resemble a Dialog, where the additional actions are on the bottom right of the container and the
single container action to dismiss the MessageBar is on the top right.

In the single line layout, The additional actions should render inline but before the container action to dismiss the
MessageBar.

## Accessibility

The entire MessageBar should have the `role="group"` attribute set to let screen reader users know that the content
within the component is part of one landmark.

The MessageBar content is narrated on mount. The narration is handled by an announcer that is consumed through
React context. The narrated message should include both the MessaegBar content and its actions. The `intent` prop
determines the politeness of the narration.

| Intent  | Politeness |
| ------- | ---------- |
| info    | polite     |
| warning | polite     |
| success | polite     |
| error   | assertive  |
