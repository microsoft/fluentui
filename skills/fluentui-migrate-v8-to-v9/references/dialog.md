# Dialog / Modal Migration

## Architecture Change

In v8, `Dialog` is controlled via `hidden` prop (inverted logic) and composed via a `dialogContentProps` object.
`Modal` is a separate component with `isOpen`.

In v9, both map to a single `Dialog` that uses declarative JSX children and `open` / `onOpenChange`.
The structure is: `Dialog` → `DialogSurface` → `DialogBody` → `DialogTitle` + `DialogContent` + `DialogActions`.

**Critical:** v8 `hidden={false}` means visible — v9 `open={true}` means visible. The logic is inverted.

## Before / After Example — Dialog

```tsx
// v8
import { Dialog, DialogFooter, DialogType, PrimaryButton, DefaultButton } from '@fluentui/react';

<Dialog
  hidden={!isOpen}
  onDismiss={handleClose}
  dialogContentProps={{
    type: DialogType.normal,
    title: 'Delete item',
    subText: 'Are you sure you want to delete this item?',
  }}
  modalProps={{ isBlocking: true }}
>
  <DialogFooter>
    <PrimaryButton onClick={handleConfirm} text="Delete" />
    <DefaultButton onClick={handleClose} text="Cancel" />
  </DialogFooter>
</Dialog>;
```

```tsx
// v9
import {
  Dialog,
  DialogSurface,
  DialogBody,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from '@fluentui/react-components';

<Dialog
  open={isOpen}
  onOpenChange={(_, data) => setIsOpen(data.open)}
  // modalType="modal" is the default — blocks backdrop dismiss
>
  <DialogSurface>
    <DialogBody>
      <DialogTitle>Delete item</DialogTitle>
      <DialogContent>Are you sure you want to delete this item?</DialogContent>
      <DialogActions>
        <Button appearance="primary" onClick={handleConfirm}>
          Delete
        </Button>
        <Button onClick={handleClose}>Cancel</Button>
      </DialogActions>
    </DialogBody>
  </DialogSurface>
</Dialog>;
```

## With a trigger button (uncontrolled)

```tsx
// v9 — uncontrolled via DialogTrigger (no isOpen state needed)
import {
  Dialog,
  DialogTrigger,
  DialogSurface,
  DialogBody,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from '@fluentui/react-components';

<Dialog>
  <DialogTrigger disableButtonEnhancement>
    <Button>Open dialog</Button>
  </DialogTrigger>
  <DialogSurface>
    <DialogBody>
      <DialogTitle>Confirm</DialogTitle>
      <DialogContent>Are you sure?</DialogContent>
      <DialogActions>
        <DialogTrigger disableButtonEnhancement>
          <Button appearance="primary">Yes</Button>
        </DialogTrigger>
        <DialogTrigger disableButtonEnhancement>
          <Button>Cancel</Button>
        </DialogTrigger>
      </DialogActions>
    </DialogBody>
  </DialogSurface>
</Dialog>;
```

## Before / After Example — Modal → Dialog

```tsx
// v8 Modal
import { Modal } from '@fluentui/react';

<Modal isOpen={isOpen} onDismiss={handleClose} isBlocking={false}>
  <div>
    <h2>Modal heading</h2>
    <p>Modal body content</p>
    <button onClick={handleClose}>Close</button>
  </div>
</Modal>;
```

```tsx
// v9 — Dialog with modalType="non-modal" (light dismiss, no blocking overlay)
import {
  Dialog,
  DialogSurface,
  DialogBody,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from '@fluentui/react-components';

<Dialog open={isOpen} onOpenChange={(_, data) => setIsOpen(data.open)} modalType="non-modal">
  <DialogSurface>
    <DialogBody>
      <DialogTitle>Modal heading</DialogTitle>
      <DialogContent>Modal body content</DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
      </DialogActions>
    </DialogBody>
  </DialogSurface>
</Dialog>;
```

## modalType Values

| v9 `modalType` | Behavior                                                                 | v8 equivalent                        |
| -------------- | ------------------------------------------------------------------------ | ------------------------------------ |
| `"modal"`      | Default. Has backdrop overlay; Escape or click outside dismisses.        | `isBlocking={false}` (v8 default)    |
| `"non-modal"`  | No backdrop; content behind is interactive; Escape still dismisses.      | `isBlocking={false}` without overlay |
| `"alert"`      | Blocks everything including Escape; user must choose an explicit action. | `isBlocking={true}` + focus trap     |

## IDialogProps → DialogProps

| v8                              | v9                                          | Notes                                        |
| ------------------------------- | ------------------------------------------- | -------------------------------------------- |
| `hidden`                        | `open` (inverted)                           | `hidden={false}` = `open={true}`             |
| `onDismiss`                     | `onOpenChange`                              | `(ev, data) => data.open === false` on close |
| `dialogContentProps.title`      | `<DialogTitle>`                             | JSX child                                    |
| `dialogContentProps.subText`    | `<DialogContent>`                           | JSX child                                    |
| `dialogContentProps.type`       | `modalType` on `<Dialog>`                   | See table above                              |
| `dialogContentProps.titleProps` | Props on `<DialogTitle>`                    |                                              |
| `dialogContentProps.styles`     | `className` + `makeStyles`                  |                                              |
| `modalProps.isBlocking`         | `modalType="alert"`                         |                                              |
| `modalProps.layerProps`         | —                                           | Not supported                                |
| `minWidth` / `maxWidth`         | `style` or `className` on `<DialogSurface>` |                                              |
| `styles`                        | `className` + `makeStyles`                  |                                              |
| `theme`                         | `FluentProvider`                            |                                              |

## IModalProps → DialogProps

| v8                           | v9                               | Notes                              |
| ---------------------------- | -------------------------------- | ---------------------------------- |
| `isOpen`                     | `open`                           |                                    |
| `onDismiss`                  | `onOpenChange`                   |                                    |
| `isBlocking`                 | `modalType="alert"`              | Prevents Escape + backdrop dismiss |
| `isDarkOverlay`              | CSS on `DialogSurface` backdrop  |                                    |
| `scrollableContentClassName` | `className` on `<DialogSurface>` |                                    |
| `containerClassName`         | `className` on `<DialogSurface>` |                                    |
| `layerProps`                 | —                                | Not supported                      |
| `styles`                     | `className` + `makeStyles`       |                                    |
| `theme`                      | `FluentProvider`                 |                                    |

## v8 DialogFooter → DialogActions

**Before:**

```tsx
import { DialogFooter } from '@fluentui/react';
<DialogFooter>
  <PrimaryButton text="OK" />
  <DefaultButton text="Cancel" />
</DialogFooter>;
```

**After:**

```tsx
import { DialogActions } from '@fluentui/react-components';
<DialogActions>
  <Button appearance="primary">OK</Button>
  <Button>Cancel</Button>
</DialogActions>;
```

## Custom close button in title

```tsx
// v9 — add a close button to the title area via the action slot
import { DialogTitle, Button } from '@fluentui/react-components';
import { DismissRegular } from '@fluentui/react-icons';

<DialogTitle action={<Button appearance="subtle" icon={<DismissRegular />} onClick={handleClose} aria-label="Close" />}>
  Dialog title
</DialogTitle>;
```
