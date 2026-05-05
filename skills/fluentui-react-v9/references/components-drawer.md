# Components/Drawer

The Drawer gives users a quick entry point to configuration and information. It should be used when retaining context is beneficial to users.

There are three main components to represent a Drawer:

- `OverlayDrawer`: An overlay Drawer renders on top of the whole page. By default blocks the screen and will require the user's full attention. Uses Dialog component under the hood.
- `InlineDrawer`: An inline Drawer renders within a container and can be placed next to any content.
- `Drawer`: A combination of OverlayDrawer and InlineDrawer. Used when toggling between the two modes is necessary. Often used for responsiveness.

## Best practices

### OverlayDrawer vs InlineDrawer vs Drawer

- `OverlayDrawer`: Should be used only when the full user attention is required. Uses Dialog component under the hood.
- `InlineDrawer`: Should be used when its content do not require full attention or for navigational elements on a page.
- `Drawer`: Should only be used when there is a strict need to toggle between overlay and inline modes. This is often useful for responsive design, so depending on the page viewport an inline drawer could become overlay to save screen space. <br><br>
  Drawer is a component that combines both OverlayDrawer and InlineDrawer. Although it is technically possible to use Drawer for either inline or overlay modes, it is far better to import and use its adequate component. <br><br>
  As an example, in case there is the need to only use the inline mode, it is better to use `<InlineDrawer />` instead of a `<Drawer mode="inline" />`. Drawer would use InlineDrawer internally, but also include OverlayDrawer in the mix. And as the OverlayDrawer has a strong dependency on Dialog component, more code would be included in the final build bundle.

### Accessibility

**Focus**: If the Drawer has a trigger and can be closed, use the `useRestoreFocusTarget` and `useRestoreFocusSource` hooks to handle focus restoration as shown in our examples. Additionally, the `InlineDrawer` does not take focus by default when it is opened; if this functionality is needed, it should be handled manually.

- `OverlayDrawer`: <br>Please refer to the Dialog component to understand the accessibility recommendations and implications.
- `InlineDrawer`: <br>
  **Semantics**: Renders a plain div and do not imply any accessibility semantics by default. It accepts all aria attributes and it should be customized depending on its context within a page. Consider using `role="region"` for large page-level drawers. <br><br>

## Props

