# MessageBar Migration

## Architecture Change

v8 `MessageBar` is a flat component: all configuration (type, dismiss, actions) is passed as props.

v9 `MessageBar` is **composable**: content is structured via `MessageBarBody`, `MessageBarTitle`, and `MessageBarActions` children. Dismiss is a button in `MessageBarActions`'s `containerAction` slot.

## Before / After Example

### Before

```tsx
import { MessageBar, MessageBarType, MessageBarButton } from '@fluentui/react';

<MessageBar
  messageBarType={MessageBarType.error}
  isMultiline={false}
  onDismiss={() => setVisible(false)}
  dismissButtonAriaLabel="Close"
  actions={
    <div>
      <MessageBarButton onClick={handleAction}>Retry</MessageBarButton>
    </div>
  }
>
  Upload failed. Please try again.
</MessageBar>;
```

### After

```tsx
import { MessageBar, MessageBarBody, MessageBarTitle, MessageBarActions, Button } from '@fluentui/react-components';
import { DismissRegular } from '@fluentui/react-icons';

<MessageBar intent="error">
  <MessageBarBody>
    <MessageBarTitle>Upload failed</MessageBarTitle>
    Please try again.
  </MessageBarBody>
  <MessageBarActions
    containerAction={
      <Button
        appearance="transparent"
        icon={<DismissRegular />}
        onClick={() => setVisible(false)}
        aria-label="Dismiss"
      />
    }
  >
    <Button onClick={handleAction}>Retry</Button>
  </MessageBarActions>
</MessageBar>;
```

## MessageBarType → intent

| v8 `MessageBarType`            | v9 `intent` | Notes                                      |
| ------------------------------ | ----------- | ------------------------------------------ |
| `MessageBarType.info`          | `"info"`    | Default                                    |
| `MessageBarType.success`       | `"success"` |                                            |
| `MessageBarType.warning`       | `"warning"` |                                            |
| `MessageBarType.severeWarning` | `"warning"` | No separate "severe" in v9                 |
| `MessageBarType.error`         | `"error"`   |                                            |
| `MessageBarType.blocked`       | `"error"`   | No direct equivalent; use `"error"` intent |

## Simple (no actions, no dismiss)

```tsx
// v8
<MessageBar>This is an informational message.</MessageBar>;

// v9
import { MessageBar, MessageBarBody } from '@fluentui/react-components';

<MessageBar>
  <MessageBarBody>This is an informational message.</MessageBarBody>
</MessageBar>;
```

## Multiline

```tsx
// v8
<MessageBar isMultiline={true}>
  Long message that wraps to multiple lines.
</MessageBar>

// v9 — multiline is the default; use layout="multiline" explicitly if needed
<MessageBar layout="multiline">
  <MessageBarBody>Long message that wraps to multiple lines.</MessageBarBody>
</MessageBar>
```

## Controlled Visibility Pattern

```tsx
// v9 — render the MessageBar conditionally (no built-in open/close)
const [visible, setVisible] = React.useState(true);

{
  visible && (
    <MessageBar intent="warning">
      <MessageBarBody>Warning: your session will expire soon.</MessageBarBody>
      <MessageBarActions
        containerAction={
          <Button
            appearance="transparent"
            icon={<DismissRegular />}
            onClick={() => setVisible(false)}
            aria-label="Dismiss"
          />
        }
      />
    </MessageBar>
  );
}
```

## IMessageBarProps → MessageBarProps

| v8                        | v9                                   | Notes                                                 |
| ------------------------- | ------------------------------------ | ----------------------------------------------------- |
| `messageBarType`          | `intent`                             | See table above                                       |
| `isMultiline`             | `layout`                             | `"singleline"` \| `"multiline"` \| `"auto"` (default) |
| `onDismiss`               | Button in `containerAction` slot     | Provide `<Button onClick={...}>` explicitly           |
| `dismissButtonAriaLabel`  | `aria-label` on the dismiss `Button` |                                                       |
| `actions`                 | `<MessageBarActions>` children       |                                                       |
| `isBlocking`              | —                                    | Removed; v9 MessageBar never blocks the page          |
| `overflowButtonAriaLabel` | —                                    | Removed                                               |
| `truncated`               | —                                    | Removed; handled via `layout`                         |
| `expandButtonProps`       | —                                    | Removed                                               |
| `messageBarIconProps`     | `icon` slot on `<MessageBar>`        | Pass `<IconComponent />` to `icon` slot               |
| `className`               | `className`                          |                                                       |
| `styles`                  | `className` + `makeStyles`           |                                                       |
| `theme`                   | `FluentProvider`                     |                                                       |
