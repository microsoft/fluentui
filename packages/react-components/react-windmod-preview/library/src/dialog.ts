export { Dialog } from './components/Dialog';
export type {
  DialogContextValue,
  DialogContextValues,
  DialogModalType,
  DialogOpenChangeData,
  DialogOpenChangeEvent,
  DialogOpenChangeEventHandler,
  DialogProps,
  DialogState,
  DialogSurfaceContextValue,
} from './components/Dialog';

export { DialogSurface, dialogSurfaceClassNames, useDialogSurfaceStyles } from './components/DialogSurface';
export type { DialogSurfaceProps, DialogSurfaceSlots, DialogSurfaceState } from './components/DialogSurface';

export { DialogTrigger, dialogTriggerClassNames, useDialogTriggerStyles } from './components/DialogTrigger';
export type { DialogTriggerAction, DialogTriggerProps, DialogTriggerState } from './components/DialogTrigger';

export { DialogHeader, dialogHeaderClassNames, useDialogHeaderStyles } from './components/DialogHeader';
export type { DialogHeaderProps, DialogHeaderSlots, DialogHeaderState } from './components/DialogHeader';

export { DialogTitle, dialogTitleClassNames, useDialogTitleStyles } from './components/DialogTitle';
export type { DialogTitleProps, DialogTitleSlots, DialogTitleState } from './components/DialogTitle';

export { DialogBody, dialogBodyClassNames, useDialogBodyStyles } from './components/DialogBody';
export type { DialogBodyProps, DialogBodySlots, DialogBodyState } from './components/DialogBody';

export { DialogActions, dialogActionsClassNames, useDialogActionsStyles } from './components/DialogActions';
export type {
  DialogActionsPosition,
  DialogActionsProps,
  DialogActionsSlots,
  DialogActionsState,
} from './components/DialogActions';

/** Headless building blocks, re-exported for consumers composing their own Dialog. */
export {
  renderDialog,
  renderDialogActions,
  renderDialogBody,
  renderDialogHeader,
  renderDialogSurface,
  renderDialogTitle,
  useDialog,
  useDialogActions,
  useDialogBody,
  useDialogContext,
  useDialogContextValues,
  useDialogHeader,
  useDialogSurface,
  useDialogSurfaceContext,
  useDialogTitle,
  useDialogTrigger,
} from '@fluentui/react-headless-components-preview/dialog';