| Name             | Type                                                                                                                                                 | Required                                          | Default                     | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------- | --------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----- | ---------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| `as`             | `"aside" "div"`                                                                                                                                      | No                                                |                             |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| `type`           | `"inline" "overlay"`                                                                                                                                 | No                                                | overlay                     | Type of the drawer. - 'overlay' - Drawer is hidden by default and can be opened by clicking on the trigger. - 'inline' - Drawer is stacked with the content                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| `backdropMotion` | `PresenceMotionSlotProps                                                                                                                             | (Pick<PresenceComponentProps, "imperativeRef"     | "onMotionFinish"            | "onMotionStart"> & { ...; } & { ...; })                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | (Pick<...> & ... 1 more ... & { ...; })                                                                                                                                                                                                                                                                                                                                                                                                                                              | null` | No                                                                                                                     |                                              | For more information refer to the [Motion docs page](https://react.fluentui.dev/?path=/docs/motion-motion-slot--docs). |
| `surfaceMotion`  | `PresenceMotionSlotProps<Required<Pick<DrawerBaseProps, "size"                                                                                       | "position"> & Pick<ProviderContextValue, "dir">>> | SurfaceMotionSlotProps      | null`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | No                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |       | For more information refer to the [Motion docs page](https://react.fluentui.dev/?path=/docs/motion-motion-slot--docs). |
| `backdrop`       | `WithSlotShorthandValue<{ as?: "div"; } & Omit<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "children"> & { ...; } & { ...; }> | null`                                             | No                          |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Dimmed background of dialog. The default backdrop is rendered as a `<div>` with styling. This slot expects a `<div>` element which will replace the default backdrop. The backdrop should have `aria-hidden="true"`. Accepts an `appearance` prop to control backdrop visibility: - `'dimmed'`: Always shows a dimmed backdrop, regardless of nesting. - `'transparent'`: Always shows a transparent backdrop. @example `tsx <DialogSurface backdrop={{ appearance: 'dimmed' }} /> ` |
| `mountNode`      | `HTMLElement                                                                                                                                         | { element?: HTMLElement                           | null; className?: string; } | null                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | undefined`                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | No    | a new element on document.body without any styling                                                                     | Where the portal children are mounted on DOM |
| `onOpenChange`   | `DialogOpenChangeEventHandler`                                                                                                                       | No                                                |                             | Callback fired when the component changes value from open state. @param event - a React's Synthetic event or a KeyboardEvent in case of `documentEscapeKeyDown` @param data - A data object with relevant information, such as open value and type of interaction that created the event                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| `inertTrapFocus` | `boolean`                                                                                                                                            | No                                                | false                       | Enables standard behavior according to the [HTML dialog spec](https://developer.mozilla.org/en-US/docs/Web/API/HTMLDialogElement/showModal) where the focus trap involves setting outside elements inert.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `modalType`      | `"alert" "modal" "non-modal"`                                                                                                                        | No                                                | modal                       | Dialog variations. `modal`: When this type of dialog is open, the rest of the page is dimmed out and cannot be interacted with. The tab sequence is kept within the dialog and moving the focus outside the dialog will imply closing it. This is the default type of the component. `non-modal`: When a non-modal dialog is open, the rest of the page is not dimmed out and users can interact with the rest of the page. This also implies that the tab focus can move outside the dialog when it reaches the last focusable element. `alert`: is a special type of modal dialogs that interrupts the user's workflow to communicate an important message or ask for a decision. Unlike a typical modal dialog, the user must take an action through the options given to dismiss the dialog, and it cannot be dismissed through the dimmed background. |
| `position`       | `"start" "end" "bottom"`                                                                                                                             | No                                                | 'start'                     | Position of the drawer. Note: 'bottom' does not supports size, but it supports customized height.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| `size`           | `"small" "medium" "large" "full"`                                                                                                                    | No                                                | 'small'                     | Size of the drawer. - 'small' - Drawer is 320px wide. - 'medium' - Drawer is 592px wide. - 'large' - Drawer is 940px wide. - 'full' - Drawer is 100vw wide.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| `open`           | `boolean`                                                                                                                                            | No                                                | false                       | Controls the open state of the Drawer                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| `unmountOnClose` | `boolean`                                                                                                                                            | No                                                | true                        | Decides whether the drawer should be removed from the DOM tree when it is closed. This can be useful when dealing with components that may contain state that should not be reset when the drawer is closed.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| `defaultOpen`    | `boolean`                                                                                                                                            | No                                                |                             | @deprecated OverlayDrawer can work only as a controlled component and does not support uncontrolled mode i.e. defaultOpen prop                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `separator`      | `boolean`                                                                                                                                            | No                                                | false                       | Whether the drawer has a separator line.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |

## Subcomponents

### OverlayDrawer

OverlayDrawer contains supplementary content and are used for complex creation, edit, or management experiences.

#### Props

| Name             | Type                                                                                                                                                 | Required                                          | Default                                                                                              | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------- | ---------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| `backdropMotion` | `(Pick<PresenceComponentProps, "imperativeRef"                                                                                                       | "onMotionFinish"                                  | "onMotionStart"> & { as?: JSXIntrinsicElementKeys; children?: SlotRenderFunction<...>; } & { ...; }) | null                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | undefined`                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | No                                                                                                                     |                                                    | For more information refer to the [Motion docs page](https://react.fluentui.dev/?path=/docs/motion-motion-slot--docs). |
| `surfaceMotion`  | `PresenceMotionSlotProps<Required<Pick<DrawerBaseProps, "size"                                                                                       | "position"> & Pick<ProviderContextValue, "dir">>> | null`                                                                                                | No                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | For more information refer to the [Motion docs page](https://react.fluentui.dev/?path=/docs/motion-motion-slot--docs). |
| `backdrop`       | `WithSlotShorthandValue<{ as?: "div"; } & Omit<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "children"> & { ...; } & { ...; }> | null`                                             | No                                                                                                   |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Dimmed background of dialog. The default backdrop is rendered as a `<div>` with styling. This slot expects a `<div>` element which will replace the default backdrop. The backdrop should have `aria-hidden="true"`. Accepts an `appearance` prop to control backdrop visibility: - `'dimmed'`: Always shows a dimmed backdrop, regardless of nesting. - `'transparent'`: Always shows a transparent backdrop. @example `tsx <DialogSurface backdrop={{ appearance: 'dimmed' }} /> ` |
| `as`             | `"aside" "div"`                                                                                                                                      | No                                                |                                                                                                      |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| `mountNode`      | `HTMLElement                                                                                                                                         | { element?: HTMLElement                           | null; className?: string; }                                                                          | null                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | undefined`                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | No                                                                                                                     | a new element on document.body without any styling | Where the portal children are mounted on DOM                                                                           |
| `onOpenChange`   | `DialogOpenChangeEventHandler`                                                                                                                       | No                                                |                                                                                                      | Callback fired when the component changes value from open state. @param event - a React's Synthetic event or a KeyboardEvent in case of `documentEscapeKeyDown` @param data - A data object with relevant information, such as open value and type of interaction that created the event                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| `inertTrapFocus` | `boolean`                                                                                                                                            | No                                                | false                                                                                                | Enables standard behavior according to the [HTML dialog spec](https://developer.mozilla.org/en-US/docs/Web/API/HTMLDialogElement/showModal) where the focus trap involves setting outside elements inert.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `modalType`      | `"alert" "modal" "non-modal"`                                                                                                                        | No                                                | modal                                                                                                | Dialog variations. `modal`: When this type of dialog is open, the rest of the page is dimmed out and cannot be interacted with. The tab sequence is kept within the dialog and moving the focus outside the dialog will imply closing it. This is the default type of the component. `non-modal`: When a non-modal dialog is open, the rest of the page is not dimmed out and users can interact with the rest of the page. This also implies that the tab focus can move outside the dialog when it reaches the last focusable element. `alert`: is a special type of modal dialogs that interrupts the user's workflow to communicate an important message or ask for a decision. Unlike a typical modal dialog, the user must take an action through the options given to dismiss the dialog, and it cannot be dismissed through the dimmed background. |
| `position`       | `"start" "end" "bottom"`                                                                                                                             | No                                                | 'start'                                                                                              | Position of the drawer. Note: 'bottom' does not supports size, but it supports customized height.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| `size`           | `"small" "medium" "large" "full"`                                                                                                                    | No                                                | 'small'                                                                                              | Size of the drawer. - 'small' - Drawer is 320px wide. - 'medium' - Drawer is 592px wide. - 'large' - Drawer is 940px wide. - 'full' - Drawer is 100vw wide.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| `open`           | `boolean`                                                                                                                                            | No                                                | false                                                                                                | Controls the open state of the Drawer                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| `unmountOnClose` | `boolean`                                                                                                                                            | No                                                | true                                                                                                 | Decides whether the drawer should be removed from the DOM tree when it is closed. This can be useful when dealing with components that may contain state that should not be reset when the drawer is closed.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| `defaultOpen`    | `boolean`                                                                                                                                            | No                                                |                                                                                                      | @deprecated OverlayDrawer can work only as a controlled component and does not support uncontrolled mode i.e. defaultOpen prop                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `ref`            | `Ref<HTMLElement>`                                                                                                                                   | No                                                |                                                                                                      |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |

### InlineDrawer

InlineDrawer is often used for navigation that is not dismissible. As it is on the same level as
the main surface, users can still interact with other UI elements.

#### Props

| Name             | Type                              | Required | Default | Description                                                                                                                                                                                                  |
| ---------------- | --------------------------------- | -------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --- |
| `surfaceMotion`  | `SurfaceMotionSlotProps           | null`    | No      |                                                                                                                                                                                                              |     |
| `as`             | `"aside" "div"`                   | No       |         |                                                                                                                                                                                                              |
| `position`       | `"start" "end" "bottom"`          | No       | 'start' | Position of the drawer. Note: 'bottom' does not supports size, but it supports customized height.                                                                                                            |
| `size`           | `"small" "medium" "large" "full"` | No       | 'small' | Size of the drawer. - 'small' - Drawer is 320px wide. - 'medium' - Drawer is 592px wide. - 'large' - Drawer is 940px wide. - 'full' - Drawer is 100vw wide.                                                  |
| `open`           | `boolean`                         | No       | false   | Controls the open state of the Drawer                                                                                                                                                                        |
| `unmountOnClose` | `boolean`                         | No       | true    | Decides whether the drawer should be removed from the DOM tree when it is closed. This can be useful when dealing with components that may contain state that should not be reset when the drawer is closed. |
| `separator`      | `boolean`                         | No       | false   | Whether the drawer has a separator line.                                                                                                                                                                     |
| `ref`            | `Ref<HTMLElement>`                | No       |         |                                                                                                                                                                                                              |

### DrawerHeader

DrawerHeader provides a structured header for the drawer component.

#### Props

| Name  | Type               | Required | Default | Description |
| ----- | ------------------ | -------- | ------- | ----------- |
| `as`  | `"header"`         | No       |         |             |
| `ref` | `Ref<HTMLElement>` | No       |         |             |

### DrawerHeaderTitle

DrawerHeader provides a structured header for the drawer component.

#### Props

| Name      | Type                                                                                                                                      | Required        | Default | Description |
| --------- | ----------------------------------------------------------------------------------------------------------------------------------------- | --------------- | ------- | ----------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `heading` | `({ as: "h1"; } & Omit<DetailedHTMLProps<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>, "children"> & { ...; })                 | ... 7 more ...` | No      |             | By default this is a h2, but can be any heading or div. If `div` is provided do not forget to also provide proper `role="heading"` and `aria-level` attributes |
| `action`  | `WithSlotShorthandValue<{ as?: "div"; } & Omit<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "children"> & { ...; }> | null`           | No      |             | Action slot for the close button                                                                                                                               |
| `as`      | `"div"`                                                                                                                                   | No              |         |             |
| `ref`     | `Ref<HTMLDivElement>`                                                                                                                     | No              |         |             |

### DrawerHeaderNavigation

DrawerHeaderNavigation provides a header navigation area for the Drawer.

#### Props

| Name  | Type               | Required | Default | Description |
| ----- | ------------------ | -------- | ------- | ----------- |
| `as`  | `"nav"`            | No       |         |             |
| `ref` | `Ref<HTMLElement>` | No       |         |             |

### DrawerBody

DrawerBody provides with a container for the main content of a Drawer.

#### Props

| Name  | Type                  | Required | Default | Description |
| ----- | --------------------- | -------- | ------- | ----------- |
| `as`  | `"div"`               | No       |         |             |
| `ref` | `Ref<HTMLDivElement>` | No       |         |             |

### DrawerFooter

DrawerFooter provides a structured footer for the drawer component.

#### Props

| Name  | Type               | Required | Default | Description |
| ----- | ------------------ | -------- | ------- | ----------- |
| `as`  | `"footer"`         | No       |         |             |
| `ref` | `Ref<HTMLElement>` | No       |         |             |

## Examples

### Always Open

A drawer can be always open, in which case it will not be able to be closed by the user.
This is useful for drawers that are used for navigation, and should always be visible.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { DrawerBody, DrawerHeader, DrawerHeaderTitle, InlineDrawer, makeStyles } from '@fluentui/react-components';

const useStyles = makeStyles({
  root: {
    border: '2px solid #ccc',
    overflow: 'hidden',
    display: 'flex',
    height: '480px',
    backgroundColor: '#fff',
  },

  content: {
    flex: '1',
    padding: '16px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
});

export const AlwaysOpen = (): JSXElement => {
  const styles = useStyles();

  return (
    <div className={styles.root}>
      <InlineDrawer separator open>
        <DrawerHeader>
          <DrawerHeaderTitle>Always open</DrawerHeaderTitle>
        </DrawerHeader>

        <DrawerBody>
          <p>Drawer content</p>
        </DrawerBody>
      </InlineDrawer>

      <div className={styles.content}>
        <p>This is the page content</p>
      </div>
    </div>
  );
};
```

### Custom Size

The Drawer can be sized to any custom width, by overriding the `width` style property.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import {
  DrawerBody,
  DrawerHeader,
  DrawerHeaderTitle,
  OverlayDrawer,
  Button,
  Field,
  tokens,
  makeStyles,
  Input,
  useRestoreFocusSource,
  useRestoreFocusTarget,
} from '@fluentui/react-components';
import { Dismiss24Regular } from '@fluentui/react-icons';

const useStyles = makeStyles({
  main: {
    display: 'grid',
    justifyContent: 'flex-start',
    gridRowGap: tokens.spacingVerticalXXL,
  },

  field: {
    display: 'grid',
    gridRowGap: tokens.spacingVerticalS,
  },
});

export const CustomSize = (): JSXElement => {
  const styles = useStyles();

  const [open, setOpen] = React.useState(false);
  const [customSize, setCustomSize] = React.useState(600);

  // all Drawers need manual focus restoration attributes
  // unless (as in the case of some inline drawers, you do not want automatic focus restoration)
  const restoreFocusTargetAttributes = useRestoreFocusTarget();
  const restoreFocusSourceAttributes = useRestoreFocusSource();

  return (
    <div>
      <OverlayDrawer
        {...restoreFocusSourceAttributes}
        open={open}
        position="end"
        onOpenChange={(_, state) => setOpen(state.open)}
        style={{ width: `${customSize}px` }}
      >
        <DrawerHeader>
          <DrawerHeaderTitle
            action={
              <Button
                appearance="subtle"
                aria-label="Close"
                icon={<Dismiss24Regular />}
                onClick={() => setOpen(false)}
              />
            }
          >
            Drawer with {customSize}px size
          </DrawerHeaderTitle>
        </DrawerHeader>

        <DrawerBody>
          <p>Drawer content</p>
        </DrawerBody>
      </OverlayDrawer>

      <div className={styles.main}>
        <Button {...restoreFocusTargetAttributes} appearance="primary" onClick={() => setOpen(true)}>
          Open Drawer
        </Button>

        <div className={styles.field}>
          <Field label="Size">
            <Input
              pattern="[0-9]*"
              value={customSize.toString()}
              onChange={(_, data) => setCustomSize(data.value ? parseInt(data.value, 10) : 0)}
            />
          </Field>
        </div>
      </div>
    </div>
  );
};
```

### Default

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import {
  DrawerBody,
  DrawerHeader,
  DrawerHeaderTitle,
  Drawer,
  DrawerProps,
  Button,
  Label,
  Radio,
  RadioGroup,
  makeStyles,
  tokens,
  useId,
  useRestoreFocusSource,
  useRestoreFocusTarget,
  ToggleButton,
} from '@fluentui/react-components';
import { Dismiss24Regular } from '@fluentui/react-icons';

const useStyles = makeStyles({
  root: {
    border: '2px solid #ccc',
    overflow: 'hidden',

    display: 'flex',
    height: '480px',
    backgroundColor: '#fff',
  },

  content: {
    flex: '1',
    padding: '16px',

    display: 'grid',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    gridRowGap: tokens.spacingVerticalXXL,
    gridAutoRows: 'max-content',
  },

  field: {
    display: 'grid',
    gridRowGap: tokens.spacingVerticalS,
  },
});

type DrawerType = Required<DrawerProps>['type'];

export const Default = (): JSXElement => {
  const styles = useStyles();
  const labelId = useId('type-label');

  const [isOpen, setIsOpen] = React.useState(false);
  const [type, setType] = React.useState<DrawerType>('overlay');

  // all Drawers need manual focus restoration attributes
  // unless (as in the case of some inline drawers, you do not want automatic focus restoration)
  const restoreFocusTargetAttributes = useRestoreFocusTarget();
  const restoreFocusSourceAttributes = useRestoreFocusSource();

  return (
    <div className={styles.root}>
      <Drawer
        {...restoreFocusSourceAttributes}
        type={type}
        separator
        open={isOpen}
        onOpenChange={(_, { open }) => setIsOpen(open)}
      >
        <DrawerHeader>
          <DrawerHeaderTitle
            action={
              <Button
                appearance="subtle"
                aria-label="Close"
                icon={<Dismiss24Regular />}
                onClick={() => setIsOpen(false)}
              />
            }
          >
            Default Drawer
          </DrawerHeaderTitle>
        </DrawerHeader>

        <DrawerBody>
          <p>Drawer content</p>
        </DrawerBody>
      </Drawer>

      <div className={styles.content}>
        {type === 'inline' ? (
          <ToggleButton
            {...restoreFocusTargetAttributes}
            appearance="primary"
            onClick={() => setIsOpen(!isOpen)}
            checked={isOpen}
          >
            Toggle
          </ToggleButton>
        ) : (
          <Button {...restoreFocusTargetAttributes} appearance="primary" onClick={() => setIsOpen(!isOpen)}>
            Open
          </Button>
        )}

        <div className={styles.field}>
          <Label id={labelId}>Type</Label>
          <RadioGroup value={type} onChange={(_, data) => setType(data.value as DrawerType)} aria-labelledby={labelId}>
            <Radio value="overlay" label="Overlay (Default)" />
            <Radio value="inline" label="Inline" />
          </RadioGroup>
        </div>
      </div>
    </div>
  );
};
```

### Inline

InlineDrawer is often used for navigation that is not dismissible.
As it is on the same level as the main surface, users can still interact with other UI elements.
This could be useful for swapping between different items in the main surface.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import {
  DrawerBody,
  DrawerHeader,
  DrawerHeaderTitle,
  InlineDrawer,
  Button,
  makeStyles,
  tokens,
  InlineDrawerProps,
  mergeClasses,
  useRestoreFocusSource,
  useRestoreFocusTarget,
  ToggleButton,
} from '@fluentui/react-components';
import { Dismiss24Regular } from '@fluentui/react-icons';

const useStyles = makeStyles({
  root: {
    border: '2px solid #ccc',
    overflow: 'hidden',

    display: 'flex',
    height: '480px',
    backgroundColor: '#fff',
  },

  content: {
    flex: '1',
    padding: '16px',
    overflow: 'auto',

    position: 'relative',
  },

  flexColumn: {
    flexDirection: 'column',
  },

  buttons: {
    flex: '1',
    padding: '16px',

    position: 'sticky',
    top: '-16px',
    right: '-16px',
    left: '-16px',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'flex-start',
    columnGap: tokens.spacingHorizontalXS,
    backgroundColor: '#fff',
    transitionDuration: tokens.durationFast,
  },
});

type DrawerInlineExampleProps = InlineDrawerProps & {
  setOpen: (open: boolean) => void;
};

const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

const DrawerInlineExample: React.FC<DrawerInlineExampleProps> = ({ setOpen, ...props }) => {
  const restoreFocusSourceAttributes = useRestoreFocusSource();

  return (
    <InlineDrawer {...restoreFocusSourceAttributes} {...props}>
      <DrawerHeader>
        <DrawerHeaderTitle
          action={
            <Button appearance="subtle" aria-label="Close" icon={<Dismiss24Regular />} onClick={() => setOpen(false)} />
          }
        >
          {capitalize(props.position!)} Inline Drawer
        </DrawerHeaderTitle>
      </DrawerHeader>

      <DrawerBody>
        <p>Drawer content</p>
      </DrawerBody>
    </InlineDrawer>
  );
};

export const Inline = (): JSXElement => {
  const styles = useStyles();

  const [startOpen, setStartOpen] = React.useState(false);
  const [endOpen, setEndOpen] = React.useState(false);
  const [bottomOpen, setBottomOpen] = React.useState(false);

  const restoreFocusTargetAttributes = useRestoreFocusTarget();

  return (
    <div className={mergeClasses(styles.root, styles.flexColumn)}>
      <div className={styles.root}>
        <DrawerInlineExample as="aside" open={startOpen} setOpen={setStartOpen} position="start" />

        <div className={styles.content}>
          <div className={styles.buttons}>
            <ToggleButton
              {...restoreFocusTargetAttributes}
              appearance="primary"
              onClick={() => setStartOpen(!startOpen)}
              checked={startOpen}
            >
              Toggle start
            </ToggleButton>

            <ToggleButton
              {...restoreFocusTargetAttributes}
              appearance="primary"
              onClick={() => setEndOpen(!endOpen)}
              checked={endOpen}
            >
              Toggle end
            </ToggleButton>

            <ToggleButton
              {...restoreFocusTargetAttributes}
              appearance="primary"
              onClick={() => setBottomOpen(!bottomOpen)}
              checked={bottomOpen}
            >
              Toggle bottom
            </ToggleButton>
          </div>

          {Array.from({ length: 100 }, (_, i) => (
            <p key={i}>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Tempore voluptatem similique reiciendis, ipsa
              accusamus distinctio dolorum quisquam, tenetur minima animi autem nobis. Molestias totam natus, deleniti
              nam itaque placeat quisquam!
            </p>
          ))}
        </div>

        <DrawerInlineExample open={endOpen} setOpen={setEndOpen} position="end" />
      </div>

      <DrawerInlineExample open={bottomOpen} setOpen={setBottomOpen} position="bottom" />
    </div>
  );
};
```

### Keep Rendered In The DOM

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import {
  DrawerBody,
  DrawerHeader,
  DrawerHeaderTitle,
  Drawer,
  DrawerProps,
  Button,
  Label,
  Radio,
  RadioGroup,
  makeStyles,
  tokens,
  useId,
  useRestoreFocusSource,
  useRestoreFocusTarget,
  ToggleButton,
} from '@fluentui/react-components';
import { Dismiss24Regular } from '@fluentui/react-icons';

const useStyles = makeStyles({
  root: {
    border: '2px solid #ccc',
    overflow: 'hidden',

    display: 'flex',
    height: '480px',
    backgroundColor: '#fff',
  },

  content: {
    flex: '1',
    padding: '16px',

    display: 'grid',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    gridRowGap: tokens.spacingVerticalXXL,
    gridAutoRows: 'max-content',
  },

  field: {
    display: 'grid',
    gridRowGap: tokens.spacingVerticalS,
  },
});

type DrawerType = Required<DrawerProps>['type'];

export const KeepRenderedInTheDOM = (): JSXElement => {
  const styles = useStyles();
  const labelId = useId('type-label');

  const [isOpen, setIsOpen] = React.useState(false);
  const [type, setType] = React.useState<DrawerType>('overlay');

  // all Drawers need manual focus restoration attributes
  // unless (as in the case of some inline drawers, you do not want automatic focus restoration)
  const restoreFocusTargetAttributes = useRestoreFocusTarget();
  const restoreFocusSourceAttributes = useRestoreFocusSource();

  return (
    <div className={styles.root}>
      <Drawer
        {...restoreFocusSourceAttributes}
        type={type}
        separator
        open={isOpen}
        onOpenChange={(_, { open }) => setIsOpen(open)}
        unmountOnClose={false}
      >
        <DrawerHeader>
          <DrawerHeaderTitle
            action={
              <Button
                appearance="subtle"
                aria-label="Close"
                icon={<Dismiss24Regular />}
                onClick={() => setIsOpen(false)}
              />
            }
          >
            Default Drawer
          </DrawerHeaderTitle>
        </DrawerHeader>

        <DrawerBody>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Nisl pretium fusce id velit ut tortor. Leo vel fringilla est ullamcorper. Eget est
            lorem ipsum dolor sit amet consectetur adipiscing elit. In mollis nunc sed id semper risus in hendrerit
            gravida. Ullamcorper sit amet risus nullam eget felis eget. Dolor sed viverra ipsum nunc aliquet bibendum.
            Facilisi morbi tempus iaculis urna id volutpat. Porta non pulvinar neque laoreet suspendisse. Nunc id cursus
            metus aliquam eleifend mi in. A iaculis at erat pellentesque adipiscing commodo. Proin nibh nisl condimentum
            id. In hac habitasse platea dictumst vestibulum rhoncus est. Non tellus orci ac auctor augue mauris augue
            neque. Enim nulla aliquet porttitor lacus luctus accumsan tortor. Nascetur ridiculus mus mauris vitae
            ultricies leo integer. Ullamcorper eget nulla facilisi etiam dignissim. Leo in vitae turpis massa sed
            elementum tempus egestas sed.
          </p>

          <p>
            Ut enim blandit volutpat maecenas volutpat. Venenatis urna cursus eget nunc scelerisque viverra mauris.
            Neque aliquam vestibulum morbi blandit. Porttitor eget dolor morbi non. Nisi quis eleifend quam adipiscing
            vitae. Aliquam ultrices sagittis orci a scelerisque purus semper. Interdum varius sit amet mattis vulputate
            enim nulla aliquet. Ut sem viverra aliquet eget sit amet tellus cras. Sit amet tellus cras adipiscing enim
            eu turpis egestas. Amet cursus sit amet dictum sit amet justo donec enim. Neque gravida in fermentum et
            sollicitudin ac. Arcu cursus euismod quis viverra nibh cras pulvinar mattis nunc. Ultrices eros in cursus
            turpis massa tincidunt dui. Nisl rhoncus mattis rhoncus urna neque viverra justo. Odio pellentesque diam
            volutpat commodo sed egestas. Nunc mi ipsum faucibus vitae aliquet nec ullamcorper. Ipsum nunc aliquet
            bibendum enim. Faucibus ornare suspendisse sed nisi lacus sed. Sapien nec sagittis aliquam malesuada
            bibendum arcu vitae elementum. Metus vulputate eu scelerisque felis imperdiet.
          </p>

          <p>
            Consequat interdum varius sit amet mattis vulputate enim. Amet cursus sit amet dictum sit amet justo. Eget
            aliquet nibh praesent tristique magna sit. Ut consequat semper viverra nam libero justo. Pharetra massa
            massa ultricies mi. Sem viverra aliquet eget sit amet. Pulvinar mattis nunc sed blandit libero volutpat sed.
            Pharetra diam sit amet nisl suscipit adipiscing bibendum. Consectetur adipiscing elit ut aliquam. Volutpat
            diam ut venenatis tellus in metus vulputate. Scelerisque in dictum non consectetur a erat. Venenatis lectus
            magna fringilla urna porttitor rhoncus. Vitae congue mauris rhoncus aenean vel elit. Neque laoreet
            suspendisse interdum consectetur. Ultrices gravida dictum fusce ut placerat orci. Bibendum ut tristique et
            egestas quis ipsum suspendisse. Mattis rhoncus urna neque viverra justo nec ultrices dui. Elit duis
            tristique sollicitudin nibh sit amet.
          </p>

          <p>
            At risus viverra adipiscing at. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit.
            Nunc vel risus commodo viverra maecenas. Sit amet est placerat in egestas erat imperdiet sed euismod. Turpis
            egestas maecenas pharetra convallis posuere. Egestas tellus rutrum tellus pellentesque eu tincidunt tortor
            aliquam. Dolor sit amet consectetur adipiscing elit. Aliquam purus sit amet luctus venenatis lectus magna
            fringilla. Scelerisque fermentum dui faucibus in ornare quam viverra. Egestas maecenas pharetra convallis
            posuere morbi leo urna. A diam sollicitudin tempor id eu nisl nunc. Lectus sit amet est placerat.
          </p>

          <p>
            Mattis ullamcorper velit sed ullamcorper morbi tincidunt ornare massa eget. At tellus at urna condimentum
            mattis pellentesque id nibh. Dui faucibus in ornare quam. Tincidunt id aliquet risus feugiat in ante metus
            dictum. Adipiscing commodo elit at imperdiet dui. Dolor sed viverra ipsum nunc. Sodales neque sodales ut
            etiam sit amet nisl. Hendrerit dolor magna eget est lorem ipsum dolor sit amet. Mattis molestie a iaculis at
            erat pellentesque adipiscing. Adipiscing elit duis tristique sollicitudin nibh sit amet commodo nulla.
            Fringilla urna porttitor rhoncus dolor purus.
          </p>

          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Nisl pretium fusce id velit ut tortor. Leo vel fringilla est ullamcorper. Eget est
            lorem ipsum dolor sit amet consectetur adipiscing elit. In mollis nunc sed id semper risus in hendrerit
            gravida. Ullamcorper sit amet risus nullam eget felis eget. Dolor sed viverra ipsum nunc aliquet bibendum.
            Facilisi morbi tempus iaculis urna id volutpat. Porta non pulvinar neque laoreet suspendisse. Nunc id cursus
            metus aliquam eleifend mi in. A iaculis at erat pellentesque adipiscing commodo. Proin nibh nisl condimentum
            id. In hac habitasse platea dictumst vestibulum rhoncus est. Non tellus orci ac auctor augue mauris augue
            neque. Enim nulla aliquet porttitor lacus luctus accumsan tortor. Nascetur ridiculus mus mauris vitae
            ultricies leo integer. Ullamcorper eget nulla facilisi etiam dignissim. Leo in vitae turpis massa sed
            elementum tempus egestas sed.
          </p>

          <p>
            Ut enim blandit volutpat maecenas volutpat. Venenatis urna cursus eget nunc scelerisque viverra mauris.
            Neque aliquam vestibulum morbi blandit. Porttitor eget dolor morbi non. Nisi quis eleifend quam adipiscing
            vitae. Aliquam ultrices sagittis orci a scelerisque purus semper. Interdum varius sit amet mattis vulputate
            enim nulla aliquet. Ut sem viverra aliquet eget sit amet tellus cras. Sit amet tellus cras adipiscing enim
            eu turpis egestas. Amet cursus sit amet dictum sit amet justo donec enim. Neque gravida in fermentum et
            sollicitudin ac. Arcu cursus euismod quis viverra nibh cras pulvinar mattis nunc. Ultrices eros in cursus
            turpis massa tincidunt dui. Nisl rhoncus mattis rhoncus urna neque viverra justo. Odio pellentesque diam
            volutpat commodo sed egestas. Nunc mi ipsum faucibus vitae aliquet nec ullamcorper. Ipsum nunc aliquet
            bibendum enim. Faucibus ornare suspendisse sed nisi lacus sed. Sapien nec sagittis aliquam malesuada
            bibendum arcu vitae elementum. Metus vulputate eu scelerisque felis imperdiet.
          </p>

          <p>
            Consequat interdum varius sit amet mattis vulputate enim. Amet cursus sit amet dictum sit amet justo. Eget
            aliquet nibh praesent tristique magna sit. Ut consequat semper viverra nam libero justo. Pharetra massa
            massa ultricies mi. Sem viverra aliquet eget sit amet. Pulvinar mattis nunc sed blandit libero volutpat sed.
            Pharetra diam sit amet nisl suscipit adipiscing bibendum. Consectetur adipiscing elit ut aliquam. Volutpat
            diam ut venenatis tellus in metus vulputate. Scelerisque in dictum non consectetur a erat. Venenatis lectus
            magna fringilla urna porttitor rhoncus. Vitae congue mauris rhoncus aenean vel elit. Neque laoreet
            suspendisse interdum consectetur. Ultrices gravida dictum fusce ut placerat orci. Bibendum ut tristique et
            egestas quis ipsum suspendisse. Mattis rhoncus urna neque viverra justo nec ultrices dui. Elit duis
            tristique sollicitudin nibh sit amet.
          </p>
        </DrawerBody>
      </Drawer>

      <div className={styles.content}>
        {type === 'inline' ? (
          <ToggleButton
            {...restoreFocusTargetAttributes}
            appearance="primary"
            onClick={() => setIsOpen(!isOpen)}
            checked={isOpen}
          >
            Toggle
          </ToggleButton>
        ) : (
          <Button {...restoreFocusTargetAttributes} appearance="primary" onClick={() => setIsOpen(!isOpen)}>
            Open
          </Button>
        )}

        <div className={styles.field}>
          <Label id={labelId}>Type</Label>
          <RadioGroup value={type} onChange={(_, data) => setType(data.value as DrawerType)} aria-labelledby={labelId}>
            <Radio value="overlay" label="Overlay (Default)" />
            <Radio value="inline" label="Inline" />
          </RadioGroup>
        </div>
      </div>
    </div>
  );
};
```

### Motion Custom

Drawer animations can be customized using the [Motion APIs](?path=/docs/motion-apis-createpresencecomponent--docs), together with the `surfaceMotion` prop.

```tsx
import {
  Button,
  DrawerBody,
  DrawerHeader,
  DrawerHeaderTitle,
  InlineDrawer,
  createPresenceComponent,
  makeStyles,
  motionTokens,
  tokens,
} from '@fluentui/react-components';
import { Dismiss24Regular } from '@fluentui/react-icons';
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';

const drawerWidth = '320px';
const drawerMargin = tokens.spacingVerticalM;

const useStyles = makeStyles({
  root: {
    border: '2px solid #ccc',
    overflow: 'hidden',
    position: 'relative',

    display: 'flex',
    height: '480px',
    backgroundColor: tokens.colorNeutralBackground1,
  },

  drawer: {
    width: drawerWidth,
    border: '1px solid',
  },

  content: {
    flex: '1',
    padding: '16px',
    display: 'grid',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    gap: tokens.spacingVerticalM,
    gridAutoRows: 'max-content',
    boxSizing: 'border-box',
    position: 'absolute',
    inset: 0,
    backgroundColor: tokens.colorNeutralBackground1,
    border: `1px solid ${tokens.colorNeutralBackground1}`,
  },
});

/*
 * Create a custom DrawerMotion component that animates the drawer surface.
 */
const DrawerMotion = createPresenceComponent(() => {
  const keyframes = [
    {
      opacity: 0,
      transform: 'translate3D(-100%, 0, 0)',
      margin: 0,
      backgroundColor: tokens.colorNeutralBackground1,
      borderColor: tokens.colorNeutralBackground1,
      borderRadius: 0,
    },
    {
      opacity: 1,
      transform: 'translate3D(0, 0, 0)',
      margin: drawerMargin,
      backgroundColor: tokens.colorNeutralBackground3,
      borderColor: tokens.colorNeutralBackground4,
      borderRadius: tokens.borderRadiusXLarge,
    },
  ];

  return {
    enter: {
      keyframes,
      duration: motionTokens.durationNormal,
      easing: motionTokens.curveDecelerateMin,
    },
    exit: {
      keyframes: [...keyframes].reverse(),
      duration: motionTokens.durationSlow,
      easing: motionTokens.curveAccelerateMin,
    },
  };
});

/*
 * Create a custom ContentMotion component that animates the content element.
 */
const ContentMotion = createPresenceComponent(() => {
  const keyframes = [
    {
      transform: 'translate3D(0, 0, 0)',
      width: '100%',
      margin: 0,
      backgroundColor: tokens.colorNeutralBackground1,
      borderColor: tokens.colorNeutralBackground1,
      borderRadius: 0,
    },
    {
      transform: `translate3D(calc(${drawerWidth} + ${drawerMargin} * 2), 0, 0)`,
      width: `calc(100% - ${drawerWidth} - ${drawerMargin} * 3)`,
      margin: `${drawerMargin} 0`,
      backgroundColor: tokens.colorNeutralBackground3,
      borderColor: tokens.colorNeutralBackground4,
      borderRadius: tokens.borderRadiusXLarge,
    },
  ];

  return {
    enter: {
      keyframes,
      duration: motionTokens.durationGentle,
      easing: motionTokens.curveDecelerateMin,
    },
    exit: {
      keyframes: [...keyframes].reverse(),
      duration: motionTokens.durationGentle,
      easing: motionTokens.curveAccelerateMin,
    },
  };
});

export const MotionCustom = (): JSXElement => {
  const styles = useStyles();
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className={styles.root}>
      <InlineDrawer
        className={styles.drawer}
        // Override motion settings for the drawer surface
        surfaceMotion={{ children: (_, props) => <DrawerMotion {...props} /> }}
        separator
        open={isOpen}
      >
        <DrawerHeader>
          <DrawerHeaderTitle
            action={
              <Button
                appearance="subtle"
                aria-label="Close"
                icon={<Dismiss24Regular />}
                onClick={() => setIsOpen(false)}
              />
            }
          >
            Default Drawer
          </DrawerHeaderTitle>
        </DrawerHeader>

        <DrawerBody>
          <p>Drawer content</p>
        </DrawerBody>
      </InlineDrawer>

      <ContentMotion visible={isOpen}>
        <div className={styles.content}>
          <Button appearance="primary" onClick={() => setIsOpen(!isOpen)}>
            Toggle Drawer
          </Button>

          <p>Drawer content</p>
        </div>
      </ContentMotion>
    </div>
  );
};
```

### Motion Disabled

To disable the Drawer transition animation, you can set both `surfaceMotion` and `backdropMotion` props of the Drawer to `null`.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import {
  DrawerBody,
  DrawerHeader,
  DrawerHeaderTitle,
  Drawer,
  DrawerProps,
  Button,
  Label,
  Radio,
  RadioGroup,
  makeStyles,
  tokens,
  useId,
  useRestoreFocusSource,
  useRestoreFocusTarget,
} from '@fluentui/react-components';
import { Dismiss24Regular } from '@fluentui/react-icons';

const useStyles = makeStyles({
  root: {
    border: '2px solid #ccc',
    overflow: 'hidden',

    display: 'flex',
    height: '480px',
    backgroundColor: '#fff',
  },

  content: {
    flex: '1',
    padding: '16px',

    display: 'grid',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    gap: tokens.spacingVerticalXXL,
    gridAutoRows: 'max-content',
  },

  field: {
    display: 'grid',
    gap: tokens.spacingVerticalS,
  },
});

type DrawerType = Required<DrawerProps>['type'];

export const MotionDisabled = (): JSXElement => {
  const styles = useStyles();
  const labelId = useId('type-label');

  const [isOpen, setIsOpen] = React.useState(false);
  const [type, setType] = React.useState<DrawerType>('overlay');

  // all Drawers need manual focus restoration attributes
  // unless (as in the case of some inline drawers, you do not want automatic focus restoration)
  const restoreFocusTargetAttributes = useRestoreFocusTarget();
  const restoreFocusSourceAttributes = useRestoreFocusSource();

  return (
    <div className={styles.root}>
      <Drawer
        backdropMotion={null}
        surfaceMotion={null}
        type={type}
        {...restoreFocusSourceAttributes}
        separator
        open={isOpen}
        onOpenChange={(_, { open }) => setIsOpen(open)}
      >
        <DrawerHeader>
          <DrawerHeaderTitle
            action={
              <Button
                appearance="subtle"
                aria-label="Close"
                icon={<Dismiss24Regular />}
                onClick={() => setIsOpen(false)}
              />
            }
          >
            Default Drawer
          </DrawerHeaderTitle>
        </DrawerHeader>

        <DrawerBody>
          <p>Drawer content</p>
        </DrawerBody>
      </Drawer>

      <div className={styles.content}>
        <Button {...restoreFocusTargetAttributes} appearance="primary" onClick={() => setIsOpen(!isOpen)}>
          {type === 'inline' ? 'Toggle' : 'Open'}
        </Button>

        <div className={styles.field}>
          <Label id={labelId}>Type</Label>
          <RadioGroup value={type} onChange={(_, data) => setType(data.value as DrawerType)} aria-labelledby={labelId}>
            <Radio value="overlay" label="Overlay (Default)" />
            <Radio value="inline" label="Inline" />
          </RadioGroup>
        </div>
      </div>
    </div>
  );
};
```

### Multiple Levels

When there is a need to display multiple levels of content, the drawer can be used to display them.
It is not recommended to invoke one drawer from another, as it can lead to a confusing experience for the user.
Instead, when a second level of a Drawer is required, the L2 content pushes the L1 Drawer content to the side and out of the Drawer.

This can be achieved by using the Motion APIs to animate the inner content of the Drawer.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import {
  createPresenceComponent,
  createPresenceComponentVariant,
  motionTokens,
  OverlayDrawer,
  DrawerBody,
  DrawerHeader,
  DrawerHeaderNavigation,
  DrawerHeaderTitle,
  DrawerFooter,
  Button,
  Toolbar,
  ToolbarGroup,
  ToolbarButton,
  makeStyles,
  useRestoreFocusSource,
  useRestoreFocusTarget,
} from '@fluentui/react-components';
import { Dismiss24Regular, Calendar24Regular, Settings24Regular, ArrowLeft24Regular } from '@fluentui/react-icons';
import { fadeAtom, Scale, slideAtom } from '@fluentui/react-motion-components-preview';

const useStyles = makeStyles({
  toolbar: {
    justifyContent: 'space-between',
  },

  body: {
    flex: '1',
    width: '100%',
    maxWidth: '100%',
    position: 'relative',
  },

  level: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,

    ':first-child': {
      paddingTop: 0,
    },

    ':last-child': {
      paddingBottom: 0,
    },
  },

  footer: {
    justifyContent: 'space-between',
  },
});

const BodyPresenceMotion = createPresenceComponent<{ level: 1 | 2 }>(({ level }) => {
  const duration = motionTokens.durationNormal;
  const easing = motionTokens.curveEasyEase;
  const outX = level === 1 ? '-100%' : '100%';

  return {
    enter: [
      fadeAtom({ direction: 'enter', duration, easing }),
      slideAtom({ direction: 'enter', duration, easing, outX }),
    ],

    exit: [fadeAtom({ direction: 'exit', duration, easing }), slideAtom({ direction: 'exit', duration, easing, outX })],
  };
});

const IconPresenceMotion = createPresenceComponentVariant(Scale, {
  duration: motionTokens.durationNormal,
  easing: motionTokens.curveEasyEase,
});

export const MultipleLevels = (): JSXElement => {
  const styles = useStyles();

  const [isOpen, setIsOpen] = React.useState(false);
  const [level, setLevel] = React.useState<1 | 2>(1);

  // all Drawers need manual focus restoration attributes
  // unless (as in the case of some inline drawers, you do not want automatic focus restoration)
  const restoreFocusTargetAttributes = useRestoreFocusTarget();
  const restoreFocusSourceAttributes = useRestoreFocusSource();

  return (
    <div>
      <OverlayDrawer
        {...restoreFocusSourceAttributes}
        position="start"
        open={isOpen}
        onOpenChange={(_, { open }) => setIsOpen(open)}
      >
        <DrawerHeader>
          <DrawerHeaderNavigation>
            <Toolbar className={styles.toolbar}>
              <ToolbarGroup>
                <IconPresenceMotion visible={level === 2} unmountOnExit>
                  <ToolbarButton
                    aria-label="Back"
                    appearance="subtle"
                    icon={<ArrowLeft24Regular />}
                    onClick={() => setLevel(1)}
                  />
                </IconPresenceMotion>
              </ToolbarGroup>

              <ToolbarGroup>
                <IconPresenceMotion visible={level === 1} unmountOnExit>
                  <ToolbarButton
                    aria-label="Go to calendar"
                    appearance="subtle"
                    icon={<Calendar24Regular />}
                    onClick={() => setLevel(2)}
                  />
                </IconPresenceMotion>
                <ToolbarButton aria-label="Settings" appearance="subtle" icon={<Settings24Regular />} />
                <ToolbarButton
                  aria-label="Close panel"
                  appearance="subtle"
                  icon={<Dismiss24Regular />}
                  onClick={() => setIsOpen(false)}
                />
              </ToolbarGroup>
            </Toolbar>
          </DrawerHeaderNavigation>
        </DrawerHeader>

        <div className={styles.body}>
          <BodyPresenceMotion level={1} visible={level === 1} unmountOnExit>
            <DrawerBody className={styles.level}>
              <DrawerHeaderTitle>Level 1 title</DrawerHeaderTitle>
              <p>Level 1 content</p>
            </DrawerBody>
          </BodyPresenceMotion>

          <BodyPresenceMotion level={2} visible={level === 2} unmountOnExit>
            <DrawerBody className={styles.level}>
              <DrawerHeaderTitle>Level 2 title</DrawerHeaderTitle>
              <p>Level 2 content</p>
            </DrawerBody>
          </BodyPresenceMotion>
        </div>

        <DrawerFooter className={styles.footer}>
          <Button appearance="subtle" disabled={level === 1} onClick={() => setLevel(1)}>
            Previous
          </Button>

          <Button appearance="primary" disabled={level === 2} onClick={() => setLevel(2)}>
            Next
          </Button>
        </DrawerFooter>
      </OverlayDrawer>

      <Button {...restoreFocusTargetAttributes} appearance="primary" onClick={() => setIsOpen(true)}>
        Open Drawer
      </Button>
    </div>
  );
};
```

### Overlay

OverlayDrawer contains supplementary content and is used for complex creation, edit, or management experiences.
For example, viewing details about an item in a list or editing settings.
By default, drawer is blocking and signifies that the user's full attention is required when making configurations.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import {
  DrawerBody,
  DrawerHeader,
  DrawerHeaderTitle,
  OverlayDrawer,
  Button,
  useRestoreFocusSource,
  useRestoreFocusTarget,
} from '@fluentui/react-components';
import { Dismiss24Regular } from '@fluentui/react-icons';

export const Overlay = (): JSXElement => {
  const [isOpen, setIsOpen] = React.useState(false);

  // all Drawers need manual focus restoration attributes
  // unless (as in the case of some inline drawers, you do not want automatic focus restoration)
  const restoreFocusTargetAttributes = useRestoreFocusTarget();
  const restoreFocusSourceAttributes = useRestoreFocusSource();

  return (
    <div>
      <OverlayDrawer
        as="aside"
        {...restoreFocusSourceAttributes}
        open={isOpen}
        onOpenChange={(_, { open }) => setIsOpen(open)}
      >
        <DrawerHeader>
          <DrawerHeaderTitle
            action={
              <Button
                appearance="subtle"
                aria-label="Close"
                icon={<Dismiss24Regular />}
                onClick={() => setIsOpen(false)}
              />
            }
          >
            Overlay Drawer
          </DrawerHeaderTitle>
        </DrawerHeader>

        <DrawerBody>
          <p>Drawer content</p>
        </DrawerBody>
      </OverlayDrawer>

      <Button {...restoreFocusTargetAttributes} appearance="primary" onClick={() => setIsOpen(true)}>
        Open Drawer
      </Button>
    </div>
  );
};
```

### Overlay Inside Container

The overlay Drawer can be rendered inside a specific container by setting the `mountNode` prop to the desired container element.
This approach is useful when you need the Drawer to appear within a particular section of the DOM, rather than being attached to the root element.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import {
  DrawerBody,
  DrawerHeader,
  DrawerHeaderTitle,
  OverlayDrawer,
  Button,
  makeStyles,
  tokens,
  useRestoreFocusSource,
  useRestoreFocusTarget,
} from '@fluentui/react-components';
import { Dismiss24Regular } from '@fluentui/react-icons';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: tokens.spacingHorizontalL,
  },

  container: {
    width: '500px',
    height: '300px',
    padding: `${tokens.spacingVerticalL} ${tokens.spacingHorizontalL}`,
    position: 'relative',
    overflow: 'hidden',
    border: `${tokens.strokeWidthThicker} solid ${tokens.colorNeutralStroke1}`,
    backgroundColor: tokens.colorBrandBackground2,
  },
});

