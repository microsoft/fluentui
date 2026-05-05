# Panel / Drawer Migration

## Architecture Change

v8 `Panel` is controlled via `isOpen` and configured through flat props (`headerText`, `type`, `onRenderFooterContent`).

v9 `Drawer` is composable: content is structured via `DrawerHeader`, `DrawerBody`, and `DrawerFooter` children.
The v9 package exports two variants:

- **`OverlayDrawer`** — floats over content with a backdrop (equivalent to v8 Panel)
- **`InlineDrawer`** — embedded in the layout and pushes content (no v8 equivalent)

## Before / After Example

### Before

```tsx
import { Panel, PanelType, PrimaryButton, DefaultButton } from '@fluentui/react';

<Panel
  isOpen={isOpen}
  onDismiss={handleClose}
  type={PanelType.medium}
  headerText="Settings"
  isBlocking={false}
  hasCloseButton
  onRenderFooterContent={() => (
    <>
      <PrimaryButton onClick={handleSave} styles={{ root: { marginRight: 8 } }}>
        Save
      </PrimaryButton>
      <DefaultButton onClick={handleClose}>Cancel</DefaultButton>
    </>
  )}
>
  <p>Panel body content</p>
</Panel>;
```

### After

```tsx
import {
  OverlayDrawer,
  DrawerHeader,
  DrawerHeaderTitle,
  DrawerBody,
  DrawerFooter,
  Button,
} from '@fluentui/react-components';
import { DismissRegular } from '@fluentui/react-icons';

<OverlayDrawer
  open={isOpen}
  onOpenChange={(_, data) => setIsOpen(data.open)}
  position="end"
  size="medium"
  modalType="non-modal" // isBlocking={false} equivalent
>
  <DrawerHeader>
    <DrawerHeaderTitle
      action={<Button appearance="subtle" icon={<DismissRegular />} onClick={handleClose} aria-label="Close" />}
    >
      Settings
    </DrawerHeaderTitle>
  </DrawerHeader>

  <DrawerBody>
    <p>Panel body content</p>
  </DrawerBody>

  <DrawerFooter>
    <Button appearance="primary" onClick={handleSave}>
      Save
    </Button>
    <Button onClick={handleClose}>Cancel</Button>
  </DrawerFooter>
</OverlayDrawer>;
```

## PanelType → position + size

| v8 `PanelType`   | v9 `position` | v9 `size`  | Notes                                         |
| ---------------- | ------------- | ---------- | --------------------------------------------- |
| `SmallFixedFar`  | `"end"`       | `"small"`  |                                               |
| `SmallFixedNear` | `"start"`     | `"small"`  |                                               |
| `SmallFluid`     | `"end"`       | `"small"`  | Full height; custom width via CSS             |
| `Medium`         | `"end"`       | `"medium"` | Default                                       |
| `Large`          | `"end"`       | `"large"`  |                                               |
| `LargeFixed`     | `"end"`       | `"large"`  |                                               |
| `ExtraLarge`     | `"end"`       | `"full"`   |                                               |
| `Custom`         | `"end"`       | custom CSS | `style={{ width: '...' }}` on `DrawerSurface` |
| `CustomNear`     | `"start"`     | custom CSS |                                               |

## modalType Values

| v9 `modalType` | v8 equivalent                        | Behavior                                    |
| -------------- | ------------------------------------ | ------------------------------------------- |
| `"modal"`      | `isBlocking={false}` (v8 default)    | Backdrop present; Escape + click-away close |
| `"non-modal"`  | `isBlocking={false}` + light dismiss | No backdrop; content behind is interactive  |
| `"alert"`      | `isBlocking={true}`                  | No dismiss on Escape or click-away          |

> Note: v8 Panel default `isBlocking={false}` (click-away dismisses) is equivalent to v9 `modalType="modal"` (backdrop present, click-away dismisses). The defaults match — no explicit `modalType` is needed when migrating a Panel that used its defaults. Only set `modalType="alert"` if the Panel used `isBlocking={true}`.

## IPanelProps → OverlayDrawerProps

| v8                      | v9                                            | Notes                                        |
| ----------------------- | --------------------------------------------- | -------------------------------------------- |
| `isOpen`                | `open`                                        |                                              |
| `onDismiss`             | `onOpenChange`                                | `(ev, data) => data.open === false` on close |
| `type`                  | `position` + `size`                           | See table above                              |
| `headerText`            | `<DrawerHeaderTitle>` children                |                                              |
| `onRenderHeader`        | `<DrawerHeader>` children                     |                                              |
| `hasCloseButton`        | Button in `DrawerHeaderTitle` `action` slot   | See example above                            |
| `isBlocking`            | `modalType`                                   |                                              |
| `isLightDismiss`        | `modalType="non-modal"`                       |                                              |
| `onRenderFooterContent` | `<DrawerFooter>` children                     |                                              |
| `onRenderBody`          | `<DrawerBody>` children                       |                                              |
| `onRenderNavigation`    | `<DrawerHeaderNavigation>` children           |                                              |
| `customWidth`           | `style={{ width: '...' }}` on `DrawerSurface` |                                              |
| `styles`                | `className` + `makeStyles`                    |                                              |
| `theme`                 | `FluentProvider`                              |                                              |
| `layerProps`            | —                                             | Not supported                                |
| `componentRef`          | `ref`                                         |                                              |

## InlineDrawer (no v8 equivalent)

Use when the drawer should push page content rather than overlay it:

```tsx
import { InlineDrawer, DrawerHeader, DrawerHeaderTitle, DrawerBody } from '@fluentui/react-components';
import { makeStyles } from '@fluentui/react-components';

const useStyles = makeStyles({
  root: { display: 'flex', height: '480px' },
  content: { flex: 1, padding: '16px' },
});

function App() {
  const s = useStyles();
  const [open, setOpen] = React.useState(false);
  return (
    <div className={s.root}>
      <InlineDrawer open={open} position="start" separator>
        <DrawerHeader>
          <DrawerHeaderTitle>Navigation</DrawerHeaderTitle>
        </DrawerHeader>
        <DrawerBody>
          <p>Side nav content</p>
        </DrawerBody>
      </InlineDrawer>
      <div className={s.content}>
        <Button onClick={() => setOpen(o => !o)}>Toggle</Button>
        <p>Main content</p>
      </div>
    </div>
  );
}
```