export const OverlayInsideContainer = (): JSXElement => {
  const [isOpen, setIsOpen] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);
  const styles = useStyles();

  // all Drawers need manual focus restoration attributes
  // unless (as in the case of some inline drawers, you do not want automatic focus restoration)
  const restoreFocusTargetAttributes = useRestoreFocusTarget();
  const restoreFocusSourceAttributes = useRestoreFocusSource();

  return (
    <div className={styles.root}>
      <div className={styles.container} ref={ref}>
        <OverlayDrawer
          as="aside"
          {...restoreFocusSourceAttributes}
          mountNode={ref.current}
          open={isOpen}
          onOpenChange={(_, { open }) => setIsOpen(open)}
        >
          <DrawerHeader>
            <DrawerHeaderTitle
              action={
                <Button
                  appearance="subtle"
                  aria-label="Close"
                  icon={<Dismiss24Regular />}
                  onClick={() => setIsOpen(false)}
                />
              }
            >
              Overlay Drawer
            </DrawerHeaderTitle>
          </DrawerHeader>

          <DrawerBody>
            <p>Drawer content</p>
          </DrawerBody>
        </OverlayDrawer>

        <p>Drawer will be rendered within this container</p>
      </div>

      <Button {...restoreFocusTargetAttributes} appearance="primary" onClick={() => setIsOpen(true)}>
        Open Drawer
      </Button>
    </div>
  );
};
```

### Overlay No Modal

An overlay is optional depending on whether or not interacting with the background content is beneficial to the user's context/scenario.
By setting the `modalType` prop to `non-modal`, the Drawer will not be blocking and the user can interact with the background content.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import {
  DrawerBody,
  DrawerHeader,
  DrawerHeaderTitle,
  OverlayDrawer,
  Button,
  useRestoreFocusSource,
  useRestoreFocusTarget,
} from '@fluentui/react-components';
import { Dismiss24Regular } from '@fluentui/react-icons';

export const OverlayNoModal = (): JSXElement => {
  const [isOpen, setIsOpen] = React.useState(false);

  // all Drawers need manual focus restoration attributes
  // unless (as in the case of some inline drawers, you do not want automatic focus restoration)
  const restoreFocusTargetAttributes = useRestoreFocusTarget();
  const restoreFocusSourceAttributes = useRestoreFocusSource();

  return (
    <div>
      <OverlayDrawer
        modalType="non-modal"
        {...restoreFocusSourceAttributes}
        open={isOpen}
        onOpenChange={(_, { open }) => setIsOpen(open)}
      >
        <DrawerHeader>
          <DrawerHeaderTitle
            action={
              <Button
                appearance="subtle"
                aria-label="Close"
                icon={<Dismiss24Regular />}
                onClick={() => setIsOpen(false)}
              />
            }
          >
            Overlay Drawer
          </DrawerHeaderTitle>
        </DrawerHeader>

        <DrawerBody>
          <p>Drawer content</p>
        </DrawerBody>
      </OverlayDrawer>

      <Button {...restoreFocusTargetAttributes} appearance="primary" onClick={() => setIsOpen(!isOpen)}>
        Toggle
      </Button>
    </div>
  );
};
```

### Position

When a Drawer is invoked, it slides in from either the start or end side, or bottom of the screen.
This can be specified by the `position` prop.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import {
  DrawerBody,
  DrawerHeader,
  DrawerHeaderTitle,
  OverlayDrawer,
  DrawerProps,
  Button,
  makeStyles,
  tokens,
  useRestoreFocusSource,
  useRestoreFocusTarget,
} from '@fluentui/react-components';
import { Dismiss24Regular } from '@fluentui/react-icons';

const useStyles = makeStyles({
  content: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    columnGap: tokens.spacingHorizontalXS,
  },
});

const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

export const Position = (): JSXElement => {
  const styles = useStyles();

  const [isOpen, setIsOpen] = React.useState(false);
  const [position, setPosition] = React.useState<Required<DrawerProps>['position']>('start');

  const onClickStartButton = React.useCallback(() => {
    setPosition('start');
    setIsOpen(true);
  }, []);

  const onClickEndButton = React.useCallback(() => {
    setPosition('end');
    setIsOpen(true);
  }, []);

  const onClickBottomButton = React.useCallback(() => {
    setPosition('bottom');
    setIsOpen(true);
  }, []);

  // all Drawers need manual focus restoration attributes
  // unless (as in the case of some inline drawers, you do not want automatic focus restoration)
  const restoreFocusTargetAttributes = useRestoreFocusTarget();
  const restoreFocusSourceAttributes = useRestoreFocusSource();

  return (
    <div>
      <OverlayDrawer
        position={position}
        {...restoreFocusSourceAttributes}
        open={isOpen}
        onOpenChange={(_, { open }) => setIsOpen(open)}
      >
        <DrawerHeader>
          <DrawerHeaderTitle
            action={
              <Button
                appearance="subtle"
                aria-label="Close"
                icon={<Dismiss24Regular />}
                onClick={() => setIsOpen(false)}
              />
            }
          >
            {capitalize(position)} Drawer
          </DrawerHeaderTitle>
        </DrawerHeader>

        <DrawerBody>
          <p>Drawer content</p>
        </DrawerBody>
      </OverlayDrawer>

      <div className={styles.content}>
        <Button {...restoreFocusTargetAttributes} appearance="primary" onClick={onClickStartButton}>
          Open start
        </Button>

        <Button {...restoreFocusTargetAttributes} appearance="primary" onClick={onClickEndButton}>
          Open end
        </Button>

        <Button {...restoreFocusTargetAttributes} appearance="primary" onClick={onClickBottomButton}>
          Open Bottom
        </Button>
      </div>
    </div>
  );
};
```

### Prevent Close

By setting the `modalType` prop to `alert` and not providing an onOpenChange handler, the Drawer will not be closable by clicking outside nor using the "ESC" key.
This is useful for scenarios where the user must interact with the Drawer before continuing, when opening a Drawer is a critical action or when multiple Drawers are open at the same time.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import {
  OverlayDrawer,
  DrawerBody,
  DrawerHeader,
  DrawerHeaderTitle,
  Button,
  useRestoreFocusSource,
  useRestoreFocusTarget,
} from '@fluentui/react-components';
import { Dismiss24Regular } from '@fluentui/react-icons';

export const PreventClose = (): JSXElement => {
  const [open, setOpen] = React.useState(false);

  // all Drawers need manual focus restoration attributes
  // unless (as in the case of some inline drawers, you do not want automatic focus restoration)
  const restoreFocusTargetAttributes = useRestoreFocusTarget();
  const restoreFocusSourceAttributes = useRestoreFocusSource();

  return (
    <div>
      <OverlayDrawer {...restoreFocusSourceAttributes} position="end" open={open} modalType="alert">
        <DrawerHeader>
          <DrawerHeaderTitle
            action={
              <Button
                appearance="subtle"
                aria-label="Close"
                icon={<Dismiss24Regular />}
                onClick={() => setOpen(false)}
              />
            }
          >
            Prevent close with Esc or outside click
          </DrawerHeaderTitle>
        </DrawerHeader>

        <DrawerBody>
          <p>This drawer cannot be closed when clicking outside nor using the "ESC" key</p>
        </DrawerBody>
      </OverlayDrawer>

      <Button {...restoreFocusTargetAttributes} appearance="primary" onClick={() => setOpen(true)}>
        Open Drawer
      </Button>
    </div>
  );
};
```

### Resizable

This example shows how to implement a resizable drawer.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import {
  DrawerBody,
  DrawerHeader,
  DrawerHeaderTitle,
  InlineDrawer,
  makeStyles,
  mergeClasses,
  tokens,
  Button,
  Input,
  InputProps,
  Label,
  useId,
  Dialog,
  DialogTrigger,
  DialogSurface,
  DialogTitle,
  DialogBody,
  DialogActions,
  DialogContent,
  shorthands,
} from '@fluentui/react-components';
import { Dismiss20Regular } from '@fluentui/react-icons';

const MIN_SIDEBAR_WIDTH = 240;
const useStyles = makeStyles({
  root: {
    border: '2px solid #ccc',
    overflow: 'hidden',

    display: 'flex',
    height: '480px',
    backgroundColor: '#fff',
    userSelect: 'auto',
  },

  rootResizerActive: {
    userSelect: 'none',
  },

  container: {
    position: 'relative',
  },

  drawer: {
    willChange: 'width',
    transitionProperty: 'width',
    transitionDuration: '16.666ms', // 60fps
  },

  resizer: {
    width: '24px',
    height: '100%',
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    cursor: 'col-resize',
    border: 'none',
    minWidth: 'unset',
    borderRadius: tokens.borderRadiusNone,

    '&:before': {
      content: '""',
      position: 'absolute',
      borderRight: `1px solid ${tokens.colorNeutralBackground5}`,
      width: '1px',
      height: '100%',
      transform: 'translateX(-50%)',
      left: '50%',
    },
    ':hover': {
      borderRightWidth: '4px',
      cursor: 'col-resize',
      backgroundColor: 'transparent',
    },
    ':hover:active': {
      backgroundColor: 'transparent',
      cursor: 'col-resize',
    },
  },

  resizerActive: {
    borderRightWidth: '4px',
    borderRightColor: tokens.colorNeutralBackground5Pressed,
  },

  content: {
    margin: `${tokens.spacingVerticalXL} ${tokens.spacingHorizontalXL}`,
    flex: '1',
  },

  dialogContent: {
    display: 'flex',
    flexDirection: 'column',
  },
  errorMessage: {
    color: tokens.colorPaletteRedForeground1,
  },
  invalidInput: {
    ...shorthands.borderColor(tokens.colorPaletteRedBorder2),
  },
});

export const Resizable = (): JSXElement => {
  const styles = useStyles();
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [isDialogOpen, setDialogOpen] = React.useState(false);

  const animationFrame = React.useRef<number>(0);
  const sidebarRef = React.useRef<HTMLDivElement>(null);
  const [isResizing, setIsResizing] = React.useState(false);
  const [sidebarWidth, setSidebarWidth] = React.useState(320);
  const [showMessage, setShowMessage] = React.useState(false);
  const [resizeInput, setResizeInput] = React.useState<string>(sidebarWidth.toString());
  const inputId = useId('input');

  const startResizing = React.useCallback(() => setIsResizing(true), []);
  const stopResizing = React.useCallback(() => setIsResizing(false), []);

  const resize = React.useCallback(
    ({ clientX }: { clientX: number }) => {
      animationFrame.current = requestAnimationFrame(() => {
        if (isResizing && sidebarRef.current) {
          const newSidebarWidth = clientX - sidebarRef.current.getBoundingClientRect().left;
          setSidebarWidth(newSidebarWidth);
          setResizeInput(Math.round(newSidebarWidth).toString());
        }
      });
    },
    [isResizing],
  );

  React.useEffect(() => {
    window.addEventListener('mousemove', resize);
    window.addEventListener('mouseup', stopResizing);

    return () => {
      cancelAnimationFrame(animationFrame.current);
      window.removeEventListener('mousemove', resize);
      window.removeEventListener('mouseup', stopResizing);
    };
  }, [resize, stopResizing]);

  React.useEffect(() => {
    if (isDialogOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isDialogOpen]);

  const onResizeInputChange: InputProps['onChange'] = (ev, data) => {
    if (data.value) {
      setResizeInput(data.value);
    }
  };

  const handleKeyDown = (ev: React.KeyboardEvent) => {
    if (ev.key === 'Enter') {
      submitWidth(ev);
    }
    if (ev.key === 'Escape') {
      setDialogOpen(false);
    }
  };

  function submitWidth(e: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent) {
    if (resizeInput && parseInt(resizeInput, 10) >= MIN_SIDEBAR_WIDTH) {
      setSidebarWidth(Number(resizeInput));
      setShowMessage(false);
      setDialogOpen(false);
    } else {
      setShowMessage(true);
      e.preventDefault();
    }
  }

  function resizeWithArrows(e: React.KeyboardEvent) {
    if (e.key === 'ArrowUp' || e.key === 'ArrowRight') {
      setSidebarWidth(prev => prev + 10);
      setResizeInput((prev: string) => (parseInt(prev, 10) + 10).toString());
    } else if (e.key === 'ArrowDown' || e.key === 'ArrowLeft') {
      setSidebarWidth(prev => prev - 10);
      setResizeInput((prev: string) => (parseInt(prev, 10) - 10).toString());
    }
  }

  return (
    <>
      <div className={mergeClasses(styles.root, isResizing && styles.rootResizerActive)}>
        <div className={styles.container}>
          <InlineDrawer
            open
            ref={sidebarRef}
            className={styles.drawer}
            style={{ width: `${sidebarWidth}px` }}
            onMouseDown={e => e.preventDefault()}
          >
            <DrawerHeader>
              <DrawerHeaderTitle>Default Drawer</DrawerHeaderTitle>
            </DrawerHeader>
            <DrawerBody>
              <p>Resizable content</p>
            </DrawerBody>
          </InlineDrawer>
          <Dialog open={isDialogOpen} onOpenChange={(event, data) => setDialogOpen(data.open)}>
            <DialogTrigger disableButtonEnhancement>
              <Button
                className={mergeClasses(styles.resizer, isResizing && styles.resizerActive)}
                onMouseDown={startResizing}
                aria-label="Resize drawer"
                role="separator"
                aria-orientation="vertical"
                onKeyDown={resizeWithArrows}
                aria-valuenow={sidebarWidth * 0.01}
                aria-valuemin={MIN_SIDEBAR_WIDTH * 0.01}
                aria-valuemax={100}
              />
            </DialogTrigger>
            <DialogSurface>
              <DialogBody>
                <DialogTitle
                  action={
                    <DialogTrigger action="close">
                      <Button appearance="subtle" aria-label="close" icon={<Dismiss20Regular />} />
                    </DialogTrigger>
                  }
                >
                  Resize drawer
                </DialogTitle>
                <DialogContent>
                  <div className={styles.dialogContent}>
                    <Label htmlFor={inputId}>Enter desired drawer width pixels:</Label>
                    <Input
                      id={inputId}
                      ref={inputRef}
                      onChange={onResizeInputChange}
                      value={resizeInput}
                      type="number"
                      className={showMessage ? styles.invalidInput : ''}
                      onKeyDown={handleKeyDown}
                    />

                    {showMessage ? (
                      <Label className={styles.errorMessage}>
                        Recommended minimum width of the drawer should be greater than or equal to `240px`.
                      </Label>
                    ) : null}
                  </div>
                </DialogContent>
                <DialogActions>
                  <DialogTrigger disableButtonEnhancement>
                    <Button appearance="primary" onClick={e => submitWidth(e)}>
                      Resize
                    </Button>
                  </DialogTrigger>
                  <DialogTrigger disableButtonEnhancement>
                    <Button>Cancel</Button>
                  </DialogTrigger>
                </DialogActions>
              </DialogBody>
            </DialogSurface>
          </Dialog>
        </div>
        <p className={styles.content}>Resize the drawer to see the change</p>
      </div>
    </>
  );
};
```

### Responsive

When using the `Drawer` component, the `type` prop can be used to change the drawer type based on the viewport size.
The example below will change the drawer type to `overlay` when the viewport is smaller than 720px.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import {
  DrawerBody,
  DrawerHeader,
  DrawerHeaderTitle,
  Drawer,
  DrawerProps,
  Button,
  makeStyles,
  tokens,
  useRestoreFocusSource,
  useRestoreFocusTarget,
} from '@fluentui/react-components';
import { Dismiss24Regular } from '@fluentui/react-icons';

const useStyles = makeStyles({
  root: {
    border: '2px solid #ccc',
    overflow: 'hidden',

    display: 'flex',
    height: '480px',
    backgroundColor: '#fff',
  },

  content: {
    margin: `${tokens.spacingVerticalXL} ${tokens.spacingHorizontalXL}`,
    flex: '1',

    gridRowGap: tokens.spacingVerticalXXL,
  },
});

type DrawerType = Required<DrawerProps>['type'];

export const Responsive = (): JSXElement => {
  const styles = useStyles();

  const [isOpen, setIsOpen] = React.useState(true);
  const [type, setType] = React.useState<DrawerType>('inline');

  const onMediaQueryChange = React.useCallback(
    ({ matches }: { matches: boolean }) => setType(matches ? 'overlay' : 'inline'),
    [setType],
  );

  React.useEffect(() => {
    const match = window.matchMedia('(max-width: 720px)');

    if (match.matches) {
      setType('overlay');
    }

    match.addEventListener('change', onMediaQueryChange);

    return () => match.removeEventListener('change', onMediaQueryChange);
  }, [onMediaQueryChange]);

  // all Drawers need manual focus restoration attributes
  // unless (as in the case of some inline drawers, you do not want automatic focus restoration)
  const restoreFocusTargetAttributes = useRestoreFocusTarget();
  const restoreFocusSourceAttributes = useRestoreFocusSource();

  return (
    <div className={styles.root}>
      <Drawer
        type={type}
        {...restoreFocusSourceAttributes}
        separator
        position="start"
        open={isOpen}
        onOpenChange={(_, { open }) => setIsOpen(open)}
      >
        <DrawerHeader>
          <DrawerHeaderTitle
            action={
              <Button
                appearance="subtle"
                aria-label="Close"
                icon={<Dismiss24Regular />}
                onClick={() => setIsOpen(false)}
              />
            }
          >
            Responsive Drawer
          </DrawerHeaderTitle>
        </DrawerHeader>

        <DrawerBody>
          <p>Drawer content</p>
        </DrawerBody>
      </Drawer>

      <div className={styles.content}>
        <Button {...restoreFocusTargetAttributes} appearance="primary" onClick={() => setIsOpen(!isOpen)}>
          Toggle
        </Button>

        <p>Resize the window to see the change</p>
      </div>
    </div>
  );
};
```

### Separator

The `separator` prop adds a line separator between the drawer and the content.
Its placement will be determined by the `position` prop

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import {
  DrawerBody,
  DrawerHeader,
  DrawerHeaderTitle,
  InlineDrawer,
  Button,
  makeStyles,
  tokens,
  DrawerProps,
  mergeClasses,
} from '@fluentui/react-components';
import { Dismiss24Regular } from '@fluentui/react-icons';

const useStyles = makeStyles({
  root: {
    border: '2px solid #ccc',
    overflow: 'hidden',
    display: 'flex',
    height: '480px',
    backgroundColor: '#fff',
  },

  content: {
    flex: '1',
    padding: '16px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    columnGap: tokens.spacingHorizontalXS,
  },

  flexColumn: {
    flexDirection: 'column',
  },
});

type DrawerSeparatorExampleProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  position: DrawerProps['position'];
  className?: string;
};

const DrawerSeparatorExample: React.FC<DrawerSeparatorExampleProps> = ({ open, setOpen, position }) => {
  return (
    <InlineDrawer separator position={position} open={open}>
      <DrawerHeader>
        <DrawerHeaderTitle
          action={
            <Button appearance="subtle" aria-label="Close" icon={<Dismiss24Regular />} onClick={() => setOpen(false)} />
          }
        >
          Drawer with separator
        </DrawerHeaderTitle>
      </DrawerHeader>

      <DrawerBody>
        <p>Drawer content</p>
      </DrawerBody>
    </InlineDrawer>
  );
};

export const Separator = (): JSXElement => {
  const styles = useStyles();

  const [startOpen, setStartOpen] = React.useState(true);
  const [endOpen, setEndOpen] = React.useState(true);
  const [bottomOpen, setBottomOpen] = React.useState(true);

  return (
    <div className={mergeClasses(styles.root, styles.flexColumn)}>
      <div className={styles.root} style={{ borderBottomWidth: 0 }}>
        <DrawerSeparatorExample open={startOpen} setOpen={setStartOpen} position="start" />

        <div className={styles.content}>
          <Button appearance="primary" onClick={() => setStartOpen(!startOpen)}>
            Toggle start
          </Button>

          <Button appearance="primary" onClick={() => setEndOpen(!endOpen)}>
            Toggle end
          </Button>

          <Button appearance="primary" onClick={() => setBottomOpen(!bottomOpen)}>
            Toggle bottom
          </Button>
        </div>
        <DrawerSeparatorExample open={endOpen} setOpen={setEndOpen} position="end" />
      </div>
      <DrawerSeparatorExample open={bottomOpen} setOpen={setBottomOpen} position="bottom" />
    </div>
  );
};
```

### Size

The `size` prop controls the width of the drawer. The default is `small`.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import {
  OverlayDrawer,
  DrawerBody,
  DrawerHeader,
  DrawerHeaderTitle,
  DrawerProps,
  Button,
  Label,
  RadioGroup,
  Radio,
  useId,
  tokens,
  makeStyles,
  useRestoreFocusSource,
  useRestoreFocusTarget,
} from '@fluentui/react-components';
import { Dismiss24Regular } from '@fluentui/react-icons';

const useStyles = makeStyles({
  main: {
    display: 'grid',
    justifyContent: 'flex-start',
    gridRowGap: tokens.spacingVerticalXXL,
  },

  field: {
    display: 'grid',
    gridRowGap: tokens.spacingVerticalS,
  },
});

type DrawerSizeStory = Required<DrawerProps>['size'];

export const Size = (): JSXElement => {
  const styles = useStyles();
  const labelId = useId('size-label');

  const [open, setOpen] = React.useState(false);
  const [size, setSize] = React.useState<DrawerSizeStory>('small');

  const labelMap: Record<DrawerSizeStory, string> = {
    small: 'Small (Default)',
    medium: 'Medium',
    large: 'Large',
    full: 'Full',
  };

  // all Drawers need manual focus restoration attributes
  // unless (as in the case of some inline drawers, you do not want automatic focus restoration)
  const restoreFocusTargetAttributes = useRestoreFocusTarget();
  const restoreFocusSourceAttributes = useRestoreFocusSource();

  return (
    <div>
      <OverlayDrawer
        size={size}
        {...restoreFocusSourceAttributes}
        position="end"
        open={open}
        onOpenChange={(_, state) => setOpen(state.open)}
      >
        <DrawerHeader>
          <DrawerHeaderTitle
            action={
              <Button
                appearance="subtle"
                aria-label="Close"
                icon={<Dismiss24Regular />}
                onClick={() => setOpen(false)}
              />
            }
          >
            {labelMap[size]} size
          </DrawerHeaderTitle>
        </DrawerHeader>

        <DrawerBody>
          <p>Drawer content</p>
        </DrawerBody>
      </OverlayDrawer>

      <div className={styles.main}>
        <Button {...restoreFocusTargetAttributes} appearance="primary" onClick={() => setOpen(true)}>
          Open Drawer
        </Button>

        <div className={styles.field}>
          <Label id={labelId}>Size</Label>
          <RadioGroup
            value={size}
            onChange={(_, data) => setSize(data.value as DrawerSizeStory)}
            aria-labelledby={labelId}
          >
            {Object.keys(labelMap).map(key => (
              <Radio key={key} value={key} label={labelMap[key as DrawerSizeStory]} />
            ))}
          </RadioGroup>
        </div>
      </div>
    </div>
  );
};
```

### With Navigation

Drawers can have any type of content and one great case is to have a toolbar in the header.
Drawer ships with a `DrawerHeaderNavigation` component that can be used to display a toolbar in the header of the drawer.
This can be combined with `DrawerHeaderTitle` to display a title in the header.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import {
  OverlayDrawer,
  DrawerBody,
  DrawerHeader,
  DrawerHeaderNavigation,
  DrawerHeaderTitle,
  Button,
  Toolbar,
  ToolbarGroup,
  ToolbarButton,
  makeStyles,
  useRestoreFocusSource,
  useRestoreFocusTarget,
} from '@fluentui/react-components';
import {
  Dismiss24Regular,
  ArrowClockwise24Regular,
  Settings24Regular,
  ArrowLeft24Regular,
} from '@fluentui/react-icons';

const useStyles = makeStyles({
  header: {
    display: 'flex',
    justifyContent: 'space-between',
  },
});

export const WithNavigation = (): JSXElement => {
  const styles = useStyles();

  const [isOpen, setIsOpen] = React.useState(false);

  // all Drawers need manual focus restoration attributes
  // unless (as in the case of some inline drawers, you do not want automatic focus restoration)
  const restoreFocusTargetAttributes = useRestoreFocusTarget();
  const restoreFocusSourceAttributes = useRestoreFocusSource();

  return (
    <div>
      <OverlayDrawer
        position="start"
        {...restoreFocusSourceAttributes}
        open={isOpen}
        onOpenChange={(_, { open }) => setIsOpen(open)}
      >
        <DrawerHeader>
          <DrawerHeaderNavigation className={styles.header}>
            <Button aria-label="Back" appearance="subtle" icon={<ArrowLeft24Regular />} />
            <Toolbar>
              <ToolbarGroup>
                <ToolbarButton aria-label="Reload content" appearance="subtle" icon={<ArrowClockwise24Regular />} />
                <ToolbarButton aria-label="Settings" appearance="subtle" icon={<Settings24Regular />} />
                <ToolbarButton
                  aria-label="Close panel"
                  appearance="subtle"
                  icon={<Dismiss24Regular />}
                  onClick={() => setIsOpen(false)}
                />
              </ToolbarGroup>
            </Toolbar>
          </DrawerHeaderNavigation>

          <DrawerHeaderTitle>Title goes here</DrawerHeaderTitle>
        </DrawerHeader>

        <DrawerBody>
          <p>Drawer content</p>
        </DrawerBody>
      </OverlayDrawer>

      <Button {...restoreFocusTargetAttributes} appearance="primary" onClick={() => setIsOpen(true)}>
        Open Drawer
      </Button>
    </div>
  );
};
```

### With Scroll

By default, the drawer will not scroll its content when it overflows.
To enable this behavior, the DrawerBody component can be used to wrap the content of the drawer.

Important note: if the drawer content does not contain any focusable elements, the DrawerBody itself needs
a tabIndex of 0 to ensure keyboard scroll access.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import {
  InlineDrawer,
  DrawerBody,
  DrawerHeader,
  DrawerHeaderTitle,
  DrawerFooter,
  Button,
  makeStyles,
  tokens,
} from '@fluentui/react-components';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    rowGap: tokens.spacingHorizontalXXL,
    columnGap: tokens.spacingHorizontalXXL,
  },

  drawer: {
    height: '400px',
    minWidth: '320px',
  },
});

const Header = () => {
  return (
    <DrawerHeader>
      <DrawerHeaderTitle>Title goes here</DrawerHeaderTitle>
    </DrawerHeader>
  );
};

const Footer = () => {
  return (
    <DrawerFooter>
      <Button appearance="primary">Primary</Button>
      <Button>Secondary</Button>
    </DrawerFooter>
  );
};

const Body = () => {
  return (
    <DrawerBody tabIndex={0} role="group" aria-label="Example scrolling content">
      Lorem ipsum dolor sit amet consectetur, adipisicing elit. Doloribus nam aut amet similique, iure vel voluptates
      cum cumque repellendus perferendis maiores officia unde in? Autem neque sequi maiores eum omnis. Lorem ipsum,
      dolor sit amet consectetur adipisicing elit. Perspiciatis ipsam explicabo tempora ipsum saepe nam. Eum aliquid
      aperiam, laborum labore excepturi nisi odio deserunt facilis error. Mollitia dolor quidem a. Lorem ipsum, dolor
      sit amet consectetur adipisicing elit. Eius soluta ea repellendus voluptatum provident ad aut unde accusantium
      sed. Officia qui praesentium repudiandae maxime molestias, non mollitia animi laboriosam quis. Lorem, ipsum dolor
      sit amet consectetur adipisicing elit. Inventore, architecto eligendi earum dolor voluptas hic minima nihil porro
      odio suscipit quaerat accusantium, aperiam, neque beatae ipsa explicabo consequatur cum quam?
    </DrawerBody>
  );
};

export const WithScroll = (): JSXElement => {
  const styles = useStyles();

  return (
    <div className={styles.root}>
      <InlineDrawer className={styles.drawer} open>
        <Body />
      </InlineDrawer>

      <InlineDrawer className={styles.drawer} open>
        <Header />
        <Body />
      </InlineDrawer>

      <InlineDrawer className={styles.drawer} open>
        <Body />
        <Footer />
      </InlineDrawer>

      <InlineDrawer className={styles.drawer} open>
        <Header />
        <Body />
        <Footer />
      </InlineDrawer>
    </div>
  );
};
```

### With Title

`DrawerHeaderTitle` is a component that provides a structured heading for a Drawer and can be used to display a title and an action.
Although it works as a standalone component, it is intended to be used within a `DrawerHeader`.
The title renders an `h2` element by default but it can be customized using the `heading` prop.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { InlineDrawer, DrawerHeader, DrawerHeaderTitle, Button, makeStyles } from '@fluentui/react-components';
import { Dismiss24Regular } from '@fluentui/react-icons';

const useStyles = makeStyles({
  drawer: {
    width: '400px',
    height: '600px',
  },
});

export const WithTitle = (): JSXElement => {
  return (
    <InlineDrawer className={useStyles().drawer} open>
      <DrawerHeader>
        <DrawerHeaderTitle>Drawer with title</DrawerHeaderTitle>
        <DrawerHeaderTitle heading={{ as: 'h1' }}>Drawer with custom tag</DrawerHeaderTitle>
        <DrawerHeaderTitle action={<Button appearance="subtle" aria-label="Close" icon={<Dismiss24Regular />} />}>
          Drawer with title and action
        </DrawerHeaderTitle>
      </DrawerHeader>
    </InlineDrawer>
  );
};
```
